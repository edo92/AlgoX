const mine = require('../mine');
const db = require('../../DB');

class StageOne {
    constructor() {
        this.stageOne = () => {
            const baseUrl = 'http://www.ufcstats.com/statistics/events/completed?page=';

            for (let i = 1; i < 2; i++) {
                let url = baseUrl + i;
                mine.mineEvents(url, events => {
                    this.filter(events, (err, list) => {
                        db.actions.saveEvents(list);
                    });
                })
            }
        }
    }

    filter(events, callback) {
        let success = [], error = [];
        let eventsData = events.success;

        if (eventsData) {
            eventsData.map(item => {
                if (item.link && item.location.length > 5) {
                    success.push(item);
                }
                else {
                    error.push(item);
                }
            });
        } else {
            error.push(events.error);
        }
        callback(error, success);
    };
}

module.exports = new StageOne;