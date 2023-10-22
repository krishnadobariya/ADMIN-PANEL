const { insert, get, deleteCourse, update } = require('../controllers/course.controller');

const router = require('express').Router();

router.post("/insert", insert);
router.get("/get", get);
router.delete("/delete/:id", deleteCourse);
router.post("/update", update);

module.exports = router;