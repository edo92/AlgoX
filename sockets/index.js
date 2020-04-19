const { GET_EVENT_LIST, DRAFT_EVENT, SAVE_EVENT, GET_DRAFT } = require('./routes/routeTypes');
const routes = require('./routes');
const db = require('../db').models;

module.exports = io => {
    io.sockets.on('connection', socket => {
        socket.on('draft', data => {
            routes.draft[data.action](data, db, list => {
                socket.emit('draft', list);
            })
        })

        socket.on('ml', data => {
            routes.ml[data.action](data, list => {
                socket.emit('ml', list);
            })
        })

        socket.on('generate', data => {
            routes.generate[data.action](data, list => {
                socket.emit('generate', list);
            })
        })


        
        // Get upcoming events
        socket.on(GET_EVENT_LIST, data => {
            routes.getUpcomingEvents(data, db, list => {
                socket.emit(GET_EVENT_LIST, list);
            })
        });

        // Draft Event /scrap
        socket.on(DRAFT_EVENT, data => {
            routes.draftEvent(data, db, list => {
                socket.emit(DRAFT_EVENT, list);
            })
        });

        //  Save Event
        socket.on(SAVE_EVENT, data => {
            routes.saveEvent(data, list => {
                socket.emit(SAVE_EVENT, list);
            })
        });



        socket.on('disconnect', () => {
            socket.disconnect();
        });
    });
};