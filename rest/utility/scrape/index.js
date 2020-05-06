const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../../../db');

class CreateDraft {
    constructor() {
        this.url = process.env.SOURCE_UPCOME_URL;
    }

    upcomingEvent = callback => {
        this.getUpcomingEvent(event => {
            this.eventFights(event.link, async fights => {
                event.fights = fights;
                callback(event);
            })
        })
    }

    fighterStats = async (list, callback) => {
        await list.map(fight => {
            ['fighter1', 'fighter2'].map(each => {
                let fighter = fight[each];

                handleStatsScrape(fighter, data => {
                    data.fighterId = fighter.fighterId;
                    data.name = fighter.name;
                    callback(data);
                })
            })
        })

        function handleStatsScrape(fighter, cb) {
            scrapeStats(fighter.fighterUrl, data => {
                if (data.success) {
                    cb(data.success);
                }
                else {
                    handleStatsScrape(fighter, cb);
                }
            })
        }

        function scrapeStats(url, cb) {
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
                            outcome: pastSelect(1).children().first().text(),
                            name: parse(pastSelect(2).children().first()),
                            opponent: parse(pastSelect(2).children().last()),
                            method: parse(pastSelect(8).first()),
                            finish: parse(pastSelect(8).last()).length || 'DEC',
                            round: parse(pastSelect(9).last()),
                            time: parse(pastSelect(10).last()),
                            date: parse(pastSelect(7).last())
                        }

                        if (pastList.opponent && pastList.finish) {
                            pastFights.push(pastList);
                        }

                        function pastSelect(i) {
                            return $(el).find(`td:nth-child(${i})`).children();
                        }
                    });

                    stats.pastFights = pastFights;
                    cb({ success: stats });
                });
            })
                .catch(error => { cb({ error }) });

            function parse(unparsed) {
                return unparsed.text().replace(/\s\s+/g, ' ').trim();
            };
        }
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
                        fighterUrl: f1Url,
                        fighterId: f1Url.split('/')[4]
                    },
                    fighter2: {
                        name: parse(fighter2),
                        fighterUrl: f2Url,
                        fighterId: f2Url.split('/')[4]
                    }
                })
            })

            if (callback) callback(await dataset);
        })
            .catch(error => {
                callback({ error });
            });
    }
}

module.exports = new CreateDraft;

