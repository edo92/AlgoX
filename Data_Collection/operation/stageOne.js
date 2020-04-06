const mine = require('../mine');
const db = require('../../DB');

class StageOne {
    constructor(gPage) {
        this.url = 'http://www.ufcstats.com/statistics/events/completed?page=' + gPage;
        this.state = {};
    }

    start = () => {
        // Mine Events from first page
        mine.mineEvents(this.url, events => {
            // Filter events list, separate from trash
            this.validateData(events, async list => {
                // Save events list as separate doc
                this.state.message = await db.actions.saveEvents(list);

                this.monitorState();
            })
        })
    }

    validateData(events, callback) {
        // Filer list success and error events
        let success = [];
        let eventsData = events.success;

        // If event data, validate / sparage
        if (eventsData) {
            eventsData.map(item => {
                if (item.link && item.location.length > 5) {
                    success.push(item);
                    this.state.collected = (this.state.collected || 0) + 1;
                }
            });
        } else {
            this.state.error = (this.state.error || 0) + 1;
        }

        // Send back error and success list
        this.state.total = success.length;
        callback(success);
    }

    monitorState() {
        // Log performnse which saved in this.state
        console.log('--------------- Stage One ------------------');
        console.log(this.state);
        console.log('--------------------------------------------');
    }
}

module.exports = StageOne;