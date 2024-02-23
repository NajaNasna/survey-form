const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const cors = require('cors')
const db = require('./db')
const port = process.env.PORT




// connectDB();

app.use(cors())
app.use(express.json())


var session = require('express-session')
app.use(session({secret:"Key",cookie:{maxAge:60000}}))


db.connect((err)=>{
  if(err){
    console.log('Connection error'+err)
  }else{
    console.log("Database connected to port")

  }
})

app.use('/',require('./Routes/UserRoutes'))
app.use('/',require('./Routes/AdminRoute'))


app.get('/', (req, res) => {
  res.send('Successful response.');
});


app.listen(port, () => console.log(`Example app is listening on port ${port}`));   