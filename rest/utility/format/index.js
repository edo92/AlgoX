class ConstractFormat {
    performaceRawData = stats => {
        return {
            sigStr: Number(stats.strSigPers.split('%')[0]),
            // Take down
            takeDown: Number(stats.takeDownPers.split('%')[0]),
            // Submission
            subAtt: Number(stats.subAtt),
            pass: Number(stats.pass),
            rev: Number(stats.rev),

            kd: Number(stats.kd),
            // Strick
            sigStrTotal: Number(stats.strSig.split(' of ')[1]),
            sigStrLanded: Number(stats.strSig.split(' of ')[0]),
            // Head
            strHeadLanded: Number(stats.strHead.split(' of ')[0]),
            strHeadTotal: Number(stats.strHead.split(' of ')[1]),
            // Body
            strBodyLanded: Number(stats.strBody.split(' of ')[0]),
            strBodyTotal: Number(stats.strBody.split(' of ')[1]),
            // Leg
            strLegLanded: Number(stats.strLeg.split(' of ')[0]),
            strLegTotal: Number(stats.strLeg.split(' of ')[1]),

            // Takedown
            tdSucc: Number(stats.takeDown.split(' of ')[0]),
            tdTotal: Number(stats.takeDown.split(' of ')[1]),

            // Distance
            distanceSucc: Number(stats.distance.split(' of ')[0]),
            distanceTotal: Number(stats.distance.split(' of ')[1]),

            clinchSucc: Number(stats.takeDown.split(' of ')[0]),
            clinchTotal: Number(stats.takeDown.split(' of ')[1]),

            groundSucc: Number(stats.takeDown.split(' of ')[0]),
            groundTotal: Number(stats.takeDown.split(' of ')[1]),
        }
    }

    constractStats = stats => {
        return {
            age: !stats.dob.split(', ')[1] ? 30 : new Date().getFullYear() - Number(stats.dob.split(', ')[1]),
            hight: stats.hight === '--' ? 0 : Number(`${stats.hight.split("'")[0]}.${stats.hight.split("'")[1].split('"')[0].trim()}`),

            // Mes.
            weight: Number(stats.weight.split(' ')[0]),
            reach: stats.reach === '--' ? 0 : Number(stats.reach.split('"')[0]),

            strAcc: Number(stats.StrAcc.split('%')[0]),
            strDef: Number(stats.StrDef.split('%')[0]),
            slpm: Number(stats.SLpM),

            tdAcc: Number(stats.TDAcc.split('%')[0]),
            tdDef: Number(stats.TDDef.split('%')[0]),
            tdAvg: Number(stats.TDAvg),

            subAvg: Number(stats.SubAvg)
        }
    }
}

module.exports = new ConstractFormat;