var fs = require('fs'),
    request = require('request'),
    mongoose = require('mongoose');
var Item = mongoose.model('ItemModel');

var download = function (uri, dir, filename, callback) {
    request.head(uri, function (err, res, body) {
        //console.log('content-type:', res.headers['content-type']);
        //console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream('./uploaded/items/' + dir + '/' + filename)).on('close', callback);
    });
};

function copy() {
    
    var obj;
    fs.readFile('data.json', 'utf8', function (err, data) {
        if (err) 
            throw err;
        obj = JSON.parse(data);

        var tasks = [];
        for (var index in obj) {
            let nItem = obj[index];
            //console.log(!nItem.details[0].url);
            //console.log(nItem);
            let item = new Item({
                code: nItem.id,
                name: nItem.name,
                location: {
                    main: nItem.location,
                    sub: nItem.sub_location
                },
                goodState: nItem.state === "0" || nItem.state === "2",
                consumable: nItem.state === "2",
                buyPrice: nItem.bought_price,
                sellPrice: nItem.sell_price,
                quantity: nItem.quantity,
                icon: nItem.icon[0].id === "169"
                    ? ""
                    : nItem.icon[0].url.replace(/.*\//, ""),
                files: !nItem.details[0].url
                    ? []
                    : [
                        {
                            name: nItem.details[0].url.replace(/.*\//, ""),
                            url: nItem.details[0].url.replace(/.*\//, "")
                        }
                    ]
            });

            if (nItem.icon[0].id !== "169") {
                let url = nItem.icon[0].url;
                let func = function () {
                    console.log("Icon: " + url);
                };
                download(url, "icons", nItem.icon[0].url.replace(/.*\//, ""), func);
            }

            if (nItem.details[0].url) {
                let url = nItem.details[0].url;
                let func = function () {
                    console.log("Icon: " + url);
                };
                download(url, "details", nItem.details[0].url.replace(/.*\//, ""), func);
            }

            tasks.push(item.save());

        }
        Promise.all(tasks).then(values => {
            console.log(values); // [3, 1337, "foo"]
        });
    });
}