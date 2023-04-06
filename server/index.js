

const express = require("express");
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3001;

const app = express();
const cors = require("cors");

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.post("/students", async(req, res) =>{
    try{
        const {name} = req.body

        const newStudent = await prisma.student.create({
            data:{
                name
            }
        })
        res.json(newStudent)
    } catch(e){
        console.log(e.message)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})

app.get("/students", async (req, res) => {
    try{
        const students = await prisma.student.findMany()
        res.json(students)
    } catch(e){
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})

app.delete("/students", async(req, res) => {
    try{
        const {id} = req.body

        const deletedStudent = await prisma.student.delete({
            where:{
                id,
            }
        })
        res.json(deletedStudent)

    } catch(e){
        res.status(500).json({
            message: e.message,
        })
    }
})

app.post("/classes", async(req, res) =>{
    try{
        const {name} = req.body

        const newClass = await prisma.class.create({
            data:{
                name
            }
        })
        res.json(newClass)
    } catch(e){
        console.log(e.message)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})

app.get("/classes", async (req, res) => {
    try{
        const classes = await prisma.class.findMany()
        res.json(classes)
    } catch(e){
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})

app.delete("/classes", async(req, res) => {
    try{
        const {id} = req.body

        const deletedClass = await prisma.class.delete({
            where:{
                id,
            }
        })
        res.json(deletedClass)

    } catch(e){
        res.status(500).json({
            message: e.message,
        })
    }
})

app.get("/classes/student", async(req, res) => {
    try{
        let id = Number(req.query.id);

        const studentClasses = await prisma.class.findMany({
            where:{
                students:{
                    some:{
                        studentId: id,
                    }
                }
            }
        })
        res.json(studentClasses)

    } catch(e){
        console.log(e.message)
        res.status(500).json({
            message: e.message,
        })
    }
})


app.get("/classes/student/new", async(req, res) => {
    try{
        let id = Number(req.query.id);

        const studentClasses = await prisma.class.findMany({
            where:{
                NOT: {
                    students: {
                        some: {
                            studentId: id,
                        },
                    }
                }
            }
        })
        res.json(studentClasses)

    } catch(e){
        console.log(e.message)
        res.status(500).json({
            message: e.message,
        })
    }
})

app.post("/classes/student", async(req, res) =>{
    try{
        const {studentid, classid} = req.body

        const newClass = await prisma.classesOnStudent.create({
            data:{
                classId: Number(classid),
                studentId: Number(studentid)
            }
        })
        res.json(newClass)
    } catch(e){
        console.log(e.message)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})

app.delete("/student/class", async (req, res) =>{
    try{
        const {studentid, classid} = req.body

        const deleted = await prisma.classesOnStudent.delete({
            where:{
                studentId_classId:{
                    studentId: Number(studentid),
                    classId: Number(classid)
                }
            }
        })
        res.json(deleted)
    } catch(e){
        console.log(e.message)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})

app.get("/students/class", async(req, res) => {
    try{
        let id = Number(req.query.id);

        const studentClasses = await prisma.student.findMany({
            where:{
                classes:{
                    some:{
                        classId: id,
                    }
                }
            }
        })
        res.json(studentClasses)

    } catch(e){
        console.log(e.message)
        res.status(500).json({
            message: e.message,
        })
    }
})


app.get("/students/class/new", async(req, res) => {
    try{
        let id = Number(req.query.id);

        const studentClasses = await prisma.student.findMany({
            where:{
                NOT: {
                    classes: {
                        some: {
                            classId: id,
                        },
                    }
                }
            }
        })
        res.json(studentClasses)

    } catch(e){
        console.log(e.message)
        res.status(500).json({
            message: e.message,
        })
    }
})