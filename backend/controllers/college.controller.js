const collegeModel = require('../models/college.model');
const college = require('../models/college.model');
const studentModel = require('../models/student.model');
const courseModel = require('../models/course.modal');
const student = require('../models/student.model');


// Insert Colleges
exports.insert = async (req, res) => {
    try {
        const cName = req.body.Name;
        const existingCollege = await college.findOne({ Name: cName });

        if (existingCollege) {
            return res.status(400).json({
                message: "College with this name already exists.",
                status: 200
            });
        }

        const data = new college({
            Name: req.body.Name,
            yearFounded: req.body.yearFounded,
            Location: {
                city: req.body.Location.city,
                state: req.body.Location.state,
                country: req.body.Location.country
            },
            Courses: req.body.Courses,
            NoOfStudents: 0,
        });

        const saveData = await data.save();
        const responseData = {
            message: "College Inserted Successfully",
            status: 201,
            data: {
                Name: saveData.Name,
                yearFounded: saveData.yearFounded,
                Location: saveData.Location,
                Courses: saveData.Courses,
                createdAt: saveData.createdAt,
                updatedAt: saveData.updatedAt,
                NoOfStudents: saveData.NoOfStudents,
            }
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.log("Error:::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
}

// Get College
exports.findCollege = async (req, res) => {
    try {

        const collegeName = req.params.name;
        const College = await college.findOne({ Name: collegeName });

        if (!College) {
            return res.status(404).json({
                message: "College Not Found",
                status: 404
            })
        }

        res.status(200).json({
            message: "College found Successfully",
            status: 200,
            data: College
        });

    } catch (error) {
        console.log("Error:::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
}

// Get Similer Colleges
exports.findSimilarColleges = async (req, res) => {
    try {

        const collegeName = req.params.name;
        const sourceCollege = await college.findOne({ Name: collegeName });

        if (!sourceCollege) {
            return res.status(404).json({
                message: "Source College Not Found",
                status: 404
            })
        }

        const criteria = {
            'Location.city': sourceCollege.Location.city,
            'Location.state': sourceCollege.Location.state,
            'Location.country': sourceCollege.Location.country,
            Courses: { $in: sourceCollege.Courses },
            NoOfStudents: {
                $gte: sourceCollege.NoOfStudents - 100,
                $lte: sourceCollege.NoOfStudents + 100
            }
        };
        const similarColleges = await college.find(criteria);

        if (similarColleges.length === 0) {
            return res.status(200).json({
                message: "No similar colleges found",
                status: 200,
                data: []
            });
        }

        // Populate the Location field in the response
        const populatedColleges = await college.populate(similarColleges, { path: 'Location' });

        res.status(200).json({
            message: "Similar Colleges Found Successfully",
            status: 200,
            data: populatedColleges
        });

    } catch (error) {
        console.error("Error:::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
}

// Get All Colleges
exports.getAllColleges = async (req, res) => {
    try {

        const allColleges = await college.find();

        if (allColleges.length === 0) {
            return res.status(200).json({
                message: "No Colleges Found",
                status: 200,
                data: []
            });
        }

        res.status(200).json({
            message: "All Colleges Retrieved Successfully",
            status: 200,
            data: allColleges
        });
    } catch (error) {
        console.error("Error:::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
}

// Total colleges State wise Count
exports.getTotalCollegesInState = async (req, res) => {
    try {
        const stateName = req.params.stateName; // Assuming you're passing the state name as a URL parameter

        // Use the Mongoose countDocuments method to count colleges with the provided state
        const data = await college.find({ 'Location.state': stateName });
        if (data.length === 0) {
            res.status(200).json({
                message: "No Colleges in this State",
                status: 200,
                data: {
                    state: stateName,
                    totalCount: 0
                }
            });
        } else {
            res.status(200).json({
                message: "Total Count Of Colleges In The State",
                status: 200,
                data: {
                    state: stateName,
                    data: data,
                    totalCount: data.length,
                }
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

// Total colleges State wise
exports.getTotalCollegesByState2 = async (req, res) => {
    try {
        // Use the Mongoose aggregate method to group colleges by state and count them
        const collegeCounts = await college.aggregate([
            {
                $group: {
                    _id: { $ifNull: ['$Location.state', 'Unknown'] }, // Group by state, default to 'Unknown' for missing/null values
                    totalCount: { $sum: 1 } // Count the colleges in each group
                }
            },
            {
                $project: {
                    state: '$_id',
                    totalCount: 1,
                    _id: 0
                }
            }
        ]);

        // Check if there are any results
        if (collegeCounts.length === 0) {
            res.status(200).json({
                message: "No Colleges in any State",
                status: 200,
                data: []
            });
        } else {
            const data = [["Task", "State wise College"]]

            for (const iterator of collegeCounts) {
                data.push([iterator?.state, iterator?.totalCount])
            }
            res.status(200).json({
                message: "Total Count Of Colleges By State",
                status: 200,
                data: data
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

// Colleges get Coursewise
exports.getTotalCourseWise = async (req, res) => {
    try {
        // Use the Mongoose aggregate method to group colleges by state and count them
        const collegeCounts = await college.aggregate([
            {
                $group: {
                    _id: { $ifNull: ['$Courses', 'Unknown'] }, // Group by state, default to 'Unknown' for missing/null values
                    totalCount: { $sum: 1 } // Count the colleges in each group
                }
            },
            {
                $project: {
                    state: '$_id',
                    totalCount: 1,
                    _id: 0
                }
            }
        ]);

        // Check if there are any results
        if (collegeCounts.length === 0) {
            res.status(200).json({
                message: "No Colleges in any State",
                status: 200,
                data: []
            });
        } else {
            const data = [["Task", "Course wise College"]]

            for (const iterator of collegeCounts) {
                data.push([iterator?.state, iterator?.totalCount])
            }
            res.status(200).json({
                message: "Total Count Of Colleges By State",
                status: 200,
                data: data
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

// Colleges get by Course
exports.getTotalCollegesByCourse = async (req, res) => {
    try {

        const courseName = req.params.courseName;

        const courseWiseColleges = await college.find({ Courses: courseName });
        if (courseWiseColleges?.length === 0) {
            res.status(200).json({
                message: "No colleges For This Course",
                status: 200,
                data: {
                    course: courseName,
                    totalCount: 0
                }
            });
        } else {

            res.status(200).json({
                message: "Total Count Of Colleges For This Course",
                status: 200,
                data: {
                    course: courseName,
                    data: courseWiseColleges,
                    totalCount: courseWiseColleges?.length
                }
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

// Get Colleges by State
exports.getCollegeByState = async (req, res) => {
    try {
        const stateName = req.params.stateName; // Assuming you're passing the state name as a URL parameter

        // Use the Mongoose find method to get colleges with the provided state
        const collegesInState = await college.find({ 'Location.state': stateName });

        if (collegesInState.length === 0) {
            res.status(200).json({
                message: "No Colleges in this State",
                status: 200,
                data: {
                    state: stateName,
                    totalCount: 0
                }
            });
        } else {
            res.status(200).json({
                message: "Colleges in the State",
                status: 200,
                data: collegesInState
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

// Get College details
exports.collegeDetails = async (req, res) => {
    try {

        const collegeId = req.params.id;
        const collegeDetails = await college.findById(collegeId);

        if (!collegeDetails) {
            return res.status(404).json({
                message: "College Not Found",
                status: 404,
                data: null
            });
        }

        const studentsInCollege = await student.find({ collegeName: collegeDetails.Name });
        const similarColleges = await college.find({
            'Location.city': collegeDetails.Location.city,
            'Location.state': collegeDetails.Location.state,
            'Location.country': collegeDetails.Location.country,
            Courses: { $in: collegeDetails.Courses },
            NoOfStudents: {
                $gte: collegeDetails.NoOfStudents - 100,
                $lte: collegeDetails.NoOfStudents + 100
            },
            _id: { $ne: collegeId }
        })

        res.status(200).json({
            message: "College Details, Students, and Similar Colleges",
            status: 200,
            data: {
                college: collegeDetails,
                students: studentsInCollege,
                similarColleges: similarColleges
            }
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

// Delete College
exports.deleteCollege = async (req, res) => {
    try {

        const { id } = req.params
        await collegeModel.deleteOne({
            _id: id
        })
        res.json({
            status: 200,
            message: "College deleted successfully"
        })

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
            data: null
        });
    }
}

// Update College
exports.update = async (req, res) => {
    try {
        const cName = req.body.Name;
        const existingCollege = await college.findOne({ Name: cName });

        if ((existingCollege._id).toString() != (req.body.id).toString()) {
            return res.status(400).json({
                message: "College with this name already exists.",
                status: 200
            });
        }

        await college.updateOne({
            _id: req.body.id
        }, {
            $set: {
                Name: req.body.Name,
                yearFounded: req.body.yearFounded,
                Location: {
                    city: req.body.Location.city,
                    state: req.body.Location.state,
                    country: req.body.Location.country
                },
                Courses: req.body.Courses,
            }
        });

        const responseData = {
            message: "College Updated Successfully",
            status: 200,
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.log("Error:::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
}

// Get all count Like Student, Course, Colleges
exports.allCount = async (req, res) => {

    const student = await studentModel.countDocuments();
    const course = await courseModel.countDocuments();
    const college = await collegeModel.countDocuments();

    res.json({
        status: 200,
        message: "Get all count successfully",
        data: {
            student,
            course,
            college
        }
    })

}