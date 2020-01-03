var http = require('http');




function navMsg() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Navigator 판별</title>
            <meta charset="utf-8">
            <script>
            if (navigator.userAgent.toLowerCase().indexOf('iphone') >= 0
                || navigator.userAgent.toLowerCase().indexOf('ipad') >= 0
                || navigator.userAgent.toLowerCase().indexOf('ipod') >= 0
                || navigator.userAgent.toLowerCase().indexOf('android') >= 0) {
                alert('모바일 웹 브라우저입니다.');
            } else {
                alert('데스크톱 웹 브라우저입니다.');
            }
            </script>
        </head>
        <body>
            <h3>Navigator 판별</h3>
            <hr>
        </body>
        </html>
    `;
} 
var app = http.createServer(function(request, response) {
    //console.log(request.url);
    response.writeHead(200);
    let msg = navMsg();
    response.end(msg);
});
app.listen(3000);