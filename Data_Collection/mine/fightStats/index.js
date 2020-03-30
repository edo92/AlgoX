const axios = require('axios');
const cheerio = require('cheerio');

module.exports.fightStats = (url, callback) => {
    axios.get(url).then(resp => {
        let $ = cheerio.load(resp.data);
        let soruce = $('.b-fight-details').children().find('td');

        function collectData(which) {
            let stat = {}, arr = ['name:0', 'kd: 1', 'strSig: 2',
                'strSigPers: 3', 'strTotal: 4', 'takeDown: 5',
                'takeDownPers: 6', 'subAtt: 7', 'pass: 8', 'rev: 9',
                'strHead:43', 'strBody:44', 'strLeg:45', 'distance:46',
                'clinch:47', 'ground:48', 'strRound_1:13', 'strRound_2:23',
                'strRound_3:33',
            ];

            arr.map(item => {
                let data = item.split(':');
                let key = data[0], value = Number(data[1]);
                stat[key] = parse(soruce.eq(value).children()[which]());
            });
            function parse(unparsed) {
                return unparsed.text().replace(/\s\s+/g, ' ').trim();
            }
            return stat;
        };

        let dataset = {
            fighter_1: collectData('last'),
            fighter_2: collectData('first'),
        };

        if (callback) callback({ success: dataset });
    })
        .catch(error => {
            callback({ error });
        });
}