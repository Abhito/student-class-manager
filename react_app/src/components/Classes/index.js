import './index.scss'
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

const Classes = () => {
    const [classes, setClasses] = useState([])
    const form = useRef()

    useEffect(  () =>{
        fetchClasses()
    },[])

    const fetchClasses = async() =>{
        await fetch("http://localhost:3001/classes")
            .then(response => response.json())
            .then(result => setClasses(result))
    }

    const addClass = async (e) => {
        e.preventDefault()

        const studentName = form.current[0]?.value;
        await fetch("http://localhost:3001/classes", {
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
                setClasses([...classes, {name: info.name, id: info.id}])
            })
    }

    const deleteClass = async (classi) =>{
        await fetch("http://localhost:3001/classes", {
            method: "DELETE",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "id": classi.id
            })
        })
            .then((result) => result.json())
            .then((info) => {
                console.log(info);
                fetchClasses()
            })
    }

    const renderClasses = (classes) =>{
        return(
            <div className="list-container">
                {
                    classes.map( (course, idx) =>{
                        return(
                            <div className="class-container" key={idx}>
                                <p>{course.name}</p>
                                <div className="btn-holder">
                                    <Link className="edit btn"
                                          to={`/Classes/class-info/${course.name}`}
                                          state={{course}}
                                    >Edit</Link>
                                    <button className="delete btn" onClick={() => deleteClass(course)}>X</button>
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
                <form ref={form} onSubmit={addClass}>
                    <div className="fields-container">
                        <input type="text" name="name" placeholder="Class Name" id="class-input" required/>
                        <button type="submit" className="add-button" id="class-button">Add</button>
                    </div>
                </form>
            </div>
            <div>{renderClasses(classes)}</div>
        </div>
    )
}

export default Classes;