const { app } = require('../app.js');
require('../../node_modules/mysql2/node_modules/iconv-lite/lib').encodingExists('foo');
const request = require('supertest');

// Pruebas GET

describe('GET /', () => {
    test('GET TEST /', async () => {
        const numRequests = 100;
        for (let i = 0; i < numRequests; i++) {
            const response = await request(app).get("/stats/").send();
            expect(response.body).toBeInstanceOf(Object);
        }
    }, 10000000);
});

// Pruebas POST

describe('POST /', () => {

    test('POST - sin enviar body /', async () => {
        const numRequests = 100;
        for (let i = 0; i < numRequests; i++) {
            const response = await request(app).post("/mutation").send({ dna: ['aatsc', 'asdf', 'sdfsd', 'sdfs', 'sdf', 'sdfsd'] });
            expect(response.statusCode).toBe(403);
        }
    }, 10000000);

    test('POST - enviando body aleatorio /', async () => {
        const numRequests = 100;
        for (let i = 0; i < numRequests; i++) {
            let adn = await generarRandomAdn();
            const response = await request(app).post("/mutation/").send({ dna: adn });
            expect(response.statusCode).toBe(200);
        }
    }, 10000000);
});

// Genera una cadena de ADN random.

function generarRandomAdn() {
    const letrasPermitidas = ['a', 't', 'c', 'g'];
    const array = [];
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (array[j] === undefined) {
                array[j] = "a";
            } else {
                let letra = letrasPermitidas[Math.floor(Math.random() * letrasPermitidas.length)];
                array[j] = letra + array[j];
            }
        }
    }
    return array;
}