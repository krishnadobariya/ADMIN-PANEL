import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { API } from "../baseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

// Student page
function Student() {

    const [record, setRecord] = useState("");
    const [student, setStudent] = useState("");
    const [update, setUpdate] = useState(false);
    const [collegeList, setCollegeList] = useState();

    const [formData, setFormData] = useState({
        Name: "",
        yearOfBatch: "",
        skills: "",
        phone: "",
        email: "",
        collegeName: ""
    });

    // Input Change
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    // Submit on add Student
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form submission and page reload
        addStudent();
        initModal();
    }

    // Submit on update Student
    const handleEditSubmit = (event) => {
        event.preventDefault(); // Prevent the form submission and page reload
        updateStudent();
        initModalEdit();
    }

    // Blank State value
    const removeData = () => {
        setFormData({
            Name: "",
            yearOfBatch: "",
            skills: "",
            phone: "",
            email: "",
            collegeName: ""
        })
    }

    // Edit Student
    const handelEdit = (data) => {
        initModalEdit();
        setRecord(data);
        setFormData({
            Name: data.Name,
            yearOfBatch: data.yearOfBatch,
            skills: data.skills,
            phone: data.phone,
            email: data.email,
            collegeName: data.collegeName,
        });
    }

    // Add Student
    const addStudent = async () => {
        const res = await axios.post(`${API}/student/insert`, formData)
        if (res?.data?.status == 201) {
            setFormData({});
            setUpdate(!update);
            toast.success(res?.data?.message);
        }
    }

    // Edit course
    const updateStudent = async () => {
        const res = await axios.post(`${API}/student/update`,
            {
                id: record?._id,
                Name: formData.Name,
                yearOfBatch: formData.yearOfBatch,
                skills: formData.skills,
                phone: formData.phone,
                email: formData.email,
                collegeName: formData.collegeName
            })
        if (res?.data?.status == 200) {
            setCollegeList(res?.data?.data);
            toast.success(res?.data?.message);
            setUpdate(!update);
        }
    }

    // Get Student
    const getStudent = async () => {
        const res = await axios.get(`${API}/student/getAll`)
        if (res?.data?.status == 200) {
            setStudent(res?.data?.data);
        }
    }

    useEffect(() => {
        getStudent();
    }, [update])

    // Get college
    const getCollege = async () => {
        const res = await axios.get(`${API}/college/getAll`)
        if (res?.data?.status == 200) {
            setCollegeList(res?.data?.data);
        }
    }

    useEffect(() => {
        getCollege();
    }, [])

    // delete college
    const deleteStudent = async (data) => {
        const res = await axios.delete(`${API}/student/delete/${data?._id}`)
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
                            <h3 className="text-dark">STUDENT LIST</h3>
                        </div>
                        <div>
                            <button className="button-coll" onClick={() => { initModal(); removeData() }}>Add Student</button>
                        </div>
                    </div>

                </div>
                <div class="table-container  box-shadows">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>College name</th>
                                <th>Year of Batch</th>
                                <th>Skills</th>
                                <th>Phone</th>
                                <th>email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student?.length > 0 ? student.map((res, index) => {
                                return (
                                    <tr className="">
                                        <td>{index + 1}</td>
                                        <td>{res?.Name}</td>
                                        <td>{res?.collegeName}</td>
                                        <td>{res?.yearOfBatch}</td>
                                        <td>{res?.skills}</td>
                                        <td>{res?.phone}</td>
                                        <td>{res?.email}</td>
                                        <td className="d-flex w-100">
                                            <div>
                                                <AiFillEdit onClick={() => { handelEdit(res) }} />
                                            </div>
                                            <div style={{ paddingLeft: "20px" }} className="text-danger">
                                                <AiFillDelete onClick={() => { deleteStudent(res) }} />
                                            </div>

                                        </td>

                                    </tr>
                                )
                            }) : ""}

                        </tbody>
                    </table>
                </div>
            </main>

            {/*  Modal for add student */}
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title className="color-dark">Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Enter Student Name" name='Name' value={formData.Name} onChange={handleInputChange} className="w-100 py-2 px-3 border border-dark"></input>
                        <br />
                        <select
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleInputChange}
                            className="w-100 py-2 mt-1 px-3 border border-dark"
                        >
                            <option>Select College</option>
                            {collegeList?.length > 0 && collegeList.map((res) => {
                                return (
                                    <option value={res?.Name}>{res?.Name}</option>
                                )
                            })}
                        </select>
                        <br />
                        <input placeholder="Enter Year of Batch" name="yearOfBatch" value={formData.yearOfBatch} onChange={handleInputChange} className="w-100 py-2 px-3  mt-1 border border-dark"></input>
                        <br />
                        <input placeholder="Enter Skills" name="skills" value={formData.skills} onChange={handleInputChange} className="w-100 py-2 px-3  mt-1 border border-dark"></input>
                        <br />
                        <input placeholder="Enter Phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-100 py-2 px-3  mt-1 border border-dark"></input>
                        <br />
                        <input placeholder="Enter email" name="email" value={formData.email} onChange={handleInputChange} className="w-100 py-2 px-3  mt-1 border border-dark"></input>
                        <br />
                        <button type="submit" className="button-coll mt-3 w-100">ADD</button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Modal for update Student */}
            <Modal show={isShowEdit}>
                <Modal.Header closeButton onClick={initModalEdit}>
                    <Modal.Title className="color-dark">Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleEditSubmit}>
                        <input placeholder="Enter Student Name" name='Name' value={formData.Name} onChange={handleInputChange} className="w-100 py-2 px-3 border border-dark"></input>
                        <br />
                        <select
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleInputChange}
                            className="w-100 py-2 mt-1 px-3 border border-dark"
                        >
                            <option>Select College</option>
                            {collegeList?.length > 0 && collegeList.map((res) => {
                                return (
                                    <option value={res?.Name}>{res?.Name}</option>
                                )
                            })}
                        </select>
                        <br />
                        <input placeholder="Enter Year of Batch" name="yearOfBatch" value={formData.yearOfBatch} onChange={handleInputChange} className="w-100 py-2 px-3  mt-1 border border-dark"></input>
                        <br />
                        <input placeholder="Enter Skills" name="skills" value={formData.skills} onChange={handleInputChange} className="w-100 py-2 px-3  mt-1 border border-dark"></input>
                        <br />
                        <input placeholder="Enter Phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-100 py-2 px-3  mt-1 border border-dark"></input>
                        <br />
                        <input placeholder="Enter email" name="email" value={formData.email} onChange={handleInputChange} className="w-100 py-2 px-3  mt-1 border border-dark"></input>
                        <br />
                        <button type="submit" className="button-coll mt-3 w-100">UPDATE</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )

}

export default Student
