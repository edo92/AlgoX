class Constract {
    typeA = (descript, positions, state) => {
        let { minX, maxX, minY, maxY } = positions;

        // First Name
        if ((minX > 950 && minX < 1275) && (maxX > 1170 && maxX < 1306) &&
            (minY > 1244 && minY < 1310) && (maxY > 1245 && maxY < 1811)
        ) {
            state.fighter1.name = state.fighter1.name + `${state.fighter1.name ? ' ' : ''}` + this.constractName(descript);
        }
        if ((minX > 1510 && minX < 1670) && (maxX > 1700 && maxX < 1910) &&
            (minY > 1200 && minY < 1360) && (maxY > 1230 && maxY < 1345)
        ) {
            state.fighter2.name = state.fighter2.name + `${state.fighter2.name ? ' ' : ''}` + this.constractName(descript);
        };

        // Price
        if ((minX > 470 && maxX < 700) && (minY > 590 && maxY < 615)
        ) {
            state.fighter1.price = state.fighter1.price = descript.split('$')[1];
        };
        if ((minX > 2115 && maxX < 2350) && (minY > 585 && maxY < 615)
        ) {
            state.fighter2.price = state.fighter2.price = descript.split('$')[1];
        };

        // Odds
        if ((minX > 540 && maxX < 695) && (minY > 805 && maxY < 825)
        ) {
            state.fighter1.odds = state.fighter1.odds = descript;
        };
        if ((minX > 2120 && maxX < 2285) && (minY > 805 && maxY < 825)
        ) {
            state.fighter2.odds = state.fighter2.odds = descript;
        };

        // FPPF
        if ((minX > 510 && maxX < 710) && (minY > 1245 && maxY < 1275)
        ) {
            state.fighter1.fppf = state.fighter1.fppf = descript;
        };
        if ((minX > 2115 && maxX < 2320) && (minY > 1245 && maxY < 1270)
        ) {
            state.fighter2.fppf = state.fighter2.fppf = descript;
        };

        // Record
        if ((minX > 480 && maxX < 695) && (minY > 1015 && maxY < 1030)
        ) {
            state.fighter1.record = state.fighter1.record = descript;
        }
        if ((minX > 2115 && maxX < 2380) && (minY > 1025 && maxY < 1050)
        ) {
            state.fighter2.record = state.fighter2.record = descript;
        }
    }

    typeB = (descript, positions, state) => {
        let { minX, maxX, minY, maxY } = positions;

        if ((minX > 250 && minX < 920) && (maxX > 410 && maxX < 1100) &&
            (minY > 550 && minY < 650) && (maxY > 550 && maxY < 650)
        ) {
            console.log('test', descript)
        };
    }

    constractName = (nameData) => {
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
}

module.exports = new Constract;