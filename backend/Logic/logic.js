const db = require('../db')
const collection = require('../config/collection')
const Question = require('../models/User')

module.exports ={


    doSignup : (userData)=>{
        console.log(userData)
        return new Promise(async(resolve,reject)=>{
            try {

                if (!userData || !userData.contEmail) {
                    resolve({ success: false, message: "Form data is empty or missing required fields" });
                    return;
                }

                const userExist = await db.get().collection(collection.USER_COLLECTION).findOne({contEmail: userData.contEmail})
                console.log(userExist)
                if(userExist){
                    console.log('user exist')
                    resolve({ success:false, message:"user already exist....!!!"})
                }else{

                    const result = await db.get().collection(collection.USER_COLLECTION).insertOne(userData);
                    
                         if(result){
                             console.log(result)
                             
                             resolve({ success:true, result:userData})
                         }else{
                             console.error(error);
                              reject({ success: false, message: 'Failed to insert data into the collection'});
                         }
                }
            } catch (error) {
                console.log(error)
                reject({ success:false ,error})
            }      
        }
    )
    },


    fetchRestaurantQuestions : (answer)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                // if (answer === 'restaurant owner') {
                  const questions = await db.get().collection(collection.QUESTION_COLLECTION).find().toArray();
                //   console.log(questions[0].restaurantQuestions)
                  resolve({ success:true, questions:questions[0].restaurantQuestions})             
            //   } 
 
              } catch (error) {
                console.error('Error fetching questions:', error);
                reject({success: false, error: 'Internal server error'})
              }
        })
    },


    fetchSupplierQuestions : (answer)=>{
        return new Promise(async(resolve,reject)=>{
            try {            
                // if (answer === 'supplier') {
                  const questions = await db.get().collection(collection.QUESTION_COLLECTION).find().toArray();
                //   console.log(questions[0].supplierQuestions)
                  resolve({ success:true, questions:questions[0].supplierQuestions}) 
            //   } 
              } catch (error) {
                console.error('Error fetching questions:', error);
                reject({success: false, error: 'Internal server error'})
              }
        })
    },

    storeUserType: (userInfo) => {
        return new Promise(async (resolve, reject) => {
            // const userId = await db.get().collection(collection.USER_COLLECTION).findOne({})
            try {
                // await db.get().collection(collection.USER_COLLECTION).insertOne({ userType });
                await db.get().collection(collection.USER_COLLECTION).updateOne(
                    { contEmail: userInfo.userEmail },
                    { $set: { userType : userInfo.userType } }
                );

                resolve({ success: true, message: 'User type stored successfully.' });
            } catch (error) {
                console.error('Error storing user type:', error);
                reject({ success: false, error: 'Internal server error' });
            }
        });
    },


    storeAnswers : (userAnswers)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                await db.get().collection(collection.USER_COLLECTION).updateOne(
                    { contEmail: userAnswers.userEmail },
                    { $set: { survey : userAnswers.survey } }
                );

                resolve({ success: true, message: 'User answers stored successfully.' });
            } catch (error) {
                
            }
        })
    }
    


    // fetchQuestionsByChoice: async (choice) => {
    //     try {
    //       if (choice === 'restaurant owner' || choice === 'supplier') {
    //         const questions = await db.get().collection(collection.QUESTION_COLLECTION).findOne();
    //         return choice === 'restaurant owner' ? questions.restaurantQuestions : questions.supplierQuestions;
    //       } else {
    //         throw new Error('Invalid choice');
    //       }
    //     } catch (error) {
    //       console.error('Error fetching questions:', error);
    //       throw error;
    //     }
    //   }
    

}



