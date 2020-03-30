const mine = require('../mine');
const db = require('../../DB');

class StageTwo {
    constructor() {
        this.stageTwo = async () => {
            let eventList = await db.actions.getEvents();

            eventList.map(event => {
                let id = event._id;
                let url = event.event.link;
                this.mineEventFights(url, id);
            })
        }
    }

    mineEventFights(url, id) {
        mine.mineEventFights(url, (data) => {
            this.filter(data, url, id, res => {
                db.actions.saveEventFights(id, res);
            })
        })
    }

    filter(data, url, id, cb) {
        let response = data.success;
        if (response) {
            cb(response);
        } else {
            this.mineEventFights(url, id);
        }
    }
}

module.exports = new StageTwo;