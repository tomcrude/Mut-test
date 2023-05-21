const { pool, readPool } = require("../DB/dbconection.js");
const { verify, hasMutation } = require("../utils/util.js");

// Obtiene el ADN, verifica si está mutado y guarda el ADN en la base de datos, siempre y cuando no se encuentre en la base de datos.
const mutationHandler = async (req, res) => {
  const info = req.body;
  const adn = info.dna.join("").toUpperCase();

  // Verifica que la cadena de ADN esté en un formato correcto.
  const veri = await verify(info);

  if (!veri) {
    return res.status(403).send();
  }

  // Comprueba si el ADN está mutado.
  const mutation = await hasMutation(info);

  try {
  
    const con = await new Promise((resolve, reject) => {

      // Abre la conexión a la base de datos.

      pool.getConnection((e, connection) => {
        if (e) reject("Ha ocurrido un error.");
        else resolve(connection);
      });
    });

    // Verifica si el ADN introducido ya se encuentra en la base de datos. Si se encuentra, lo guarda, de lo contrario devuelve un mensaje por consola.

    const row = await new Promise((resolve, reject) => {
      con.query("SELECT adn FROM stats WHERE adn = ?", adn, (e, row) => {
        if (e) reject("Ha ocurrido un error.");
        else resolve(row);
      });
    });

    if (row.length > 0) {
      console.log("El ADN ya ha sido guardado en la base de datos.");
    } else {
      await new Promise((resolve, reject) => {
        con.query("INSERT INTO stats SET adn = ?, mutation = ?", [adn, mutation], (e, row) => {
          if (e) reject("El registro no se ha guardado en la base de datos.");
          else resolve();
        });
      });
    }

     // Cierra la conexión a la base de datos.

    con.release();

    // Si se encuentra una mutación, va a devolver un código 200, de lo contrario devolvera un código 403.

    if (mutation === true) {
      return res.status(200).send();
    } else {
      return res.status(403).send();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Ha ocurrido un error en el servidor.");
  }
};

// Obtiene todos los registros de la base de datos y devuelve los ADN mutados y no mutados.

const getMutationsHandler = async (req, res) => {
  const info = { mutates: 0, noMutates: 0 };

  try {

    // Abre la conexión a la base de datos.

    const con = await new Promise((resolve, reject) => {
      readPool.getConnection((e, connection) => {
        if (e) reject("Ha ocurrio un error.");
        else resolve(connection);
      });
    });

    // Solicita todos los registros.

    const row = await new Promise((resolve, reject) => {
      con.query("SELECT * FROM stats", (e, row) => {
        if (e) reject("No se encuentran registros.");
        else resolve(row);
      });
    });

    // Comprueba si se encuentran registros.

    if (row.length > 0) {
      for (let i = 0; i < row.length; i++) {
        if (row[i].mutation === 1) {
          info.mutates = info.mutates + 1;
        } else {
          info.noMutates = info.noMutates + 1;
        }
      }
    }

    // Cierra la conexión a la base de datos.

    con.release();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Ha ocurrido un error en el servidor.");
  }
};

module.exports = { mutationHandler, getMutationsHandler };