const {send} = require('micro'),
    url = require('url'),
    mongojs = require("mongojs");

function groups(res) {
    let db = mongojs('db/usda', ['foodgroups']),
        results = db.foodgroups.find({}).toArray(function (err, groups) {
            if (err) {
                throw err;
            }
            console.log(`groups: found ${groups.length} groups.`);
            send(res, 200, groups);
        });
};

module.exports = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        let parseUrl = url.parse(req.url);
        console.log(`descriptions: request from ${parseUrl.pathname} with query ${parseUrl.query}`);
        if (parseUrl.pathname === '/groups') {
            return groups(res);
        }
        let find = {},
            db = mongojs('db/usda', ['fooddescriptions']);
        if (parseUrl.query) {
            let queries = parseUrl.query.split('&');
            queries.forEach(query => {
                let queryParts = query.split('=');
                if (queryParts[0] === 'groupId') {
                    find['group-id'] = {
                        $eq: Number(queryParts[1])
                    }
                } else if (queryParts[0] === 'search') {
                    db.fooddescriptions.createIndex( { description: "text" });
                    find['$text'] = {
                        $search: queryParts[1],
                        $caseSensitive: false
                    }
                }
            });
        }
        results = db.fooddescriptions.find(find).toArray(function (err, docs) {
            if (err) {
                throw err;docker
            }
            console.log(`descriptions: ${docs.length} documents found.`);
            send(res, 200, docs);
        });
    }
    catch(e) {
        console.log('descriptions error:', e);
        send(res, 500, e.message);
    }
};
