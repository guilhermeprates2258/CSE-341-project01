const router = require('express').Router();



router.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

router.use('/Contacts', require('./contacts'));


module.exports = router;