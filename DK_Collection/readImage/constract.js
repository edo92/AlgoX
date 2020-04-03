class Constract {
    typeA = async imageText => {
        let state = { fighter1: { name: '' }, fighter2: { name: '' } };

        await imageText.map(item => {
            let descript = item.description;
            let { minX, maxX, minY, maxY } = this.getPosition(item.boundingPoly.vertices);

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
        });

        return {
            [state.fighter1.name]: state.fighter1,
            [state.fighter2.name]: state.fighter2,
        }
    }

    typeB = async (imageText) => {
        let state = {
            ft1: { ftr1: '', ftr2: '' },
            ft2: { ftr1: '', ftr2: '' },
            ft3: { ftr1: '', ftr2: '' },
            ft4: { ftr1: '', ftr2: '' },
            ft5: { ftr1: '', ftr2: '' },
        };

        await imageText.map(item => {
            let descript = item.description;
            let positions = this.getPosition(item.boundingPoly.vertices);
            let { minX, maxX, minY, maxY } = positions;

            console.log('position', minX, maxX, minY, maxY);
            console.log('descirpt', descript);

            if ((minY > 550 && minY < 650) && (maxY > 550 && maxY < 650)
            ) {
                if ((minX > 250 && minX < 960) && (maxX > 410 && maxX < 1150)) {
                    state.ft1.ftr1 = state.ft1.ftr1 + ' ' + descript;
                }
                if ((minX > 1600 && minX < 2375) && (maxX > 1700 && maxX < 2550)) {
                    state.ft1.ftr2 = state.ft1.ftr2 + ' ' + descript;
                }
            };
            if ((minY > 775 && minY < 870) && (minY > 775 && minY < 870)
            ) {
                if ((minX > 265 && minX < 1050) && (maxX > 410 && maxX < 1250)) {
                    state.ft2.ftr1 = state.ft2.ftr1 + ' ' + descript;
                }
                if ((minX > 1600 && minX < 2500) && (maxX > 1750 && maxX < 2500)) {
                    state.ft2.ftr2 = state.ft2.ftr2 + ' ' + descript;
                }

                // F2 fppt
                if ((minX > 270 && minX < 290) && (maxX > 380 && maxX < 400)) {
                    if (descript.length) state.ft2.ftr1 = state.ft2.ftr1 + ' ' + descript;
                }
            }
            if ((minY > 1000 && minY < 1100) && (minY > 1000 && minY < 1100)
            ) {
                if ((minX > 250 && minX < 1000) && (maxX > 410 && maxX < 1200)) {
                    state.ft3.ftr1 = state.ft3.ftr1 + ' ' + descript;
                }
                if ((minX > 1600 && minX < 2500) && (maxX > 1750 && maxX < 2700)) {
                    state.ft3.ftr2 = state.ft3.ftr2 + ' ' + descript;
                }
            }

            if ((minY > 1225 && minY < 1330) && (minY > 1225 && minY < 1330)
            ) {
                if ((minX > 250 && minX < 1050) && (maxX > 300 && maxX < 1230)) {
                    state.ft4.ftr1 = state.ft4.ftr1 + ' ' + descript;
                }
                if ((minX > 1600 && minX < 2400) && (maxX > 1750 && maxX < 2500)) {
                    state.ft4.ftr2 = state.ft4.ftr2 + ' ' + descript;
                }

                // f1 fttf
                if ((minX > 270 && minX < 290) && (maxX > 410 && maxX < 440)) {
                    if (descript.length) state.ft4.ftr1 = state.ft4.ftr1 + ' ' + descript;
                }

                // f2 fttf
                if ((minX > 1630 && minX < 1650) && (maxX > 1745 && maxX < 1770)) {
                    if (descript.length) state.ft4.ftr2 = state.ft4.ftr2 + ' ' + descript;
                }
            }

            if ((minY > 1450 && minY < 1565) && (minY > 1450 && minY < 1565)
            ) {
                if ((minX > 250 && minX < 1100) && (maxX > 400 && maxX < 1330)) {
                    state.ft5.ftr1 = state.ft5.ftr1 + ' ' + descript;
                }

                // Fppf f1
                if ((minX > 270 && minX < 285) && (maxX > 335 && maxX < 345)) {
                    if (descript.length) state.ft5.ftr1 = state.ft5.ftr1 + ' ' + descript;
                }

                if ((minX > 1620 && minX < 2500) && (maxX > 1700 && maxX < 2600)) {
                    state.ft5.ftr2 = state.ft5.ftr2 + ' ' + descript;
                }
            }
        })

        let test = Object.keys(state).map(item => {
            let fight = { ftr1: { name: '' }, ftr2: { name: '' } }
            let arr = ['ftr1', 'ftr2'];

            arr.map(fgtr => {
                function hasNumber(myString) {
                    return /\d/.test(myString);
                }
                state[item][fgtr].split(' ').map(each => {
                    if (each.charAt(0) === '$') {
                        fight[fgtr].price = each;
                    }
                    else if (each.charAt(2) === '.' || each === 'O' || hasNumber(each)) {
                        fight[fgtr].fppf = each;
                    }
                    else {
                        fight[fgtr].name += `${fight[fgtr].name ? ' ' : ''}` + this.constractName(each);
                    }
                })
            })
            return fight;
        })

        let obj = {};
        test.map(item => {
            obj[item.ftr1.name] = item.ftr1;
            obj[item.ftr2.name] = item.ftr2;
        })
        return obj;
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

    getPosition = (position) => {
        let x = position.map(posX => { return posX.x });
        let y = position.map(posY => { return posY.y });
        return {
            minX: Math.min(...x),
            maxX: Math.max(...x),
            minY: Math.min(...y),
            maxY: Math.min(...y),
        }
    }
}

module.exports = new Constract;