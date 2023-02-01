import { useForm } from "react-hook-form";
import React, {useState} from 'react';
import AnswerSheet from "./AnswerSheet";


export default function Form() {
 var Latex = require('react-latex');
  
  const {register, handleSubmit} = useForm();
  
  function onSubmit (data){
    console.log(data)
    AnswerSheet(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("answer")}/>
        <input type="submit"/>
    </form>
  );
}