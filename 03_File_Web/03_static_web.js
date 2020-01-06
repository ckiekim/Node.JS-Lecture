var http = require('http');
var url = require('url');

function templateHtml(title, desc) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Static Web3</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB 프로그래밍 기술</a></h1>
            <h3><ul>
                <li><a href="/?title=HTML5">HTML5</a></li>
                <li><a href="/?title=CSS3">CSS3</a></li>
                <li><a href="/?title=Javascript">Javascript</a></li>
            </ul></h3>
            <hr>
            <h2>${title}</h2>
            <p>${desc}</p>
        </body>
        </html>
    `;
} 
var contents = [
    {title:"HTML5", desc:"HTML5 is ...."},
    {title:"CSS3", desc:"CSS3 is ...."},
    {title:"Javascript", desc:"Javascript is ...."}
];
 
var app = http.createServer(function(req, res) {
    //console.log(req.url);
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    //console.log(pathname);
    //console.log(queryData);

    if (pathname === '/') {
        if (queryData.title === undefined) {  // localhost:3000
            let title = "Welcome to WEB World";
            let desc = `웹 기술은 1990년대 초반에 Tim-Berners Lee에 의해 개발되어 빠르게 
                        전 세계로 확산되면서 인터넷 세상으로 모든 것을 바꾸어 놓았다.`;
            let html = templateHtml(title, desc);
            res.writeHead(200);
            res.end(html);
        } else {        // localhost:3000/?title=xxx
            let title = queryData.title;
            let desc;
            for(let content of contents) {
                if (content.title === title) {
                    desc = content.desc;
                }
            }
            let html = templateHtml(title, desc);
            res.writeHead(200);
            res.end(html);
        }
    } else if (pathname === '/favicon.ico') {

    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});
app.listen(3000);