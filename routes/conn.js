var mysql = require('mysql');
var conn = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '12345678',
	port : '3306',
	database : 'cmpe283'
	});

function fetchData(sqlQuery, callback){
	
//	console.log("\nSQL Query::"+sqlQuery);
		
	conn.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else
		{
			callback(err, rows);
		}
	});
	
	}
exports.fetchData=fetchData;
