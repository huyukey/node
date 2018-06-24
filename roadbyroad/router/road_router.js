const express = require('express');
const router = express.Router();
const roads = require('../model/roads');

router.get('/admin/updateRoadDB', updateRoadDB);

router.get('/', index);
app.use('/resources', express.static(__dirname + '/resources'));

router.get('/roads', showRoadList);
router.get('/road/:roadId', showRoadDetail);
router.get('/findRoad/:roadName', showRoadDetail);

module.exports = router;

function updateRoadDB() {
    console.log('update DB');
}

function index(req, res) {
    res.sendFile(__dirname + '/../view/index.html');
}


function showRoadList(req, res) {
    const roadList = roads.getRoadList();
    const result = { data:roadList, count:roadList.length };
    res.send(result);
}

// Async-await를 이용하기
async function showRoadDetail(req, res) {
    try {
        const roadId = req.params.roadId;
        const info = await movies.getMovieDetail(movieId);
        res.send(info);
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}
