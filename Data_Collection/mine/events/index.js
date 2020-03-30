const axios = require('axios');
const cheerio = require('cheerio');

module.exports.mineEvents = (url, callback) => {
    axios.get(url).then(async resp => {
        let $ = cheerio.load(resp.data);
        let dataset = [];
        await $('.b-statistics__table-events').find('tr').each((i, elem) => {
            dataset.push({
                name: parse($(elem).find('a').text()),
                date: parse($(elem).find('span').text()),
                location: parse($(elem).find('td:nth-child(2)').text()),
                link: $(elem).find('a').attr('href')
            });

            function parse(unparsed) {
                return unparsed.replace(/\s\s+/g, ' ').trim();
            };
        });

        if (callback) callback({ success: dataset });

    }).catch(error => { callback({ error }) });
}