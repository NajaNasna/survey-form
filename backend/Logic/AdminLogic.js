const db = require('../db')
const collection = require('../config/collection')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.SECRET_KEY
// const Question = require('../models/User')



module.exports = {
   
    doAdminSignup : (adminDetails)=>{
        return new Promise(async(resolve, reject)=>{

            try {
                
                const salt = await bcrypt.genSalt(10);
                let secPassword = await bcrypt.hash(adminDetails.adminPassword, salt)

                const userExist = await db.get().collection(collection.ADMIN_COLLECTION).findOne({adminEmail: adminDetails.adminEmail})
                console.log(userExist)

                if(userExist){
                    console.log('admin exist')
                    resolve({ success:false, message:" admin already exist....!!!"})
                }else{

                    const result = await db.get().collection(collection.ADMIN_COLLECTION).insertOne({
                        adminEmail : adminDetails.adminEmail,
                        adminPass : secPassword
                    });
                    
                         if(result){
                             console.log(result)
                             
                             resolve({ success:true, message: 'admin datas inserted successfully', result: adminDetails})
                         }else{
                             console.error(error);
                              reject({ success: false, message: 'Failed to insert admin data into the collection'});
                         }
                }
          
            } catch (error) {
                console.log(error)
                reject({ success:false ,error})
            }
        })

    },



    doAdminLogin : (adminLoginDetails)=>{
        return new Promise(async(resolve,reject)=>{
            let loginEmail = adminLoginDetails.adminEmail
            try {
                let adminData = await db.get().collection(collection.ADMIN_COLLECTION).findOne({loginEmail})

                if(adminData){
                    const pwdCompare = await bcrypt.compare(adminLoginDetails.adminPassword,adminData.adminPassword)
                    if(pwdCompare){
                        const data = {
                            adminUser:{
                                id:adminData.id
                            }
                        }
                        const authToken = jwt.sign(data,jwtSecret)
                        resolve({success: true, authToken:authToken})
                    }
                }
            } catch (error) { 
                console.log(error)
                reject({success:false});
    
            } 
        })
    },


    fetchOwnerDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const ownerDetails = await db.get().collection(collection.USER_COLLECTION).findOne({userType : 'restaurant owner'})
                if(ownerDetails){
                    resolve({success:true , message : 'Owner details successfully fetched', owner_details : ownerDetails})
                }else{
                    reject({success:false ,message : 'Invalid user type' })
                }
            } catch (error) {
                console.log('Error:--',error)
                reject({success:false ,message : 'Unable to fetch owner details' })
            }
        })
    }








    // doAdminLogin : (adminLoginDetails)=>{
    //     return new Promise(async(resolve,reject)=>{
    //         let loginEmail = adminLoginDetails.adminEmail
    //         try {
    //             let adminData = await db.get().collection(collection.ADMIN_COLLECTION).findOne({loginEmail})

    //             if(adminData){}
    //             // if (!adminData) {
    //             //    return reject({status : 400,errors: "Try logging in with correct credentials"})
    //             // }
    //             // else{
    //             const pwdCompare = await bcrypt.compare(adminLoginDetails.adminPassword,adminData.adminPassword)
    //             if(!pwdCompare){
    //               return reject({ status : 400, errors:"Try logging with correct credentials"})
    //             }
    
    //             const data = {
    //                 adminUser:{
    //                     id:adminData.id
    //                 }
    //             }
    
    //             const authToken = jwt.sign(data,jwtSecret)
    //             resolve({success: true, authToken:authToken})
    
    //         // }
    //         } catch (error) { 
    //             console.log(error)
    //             reject({success:false});
    
    //         } 
    //     })
    // }
}