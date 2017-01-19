const {send} = require('micro'),
    mongojs = require("mongojs");

module.exports = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        let db = mongojs('db/usda', ['fooddescriptions']),
        results = db.fooddescriptions.find({}).toArray(function (err, docs) {
            if (err) {
                throw err;
            }
            send(res, 200, docs);
        });
    }
    catch(e) {
        send(res, 500, e.message);
    }
};
