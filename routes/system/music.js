var express = require('express');
var router = express.Router();
var MusicController = require('../../controllers/music');
var musicController = new MusicController();

/* GET music page. */
router.get('/', musicController.query);

/*获取*/
router.get('/:id', musicController.get);

/*获取简单信息*/
router.get('/:id/simple', musicController.getSimple);

/*添加*/
router.post('/', musicController.add);

/*删除*/
router.delete('/:id', musicController.delete);

/*修改*/
router.put('/:id', musicController.update);

module.exports = router;