import './App.scss';
import {Route, Routes} from "react-router-dom"
import Layout from "./components/Layout";
import Students from "./components/Students";
import Classes from "./components/Classes";
import StudentInfo from "./components/StudentInfo";
import ClassInfo from "./components/ClassInfo";


function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Layout/>}>
              <Route index element={<Students/>}/>
              <Route  path="Classes" element={<Classes/>}/>
              <Route path="Students/student-info/:student" element={<StudentInfo/>}/>
              <Route path="Classes/class-info/:class" element={<ClassInfo/>}/>
          </Route>
      </Routes>
    </>
  );
}

export default App;
