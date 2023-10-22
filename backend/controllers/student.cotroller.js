const student = require('../models/student.model');
const college = require('../models/college.model');


// Insert Student
exports.insert = async (req, res) => {
    try {

        const sName = req.body.Name;

        const existingStudent = await student.findOne({ Name: sName });

        if (existingStudent) {
            return res.status(400).json({
                message: "Student with this name already exists",
                status: 200
            });
        }

        const existingCollege = await college.findOne({ Name: req.body.collegeName });
        if (!existingCollege) {
            return res.status(400).json({
                message: "College Not exist",
                status: 404
            })
        }

        await college.updateOne({
            _id: existingCollege._id
        }, {
            $set: {
                NoOfStudents: existingCollege?.NoOfStudents + 1
            }
        })

        const data = new student({
            Name: req.body.Name,
            yearOfBatch: req.body.yearOfBatch,
            skills: req.body.skills,
            collegeName: req.body.collegeName,
            phone: req.body.phone,
            email: req.body.email
        });

        const saveData = await data.save();
        console.log("SaveData:::", saveData);

        res.status(201).json({
            message: "Student Insert Successfully",
            status: 201,
            data: saveData
        })

    } catch (error) {
        console.log("Error:::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
}

//Get Student List
exports.getAllStudents = async (req, res) => {
    try {

        const allStudents = await student.find();

        if (allStudents.length === 0) {
            return res.status(200).json({
                message: "No Students found",
                status: 200,
                data: []
            });
        }

        res.status(200).json({
            message: "All Students Retrieved Successfully",
            status: 200,
            data: allStudents
        });

    } catch (error) {
        console.error("Error:::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
}

//Get Student College wise
exports.studentsDetails = async (req, res) => {
    try {
        const studentCollege = req.params.college;
        const studentDetails = await student.find({ collegeName: studentCollege });

        if (!studentDetails) {
            return res.status(404).json({
                message: "College Not Found",
                status: 404,
                data: null
            });
        }

        res.status(200).json({
            message: "College Details, Students, and Similar Colleges",
            status: 200,
            data: studentDetails
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
            data: null
        });
    }
}

//Update Student
exports.update = async (req, res) => {
    try {
        const existingCollege = await college.findOne({ Name: req.body.collegeName });
        if (!existingCollege) {
            return res.status(400).json({
                message: "College Not exist",
                status: 404
            })
        }

        await student.updateOne({
            _id: req.body.id
        }, {
            $set: {
                Name: req.body.Name,
                yearOfBatch: req.body.yearOfBatch,
                skills: req.body.skills,
                collegeName: req.body.collegeName,
                phone: req.body.phone,
                email: req.body.email
            }
        });

        res.status(201).json({
            message: "Student Updated Successfully",
            status: 200,
        })

    } catch (error) {
        console.log("Error:::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
}

//Delete Student
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const findData = await student.findOne({
            _id: id
        })

        const existingCollege = await college.findOne({ Name: findData.collegeName });
        await college.updateOne({
            _id: existingCollege._id
        }, {
            $set: {
                NoOfStudents: existingCollege?.NoOfStudents - 1
            }
        })

        await student.deleteOne({
            _id: id
        })

        res.json({
            status: 200,
            message: "Student deleted Successfully"
        })

    } catch (error) {
        console.log("Error:::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
}