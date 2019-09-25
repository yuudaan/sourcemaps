const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./plugin.db');

exports.init = function () {
    return new Promise(c => {
        db.run(`CREATE TABLE IF NOT EXISTS versions (
            name TEXT,
            version TEXT,
            major INTEGER,
            minor INTEGER,
            patch INTEGER,
            main TEXT
         );`, c);
    });
};

exports.get = function (name) {
    return new Promise((c, e) => {
        db.all(`SELECT * FROM versions WHERE name = ?`, name, (err, rows) => {
                if (err) e(err);
                else c(rows);
            }
        );
    });
};

exports.store = function ({ name, version, major, minor, patch, main }) {
    return new Promise((c) => {
        db.run(`
            INSERT INTO versions(name, version, major, minor, patch, main) 
            SELECT  $name, $version, $major, $minor, $patch, $main
            WHERE NOT EXISTS(SELECT 1 FROM versions WHERE name = $name AND version = $version);`,
            {
                $name: name,
                $version: version,
                $major: major,
                $minor: minor,
                $patch: patch,
                $main: main,
            },
            c);
    });
};

exports.close = function () {
    return new Promise(c => {
        db.close(c);
    });
};