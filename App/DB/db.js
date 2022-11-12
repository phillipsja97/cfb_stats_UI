const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    password: process.env.PASSWORD,
    user: process.env.USER,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: '3306'
});

let statsDB = {};

statsDB.all = () => {
    return new Promise((res, rej) => {
        pool.query('select third.ranking as 3rdDownRank, \
        third.percentage as 3rdDownPercent, \
        fourth.ranking as 4thDownRank, \
        fourth.percentage as 4thDownPercent, \
        comp.ranking as CompletionRank, \
        comp.percentage as CompletionPercentage, \
        scoring.ranking as ScoringOffRanking, \
        scoring.pts as ScoringOffPoints, \
        scoring.ppg as ScoringOffPPG, \
        total.ranking as TotalOffRank, \
        total.ypp as TotalOffYPP, \
        total.ypg as TotalOffYPG \
    from 3rddownconversionpct third \
    join 4thdownconversionpct fourth \
        on third.team = fourth.team \
    join completionpercentage comp \
        on fourth.team = comp.team \
    join scoringOffense scoring \
        on comp.team = scoring.team \
    join totalOffense total \
        on scoring.team = total.team \
        where third.team = "Tennessee"', (err, results) => {
            if (err)  {
                return rej(err);
            }
            return res(results);
        })
    })
};

statsDB.one = (team) => {
    return new Promise((res, rej) => {
        pool.query('select * from totaloffense where team = ?', [team], (err, results) => {
            if (err)  {
                return rej(err);
            }
            return res(results[0]);
        })
    })
}

const getAllOffense = () => {
    statsDB.all = () => {
        return new Promise((res, rej) => {
            pool.query('select third.ranking as 3rdDownRank, \
            third.percentage as 3rdDownPercent, \
            fourth.ranking as 4thDownRank, \
            fourth.percentage as 4thDownPercent, \
            comp.ranking as CompletionRank, \
            comp.percentage as CompletionPercentage, \
            scoring.ranking as ScoringOffRanking, \
            scoring.pts as ScoringOffPoints, \
            scoring.ppg as ScoringOffPPG, \
            total.ranking as TotalOffRank, \
            total.ypp as TotalOffYPP, \
            total.ypg as TotalOffYPG \
        from 3rddownconversionpct third \
        join 4thdownconversionpct fourth \
            on third.team = fourth.team \
        join completionpercentage comp \
            on fourth.team = comp.team \
        join scoringOffense scoring \
            on comp.team = scoring.team \
        join totalOffense total \
            on scoring.team = total.team \
            where third.team = "Tennessee"', [team], (err, results) => {
                if (err)  {
                    return rej(err);
                }
                return res(results[0]);
            })
        })
    }
}


module.exports = statsDB;