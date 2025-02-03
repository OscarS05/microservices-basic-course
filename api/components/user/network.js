const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// router.use(express.json());

router.get('/', list);
router.get('/:id', get);
router.post('/', insert);
router.put('/', secure('update'), update);

router.post('/follow/:id', secure('follow'), follow);
router.get('/:id/following', following);

// internal functions
function list(req, res, next) {
    Controller.list()
        .then((list) => {
            response.success(req, res, list, 200);
        })
        .catch(next);
};

function get(req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
};

function insert(req, res, next) {
    Controller.insert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
};

function update(req, res, next) {
    Controller.update(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
};

function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next); 
};

function following(req, res, next) {
    return Controller.following(req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next); 
};


module.exports = router;