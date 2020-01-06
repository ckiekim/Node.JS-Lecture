module.exports = {
    Html: function(list, navBar, title, desc) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>File Web-module</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">WEB 프로그래밍 기술</a></h1>
                <h3>${list}</h3>
                <hr>
                <h4>${navBar}</h4>
                <hr>
                <h2>${title}</h2>
                <p>${desc}</p>
            </body>
            </html>
        `;
    },
    List: function(filelist) {
        var list = '<ul>\n';
        for (let file of filelist) {
            let item = file.substring(0, file.length-4);
            list += `<li><a href="/?title=${item}">${item}</a></li>\n`;
        }
        list += '</ul>';
        return list;
    },
    navMain: function() {
        return `<a href="/">홈으로</a>&nbsp;&nbsp;
                <a href="/create">글쓰기</a>`
    },
    navList: function(title) {
        return `<a href="/">홈으로</a>&nbsp;&nbsp;
                <a href="/update?title=${title}">수정하기</a>&nbsp;&nbsp;
                <a href="/delete?title=${title}">삭제하기</a>`;
    },
    navOp: function() {
        return `<a href="/">홈으로</a>`;
    }
}