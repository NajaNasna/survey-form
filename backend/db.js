const mongoose = require('mongoose');
// const mongoUri = process.env.MONGO_URI

const state ={
  db:null
}

// const connectDB = async () => {
//     try {
//       const conn = await mongoose.connect(mongoUri);
//       console.log('Database connected successfully');
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   module.exports = connectDB 




module.exports.connect = function (done) {
  const mongoUri = process.env.MONGO_URI
  const dbname = 'businessSurveyDatas'

 
  mongoose.connect(mongoUri).then(data => {

      state.db = data.connection.db
      done()

  }).catch(err => {  
      return done(err)
  })


}

module.exports.get = function () {
  return state.db
}