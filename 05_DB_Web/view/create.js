module.exports.create = function(list, navBar) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>File Web-CR</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB 프로그래밍 기술</a></h1>
            <h3>${list}</h3>
            <hr>
            <h4>${navBar}</h4>
            <hr>
            <h2>글 작성하기</h2>
            <form action="/create_proc" method="post">
                <p><input type="text" size="40" name="title" placeholder="제목"></p>
                <p><textarea name="desc" rows="5" cols="60" placeholder="설명"></textarea></p>
                <p><input type="submit" value="작성"></p>
            </form>
        </body>
        </html>
    `;
}
