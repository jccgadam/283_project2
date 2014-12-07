var mysql = require('mysql');
var conn = mysql.createConnection({
	host : 'us-cdbr-iron-east-01.cleardb.net',
	user : 'b84cf6af4ff1fa',
	password : '6edb6b8d',
	port : '3306',
	database : 'ad_4a646f70a83ab03'
	});

var conn1	 = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '12345678',
	port : '3306',
	database : 'test'
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
