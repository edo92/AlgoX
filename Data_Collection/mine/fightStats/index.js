const axios = require('axios');
const cheerio = require('cheerio');

module.exports.fightStats = (url, callback) => {
    axios.get(url).then(resp => {
        let $ = cheerio.load(resp.data);
        let source = $('tbody.b-fight-details__table-body').children().children();
        let charts = $('.b-fight-details__bar-charts-inner');

        function collectData(which) {
            let stat = {};
            let statsData = ['name:0', 'kd: 1', 'strSig: 2',
                'strSigPers: 3', 'strTotal: 4', 'takeDown: 5',
                'takeDownPers: 6', 'subAtt: 7', 'pass: 8', 'rev: 9',
                'strHead:13', 'strBody:14', 'strLeg:15', 'distance:16',
                'clinch:17', 'ground:18'
            ];

            let chartData = ['round_1:0', 'round_2:1',
                'round_3:2', 'round_4:3', 'round_5:4'
            ];

            chartData.map(item => {
                let data = item.split(':');
                let key = data[0], value = Number(data[1]);
                let rData = parse(charts.children().eq(value)[which]());
                if (rData !== 'Landed Attempted' && rData.length !== 0) {
                    stat[key] = rData;
                }
            });

            statsData.map(item => {
                let data = item.split(':');
                let key = data[0], value = Number(data[1]);
                stat[key] = parse(source.eq(value).children()[which]());
            });

            function parse(unparsed) {
                return unparsed.text().replace(/\s\s+/g, ' ').trim();
            }
            return stat;
        };

        let dataset = {
            fighter1: collectData('first'),
            fighter2: collectData('last'),
        };

        if (callback) callback({ success: dataset });
    })
        .catch(error => {
            callback({ error });
        });
}