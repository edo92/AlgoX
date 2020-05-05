const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../../../db');

class CreateDraft {
    constructor() {
        this.url = process.env.SOURCE_UPCOME_URL;
    }

    upcomingEvent = callback => {
        this.getUpcomingEvent(event => {
            this.eventFights(event.link, fights => {
                event.fights = fights;
                callback(event);
            })
        })
    }


    getUpcomingEvent = async callback => {
        return await axios.get(this.url).then(async resp => {
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
            })

            // Filter junk data
            let filtered = dataset.filter(dt => {
                if (dt.name && dt.date) {
                    return dt;
                }
            })
            callback(filtered[0]);
        })
    }

    eventFights = (url, callback) => {
        const parse = (unparsed) => {
            return unparsed.text().replace(/\s\s+/g, ' ').trim();
        };

        axios.get(url).then(async resp => {
            let $ = cheerio.load(resp.data);
            let dataset = [];

            await $('.b-fight-details__table-body').find('tr').each((i, elem) => {
                let weightClass = $(elem).find('td:nth-child(7)');

                let fighter2 = $(elem).find('td:nth-child(2)').find('p:nth-child(2)');
                let fighter1 = $(elem).find('td:nth-child(2)').find('p:nth-child(1)')

                let f1Url = fighter1.children().attr('href');
                let f2Url = fighter2.children().attr('href');

                dataset.push({
                    weightClass: parse(weightClass),
                    fighter1: {
                        name: parse(fighter1),
                        fighterUrl: f1Url
                    },
                    fighter2: {
                        name: parse(fighter2),
                        fighterUrl: f2Url,
                    }
                });
            });

            if (callback) callback(await dataset);
        })
            .catch(error => {
                callback({ error });
            });
    }
}

module.exports = new CreateDraft;

