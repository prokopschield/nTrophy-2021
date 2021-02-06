var listen = require('nodesite.eu').NodeSiteClient;
var readdirSync = require('fs').readdirSync;
function map(path, file, fn) {
    if (fn === void 0) { fn = null; }
    listen('nTrophy', path, fn, file);
    return { map: map };
}
map('/', '.', function () { return ({
    head: {
        'Content-Type': 'text/html'
    },
    body: readdirSync('.').map(function (fn) { return "<a href=\"" + fn + "\">" + fn + "</a>"; }).join('<br>')
}); });
['1data', '2data'].forEach(function (dir) {
    map("/" + dir, dir, function () { return ({
        head: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(readdirSync(dir))
    }); });
});
