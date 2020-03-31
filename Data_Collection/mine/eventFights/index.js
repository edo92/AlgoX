const axios = require('axios');
const cheerio = require('cheerio');

module.exports.mineEventFights = (url, callback) => {
    const parse = (unparsed) => {
        return unparsed.text().replace(/\s\s+/g, ' ').trim();
    };

    axios.get(url).then(async resp => {
        let $ = cheerio.load(resp.data);
        let dataset = [];

        await $('.b-fight-details__table-body').find('tr').each((i, elem) => {
            let method = $(elem).find('td:nth-child(8)');
            let round = $(elem).find('td:nth-child(9)');
            let time = $(elem).find('td:nth-child(10)')
            let weightClass = $(elem).find('td:nth-child(7)');

            let fighter2 = $(elem).find('td:nth-child(2)').find('p:nth-child(2)');
            let fighter1 = $(elem).find('td:nth-child(2)').find('p:nth-child(1)')

            let statUrl = $(elem).find('td:nth-child(1)').find('a').attr('href');

            let f1Url = fighter1.children().attr('href');
            let f2Url = fighter2.children().attr('href');

            dataset.push({
                method: parse(method),
                round: parse(round),
                time: parse(time),
                weightClass: parse(weightClass),
                statUrl,
                fighter1: {
                    name: parse(fighter1),
                    outcome: 'Win',
                    fighterUrl: f1Url
                },
                fighter2: {
                    name: parse(fighter2),
                    outcome: 'Loss',
                    fighterUrl: f2Url,
                }
            });
        });

        if (callback) callback({ success: await dataset });
    })
        .catch(error => {
            callback({ error });
        });
}