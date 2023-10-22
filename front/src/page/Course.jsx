import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { API } from "../baseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEdit, AiFillDelete }
    from 'react-icons/ai'


// Course Page
function Course() {

    const [Name, setName] = useState("");
    const [courseList, setCourseList] = useState("");
    const [update, setUpdate] = useState(false);
    const [record, setRecord] = useState("");

    //Submit on add Data
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form submission and page reload
        addCourse();
        initModal();
    }

    //Submit on Edit Course
    const handleEditSubmit = (event) => {
        event.preventDefault(); // Prevent the form submission and page reload
        updateCourses();
        initModalEdit();
    }

    // Add course
    const addCourse = async () => {
        const res = await axios.post(`${API}/course/insert`, {
            name: Name
        })
        if (res?.data?.status == 201) {
            setName("");
            setUpdate(!update);
            toast.success(res?.data?.message);
        }
    }

    // Get course
    const getCourse = async () => {
        const res = await axios.get(`${API}/course/get`)
        if (res?.data?.status == 200) {
            setCourseList(res?.data?.data);
        }
    }

    useEffect(() => {
        getCourse();
    }, [update])

    // Edit course
    const updateCourses = async () => {
        const res = await axios.post(`${API}/course/update`, {
            id: record?._id,
            Name,
        })
        if (res?.data?.status == 200) {
            setCourseList(res?.data?.data);
            toast.success(res?.data?.message);
            setUpdate(!update);
        }
    }

    // Delete course
    const deleteCourses = async (data) => {
        const res = await axios.delete(`${API}/course/delete/${data?._id}`)
        if (res?.data?.status == 200) {
            toast.error(res?.data?.message);
            setUpdate(!update);
        }
    }

    // Modal manager
    const [isShow, invokeModal] = React.useState(false)
    const [isShowEdit, invokeModalEdit] = React.useState(false)
    const initModal = () => {
        return invokeModal(!isShow)
    }
    const initModalEdit = () => {
        return invokeModalEdit(!isShowEdit)
    }
    return (
        <>
            <ToastContainer />
            <main className='main-container'>
                <div className='main-title'>
                    <div className="nav-head">
                        <div>
                            <h3 className="text-dark">COURSE LIST</h3>
                        </div>
                        <div>
                            <button className="button-coll" onClick={() => { initModal(); setName("") }}>Add Course</button>
                        </div>
                    </div>

                </div>
                <div class="table-container box-shadows">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Courase Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseList?.length > 0 ? courseList.map((res, index) => {
                                return (
                                    <tr className="">
                                        <td>{index + 1}</td>
                                        <td>{res?.Name}</td>
                                        <td className="d-flex w-100">
                                            <div>
                                                <AiFillEdit onClick={() => { initModalEdit(); setRecord(res); setName(res?.Name); }} />
                                            </div>
                                            <div style={{ paddingLeft: "20px" }} className="text-danger">
                                                <AiFillDelete onClick={() => { deleteCourses(res) }} />
                                            </div>

                                        </td>

                                    </tr>
                                )
                            }) : ""}

                        </tbody>
                    </table>
                </div>
            </main >

            {/* Modal for add Course */}
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title className="color-dark">Add Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Enter Course Name" value={Name} onChange={(e) => { setName(e.target.value) }} className="w-100 py-2 px-3 border border-dark"></input>
                        <br />
                        <button type="submit" className="button-coll mt-3 w-100">ADD</button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Modal for Update Course */}
            <Modal show={isShowEdit}>
                <Modal.Header closeButton onClick={initModalEdit}>
                    <Modal.Title className="color-dark">Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleEditSubmit}>
                        <input placeholder="Enter Course Name" name="Name" value={Name} onChange={(e) => { setName(e.target.value) }} className="w-100 py-2 px-3 border border-dark"></input>
                        <br />
                        <button type="submit" className="button-coll mt-3 w-100">ADD</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Course