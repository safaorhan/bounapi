cancelUnless(parts.length == 1, "Bad request", 400);

var _term = decodeURIComponent(parts[0]);

var requestify = require('requestify');


requestify.post("http://registration.boun.edu.tr/scripts/schdepsel.asp", {
    semester: _term
}, {
    dataType: "form-url-encoded"
}).then(function(response) {
    parseHtml(response.body);
});

console.log("Hey");

function parseHtml(body) {
    var matches;
    var regex = /href=\"(\/[\s\S]*?kisaadi=([\s\S]*?)&[\s\S]*?)\">[\s\S]*?<font.*?>([\s\S]*?)<\/font>/g;
    while(matches = regex.exec(body)) {
        var link = matches[1];
        var code = matches[2];
        var name = matches[3];
        
        var department = {code: code, name: name};
        
        console.log(encodeURIComponent(_term) + "/" + code + "/" + encodeURIComponent(link));
        
        dpd.fetch.get(encodeURIComponent(_term) + "/" + code + "/" + encodeURIComponent(link), function(result, error){
            if(error) {
                cancel(error, 576);
            }
        });
        
        dpd.departments.post(department, function(result, error){
            if(error) {
                cancel(error, 577);
            }
        });
    }
}