Ejecutar código de manera local:

1 - Descarga o clona el repositorio. 
2 - Desde la consola, entra en la carpeta del proyecto y ejecuta el siguiente comando: npm i. 
3 - Crea un archivo .env y introduce lo siguiente: 

  PASSWORD=del111112
  HOST=db-test-2.ciuh7m591njg.us-east-1.rds.amazonaws.com
  HOST2=bb3.ciuh7m591njg.us-east-1.rds.amazonaws.com
  DATABASE=test
  
4 - Una vez descargadas las librerías, inicia el proyecto con npm start.
5 - Para realizar pruebas usa npm run test.

Cloud:

El código lo he subido a Amazon Web Services y lo he hecho a través de máquinas virtuales(EC2), creando balanceadores de manera manual, para hacer que la aplicación sea escalable.
La aplicación solo tiene dos instancias, en una aplicación profesional usaría el escalado automático, para que se creen instancias automáticas acorde a las necesidades o las crearía 
manualmente en base a estadísticas, también compraría un certificado ssl para poder agregar el Protocolo HTTPS a mi página web y su respectivo dominio. 

Para la base de datos use MySQL principal y otra secundaria, la principal se encarga de introducir datos y la secundaria de hacer copias de seguridad de la primera y leer los datos.
En una situación real usaría Aurora o Dynamo como base de datos, para poder usar el escalado automático, en orden de distribuir la carga.

Balanceador: http://test-2078482868.us-east-1.elb.amazonaws.com

Instancia A: http://ec2-54-197-66-46.compute-1.amazonaws.com/
Instancia B: http://ec2-3-89-140-55.compute-1.amazonaws.com/

angelo_developer@hotmail.com

;


