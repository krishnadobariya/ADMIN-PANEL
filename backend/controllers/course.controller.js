const courseModal = require("../models/course.modal");

//Insert Course
exports.insert = async (req, res) => {
    try {

        const { name } = req.body;
        const saveCourse = new courseModal({
            Name: name
        });
        const data = await saveCourse.save();
        console.log(data)
        res.json({
            status: 201,
            message: "Course added successfully"
        })

    } catch (error) {
        console.log("Error:::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
}

// Update Course
exports.update = async (req, res) => {
    try {

        const { id, Name } = req.body;

        await courseModal.updateOne({
            _id: id
        }, {
            $set: {
                Name: Name
            }
        })

        res.json({
            status: 200,
            message: "Course Updated successfully"
        })

    } catch (error) {
        console.log("Error:::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

//Get Course Detail
exports.get = async (req, res) => {
    try {

        const data = await courseModal.find();
        res.json({
            status: 200,
            message: "Course get successfully",
            data: data
        })

    } catch (error) {
        console.log("Error:::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
}

// Delete Course
exports.deleteCourse = async (req, res) => {
    try {

        const { id } = req.params
        await courseModal.deleteOne({
            _id: id
        });
        res.json({
            status: 200,
            message: "Course deleted successfully"
        })

    } catch (error) {
        console.log("Error:::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
}