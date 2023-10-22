import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PiStudentBold } from 'react-icons/pi'
import { FaDiscourse } from 'react-icons/fa'
import { Chart } from "react-google-charts";
import { API } from '../baseUrl';
import { Button, Modal, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


// Define Option For State wise chart
export const state = {
    title: "State wise colleges",
    pieHole: 0.4,
    is3D: false,
};

// Define Option For Course wise chart
export const course = {
    title: "Course wise colleges",
    pieHole: 0.4,
    is3D: false,
};


// Home Page
function Home() {
    const [allCollegeByState, setAllCollegeByState] = useState([]);
    const [allCollegeByCourse, setAllCollegeByCourse] = useState([]);
    const [listOfColleges, setListOfColleges] = useState([]);
    const [studentLists, setStudentLists] = useState([]);
    const [similerColleges, setSmilerColleges] = useState([]);
    const [listOfCollegesByCourse, setListOfCollegesByCourse] = useState([]);
    const [count, setCount] = useState([]);

    // Get count State wise
    const getCollegesByState = async () => {
        const result = await axios.get(`${API}/college/getTotalOfCollege`);
        setAllCollegeByState(result?.data?.data)
    }

    useEffect(() => {
        getCollegesByState()
    }, []);


    // Get count Course Wise
    const getCollegesByCourse = async () => {
        const result = await axios.get(`${API}/college/getTotalOfCourse`);
        setAllCollegeByCourse(result?.data?.data)
    }

    useEffect(() => {
        getCollegesByCourse()
    }, []);

    //Get all counts
    const getCount = async () => {
        const result = await axios.get(`${API}/college/count`);
        setCount(result?.data?.data)
    }

    useEffect(() => {
        getCount()
    }, []);

    //ModalManager
    const [isShow, invokeModal] = React.useState(false)
    const [isShowEdit, invokeModalEdit] = React.useState(false)
    const initModal = () => {
        return invokeModal(!isShow)
    }
    const initModalEdit = () => {
        return invokeModalEdit(!isShowEdit)
    }

    // Handle chart clicks for State
    const handleChartClick = async (sectionIndex) => {
        const state = allCollegeByState[sectionIndex + 1][0];
        const findDataCollegeWise = await axios.get(`${API}/college/getTotalOfCollege/${state}`);
        setListOfColleges(findDataCollegeWise?.data?.data?.data);
    };

    // Handle chart clicks for Course
    const handleChartClicks = async (sectionIndex) => {
        const course = allCollegeByCourse[sectionIndex + 1][0];
        const findDataCollegeWise = await axios.get(`${API}/college/getTotalCollegesByCourse/${course}`);
        setListOfCollegesByCourse(findDataCollegeWise?.data?.data?.data);
    };

    // Get Student List
    const studentList = async (data) => {
        const findDataCollegeWise = await axios.get(`${API}/student/studentByCollege/${data}`);
        setStudentLists(findDataCollegeWise?.data?.data);

    }

    // Get similer College List
    const similerCollege = async (data) => {
        const findSimilerDataCollegeWise = await axios.get(`${API}/college/findSimilarColleges/${data}`);
        setSmilerColleges(findSimilerDataCollegeWise?.data?.data);
    }


    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3 className='text-dark'>DASHBOARD</h3>
            </div>

            <Row className='mt-3'>
                <Col lg={3} md={6} sm={12}>
                    <Card className="mb-4 bg-primary text-white" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                        <Card.Body>
                            <h5 className="card-title">Total Students</h5>
                            <h3 className="card-text">{count?.student}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={12}>
                    <Card className="mb-4 bg-success text-white" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                        <Card.Body>
                            <h5 className="card-title">Total Colleges</h5>
                            <h3 className="card-text">{count?.college}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={12}>
                    <Card className="mb-4 bg-danger text-white" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                        <Card.Body>
                            <h5 className="card-title">Total Course</h5>
                            <h3 className="card-text">{count?.course}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={12}>
                    <Card className="mb-4 bg-warning" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                        <Card.Body>
                            <h5 className="card-title">Total States</h5>
                            <h3 className="card-text">{allCollegeByState?.length - 1}</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className='mt-3'>
                {/* Define Charts */}
                <Row>
                    <Col md={6}>
                        {allCollegeByState.length > 0 ? (
                            <div className="chart-container">
                                <Chart
                                    chartType="PieChart"
                                    width="100%"
                                    height="400px"
                                    data={allCollegeByState}
                                    options={state}
                                    chartEvents={[
                                        {
                                            eventName: 'select',
                                            callback: ({ chartWrapper }) => {
                                                const selection = chartWrapper.getChart().getSelection();
                                                if (selection.length === 1) {
                                                    handleChartClick(selection[0].row);
                                                }
                                            },
                                        },
                                    ]}
                                    className='box-shadows'
                                />
                            </div>
                        ) : <p>No found any detail</p>}
                    </Col>
                    <Col md={6}>
                        {allCollegeByCourse.length > 0 ? (
                            <div className="chart-container">
                                <Chart
                                    chartType="PieChart"
                                    width="100%"
                                    height="400px"
                                    data={allCollegeByCourse}
                                    options={course}
                                    chartEvents={[
                                        {
                                            eventName: 'select',
                                            callback: ({ chartWrapper }) => {
                                                const selection = chartWrapper.getChart().getSelection();
                                                if (selection.length === 1) {
                                                    handleChartClicks(selection[0].row);
                                                }
                                            },
                                        },
                                    ]}
                                    className='box-shadows'
                                />
                            </div>
                        ) : <p>No found any detail</p>}
                    </Col>
                </Row>
            </div>

            {/* Define Table */}
            <Row>
                <Col md={6}>
                    {listOfColleges?.length > 0 &&
                        <>
                            <h5 className='text-dark mt-5 text-bold'>State Wise Colleges</h5>
                            <div class="table-container box-shadows">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>College Name</th>
                                            <th>No of Students</th>
                                            <th>Location</th>
                                            <th>Year Founded</th>
                                            <th>Course</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listOfColleges?.length > 0 ? listOfColleges.map((res, index) => {
                                            return (
                                                <tr className="">
                                                    <td>{index + 1}</td>
                                                    <td>{res?.Name}</td>
                                                    <td>{res?.NoOfStudents}</td>
                                                    <td>{`${res?.Location?.city}, ${res?.Location?.state}, ${res?.Location?.country}`}</td>
                                                    <td>{res?.yearFounded}</td>
                                                    <td>{res?.Courses}</td>
                                                    <td style={{ display: "flex", margin: "auto" }}>
                                                        <Button className='btn btn-primary' onClick={() => { initModal(); studentList(res?.Name); }}><PiStudentBold /></Button>
                                                        <Button className='btn btn-primary space' onClick={() => { initModalEdit(); similerCollege(res?.Name); }}><FaDiscourse /></Button>
                                                    </td>
                                                </tr>
                                            )
                                        }) : <p className='text-center w-full'>No Found</p>}

                                    </tbody>
                                </table>
                            </div>
                        </>
                    }

                </Col>
                <Col md={6}>
                    {listOfCollegesByCourse?.length > 0 &&
                        <>
                            <h5 className='text-dark mt-5 text-bold'>Course Wise Colleges</h5>
                            <div class="table-container box-shadows">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>College Name</th>
                                            <th>No of Students</th>
                                            <th>Location</th>
                                            <th>Year Founded</th>
                                            <th>Course</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listOfCollegesByCourse?.length > 0 ? listOfCollegesByCourse.map((res, index) => {
                                            return (
                                                <tr className="">
                                                    <td>{index + 1}</td>
                                                    <td>{res?.Name}</td>
                                                    <td>{res?.NoOfStudents}</td>
                                                    <td>{`${res?.Location?.city}, ${res?.Location?.state}, ${res?.Location?.country}`}</td>
                                                    <td>{res?.yearFounded}</td>
                                                    <td>{res?.Courses}</td>
                                                    <td style={{ display: "flex", margin: "auto" }}>
                                                        <Button className='btn btn-primary' onClick={() => { initModal(); studentList(res?.Name); }}><PiStudentBold /></Button>
                                                        <Button className='btn btn-primary space' onClick={() => { initModalEdit(); similerCollege(res?.Name); }}><FaDiscourse /></Button>
                                                    </td>

                                                </tr>
                                            )
                                        }) : <p className='text-center w-full'>No Found</p>}

                                    </tbody>
                                </table>
                            </div>
                        </>
                    }
                </Col>
            </Row>


            {/* Modal For student List */}
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title className="color-dark">List Of Students</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="table-container table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Skill</th>
                                    <th>Year Of Batch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentLists?.length > 0 ? studentLists.map((res, index) => {
                                    return (
                                        <tr className="">
                                            <td>{index + 1}</td>
                                            <td>{res?.Name}</td>
                                            <td>{res?.email}</td>
                                            <td>{res?.phone}</td>
                                            <td>{res?.skills}</td>
                                            <td>{res?.yearOfBatch}</td>
                                        </tr>
                                    )
                                }) : <p>No Found</p>}

                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Modal for smililer College list */}
            <Modal show={isShowEdit}>
                <Modal.Header closeButton onClick={initModalEdit}>
                    <Modal.Title className="color-dark">List Of Similer Courses</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="table-container table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {similerColleges?.length > 0 ? similerColleges.map((res, index) => {
                                    return (
                                        <tr className="">
                                            <td>{index + 1}</td>
                                            <td>{res?.Name}</td>
                                        </tr>
                                    )
                                }) : <p>No Found</p>}

                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>

        </main>
    )
}

export default Home
