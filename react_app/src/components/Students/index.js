import './index.scss'
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

/**
 * Students view displays all students
 * @returns {JSX.Element}
 * @constructor
 */
const Students = () => {
    const [students, setStudents] = useState([])
    const form = useRef()

    //Get all students when page first loads
    useEffect(  () =>{
        fetchStudents()
    },[])

    const fetchStudents = async() =>{
        await fetch("http://localhost:3001/students")
            .then(response => response.json())
            .then(result => setStudents(result))
    }

    //add Student to list
    const addStudent = async (e) => {
        e.preventDefault()

        const studentName = form.current[0]?.value;
        await fetch("http://localhost:3001/students", {
            method: "POST",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "name": studentName
            })
        })
            .then((result) => result.json())
            .then((info) => {
                console.log(info);
                setStudents([...students, {name: info.name, id: info.id}])
            })
    }

    //Delete student from list
    const deleteStudent = async (student) =>{
        await fetch("http://localhost:3001/students", {
            method: "DELETE",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "id": student.id
            })
        })
            .then((result) => result.json())
            .then((info) => {
                console.log(info);
                fetchStudents()
            })
    }

    //display all students in database
    const renderStudents = (students) =>{
        return(
            <div className="list-container">
                {
                    students.map( (student, idx) =>{
                        return(
                            <div className="student-container" key={idx}>
                                <p>{student.name}</p>
                                <div className="btn-holder">
                                    <Link className="edit btn"
                                          to={`/Students/student-info/${student.name}`}
                                          state={{student}}
                                    >Edit</Link>
                                    <button className="delete btn" onClick={() => deleteStudent(student)}>X</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return(
        <div className="container students-page">
            <div className="addStudent-form">
                <form ref={form} onSubmit={addStudent}>
                    <div className="fields-container">
                        <input type="text" name="name" placeholder="Student Name" required/>
                        <button type="submit" className="add-button">Add</button>
                    </div>
                </form>
            </div>
            <div>{renderStudents(students)}</div>
        </div>
    )
}

export default Students;