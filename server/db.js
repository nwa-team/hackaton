'use strict';
var cradle = require('cradle');

class DataStore {
    constructor() {
        this.db = new (cradle.Connection)().database('mhype');

        this.db.exists((err, exists) => {
            if (!err && !exists) {
                this.db.create();
            }
        });
    }

    getMovies(callback) {
        this.db.all((err, docs) => {
            let ids = JSON.parse(docs).map((d) => d.id);
            this.db.get(ids, (ex, items) => callback(JSON.parse(items).map((i) => i.doc)));
        });
    }

    setMovies(movies) {
        this.db.save(movies);
    }

    update(id, updates) {
        this.db.merge(id, updates, (err, res) => {
            console.log(err);
        })
    }
    
    deleteAll() {
        this.db.destroy();
        this.db.create();
    }
}

module.exports = DataStore;