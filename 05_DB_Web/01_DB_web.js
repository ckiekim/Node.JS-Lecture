var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var sqlite3 = require('sqlite3').verbose();
var template = require('./view/template');

var listSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs";
var searchSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs where id=?";
var incHitSql = `UPDATE bbs SET hit=(SELECT hit FROM bbs WHERE id=?)+1 WHERE id=?`;
var db = new sqlite3.Database("db/bbs.db");

var app = http.createServer(function(req, res) {
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    //console.log(_url);
    if (pathname === '/') {
        if (queryData.id === undefined) {  // localhost:3000
            let navBar = template.navMain();
            let trs = '';
            db.all(listSql, function(err, rows) {
                for(let row of rows) {
                    trs += `<tr>
                        <td>${row.id}</td>
                        <td style="text-align: left;"><a href="/?id=${row.id}">${row.title}</a></td>
                        <td>${row.writer}</td>
                        <td>${row.ts}</td>
                        <td style="text-align: right;">${row.hit}</td>
                        </tr>`;
                }
                let html = template.Html(navBar, trs);
                res.writeHead(200);
                res.end(html);
            });
        } else {        // localhost:3000/?id=101
            let idVal = parseInt(queryData.id);
            let navBar = template.navList(idVal);
            db.serialize(function() {
                var stmt = db.prepare(incHitSql);
                stmt.run(idVal, idVal);
                stmt.finalize();
            
                stmt = db.prepare(searchSql);
                stmt.get(idVal, function(err, row) {
                    let trs = `
                        <tr><td>ID</td><td>${row.id}</td></tr>
                        <tr><td>제목</td><td>${row.title}</td></tr>
                        <tr><td>글쓴이</td><td>${row.writer}</td></tr>
                        <tr><td>최종수정시간</td><td>${row.ts}</td></tr>
                        <tr><td>조회수</td><td>${row.hit}</td></tr>
                        <tr><td>내용</td><td>${row.content}</td></tr>`;

                        let view = require('./view/itemView');
                        let html = view.itemView(navBar, trs);
                        res.writeHead(200);
                        res.end(html);
                });
                stmt.finalize();
            });
        }
    } else if (pathname === '/favicon.ico') {
        fs.readFile('nodejs.png', function(err, data) {
            res.statusCode = 200;
			res.setHeader('Content-type', 'image/png');		
			res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});
app.listen(3000);