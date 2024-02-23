const express = require('express')
const router = express.Router()
const logic = require('../Logic/AdminLogic')
const { body, validationResult } = require('express-validator')



router.post('/adminsignup',
    // body('email', 'Enter a valid email').isEmail(),
    // body('password', 'Incorrect Password').isLength({ min: 5 })

    // , 
    async (req, res) => {
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors : errors.array() })
        // }
console.log(req.body)
        logic.doAdminSignup(req.body).then((response)=>{
            console.log(response)
            res.send(response)
     
        })
        
    }),


// router.post('/adminlogin',(req,res)=>{
//     logic.doAdminLogin(req.body).then((response)=>{
//         console.log(response)
//         res.send(response)
//     })
// })


router.post('/adminlogin'
// ,[
//     body('email', 'Enter a valid email').isEmail(),
//     body('password', 'Incorrect Password').isLength({min: 5})]
    , async (req, res) => {
        try {
            
            // const errors = validationResult(req)
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({errors: errors.array()})
            // }
            console.log(req.body)
            logic.doAdminLogin(req.body).then((response)=>{
                console.log(response)
                res.send(response)     
            })
        } catch (error) {
            console.log('--Error Occured', error )
            res.status(error.status || 500).json({ success: false, error: error.message || "Internal Server Error" });
        }
    })



    router.get('/owner-details',(req,res)=>{
        console.log('+++')
        logic.fetchOwnerDetails().then((response)=>{
            console.log(response)
            res.send(response)
        })
    })



module.exports = router 