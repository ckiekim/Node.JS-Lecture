var http = require('http');
var url = require('url');

function alertMsg(msg, url) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Alert Message</title>
            <meta charset="utf-8">
            <script>
                alert("${msg}");
                //location.href = "${url}";
            </script>
        </head>
        <body>
            <h3>경고메세지를 띄워줌</h3>
        </body>
        </html>
    `;
} 
var app = http.createServer(function(request, response) {
    console.log(request.url);
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(queryData, pathname);
    response.writeHead(200);
    let alert = alertMsg("경고창에 뜨는 메시지", "https://www.naver.com");
    response.end(alert);
});
app.listen(3000);