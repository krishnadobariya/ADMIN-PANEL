const router = require('express').Router();

const {

    insert,
    findCollege,
    findSimilarColleges,
    getAllColleges,
    getTotalCollegesInState,
    getTotalCollegesByCourse,
    getCollegeByState,
    collegeDetails,
    getTotalCollegesByState2,
    deleteCollege,
    update,
    getTotalCourseWise,
    allCount

} = require("../controllers/college.controller");

router.post("/insert", insert);
router.get("/findByName/:name", findCollege);
router.get("/findSimilarColleges/:name", findSimilarColleges);
router.get("/getAll", getAllColleges);
router.get('/getTotalOfCollege/:stateName', getTotalCollegesInState);
router.get('/getTotalOfCollege', getTotalCollegesByState2);
router.get("/getTotalCollegesByCourse/:courseName", getTotalCollegesByCourse);
router.get('/getTotalOfCourse', getTotalCourseWise);
router.get("/getCollegeByState/:stateName", getCollegeByState);
router.get("/collegeDetails/:id", collegeDetails);
router.delete("/delete/:id", deleteCollege);
router.post("/update", update);
router.get("/count", allCount)


module.exports = router;