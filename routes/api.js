const express = require('express');
const router = express.Router();
const tower = require('../controllers/tower.controller');
const auth = require('../controllers/auth.controller');
const validator = require('../middleware/validation.middleware'); 
const {verifyToken} = require('../middleware/jwt.middleware');
const {towerListCache} = require('../middleware/redis.middleware');
/* GET*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/// Auth Router
router.post('/signup', validator.signup, auth.signup);
router.post('/login', validator.login, auth.login);

// Tower Router
router.post('/getTowerList', towerListCache, tower.getTowers);

router.post('/createTower', [verifyToken, validator.createTower], tower.createTower);
router.post('/deleteTower', verifyToken, tower.deleteTower);
router.post('/updateTower', [verifyToken,validator.updateTower], tower.updateTower);


module.exports = router;