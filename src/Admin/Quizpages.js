import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizQuestion = () => {
  const [state, setState] = useState([]);
    const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/getquestion');
        const data = await response.json();
        console.log(data);
        setState(data); // Set the retrieved data to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const editdata = (id)=>{
    console.log(id,"clicked id is ")
    navigate(`/EditPage/${id}`)
  }
  const Option = (id)=>{
    console.log('id of option',id)
  }

  return (
    <>
      <h4>Quiz questions</h4>
      <div>
        {state && (
          <div>
            {state.map((data,index)=>{
              return( <div>
                <h5 key={index}>Question: {data.question}</h5>
                <p>Options:</p>
                <ul>
                  {data.options.map((option, ind) => (
                   <li key={ind} onClick={()=>{
                    Option(option._id)
                   }}>{option.option}</li>
                  ))}
                </ul>
                <p>Correct Answer: {data.answer}</p>
            <p>Hint: {data.hint}</p>
            <p>Explanation: {data.explanation}</p>
            <button onClick={()=>{
                editdata(data._id)
            }}>Edit</button>
            <button>Delete</button>
                </div>) 
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default QuizQuestion;
