const axios = require('axios');
const cheerio = require('cheerio');

module.exports.getFighterStats = (url, callback) => {
    // let url = 'http://www.ufcstats.com/fighter-details/07225ba28ae309b6'
    axios.get(url).then(resp => {
        let $ = cheerio.load(resp.data);

        let record = $('.b-content__title-record');

        $('.b-fight-details').each(async (i, elem) => {
            let stats = {}, arr = ['hight: 0', 'weight: 1', 'reach: 2', 'stance: 3',
                'dob: 4', 'SLpM: 5', 'StrAcc: 6', 'SApM: 7', 'StrDef: 8',
                'TDAvg: 10', 'TDAcc: 11', 'TDDef: 12', 'SubAvg: 13',
            ];

            // Record 
            stats.record = parse(record).split('Record:')[1];

            arr.map(item => {
                let data = item.split(':');
                let key = data[0], value = Number(data[1]);
                stats[key] = parse($(elem).find('li').eq(value)).split(':')[1].trim();
            });

            let pastFights = [];

            await $(elem).find('.b-fight-details__table-body').find('tr').each((i, el) => {
                let pastList = {
                    opponent: parse(pastSelect(2).children().last()),
                    method: parse(pastSelect(8).first()),
                    finish: parse(pastSelect(8).last()),
                    round: parse(pastSelect(9).last()),
                    time: parse(pastSelect(10).last()),
                    outcome: pastSelect(1).children().first().text()
                }

                if (pastList.opponent && pastList.finish) {
                    pastFights.push(pastList);
                }

                function pastSelect(i) {
                    return $(el).find(`td:nth-child(${i})`).children();
                }
            });

            stats.pastFights = pastFights;
            callback({ success: stats });


        });
    }).catch(error => { callback({ error }) });

    function parse(unparsed) {
        return unparsed.text().replace(/\s\s+/g, ' ').trim();
    };
}