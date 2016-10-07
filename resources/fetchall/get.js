cancelUnless(parts.length == 1, "Bad request", 400);

var _term = decodeURIComponent(parts[0]);

var requestify = require('requestify');
var iconv = require('iconv-lite');

requestify.responseEncoding('binary').post("http://registration.boun.edu.tr/scripts/schdepsel.asp", {
    semester: _term
}, {
    dataType: "form-url-encoded"
}).then(function(response) {
    var body = iconv.decode(response.body, 'ISO-8859-9');
    parseHtml(body);
});

function parseHtml(body) {
    var matches;
    var regex = /href=\"(\/[\s\S]*?kisaadi=([\s\S]*?)&[\s\S]*?)\">[\s\S]*?<font.*?>([\s\S]*?)<\/font>/g;
    while(matches = regex.exec(body)) {
        var link = matches[1];
        var code = matches[2];
        var name = matches[3];
        
        var department = {code: code, name: name};
        
        dpd.fetch.get(encodeURIComponent(_term) + "/" + code + "/" + encodeURIComponent(link), {$limitRecursion: 10000}, function(result, error){
            if(error) {
                console.log(error);
                cancel(error, 576);
            } else {
                
            }
        });
        
        dpd.departments.post(department, function(result, error){
            if(error) {
                console.log(error);
                cancel(error, 577);
            }
        });
    }
}