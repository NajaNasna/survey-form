const express = require('express')
const router = express.Router()
const logic = require('../Logic/logic')
const collection = require('../config/collection')
const db = require('../db')


router.post('/signup',(req,res)=>{
    console.log(req.body)
    logic.doSignup(req.body).then((response)=>{
        console.log(response)

        res.send(response)
    })
})


// router.post('/signup', (req, res) => {
//   logic.doSignup(req.body)
//       .then((response) => {
//           if (response.success) {
//               // Set session data if signup is successful
//               req.session.loggedIn = true;
//               req.session.user = response.result; // Assuming response.result contains user data
//           }
//           res.send(response);
//       })
//       .catch((error) => {
//           console.error('Signup error:', error);
//           res.status(500).send({ success: false, message: 'Internal server error' });
//       });
// });



router.post('/questions', async (req, res) => {
  try {
    // console.log(req.body.choice)
    if (req.body.choice === 'restaurant owner') {
       logic.fetchRestaurantQuestions(req.body).then((response)=>{
        console.log(response)
        res.send(response)
       });
  } else if (req.body.choice === 'supplier') {
       logic.fetchSupplierQuestions(req.body).then((response)=>{
        console.log(response)
        res.send(response)
       });
    
  } else {
      return res.status(400).json({ error: 'Invalid choice' });
    }

  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.post('/store-user-type',(req,res)=>{
  console.log(req.body)
  logic.storeUserType(req.body).then((response)=>{
    console.log(response)
  })
})



router.post('/all-answers',(req,res)=>{
  console.log(req.body)
  logic.storeAnswers(req.body).then((response)=>{
    console.log(response)
  })
})


module.exports = router

