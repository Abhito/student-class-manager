import './index.scss'

import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

/**
 * Class view shows class information and allows you to edit which students are enrolled
 * @returns {JSX.Element}
 * @constructor
 */
const ClassInfo = () =>{
    const form = useRef()
    const [classStudents, setClassStudents] = useState([])
    const [newStudents, setNewStudents] = useState([])
    const {state} = useLocation()
    let isExpanded = false;
    const navigate = useNavigate();

    useEffect(  () => {
        fetchClassStudents()
        fetchNewStudents()
    }, [])

    //Get students that are enrolled in class
    const fetchClassStudents = async() =>{
        await fetch(`http://localhost:3001/students/class?id=${state.course.id}`)
            .then(response => response.json())
            .then(result => setClassStudents(result))
    }

    //Get students not enrolled in class
    const fetchNewStudents = async() =>{
        await fetch(`http://localhost:3001/students/class/new?id=${state.course.id}`)
            .then(response => response.json())
            .then(result => setNewStudents(result))
    }

    //Add student to class
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

    //Remove student from class
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

    //Handles showing the students that can be added
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

    //displays all enrolled students
    const renderStudents = (classStudents) =>{
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

    //Displays all unenrolled students
    const renderNewStudents = (newStudents) =>{
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

    //Rename Class
    const renameClass = async (e) =>{
        e.preventDefault()
        const newName = form.current[0]?.value;
        if(newName !== ""){
            await fetch("http://localhost:3001/classes", {
                method: "PUT",
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "name": newName,
                    "id": state.course.id,
                })
            })
                .then((result) => result.json())
                .then((info) => {
                    console.log(info);
                    navigate(`/Classes/class-info/${newName}`, {
                        state:{
                            course:{
                                id: state.course.id,
                                name: newName,
                            }
                        }
                    });
                });
        }
        hideInput();
    }

    //Show rename Field
    const showInput = () =>{
        const nameH1 = document.querySelector(".class-name");
        const edit = document.querySelector(".rename-input");

        nameH1.style.display = "none";
        edit.style.display = "inline-block";
        edit.focus();
    }

    //Hide rename input field
    const hideInput = () =>{
        const nameH1 = document.querySelector(".class-name");
        const edit = document.querySelector(".rename-input");

        nameH1.style.display = "block";
        edit.style.display = "none";
        document.querySelector("form").reset();
    }

    return(
        <div className="container student-page">
            <div className="class-title">
                <form ref={form} onSubmit={renameClass}>
                    <input type="text" name="name" placeholder={state.course.name} className="rename-input" onBlur={hideInput}/>
                </form>
                <h1 onClick={showInput} className="class-name">{state.course.name}</h1>
            </div>
            <div>
                {renderNewStudents(newStudents)}
            </div>
            <div>
                {renderStudents(classStudents)}
            </div>
        </div>
    )
}

export default ClassInfo;