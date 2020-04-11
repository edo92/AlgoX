module.exports = list => {
    // First layer suffle
    let shuffledList = shuffle(list);

    // Second layer shuffle
    shuffledList.map(each => {
        shuffle(each);
    })

    function shuffle(arr) {
        let limit = Math.floor(Math.random() * 5) + 1;
        for (let times = 1; times <= limit; times++) {
            for (let i in arr) {
                const j = Math.floor(Math.random() * i)
                const temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
        }
        return arr;
    }
    return list;
}