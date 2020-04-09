class Constract {
    typeA = async imageText => {
        let state = { fighter1: { name: '' }, fighter2: { name: '' } };

        await imageText.map(item => {
            let descript = item.description;
            let { minX, maxX, minY, maxY } = this.getPosition(item.boundingPoly.vertices);

            console.log('position', minX, maxX, minY, maxY);
            console.log('descirpt', descript);

            // First Name
            if ((minX > 800 && minX < 1430) && (maxX > 995 && maxX < 1545) &&
                (minY > 1215 && minY < 1310) && (maxY > 1225 && maxY < 1310)
            ) {
                state.fighter1.name = state.fighter1.name + `${state.fighter1.name ? ' ' : ''}` + this.constractName(descript);
            }
            if ((minX > 1370 && minX < 1825) && (maxX > 1540 && maxX < 2350) &&
                (minY > 1190 && minY < 1360) && (maxY > 1230 && maxY < 1355)
            ) {
                state.fighter2.name = state.fighter2.name + `${state.fighter2.name ? ' ' : ''}` + this.constractName(descript);
            };

            // Price
            if ((minX > 420 && maxX < 700) && (minY > 575 && maxY < 615)
            ) {
                state.fighter1.price = state.fighter1.price = descript.split('$')[1];
            };
            if ((minX > 2115 && maxX < 2387) && (minY > 575 && maxY < 615)
            ) {
                state.fighter2.price = state.fighter2.price = descript.split('$')[1];
            };

            // Odds
            if ((minX > 500 && maxX < 695) && (minY > 805 && maxY < 825)
            ) {
                state.fighter1.odds = state.fighter1.odds = descript;
            };
            if ((minX > 2110 && maxX < 2330) && (minY > 805 && maxY < 825)
            ) {
                state.fighter2.odds = state.fighter2.odds = descript;
            };

            // FPPF
            if ((minX > 470 && maxX < 710) && (minY > 1245 && maxY < 1278)
            ) {
                state.fighter1.fppf = state.fighter1.fppf = descript;
            };
            if ((minX > 2090 && maxX < 2350) && (minY > 1240 && maxY < 1275)
            ) {
                state.fighter2.fppf = state.fighter2.fppf = descript.length ? descript : 0;
            };

            // Record
            if ((minX > 400 && maxX < 695) && (minY > 1015 && maxY < 1035)
            ) {
                state.fighter1.record = state.fighter1.record = descript;
            }
            if ((minX > 2115 && maxX < 2415) && (minY > 1025 && maxY < 1050)
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

            if ((minY > 250 && minY < 1000) && (maxY > 550 && maxY < 650)
            ) {
                if ((minX > 250 && minX < 1500) && (maxX > 300 && maxX < 1290)) {
                    state.ft1.ftr1 = state.ft1.ftr1 + ' ' + descript;
                }
                // F1 fppt
                if ((minX > 270 && minX < 290) && (maxX > 330 && maxX < 400)) {
                    if (descript.length) state.ft2.ftr1 = state.ft2.ftr1 + ' ' + descript;
                }

                if ((minX > 1600 && minX < 2575) && (maxX > 1700 && maxX < 2750)) {
                    state.ft1.ftr2 = state.ft1.ftr2 + ' ' + descript;
                }
            };
            if ((minY > 775 && minY < 870) && (minY > 775 && minY < 870)
            ) {
                if ((minX > 245 && minX < 1500) && (maxX > 350 && maxX < 1300)) {
                    state.ft2.ftr1 = state.ft2.ftr1 + ' ' + descript;
                }
                // F2 fppt
                if ((minX > 270 && minX < 290) && (maxX > 320 && maxX < 400)) {
                    if (descript.length) state.ft2.ftr1 = state.ft2.ftr1 + ' ' + descript;
                }

                if ((minX > 1600 && minX < 2500) && (maxX > 1650 && maxX < 2700)) {
                    state.ft2.ftr2 = state.ft2.ftr2 + ' ' + descript;
                }
                // F2 fppt
                if ((minX > 1630 && minX < 1650) && (maxX > 1650 && maxX < 1750)) {
                    if (descript.length) state.ft2.ftr1 = state.ft2.ftr1 + ' ' + descript;
                }
            }
            if ((minY > 1000 && minY < 1100) && (minY > 1000 && minY < 1100)
            ) {
                if ((minX > 250 && minX < 1490) && (maxX > 360 && maxX < 1500)) {
                    state.ft3.ftr1 = state.ft3.ftr1 + ' ' + descript;
                }

                if ((minX > 1600 && minX < 2500) && (maxX > 1700 && maxX < 2750)) {
                    state.ft3.ftr2 = state.ft3.ftr2 + ' ' + descript;
                }
                // f1 fttf
                if ((minX > 270 && minX < 320) && (maxX > 340 && maxX < 445)) {
                    if (descript.length) state.ft3.ftr1 = state.ft3.ftr1 + ' ' + descript;
                }
            }

            if ((minY > 1225 && minY < 1330) && (minY > 1225 && minY < 1330)
            ) {
                if ((minX > 250 && minX < 1496) && (maxX > 300 && maxX < 1530)) {
                    state.ft4.ftr1 = state.ft4.ftr1 + ' ' + descript;
                }
                // f1 fttf
                if ((minX > 270 && minX < 290) && (maxX > 410 && maxX < 440)) {
                    if (descript.length) state.ft4.ftr1 = state.ft4.ftr1 + ' ' + descript;
                }

                if ((minX > 1600 && minX < 2600) && (maxX > 1700 && maxX < 2750)) {
                    state.ft4.ftr2 = state.ft4.ftr2 + ' ' + descript;
                }
                // f2 fttf
                if ((minX > 1630 && minX < 1650) && (maxX > 1700 && maxX < 1770)) {
                    if (descript.length) state.ft4.ftr2 = state.ft4.ftr2 + ' ' + descript;
                }
            }

            if ((minY > 1450 && minY < 1565) && (minY > 1450 && minY < 1565)
            ) {
                if ((minX > 250 && minX < 1500) && (maxX > 300 && maxX < 1350)) {
                    state.ft5.ftr1 = state.ft5.ftr1 + ' ' + descript;
                }
                // Fppf f1
                if ((minX > 270 && minX < 285) && (maxX > 335 && maxX < 345)) {
                    if (descript.length) state.ft5.ftr1 = state.ft5.ftr1 + ' ' + descript;
                }

                if ((minX > 1600 && minX < 2500) && (maxX > 1700 && maxX < 2750)) {
                    state.ft5.ftr2 = state.ft5.ftr2 + ' ' + descript;
                }
                //fppf f2
                if ((minX > 1635 && minX < 1650) && (maxX > 1535 && maxX < 1555)) {
                    if (descript.length) state.ft5.ftr2 = state.ft5.ftr2 + ' ' + descript;
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
            "ä": "a", "á": "a", "ò": "o", "ö": "o", "ü": "u", "ž": "z", "ć": "c", "è": "e", "é": "e", "ł": "l",
            "Ä": "A", "Á": "A", "Ö": "O", "Ü": "U", "É": "E",
        };

        let name = nameData.toLowerCase();
        name = name.charAt(0).toUpperCase() + name.slice(1);

        if (name === 'Vs') return ''
        for (let i in name) {
            let letter = name[i];
            let specChar = translate[letter];
            if (specChar) char += specChar;
            else char += letter;
        }
        return char.trim();
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