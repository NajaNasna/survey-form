// import React, { useEffect, useState } from 'react'
// import './Choose.css'
// import axios from 'axios';
// import Questions from '../Questions/Questions';

// function Choose() {
//   const [choose, setChoose] = useState('')
//   const[questions, setQuestions] = useState([])
//     const [error, setError] = useState('');


//     useEffect(() => {
//       console.log(questions);
//   }, [questions]);



//   // const[currQuestIndex, setCurrQuestIndex] = useState(0)
//   // const[displayQuestion, setDisplayQuestion] = useState('')



//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     console.log(choose)

//     if (!choose) {
//       setError('Please select an option.');
//       return;
//   }
//   setError('');

//     const result = await axios.post('http://localhost:5000/questions',{choice:choose})
//     console.log('Result : ',result)
//     setQuestions(result.data.questions)

//     // console.log(questions)
//   };


//   return (
//     <div>
//       <div className="container">
//         <div className="content-div">
//           <form>
//             <h2 className="text-center mb-5">Business Survey</h2>
           
//             <div className="col-lg-8 col-md-12 col-sm-12 mx-auto mb-5">
//               <label className="form-label chooseQuestion fw-bold mb-5">Are you a restaurant owner or a supplier ?</label> <br />
//               <div className='ownerSupplier'>
//                 <div>
//                   <input type='radio' name='radio' value='restaurant owner' onChange={(e) => setChoose(e.target.value)} />
//                   <label>Restaurant Owner</label>
//                 </div>
//                 <div>
//                   <input type='radio' name='radio' value='supplier' onChange={(e) => setChoose(e.target.value)} />
//                   <label>Supplier</label>
//                 </div>
//               </div>
//               {error && <p className="error">{error}</p>}

//             </div>

//             <div className="quiz-btn-section ">
//               <button type='submit' className="btn btn-primary second-next-btn" onClick={handleSubmit} >Next</button>
//             </div>


//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default Choose












import React, {  useEffect, useState } from 'react'
import './Choose.css'
import axios from 'axios';


function Choose() {

  const [choose, setChoose] = useState('')
  const[questions, setQuestions] = useState([])
    // const [error, setError] = useState('');
    const [errors, setErrors] = useState('');
    const[currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState([]);


    useEffect(() => {
      console.log(questions);
  }, [questions]);

   useEffect(() => {
    setErrors(Array(questions.length).fill(''));
  }, [questions]);


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(choose)

    if (!choose) {
      setErrors('Please select an option.');
      return;
  }
  setErrors('');

    const result = await axios.post('http://localhost:5000/questions',{ choice:choose})
    console.log('Result : ',result)
    setChoose('')
    setQuestions(result.data.questions)
    const userEmail = localStorage.getItem('email')
    console.log(userEmail)
    const storeResult = await axios.post('http://localhost:5000/store-user-type', { userType: choose,userEmail:userEmail });
        console.log('Store Result:', storeResult.data);
    // console.log(questions)
  };







const handleNextQuestion = async (e) => {
    e.preventDefault();
    if (choose === '') {
      setErrors('Please select an answer before proceeding.');
    }else{
      setErrors('');
      setAnswers([...answers, {question: questions[currentQuestionIndex].text, answer:choose}]);
      console.log(answers)
      if(currentQuestionIndex < questions.length-1){
  
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setChoose('');
      }else if(currentQuestionIndex === questions.length-1){
  
        console.log('No more questions');
        const submitAnswer = await axios.post('http://localhost:5000/all-answers',answers)
        console.log(submitAnswer)
      }
    }

};



useEffect(() => {
  const submitAnswers = async () => {
      console.log('Submitting answers:', answers);
      const userEmail = localStorage.getItem('email')
      const submitAnswer = await axios.post('http://localhost:5000/all-answers', {survey:answers , userEmail:userEmail });
      console.log(submitAnswer);
  };

  if (currentQuestionIndex === questions.length - 1) {
      submitAnswers();
  }
}, [answers, currentQuestionIndex, questions.length]);


  return (
    <div className='choose-div'>
      <div className="container">
        <div className="content-div">
          <form>
            <h2 className="text-center mb-5">Business Survey</h2>
            {questions.length === 0 ? (
              <div className="col-lg-8 col-md-12 col-sm-12 mx-auto mb-5">
                <label className="form-label chooseQuestion fw-bold mb-5">Are you a restaurant owner or a supplier ? </label> <br />
                <div className='ownerSupplier'>
                  <div>
                    <input type='radio' name='radio' value='restaurant owner' onChange={(e) => setChoose(e.target.value)} />
                    <label>Restaurant Owner</label>
                  </div>
                  <div>
                    <input type='radio' name='radio' value='supplier' onChange={(e) => setChoose(e.target.value)} />
                    <label>Supplier</label>
                  </div>
                </div>
                {errors && <p className="error">{errors}</p>}

                <div className="quiz-btn-section ">
               <button type='submit' className="btn btn-primary second-next-btn" onClick={handleSubmit} >Next</button>
             </div> 
              </div>
            ) : (
              <div className="col-lg-8 col-md-12 col-sm-12 mx-auto mb-5">
                <label className="form-label chooseQuestion fw-bold mb-5" value={questions[currentQuestionIndex].text}>{questions[currentQuestionIndex].text}</label> <br />
                 <div className='ownerSupplier' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                 {questions[currentQuestionIndex].options.map((option, index) => (
                    <div key={index} >
                      <input type='radio' name='radio' checked={choose === option} value={option} onChange={(e) => setChoose(e.target.value)} />
                      <label>{option}</label> 
                    </div>
                  ))} 
                </div>
                <div className="quiz-btn-section ">

                      <button type='submit' className="btn btn-primary second-next-btn" onClick={handleNextQuestion}>
                        {currentQuestionIndex === questions.length-1 ? 'Submit' : 'Next'}</button>
             </div> 
             {/* {error && <div className="error-message">{error}</div>} */}
             {errors[currentQuestionIndex] && <div className="error-message">{errors}</div>}
                
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
export default Choose





















// import React, {  useEffect, useState } from 'react'
// import './Choose.css'
// import axios from 'axios';


// function Choose() {

//   const [choose, setChoose] = useState('')
//   const[questions, setQuestions] = useState([])
//     const [error, setError] = useState('');
//     const [errors, setErrors] = useState('');
//     const[currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
//     const [answers, setAnswers] = useState([]);


//     useEffect(() => {
//       console.log(questions);
//   }, [questions]);

//    useEffect(() => {
//     setErrors(Array(questions.length).fill(''));
//   }, [questions]);

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     console.log(choose)

//     if (!choose) {
//       setError('Please select an option.');
//       return;
//   }
//   setError('');

//     const result = await axios.post('http://localhost:5000/questions',{ choice:choose})
//     console.log('Result : ',result)
//     setQuestions(result.data.questions)
//     const userEmail = localStorage.getItem('email')
//     console.log(userEmail)
//     const storeResult = await axios.post('http://localhost:5000/store-user-type', { userType: choose,userEmail:userEmail });
//         console.log('Store Result:', storeResult.data);


//     // console.log(questions)
//   };



// const handleNextQuestion = async (e) => {
//     e.preventDefault();
//     if (choose === '') {
//       setErrors('Please select an answer before proceeding.');
//     }else{
//       setErrors('');
//       setAnswers([...answers, {question: questions[currentQuestionIndex].text, answer:choose}]);
//       console.log(answers)
//       if(currentQuestionIndex < questions.length-1){
  
//         setCurrentQuestionIndex(currentQuestionIndex + 1);
//         setChoose('');
//       }else if(currentQuestionIndex === questions.length-1){
  
//         console.log('No more questions');
//         const submitAnswer = await axios.post('http://localhost:5000/all-answers',answers)
//         console.log(submitAnswer)
//       }
//     }

// };



// useEffect(() => {
//   const submitAnswers = async () => {
//       console.log('Submitting answers:', answers);
//       const userEmail = localStorage.getItem('email')
//       const submitAnswer = await axios.post('http://localhost:5000/all-answers', {survey:answers , userEmail:userEmail });
//       console.log(submitAnswer);
//   };

//   if (currentQuestionIndex === questions.length - 1) {
//       submitAnswers();
//   }
// }, [answers, currentQuestionIndex, questions.length]);


//   return (
//     <div>
//       <div className="container">
//         <div className="content-div">
//           <form>
//             <h2 className="text-center mb-5">Business Survey</h2>
//             {questions.length === 0 ? (
//               <div className="col-lg-8 col-md-12 col-sm-12 mx-auto mb-5">
//                 <label className="form-label chooseQuestion fw-bold mb-5">Are you a restaurant owner or a supplier ? </label> <br />
//                 <div className='ownerSupplier'>
//                   <div>
//                     <input type='radio' name='radio' value='restaurant owner' onChange={(e) => setChoose(e.target.value)} />
//                     <label>Restaurant Owner</label>
//                   </div>
//                   <div>
//                     <input type='radio' name='radio' value='supplier' onChange={(e) => setChoose(e.target.value)} />
//                     <label>Supplier</label>
//                   </div>
//                 </div>
//                 {error && <p className="error">{error}</p>}

//                 <div className="quiz-btn-section ">
//                <button type='submit' className="btn btn-primary second-next-btn" onClick={handleSubmit} >Next</button>
//              </div> 
//               </div>
//             ) : (
//               <div className="col-lg-8 col-md-12 col-sm-12 mx-auto mb-5">
//                 <label className="form-label chooseQuestion fw-bold mb-5" value={questions[currentQuestionIndex].text}>{questions[currentQuestionIndex].text}</label> <br />
//                  <div className='ownerSupplier' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
//                  {questions[currentQuestionIndex].options.map((option, index) => (
//                     <div key={index} >
//                       <input type='radio' name='radio' value={option} onChange={(e) => setChoose(e.target.value)} />
//                       <label>{option}</label> 
//                     </div>
//                   ))} 
//                 </div>
//                 <div className="quiz-btn-section ">

//                       <button type='submit' className="btn btn-primary second-next-btn" onClick={handleNextQuestion}>
//                         {currentQuestionIndex === questions.length-1 ? 'Submit' : 'Next'}</button>
//              </div> 
//              {/* {error && <div className="error-message">{error}</div>} */}
//              {errors[currentQuestionIndex] && <div className="error-message">{errors[currentQuestionIndex]}</div>}
                
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default Choose