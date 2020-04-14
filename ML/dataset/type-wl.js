class WL {
    create = (trainData, callback) => {
        // outcome 
        let outcome = trainData.map(each => {
            return each.map(point => {
                point.shift(); // remove name
                return [point.shift() === 'Loss' ? 0 : 1]; // return/remove outcome 
            })
        })

        const result = { trainData, outcome };

        if (!callback)
            return result;

        callback(result);
    }
};

module.exports = new WL;