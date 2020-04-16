class ML {
    ml = (data, callback) => {
        if (data.int) {
            callback()
        }
        else if (data.train) {
            console.log('data',data)
        }
    }
}

module.exports = new ML;    