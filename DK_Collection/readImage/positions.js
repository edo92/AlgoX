module.exports = async (data) => {
    let imgData = filterData(await data);

    let info = {
        fighter1: {
            name: ''
        },
        fighter2: {
            name: ''
        }
    }

    await imgData.map(item => {
        let position = item.boundingPoly.vertices;
        let descript = item.description;
        let { minX, maxX, minY, maxY } = getPosition(position);

        // First Name
        if ((minX > 950 && minX < 1275) && (maxX > 1170 && maxX < 1306) && (minY > 1244 && minY < 1310) && (maxY > 1245 && maxY < 1811)
        ) {
            let name = descript.toLowerCase();
            info.fighter1.name = info.fighter1.name + `${info.fighter1.name ? ' ' : ''}` + name.charAt(0).toUpperCase() + name.slice(1);
        }
        if ((minX > 1520 && minX < 1655) && (maxX > 1700 && maxX < 1885) && (minY > 1244 && minY < 1350) && (maxY > 1240 && maxY < 1345)
        ) {
            let name = descript.toLowerCase();
            info.fighter2.name = info.fighter2.name + `${info.fighter2.name ? ' ' : ''}` + name.charAt(0).toUpperCase() + name.slice(1);
        };

        // Price
        if ((minX > 470 && maxX < 700) && (minY > 590 && maxY < 615)
        ) {
            info.fighter1.price = info.fighter1.price = descript.split('$')[1];
        };
        if ((minX > 2120 && maxX < 2340) && (minY > 590 && maxY < 615)
        ) {
            info.fighter2.price = info.fighter2.price = descript.split('$')[1];
        };

        // Odds
        if ((minX > 550 && maxX < 690) && (minY > 805 && maxY < 825)
        ) {
            info.fighter1.odds = info.fighter1.odds = descript;
        };
        if ((minX > 2120 && maxX < 2285) && (minY > 805 && maxY < 825)
        ) {
            info.fighter2.odds = info.fighter2.odds = descript;
        };

        // FPPF
        if ((minX > 510 && maxX < 710) && (minY > 1245 && maxY < 1275)
        ) {
            info.fighter1.fppf = info.fighter1.fppf = descript;
        };
        if ((minX > 2120 && maxX < 2310) && (minY > 1245 && maxY < 1275)
        ) {
            info.fighter2.fppf = info.fighter2.fppf = descript;
        };
    });

    return info;
}

function getPosition(position) {
    let x = position.map(posX => { return posX.x });
    let y = position.map(posY => { return posY.y });
    return {
        minX: Math.min(...x),
        maxX: Math.max(...x),
        minY: Math.min(...y),
        maxY: Math.min(...y),
    }
}

function filterData(data) {
    let cleared = data.filter((item, i) => {
        if (item.description !== 'UFC' && item.description !== 'FIGHT' &&
            item.description !== 'DK' && item.description !== 'PRICE' &&
            item.description !== 'ODDS' && item.description !== 'VS' &&
            item.description !== 'RECORD' && item.description !== 'FPPF' &&
            item.description !== 'CC' && (i > 0)) {
            return item.description;
        }
    })
    return cleared;
}