const express = require('express');
const path = require('path');
const router = express.Router();
const road = require('../model/roads');

router.get('/admin/updateRoadDB', updateRoadDB);

router.get('/', index);
router.get('/community', community);

router.get('/roads', showRoadList);
router.get('/road/:roadId', showRoadDetail);
router.get('/findRoad/:roadName', showRoadDetail);

module.exports = router;


function updateRoadDB() {
    console.log('update DB');
}

function index(req, res) {
    res.sendFile(path.resolve('view/index.html'));
}

function community(req, res) {
    res.sendFile(path.resolve('view/chat.html'))
}


function showRoadList(req, res) {
    const roadList = road.getRoadList();
    const result = { data:roadList, count:roadList.length };
    res.send(result);
}

async function showRoadDetail(req, res) {
    try {
        const roadId = req.params.roadId;
        const info = await road.getRoadDetail(movieId);
        res.send(info);
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}
