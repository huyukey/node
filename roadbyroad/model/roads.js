const fs = require('fs');
const findIndex = require('array.prototype.findindex');

class Road {
    constructor() {
        // const data = fs.readFileSync('./model/data.json');
        // this.data = JSON.parse(data)
        const data = '';
    }

    setRoadList() {
        return new Promise((resolve, reject) => {
            if (this.data) {
                
            } else {
                return 0;
            }
        });
    }

    getRoadList() {
        if (this.data) {
            return this.data;
        }
        else {
            return [];
        }
    }
    getRoadDetail(roadId) {
        return new Promise((resolve, reject) => {
            for (var road of this.data ) {
                if ( road.id == roadId ) {
                    resolve(road);
                    return;
                }
            }
            reject({msg:'Can not find road', code:404});
        });
    }

}

module.exports = new Road();