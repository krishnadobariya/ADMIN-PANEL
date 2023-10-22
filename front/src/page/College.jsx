import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { API } from "../baseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

// College Page
function College() {

    const [record, setRecord] = useState("");
    const [collegeList, setCollegeList] = useState("");
    const [getAllCourse, setAllCourse] = useState("");
    const [update, setUpdate] = useState(false);
    const [formData, setFormData] = useState({
        Name: "",
        yearFounded: "",
        Courses: "",
        city: "",
        state: "",
        country: ""
    });

    // Blank state values
    const removeData = () => {
        setFormData({
            Name: "",
            yearFounded: "",
            Courses: "",
            city: "",
            state: "",
            country: ""
        })
    }

    // Submit on add details
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form submission and page reload
        addCollege();
        initModal();
    }

    // Input changes
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    // submit on Edit form
    const handleEditSubmit = (event) => {
        event.preventDefault(); // Prevent the form submission and page reload
        updateCollege();
        initModalEdit();
    }

    const handelEdit = (data) => {
        initModalEdit();
        setRecord(data);
        setFormData({
            Name: data.Name,
            yearFounded: data.yearFounded,
            Courses: data.Courses,
            city: data.Location.city,
            state: data.Location.state,
            country: data.Location.country,
        });
    }

    // Add College
    const addCollege = async () => {
        const res = await axios.post(`${API}/college/insert`, {
            Name: formData.Name,
            Location: {
                city: formData.city,
                state: formData.state,
                country: formData.country
            },
            yearFounded: formData.yearFounded,
            Courses: formData.Courses,

        })
        if (res?.data?.status == 201) {
            setFormData({});
            setUpdate(!update);
            toast.success(res?.data?.message);
        }
    }

    // Get college
    const getCollege = async () => {
        const res = await axios.get(`${API}/college/getAll`)
        if (res?.data?.status == 200) {
            setCollegeList(res?.data?.data);
        }
    }

    useEffect(() => {
        getCollege();
    }, [update])

    //Get Courses
    const getCourse = async () => {
        const res = await axios.get(`${API}/course/get`)
        if (res?.data?.status == 200) {
            setAllCourse(res?.data?.data);
        }
    }

    useEffect(() => {
        getCourse();
    }, [])

    // Edit course
    const updateCollege = async () => {
        const res = await axios.post(`${API}/college/update`, {
            id: record?._id,
            Name: formData.Name,
            Location: {
                city: formData.city,
                state: formData.state,
                country: formData.country
            },
            yearFounded: formData.yearFounded,
            Courses: formData.Courses,
        })
        if (res?.data?.status == 200) {
            setCollegeList(res?.data?.data);
            toast.success(res?.data?.message);
            setUpdate(!update);
        }
    }

    // delete college
    const deleteCollege = async (data) => {
        const res = await axios.delete(`${API}/college/delete/${data?._id}`)
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
                            <h3 className='text-dark'>COLLEGE LIST</h3>
                        </div>
                        <div>
                            <button className="button-coll" onClick={() => { initModal(); removeData({}); }}>Add College</button>
                        </div>
                    </div>
                </div>
                <div class="table-container box-shadows">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>name</th>
                                <th>Year Founded</th>
                                <th>Location</th>
                                <th>Rating</th>
                                <th>Course</th>
                                <th>No of Students</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collegeList?.length > 0 ? collegeList.map((res, index) => {
                                return (
                                    <tr className="">
                                        <td>{index + 1}</td>
                                        <td>{res?.Name}</td>
                                        <td>{res?.yearFounded}</td>
                                        <td>{`${res?.Location?.city}, ${res?.Location?.state}, ${res?.Location?.country}`}</td>
                                        <td>{res?.Rating}</td>
                                        <td>{res?.Courses}</td>
                                        <td>{res?.NoOfStudents}</td>
                                        <td className="d-flex w-100">
                                            <div>
                                                <AiFillEdit onClick={() => { handelEdit(res) }} />
                                            </div>
                                            <div style={{ paddingLeft: "20px" }} className="text-danger">
                                                <AiFillDelete onClick={() => { deleteCollege(res) }} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) : ""}

                        </tbody>
                    </table>
                </div>
            </main>

            {/* Modal for Add college */}
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title className="color-dark">Add College</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Enter College Name" name="Name" value={formData.Name} onChange={handleInputChange} className="w-100 py-2 px-3 border border-dark"></input>
                        <br />
                        <input placeholder="Enter Year Founded" name="yearFounded" value={formData.yearFounded} onChange={handleInputChange} className="w-100 py-2  mt-1 px-3 border border-dark"></input>
                        <br />
                        <input placeholder="Enter City" name="city" value={formData.city} onChange={handleInputChange} className="w-100 py-2 px-3 border  mt-1 border-dark"></input>
                        <br />
                        <input placeholder="Enter State" name="state" value={formData.state} onChange={handleInputChange} className="w-100 py-2 px-3 border  mt-1 border-dark"></input>
                        <br />
                        <input placeholder="Enter Country" name="country" value={formData.country} onChange={handleInputChange} className="w-100 py-2 px-3  mt-1 border border-dark"></input>
                        <br />
                        <select
                            name="Courses"
                            value={formData.Courses}
                            onChange={handleInputChange}
                            className="w-100 py-2 mt-1 px-3 border border-dark"
                        >
                            <option>Select Course</option>
                            {getAllCourse?.length > 0 && getAllCourse.map((res) => {
                                return (
                                    <option value={res?.Name}>{res?.Name}</option>
                                )
                            })}
                        </select>

                        {/* <input placeholder="Enter Course" name="Courses" value={formData.Courses} onChange={handleInputChange} className="w-100 py-2 px-3  mt-1 border border-dark"></input> */}
                        <br />
                        <button type="submit" className="button-coll mt-3 w-100">ADD</button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Modal for Update College */}
            <Modal show={isShowEdit}>
                <Modal.Header closeButton onClick={initModalEdit}>
                    <Modal.Title className="color-dark">Edit College</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleEditSubmit}>
                        <input placeholder="Enter College Name" name="Name" value={formData.Name} onChange={handleInputChange} className="w-100 py-2 px-3 border border-dark"></input>
                        <br />
                        <input placeholder="Enter Year Founded" name="yearFounded" value={formData.yearFounded} onChange={handleInputChange} className="w-100 mt-1 py-2 px-3 border border-dark"></input>
                        <br />
                        <input placeholder="Enter City" name="city" value={formData.city} onChange={handleInputChange} className="w-100 py-2 px-3  mt-1 border border-dark"></input>
                        <br />
                        <input placeholder="Enter State" name="state" value={formData.state} onChange={handleInputChange} className="w-100 py-2 px-3 border  mt-1 border-dark"></input>
                        <br />
                        <input placeholder="Enter Country" name="country" value={formData.country} onChange={handleInputChange} className="w-100 py-2 px-3  mt-1 border border-dark"></input>
                        <br />
                        <select
                            name="Courses"
                            value={formData?.Courses}
                            onChange={handleInputChange}
                            className="w-100 py-2 mt-1 px-3 border border-dark"
                        >
                            <option>Select Course</option>
                            {getAllCourse?.length > 0 && getAllCourse.map((res) => {
                                return (
                                    <option value={res?.Name}>{res?.Name}</option>
                                )
                            })}
                        </select>
                        {/* <input placeholder="Enter Course" name="Courses" value={formData.Courses} onChange={handleInputChange} className="w-100 py-2 px-3  mt-1 border border-dark"></input>
                        <br /> */}
                        <button type="submit" className="button-coll mt-3 w-100">UPDATE</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default College