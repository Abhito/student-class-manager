import './index.scss'
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const StudentInfo = () =>{
    const [studentClasses, setStudentClasses] = useState([])
    const [newClasses, setNewClasses] = useState([])
    const {state} = useLocation()
    let isExpanded = false;

    useEffect(  () => {
        fetchStudentClasses()
        fetchNewClasses()
    }, [])

    const fetchStudentClasses = async() =>{
        await fetch(`http://localhost:3001/classes/student?id=${state.student.id}`)
            .then(response => response.json())
            .then(result => setStudentClasses(result))
    }

    const fetchNewClasses = async() =>{
        await fetch(`http://localhost:3001/classes/student/new?id=${state.student.id}`)
            .then(response => response.json())
            .then(result => setNewClasses(result))
    }

    const deleteItem = async(course) => {
        await fetch("http://localhost:3001/student/class", {
            method: "DELETE",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "studentid": state.student.id,
                "classid": course.id,
            })
        })
            .then((result) => result.json())
            .then((info) => {
                console.log(info);
                setNewClasses([...newClasses, course])
                fetchStudentClasses()
            })
    }



    const showDropdown = () =>{
        const dropdown = document.querySelector(".dropdown")
        const button = document.querySelector(".big-enroll")
        if(isExpanded){
            isExpanded = false
            dropdown.classList.remove("expand")
            dropdown.classList.add("collapse")
            button.classList.remove("clicked")
        }
        else{
            isExpanded = true
            dropdown.classList.add("expand")
            dropdown.classList.remove("collapse")
            button.classList.add("clicked")
        }
    }

    const addItem = async (course) =>{

        await fetch("http://localhost:3001/classes/student", {
            method: "POST",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "studentid": state.student.id,
                "classid": course.id
            })
        })
            .then((result) => result.json())
            .then((info) => {
                console.log(info);
                fetchNewClasses()
                setStudentClasses([...studentClasses, course])
            })
    }

    const renderNewClasses = (newClasses) =>{
        return(
            <div className="enroll-container">
                <button className="big-enroll" type="button"
                    onClick={() => showDropdown()}
                >ENROLL IN CLASSES</button>
                <ul className="dropdown">
                    {
                        newClasses?.map((course, idx) =>{
                            return(
                                <li className="new-class-container" key={idx}>
                                    <Link to={`/Classes/class-info/${course.name}`}
                                    state={{course}}><h3>{course.name}</h3></Link>
                                    <button className="enroll btn"
                                        onClick={() => addItem(course)}
                                    >ENROLL</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    const renderClasses = (studentClasses) =>{
        return(
            <div className="list-container">
                {
                    studentClasses?.map((course, idx) =>{
                        return(
                            <div className="class-container" key={idx}>
                                <Link to={`/Classes/class-info/${course.name}`}
                                state={{course}}><h2>{course.name}</h2></Link>
                                <button className="unenroll btn"
                                        onClick={() => deleteItem(course)}
                                >UNENROLL</button>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    return(
        <div className="container student-page">
            <div className="student-title">
                <h1>{state.student.name}</h1>
            </div>
            <div>
                {renderNewClasses(newClasses)}
            </div>
            <div>
                {renderClasses(studentClasses)}
            </div>
        </div>
    )
}

export default StudentInfo;