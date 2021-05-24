//* On require notre connecteur pour la db.
const db = require('../database');

/**
 * class Argonaute
 */
class Argonaute {

    constructor(data = {}) {
        for (const prop in data ) {
            this[prop] = data[prop];
        }
    }
    /**
     * Method to find all argonaute present in db
     * @returns An instance of Argonaute
     */
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM argonaute;');

        return rows.map(ag => new Argonaute(ag));
    }

    async save() {
        if (this.id) {
            // UPDATE
        } else {
            try {
                // INSERT
                const { rows } = await db.query(`SELECT * FROM new_argonaute($1);`, [this]);

                this.id = rows[0].id;
            } catch (err) {
                throw new Error(err.detail);
            }
        }
    }
}

module.exports = Argonaute;
