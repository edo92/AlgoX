const cheerio = require('cheerio');
const axios = require('axios');

class CollectUpcomingEvent {
    constructor() {
        this.collected = [];
    }

    collectEvents = async () => {
        let url = 'http://www.ufcstats.com/statistics/events/upcoming';

        // Collection event
        await axios.get(url).then(resp => {
            let $ = cheerio.load(resp.data);

            $('table.b-statistics__table-events').find('tr').each((i, elem) => {
                let event = $(elem).children();

                // get 4 events total
                if (i >= 2 && i <= 4) {
                    this.collected.push({
                        url: event.find('a').attr('href'),
                        name: parse(event.find('a')),
                        date: parse(event.find('span')),
                        location: parse(event.last())
                    })
                }
            })
        })

        // Collect each fighter
        for (let i in this.collected) {
            let event = this.collected[i];

            let resp = await axios.get(event.url);
            let $ = cheerio.load(resp.data);

            $('.b-fight-details__table-body').find('tr').each((i, elem) => {
                const getDataPoint = (eq) => {
                    return $(elem).find('td').eq(eq).children();
                }

                event.fights = (event.fights || [])
                event.fights.push({
                    weightClass: parse(getDataPoint(6).children()),
                    fighter1: {
                        name: parse(getDataPoint(1).first()),
                        fighterUrl: getDataPoint(1).first().children().attr('href'),
                        fighterId: getDataPoint(1).first().children().attr('href').split('/')[4],
                    },
                    fighter2: {
                        name: parse(getDataPoint(1).last()),
                        fighterUrl: getDataPoint(1).last().children().attr('href'),
                        fighterId: getDataPoint(1).last().children().attr('href').split('/')[4]
                    }
                })
            })
        }

        return this.collected;

        // console.log(' this.collected', await this.collected)
        function parse(unparsed) {
            return unparsed.text().replace(/\s\s+/g, ' ').trim();
        }
    }
}

module.exports = CollectUpcomingEvent;