const mine = require('../mine');
const db = require('../../DB');

class StageTwo {
    constructor() {
        this.state = {};
    }

    start = async () => {
        let eventList = await db.actions.getEvents();

        eventList.map(event => {
            if (!event.fights.length) {
                this.state.total = (this.state.total || 0) + 1;
                this.mineEventFights(event.link, event._id);
            }
            else {
                this.state.message = 'Already Exists';
                this.monitorState();
            }
        })
    }

    mineEventFights = async (url, id) => {
        await mine.mineEventFights(url, data => {
            // Filter index data
            this.filter(data, url, id, async res => {
                // Save event fights in db
                let saved = await db.actions.saveEventFights(id, res);

                if (saved.success) {
                    // Increment collected
                    this.state.event = saved.success.name
                    this.state.collected = (this.state.collected || 0) + 1;
                }
                else {
                    // Retry saving data
                    db.actions.saveEventFights(id, res);
                }

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

    monitorState = () => {
        console.log('-------------- Stage Two --------------');
        console.log('name:', this.state.event)
        console.log('total:', this.state.total);
        console.log('collected:', this.state.collected);
        console.log('---------------------------------------');
    }
}

module.exports = StageTwo;