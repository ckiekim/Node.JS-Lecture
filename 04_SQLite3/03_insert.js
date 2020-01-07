var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("../../03_Sqlite/test.db");

/* var sql = "INSERT INTO bbs3(id, title, writer, content) ";
sql += "VALUES(101, 'a', 'b', 'c')";
db.run(sql); */

sql = 'INSERT INTO bbs(title, writer, content) VALUES(?, ?, ?)';
/* var title = 'About SQLite3';
var writer = 'Node.js';
var content = 'A quick brown fox jumps over the lazy dog.'; */

var records = [
    {title: 'title 1', writer: 'writer 1', content: 'content 1'},
    {title: 'title 2', writer: 'writer 2', content: 'content 2'}
];

db.serialize(function() {
    var stmt = db.prepare(sql);
    for (let record of records) {
        stmt.run(record.title, record.writer, record.content);
    }
    stmt.finalize();

    // YYYY-mm-dd HH:MM:SS 형식
    // var sql_ts = "SELECT id, title, writer, datetime(timestamp, 'localtime') ts, content FROM bbs";
    // YYYYmmddHHMM 형식
    var sql_ts = "SELECT id, title, writer, strftime('%Y%m%d%H%M', timestamp, 'localtime') ts, content FROM bbs";
    db.each(sql_ts, function(err, row) {
        console.log(row.id, row.title, row.writer, row.ts, row.content);
    });
});

db.close();