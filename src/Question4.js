
import React, {useState} from 'react';
import pogChilds from './pogChilds';
import './styles.css';
import Button from '@mui/material/Button'
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box'
import { Container } from "@mui/system";


var Latex = require('react-latex');

function Question4() {
 
  const [data,setData] = useState(null);
  const [print,setPrint] = useState(false);
  const [answer,setAnswer] = useState(false);
  const [buttonBool,setButton] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  
  function getData(val){
    setData(val.target.value)
    setPrint(true)
  }

  function getAnswer(){
    
    if (data === '1/9'){
        setIncorrect(false)
        setAnswer(true);
        setButton(true);
        
    }else{
        setIncorrect(true)
    }
  }

  return (
    
    <div>
        <h1 className='prettyQuestion'>
        <Typography variant='h5'>
            Evaluate the integral
        </Typography>
        </h1>
        
        <h1 className='prettyLatex'>
        <Latex>
            {"$\\int_{1}^{\\infty} \\frac{sin^2{x}+cos^2{x}}{x^{10}}dx$"}
        </Latex>
        </h1>
        
       
      <div className='App'>
  
      {
        print?
       
          <h1 className='userInput'> 
          
         
          <Latex>
            {"$" + pogChilds(data) + "$"} 
          </Latex> 
           
          </h1>
         
        
        :null
      }
      {
        answer?
          <h4 className = "correct">
          <Typography variant='h5'>
            Correct
          </Typography> 
          </h4>
           
        :null
      }

      {
        incorrect?
        <h4 className='incorrect'>
            <Latex>
        {"$" + "Incorrect!" + "$"} 
      </Latex>  
        </h4>
        :null

      }
      <h1 className='prettyInput'>
      <TextField type="text" label = "Answer" onChange = {getData} disabled ={buttonBool}>
      </TextField>
      
      <Button onClick={getAnswer} variant="contained" color="primary" disabled = {buttonBool}>
       Submit
      </Button>
      </h1>

      
      </div>
    </div>
    
  );
}

export default Question4;
