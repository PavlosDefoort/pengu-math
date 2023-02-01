
import React, {useState} from 'react';
import pogChilds from './pogChilds';

var Latex = require('react-latex');

function Question3() {

  const [data,setData] = useState(null);
  const [print,setPrint] = useState(false);
  const [answer,setAnswer] = useState(false);

  function getAnswer(){
    console.log(data)
    if (data === 'sin(x)'){
        setAnswer(true);
    }else{
        setAnswer(false);
    }
  }

  function getData(val){
    setData(val.target.value)
    setPrint(true)
  }

  function getAnswer(){
    
    console.log(data)
    if (data === 'sin(x)'){
        setAnswer(true);
    }else{
        setAnswer(false);
    }
  }

  return (
    <div >
        <Latex>
            {"Evaluate: $\\int_{0}^{1} \\frac{1}{x^{10}}dx$"}
        </Latex>
        
        <div className='App'>
      {
        print?
        <h1 style={{ color: 'blue' }}>  
          <Latex>
            {"$" + pogChilds(data) + "$"} 
          </Latex>  
        </h1>
        :null
      }
      {
        answer?
        <h1 style={{ color: 'blue' }}>  
          <Latex>
            {"$" + "Correct!" + "$"} 
          </Latex>  
        </h1>
        :null
      }
      <input type="text" onChange = {getData} />
      <button onClick={getAnswer}>Submit</button>
    </div>
    </div>
  );
}

export default Question3;
