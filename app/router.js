const { Router } = require('express');

const router = Router();

//* Controllers
const formController = require('./controllers/formController');

//* Route
router.get('/argonaute', formController.getAll);
router.post('/argonaute', formController.addOne);


//! 404
router.use((_,res) => {
    res.send('Sorry your request didn\'t found your page. Please make sure you have correctly insert your url');
} )


module.exports = router;