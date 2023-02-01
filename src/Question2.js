
import React, {useState} from 'react';
import pogChilds from './pogChilds';

var Latex = require('react-latex');

function Question2() {

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
    if (data === '1'){
        setAnswer(true);
    }else{
        setAnswer(false);
    }
  }

  return (
    <div>
        <Latex>
        $Evaluate \: sin \: at \: x \: = \: \pi$
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

export default Question2;
