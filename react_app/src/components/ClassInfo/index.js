import './index.scss'

import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const ClassInfo = () =>{
    const [classStudents, setClassStudents] = useState([])
    const [newStudents, setNewStudents] = useState([])
    const {state} = useLocation()
    let isExpanded = false;

    useEffect(  () => {
        fetchClassStudents()
        fetchNewStudents()
    }, [])

    const fetchClassStudents = async() =>{
        await fetch(`http://localhost:3001/students/class?id=${state.course.id}`)
            .then(response => response.json())
            .then(result => setClassStudents(result))
    }

    const fetchNewStudents = async() =>{
        await fetch(`http://localhost:3001/students/class/new?id=${state.course.id}`)
            .then(response => response.json())
            .then(result => setNewStudents(result))
    }

    const addItem = async (student) =>{

        await fetch("http://localhost:3001/classes/student", {
            method: "POST",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "studentid": student.id,
                "classid": state.course.id
            })
        })
            .then((result) => result.json())
            .then((info) => {
                console.log(info);
                fetchNewStudents()
                setClassStudents([...classStudents, student])
            })
    }

    const deleteItem = async(student) => {
        await fetch("http://localhost:3001/student/class", {
            method: "DELETE",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "studentid": student.id,
                "classid": state.course.id,
            })
        })
            .then((result) => result.json())
            .then((info) => {
                console.log(info);
                setNewStudents([...newStudents, student])
                fetchClassStudents()
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

    const renderClasses = (classStudents) =>{
        return(
            <div className="list-container">
                {
                    classStudents?.map((student, idx) =>{
                        return(
                            <div className="student-container" key={idx}>
                                <Link to={`/Students/student-info/${student.name}`}
                                      state={{student}}><h2>{student.name}</h2></Link>
                                <button className="unenroll btn"
                                        onClick={() => deleteItem(student)}
                                >UNENROLL</button>
                            </div>
                        )
                    })
                }
            </div>
        );
    }


    const renderNewClasses = (newStudents) =>{
        return(
            <div className="enroll-container">
                <button className="big-enroll" type="button"
                        onClick={() => showDropdown()}
                >ENROLL STUDENTS</button>
                <ul className="dropdown">
                    {
                        newStudents?.map((student, idx) =>{
                            return(
                                <li className="new-student-container" key={idx}>
                                    <Link to={`/Students/student-info/${student.name}`}
                                    state={{student}}><h3>{student.name}</h3></Link>
                                    <button className="enroll btn"
                                            onClick={() => addItem(student)}
                                    >ENROLL</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    return(
        <div className="container student-page">
            <div className="class-title">
                <h1>{state.course.name}</h1>
            </div>
            <div>
                {renderNewClasses(newStudents)}
            </div>
            <div>
                {renderClasses(classStudents)}
            </div>
        </div>
    )
}

export default ClassInfo;