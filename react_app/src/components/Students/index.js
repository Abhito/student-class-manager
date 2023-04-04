import './index.scss'
import { useRef, useState} from "react";



const Students = () => {

    const [students, setStudents] = useState([])
    const form = useRef()


    const addStudent = (e) => {
        e.preventDefault()

        const studentName = form.current[0]?.value;
        console.log(studentName)
    }

    const renderStudents = (students) =>{
        return(
            <div className="students-container">
            </div>
        )
    }

    return(
        <div className="container students-page">
            <div className="addStudent-form">
                <form ref={form} onSubmit={addStudent}>
                    <input type="text" name="name" placeholder="Name"/>
                    <button type="submit" className="add-button">Add</button>
                </form>
            </div>
            <div>{renderStudents(students)}</div>
        </div>
    )
}

export default Students;