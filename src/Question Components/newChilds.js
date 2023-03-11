function convertTexToAscii(input) {
  // Convert nested fractions
  const nestedFractionPattern =
    /\\frac\{([^{}]*(?:{[^{}]*}[^{}]*)*)\}\{([^{}]*(?:{[^{}]*}[^{}]*)*)\}/g;
  let output = input.replace(
    nestedFractionPattern,
    function (match, numerator, denominator) {
      return (
        "((" +
        convertTexToAscii(numerator) +
        ")/(" +
        convertTexToAscii(denominator) +
        "))"
      );
    }
  );

  // Convert remaining fractions
  const fractionPattern = /\\frac\{([^{}]+)\}\{([^{}]+)\}/g;
  output = output.replace(fractionPattern, "(($1)/($2))");

  // Convert square roots
  const sqrtPattern = /\\sqrt\{([^{}]+)\}/g;
  output = output.replace(sqrtPattern, "sqrt($1)");

  // Convert exponents with or without fractions
  const exponentPattern = /([a-zA-Z0-9()]+)\^{([^{}]+)}/g;
  output = output.replace(exponentPattern, "($1)^($2)");

  return output;
}

function convertLatexToMathString(latex) {
  //TODO
  // - Implement other trig functions

  // Replace LaTeX commands and symbols with their string representations
  latex = latex.replace(/([0-9.]+)\s*\+\s*([0-9.]+)/g, "($1)+($2)");
  latex = latex.replace(/([0-9.]+)\s*\-\s*([0-9.]+)/g, "($1)-($2)");
  latex = convertTexToAscii(latex);
  latex = latex.replace(/\\sqrt{([^{}]+)}/g, "sqrt($1)");
  latex = latex.replace(/\\pi/g, "pi");

  // Convert \sin(expression) or \sin\left(expression\right) to Math.sin(expression)
  latex = latex.replace(
    /\\sin\\?(?:left)?\(([^)]*)\\?(?:right)?\)/g,
    "sin($1)"
  );
  latex = latex.replace(/\\sin\s*([0-9.]+)/g, "sin($1)");

  // Convert \cos(expression) or \cos\left(expression\right) to Math.cos(expression)
  latex = latex.replace(
    /\\cos\\?(?:left)?\(([^)]*)\\?(?:right)?\)/g,
    "cos($1)"
  );

  // Convert \ln(expression) or \ln\left(expression\right) to Math.log(expression)
  latex = latex.replace(/\\ln\\?(?:left)?\(([^)]*)\\?(?:right)?\)/g, "ln($1)");
  latex = latex.replace(/\\ln\s*([0-9.]+)/g, "ln($1)");

  // Convert \ln(expression) or \ln\left(expression\right) to Math.log(expression)
  latex = latex.replace(
    /\\log\\?(?:left)?\(([^)]*)\\?(?:right)?\)/g,
    "log($1)"
  );
  latex = latex.replace(/\\log\s*([0-9.]+)/g, "log($1)");

  // Convert the remaining LaTeX symbols to plain text
  latex = latex.replace(/\\[a-zA-Z]+/g, "");

  // Convert exponents: x^{y} to x^(y)
  latex = latex.replace(/([^\^]*)\s*\^{([^{}]+)}/g, "($1)^($2)");

  // Add parentheses to ensure correct order of operations
  latex = addParentheses(latex);

  return latex;
}

function addParentheses(mathString) {
  // This function recursively adds parentheses to ensure correct order of operations
  const operators = ["+", "-", "*", "/", "**"];
  let index = -1;

  // Find the highest-precedence operator that is not already in parentheses
  for (let i = 0; i < operators.length; i++) {
    index = mathString.indexOf(operators[i]);
    if (index !== -1 && !isInParentheses(mathString, index)) {
      break;
    } else {
      index = -1;
    }
  }

  if (index !== -1) {
    // Add parentheses around the operator and its operands
    mathString =
      mathString.slice(0, index) +
      "(" +
      addParentheses(mathString.slice(index + 1)) +
      ")" +
      mathString.slice(index + 1 + operators[index].length);
  }

  return mathString;
}

function isInParentheses(mathString, index) {
  // Check if the character at the specified index is inside a set of parentheses
  let numOpenParentheses = 0;
  for (let i = index; i >= 0; i--) {
    if (mathString.charAt(i) === ")") {
      numOpenParentheses++;
    } else if (mathString.charAt(i) === "(") {
      numOpenParentheses--;
      if (numOpenParentheses < 0) {
        return true;
      } else if (
        numOpenParentheses === 0 &&
        i !== 0 &&
        mathString.charAt(i - 1) === "(" &&
        index === mathString.length - 1
      ) {
        // Check for cases where the index is the last character in the string and is enclosed in parentheses
        return true;
      }
    }
  }
  return false;
}

export default function newChilds(latex) {
  return convertLatexToMathString(latex);
}
