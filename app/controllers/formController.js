//* On require notre class Argonaute pour pouvoir l'utiliser dans notre controller
const Argonaute = require('../models/argonaute');

const formController = {
    /**
     * Get all crewMate present in db
     * @param {*} req 
     * @param {*} res An array of argonaute's instance
     */
    getAll: async (_, res) => {
        const argonautes = await Argonaute.findAll();
        res.json(argonautes);
    },

    /**
     * Add one a new crewMate to the crew
     * @param {*} req name to insert in DB
     * @param {*} res a new Instance of Argonaute
     */
    addOne: async (req, res) => {
        const newCrewMate = new Argonaute(req.body);
        try {
            await newCrewMate.save();
            res.json(newCrewMate);
        } catch (err) {
            res.status(500).json(err.message);
        };
    },
};

module.exports = formController;