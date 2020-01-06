var http = require('http');
var url = require('url');
var fs = require('fs');

function templateHtml(list, title, desc) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>File Web</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB 프로그래밍 기술</a></h1>
            <h3>${list}</h3>
            <hr>
            <h2>${title}</h2>
            <p>${desc}</p>
        </body>
        </html>
    `;
} 
 
var app = http.createServer(function(req, res) {
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;

    if (pathname === '/') {
        if (queryData.title === undefined) {  // localhost:3000
            let title = "Welcome to WEB World";
            let desc = `웹 기술은 1990년대 초반에 Tim-Berners Lee에 의해 개발되어 빠르게 
                        전 세계로 확산되면서 인터넷 세상으로 모든 것을 바꾸어 놓았다.`;
            fs.readdir('./data', function(err, files) {
                var list = '<ul>\n';
                for (let file of files) {
                    let item = file.substring(0, file.length-4);
                    list += `<li><a href="/?title=${item}">${item}</a></li>\n`;
                }
                list += '</ul>';
                let html = templateHtml(list, title, desc);
                res.writeHead(200);
                res.end(html);
            });
        } else {        // localhost:3000/?title=xxx
            let title = queryData.title;
            fs.readdir('./data', function(err, files) {
                var list = '<ul>\n';
                for (let file of files) {
                    let item = file.substring(0, file.length-4);
                    list += `<li><a href="/?title=${item}">${item}</a></li>\n`;
                }
                list += '</ul>';
                fs.readFile(`./data/${title}.txt`, 'utf8', function(err, desc) {
                    let html = templateHtml(list, title, desc);
                    res.writeHead(200);
                    res.end(html);
                })
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