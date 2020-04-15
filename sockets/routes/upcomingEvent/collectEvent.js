const cheerio = require('cheerio');
const axios = require('axios');

class Collection {
    constructor() {
        this.collected = [];
        this.state = {}
    }

    collectEvents = async (db) => {
        let upcomeEvents = await this.collectUpcomeEvents();

        upcomeEvents.fights.map(fight => {
            ['fighter1', 'fighter2'].map(async each => {
                let fighter = fight[each];
                let fighterId = fighter.fighterId;

                let isExists = await db.Fighter.exists({ fighterId });

                if (!isExists) {
                    this.collectFighterStats(fighter.fighterUrl, async data => {
                        if (data.success) {
                            let fighterData = {
                                fighterId: fighterId,
                                name: fighter.name,
                                stats: data.success
                            };
                            await db.Fighter.create(fighterData);
                        }
                    })
                }
            })
        })
    }

    collectFighterStats = (url, callback) => {
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
                callback({ success: stats });
            });
            function parse(unparsed) {
                return unparsed.text().replace(/\s\s+/g, ' ').trim();
            }
        })
            .catch(error => {
                this.collectFighterStats(url, callback);
            });

    }

    collectUpcomeEvents = async () => {
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

                event.fights = (event.fights || []);
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

        return this.collected[0];

        // console.log(' this.collected', await this.collected)
        function parse(unparsed) {
            return unparsed.text().replace(/\s\s+/g, ' ').trim();
        }
    }
}

module.exports = Collection;