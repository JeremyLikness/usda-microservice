const {send} = require('micro'),
    url = require('url'),
    mongojs = require("mongojs");

module.exports = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        let parseUrl = url.parse(req.url);
        console.log(`nutrients: request from ${parseUrl.pathname}`);
        let id = Number(parseUrl.pathname.substring(1));
        if (id) {
            let db = mongojs('db/usda', ['fooddescriptions', 'nutrientdata', 'nutrientdefinitions', 'weight']),
                result = {};
            db.fooddescriptions.find({
                id: {
                    $eq: id
                }
            }).toArray(function (err, docs) {
                if (err) {
                    throw err;
                }
                console.log(`nutrients: found food item with id ${id}`);
                result.description = docs.length ? docs[0] : {};
                send(res, 200, result);
            });        
        }
        else {
            send(res, 404);
        }
    }
    catch(e) {
        console.log('descriptions error:', e);
        send(res, 500, e.message);
    }
};
