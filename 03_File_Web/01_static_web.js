var http = require('http');
var url = require('url');
var html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Static Web</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>WEB 프로그래밍 기술</h1>
        <h3><ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>Javascript</li>
        </ul></h3>
        <hr>
        <p>웹 기술은 1990년대 초반에 Tim-Berners Lee에 의해 개발되어 빠르게 
        전 세계로 확산되면서 인터넷 세상으로 모든 것을 바꾸어 놓았다.</p>
    </body>
    </html>`;
 
var app = http.createServer(function(req, res) {
    //console.log(req.url);
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    console.log(pathname);
    console.log(queryData);

    if (pathname === '/') {
        res.writeHead(200);
        res.end(html);
    } else if (pathname === '/favicon.ico') {

    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});
app.listen(3000);