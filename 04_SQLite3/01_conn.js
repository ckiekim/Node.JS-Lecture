var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database("d:/Workspace/03_Sqlite/test.db");
var db = new sqlite3.Database("../../03_Sqlite/test.db");
//var db = new sqlite3.Database("..\\..\\03_Sqlite\\test.db");

var sql = "select * from bbs";
db.all(sql, function(err, rows) {
    for(let row of rows) {
        console.log(row);
    }
});

db.close();