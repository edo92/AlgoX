import io from 'socket.io-client';
let socketio = io.connect('localhost:3001');

class Socket {
    emit = (action, data) => {
        socketio.emit(action, data);
    }

    listen = (to, callback) => {
        socketio.on(to, data => {
            callback(data);
        });
    }
}

export default new Socket;