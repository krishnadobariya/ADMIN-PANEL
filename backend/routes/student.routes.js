const router = require('express').Router();

const {
    insert,
    getAllStudents,
    studentsDetails,
    update,
    deleteStudent
} = require("../controllers/student.cotroller");

router.post("/insert", insert);
router.get("/getAll", getAllStudents);
router.get("/studentByCollege/:college", studentsDetails);
router.post("/update", update);
router.delete("/delete/:id", deleteStudent);

module.exports = router;