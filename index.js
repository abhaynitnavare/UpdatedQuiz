const express = require ('express')
const { default: mongoose } = require('mongoose')
const app = express()
const cors = require('cors')
const QuizQuestion = require('./model/questionapi')
// Enable CORS for all requests
app.use(cors());
app.use(express.json())

const Atlasurl= 'mongodb+srv://root:root@cluster0.nwts5cx.mongodb.net/quiz?retryWrites=true&w=majority'
mongoose.connect(Atlasurl)
.then(console.log("database connnected"))
.catch(error=>{console.log(error)})


app.get('/getquestion',(req,res)=>{
    QuizQuestion.find()
    .then(data=>{
        res.status(201).send(data)
    })
    .catch(error=>console.log(error))
})
app.get('/Editquestion/:id',(req,res)=>{
    const id = req.params.id
    QuizQuestion.findById(id)
    .then(data=>{
        res.status(201).send(data)
    })
    .catch(error=>console.log(error))
})
app.put('/Edit/:id',async (req,res)=>{

    try {
        const id = req.params.id;
        const updatedData = req.body;
        console.log(updatedData,"updatedData")
         // Get the updated data from the request body
    
        // Perform the update operation using findByIdAndUpdate or similar method
        const updatedQuestion = await QuizQuestion.findByIdAndUpdate(id, updatedData, { new: true });
    
        res.status(200).json({ message: 'Question updated successfully', updatedQuestion });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }

})





app.listen(4000,()=>{
    console.log("server is listning on 4000 port ")
})