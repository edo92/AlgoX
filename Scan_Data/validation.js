class StageTwo {
    fighterStatsValidation = fighter => {
        if (
            (!fighter.fighterId.length || typeof fighter.fighterId !== 'string') &&
            (!fighter.name.length || typeof fighter.name !== 'string') &&
            (typeof fighter.stats !== 'object')
        ) {
            this.registerLog('error');
        }

        for (let stat in fighter.stats) {
            let fstat = fighter.stats[stat];
            if (!fstat.length) {
                this.registerLog('error');
            }
        }
    }

    statsValidation = stats => {
        for (let data in stats) {
            if (
                (typeof stats[data] !== 'string') ||
                (!stats[data].length) ||
                (!stats[data])
            ) {
                this.registerLog('error');
            }
        }
    }

    fighterValidation = fighter => {
        if (
            (!fighter.name.length || typeof fighter.name !== 'string') &&
            (!fighter.outcome.length || typeof fighter.outcome !== 'string') &&
            (!fighter.fighterUrl.length || typeof fighter.fighterUrl !== 'string') &&
            (!fighter.stats || typeof fighter.stats !== 'object')
        ) {
            this.registerLog('error');
        }
    }

    fightValidation = fight => {
        if (
            (!fight.method.length || typeof fight.method !== 'string') &&
            (!fight.round.length || typeof fight.round !== 'string') &&
            (!fight.time.length || typeof fight.time !== 'string') &&
            (!fight.weightClass.length || typeof fight.weightClass !== 'string') &&
            (!fight.statUrl.length || typeof fight.statUrl !== 'string') &&
            (typeof fight.fighter1 !== 'string') && (typeof fight.fighter2 !== 'string')
        ) {
            this.registerLog('error');
        }
    }

    eventValidation = event => {
        if (
            (!event.name.length || typeof event.name !== 'string') &&
            (!event.link.length || typeof event.link !== 'string') &&
            (!event.fights.length || typeof event.fights !== 'object')
        ) {
            this.registerLog('error');
        }
    }
}

module.exports = StageTwo;