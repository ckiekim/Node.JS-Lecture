module.exports = {
    Html: function(navBar, trs) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>DB Web</title>
                <meta charset="utf-8">
                <style>
                    table {
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h1>SQLite3로 만든 게시판</h1>
                <hr>
                <h4>${navBar}</h4>
                <hr>
                <table>
                    <thead>
                        <tr>
                            <th width="50">ID</th>
                            <th width="300">제목</th>
                            <th width="80">글쓴이</th>
                            <th width="200">최종수정시간</th>
                            <th width="80">조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${trs}
                    </tbody>
                </table>
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
    navList: function(id) {
        return `<a href="/">홈으로</a>&nbsp;&nbsp;
                <a href="/update?id=${id}">수정하기</a>&nbsp;&nbsp;
                <a href="/delete?id=${id}">삭제하기</a>`;
    },
    navOp: function() {
        return `<a href="/">홈으로</a>`;
    }
}