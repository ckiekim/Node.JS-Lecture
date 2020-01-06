var fs = require('fs');

fs.readdir('./data', function(err, files) {
    var list = '<ul>\n';
    for (let file of files) {
        //console.log(file);
        let item = file.substring(0, file.length-4);
        list += `<li><a href="/?title=${item}">${item}</a></li>\n`;
    }
    list += '</ul>';
    console.log(list);
});