module.exports = async (imgData) => {

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

        console.log('position', minX, maxX, minY, maxY);
        console.log('descirption', descript);

        // First Name
        if ((minX > 950 && minX < 1275) && (maxX > 1170 && maxX < 1306) && 
            (minY > 1244 && minY < 1310) && (maxY > 1245 && maxY < 1811)
        ) {
            info.fighter1.name = info.fighter1.name + `${info.fighter1.name ? ' ' : ''}` + constractName(descript);
        }
        if ((minX > 1510 && minX < 1670) && (maxX > 1700 && maxX < 1910) && 
            (minY > 1200 && minY < 1360) && (maxY > 1230 && maxY < 1345)
        ) {
            info.fighter2.name = info.fighter2.name + `${info.fighter2.name ? ' ' : ''}` + constractName(descript);
        };

        // Price
        if ((minX > 470 && maxX < 700) && (minY > 590 && maxY < 615)
        ) {
            info.fighter1.price = info.fighter1.price = descript.split('$')[1];
        };
        if ((minX > 2115 && maxX < 2350) && (minY > 585 && maxY < 615)
        ) {
            info.fighter2.price = info.fighter2.price = descript.split('$')[1];
        };

        // Odds
        if ((minX > 540 && maxX < 695) && (minY > 805 && maxY < 825)
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
        if ((minX > 2115 && maxX < 2320) && (minY > 1245 && maxY < 1270)
        ) {
            info.fighter2.fppf = info.fighter2.fppf = descript;
        };

        // Record
        if ((minX > 480 && maxX < 695) && (minY > 1015 && maxY < 1030)
        ) {
            info.fighter1.record = info.fighter1.record = descript;
        }
        if ((minX > 2115 && maxX < 2380) && (minY > 1025 && maxY < 1050)
        ) {
            info.fighter2.record = info.fighter2.record = descript;
        }
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

function constractName(nameData) {
    let char = '', translate = {
        "ä": "a", "á": "a", "ò": "o", "ö": "o", "ü": "u", "ž": "z", "ć": "c",
        "Ä": "A", "Á": "A", "Ö": "O", "Ü": "U"
    };

    let name = nameData.toLowerCase();
    name = name.charAt(0).toUpperCase() + name.slice(1);

    for (let i in name) {
        let letter = name[i];
        let specChar = translate[letter];
        if (specChar) char += specChar;
        else char += letter;
    }
    return char;
}
