var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var sqlite3 = require('sqlite3').verbose();
var template = require('./view/template');

var listSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs";
var searchSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs where id=?";
var incHitSql = `UPDATE bbs SET hit=(SELECT hit FROM bbs WHERE id=?)+1 WHERE id=?`;
var insertSql = `INSERT INTO bbs(title, writer, content) VALUES(?, ?, ?)`;
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
                    trs += template.tableMain(row);
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
                    let trs = template.tableItem(row);
                    let view = require('./view/itemView');
                    let html = view.itemView(navBar, trs);
                    res.writeHead(200);
                    res.end(html);
                });
                stmt.finalize();
            });
        }
    } else if (pathname === '/create') {
        let navBar = template.navOp();
        let view = require('./view/create');
        let html = view.create(navBar);
        res.writeHead(200);
        res.end(html);
    } else if (pathname === '/create_proc') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            let post = qs.parse(body);
            let title = post.title;
            let writer = post.writer;
            let content = post.content;
            let stmt = db.prepare(insertSql);
            stmt.run(title, writer, content);
            stmt.finalize();

            res.writeHead(302, {Location: `/`});
            res.end();
        });
    } else if (pathname === '/update') {
        let title = queryData.title;
        fs.readdir('./data', function(err, files) {
            let list = template.List(files);
            let navBar = template.navOp();
            fs.readFile(`./data/${title}.txt`, 'utf8', function(err, desc) {
                let view = require('./view/update');
                let html = view.update(list, navBar, title, desc);
                res.writeHead(200);
                res.end(html);
            });
        });
    } else if (pathname === '/update_proc') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            let post = qs.parse(body);
            let oldTitle = post.oldTitle;
            let title = post.title;
            let desc = post.desc;
            fs.rename(`./data/${oldTitle}.txt`, `./data/${title}.txt`, function() {
                fs.writeFile(`./data/${title}.txt`, desc, 'utf8', function(err) {
                    res.writeHead(302, {Location: `/?title=${title}`});
                    res.end();
                });
            });
        });
    } else if (pathname === '/delete') {
        let title = queryData.title;
        fs.readdir('./data', function(err, files) {
            let list = template.List(files);
            let navBar = template.navOp();
            let view = require('./view/delete');
            let html = view.delete(list, navBar, title);
            res.writeHead(200);
            res.end(html);
        });
    } else if (pathname === '/delete_proc') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            let post = qs.parse(body);
            let title = post.title;
            fs.unlink(`./data/${title}.txt`, function(err) {
                res.writeHead(302, {Location: '/'});
                res.end();
            });
        });
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