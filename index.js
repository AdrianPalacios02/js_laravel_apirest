const sql = require("mssql/msnodesqlv8");

var config = {
    server: "LAPTOP-1F04T7P3",
    database: "apirest",
    driver: "msnodesqlv8",
    options: {

        trustedConnection: true,
        trustServerCertificate: true,
    }
};

sql.connect(config, function (err) {
    if (err) {
        console.log("Error de conexión:", err);
        return; // Detener la ejecución después de un error de conexión
    }
    
    var request = new sql.Request();
    request.query("SELECT * FROM TEST", function (err, records) {
        if (err) {
            console.log("Error al ejecutar la consulta:", err);
            return; // Detener la ejecución después de un error de consulta
        }
        
        console.log("Registros:", records);
    });
});