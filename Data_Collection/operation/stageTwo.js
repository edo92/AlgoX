const mine = require('../mine');
const db = require('../../DB');

class StageTwo {
    constructor() {
        this.state = {};
    }

    start = async () => {
        let eventList = await db.actions.getEvents();

        this.state.total = eventList.length;

        eventList.map(event => {
            if (!event.fights.length)
                this.mineEventFights(event.link, event._id);
        })
    }

    monitorState = () => {
        console.log('-------------- Stage Two --------------');
        console.log(this.state);
        console.log('---------------------------------------');
    }

    mineEventFights = async (url, id) => {
        await mine.mineEventFights(url, data => {
            // Filter index data
            this.filter(data, url, id, res => {
                // Save event fights in db
                db.actions.saveEventFights(id, res);

                // Increment collected
                this.state.collected = (this.state.collected || 0) + 1;

                // Monitor State (collection loop)
                this.monitorState();
            })
        })
    }

    filter = (data, url, id, cb) => {
        // If mined data is successful callback
        if (data.success) cb(data.success);
        // If mined data is unsuccessful reRequest
        else this.mineEventFights(url, id);
    }
}

module.exports = StageTwo;