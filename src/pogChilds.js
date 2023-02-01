import math, { parse } from 'mathjs';

export default function pogChilds(value){
    try {
      const node = parse(value);
      
      if (value.trim() === ''){
        return "";
      }else{
        const node3 = node.toTex({parenthesis: 'auto'});
        return node3
      }
    } catch (e) {
      const node3 = value;
      if (node3 === ""){
        return ""
      }else{
        return node3
      }
    }
  }