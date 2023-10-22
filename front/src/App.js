import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './page/Home';
import Layout from './components/Layout';
import College from './page/College';
import Student from './page/Student';
import Course from './page/Course';
function App() {


  // Define routes
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/college" element={<College />} />
          <Route path="/student" element={<Student />} />
          <Route path="/course" element={<Course />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App