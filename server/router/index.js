const userController = require('../controllers/user-controller');
const Router = require('express').Router;

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/refresh', userController.refresh);


module.exports = router;