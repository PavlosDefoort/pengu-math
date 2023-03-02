<div className="explanation">
  <div>
    <p className="paragraphStyle">
      <Latex>
        {
          "$\\text{In this question we are to \\textbf{evaluate} the following \\textbf{limit}:}$"
        }
      </Latex>
    </p>
    <p className="paragraphStyle">
      <Latex>
        {"$\\Large \\lim_{x\\rightarrow \\infty} (\\frac{e^{x}}{\\ln{x}})$"}
      </Latex>
    </p>
    <p className="paragraphStyle">
      <Latex>
        {
          "$\\text{The first step to always try when evaluating limits is to \\textbf{plug} in the value of the limit} $"
        }
      </Latex>
    </p>
    <p className="paragraphStyle">
      <Latex>
        {
          "$\\Large \\lim_{x\\rightarrow \\infty} \\frac{e^{\\infty}}{\\ln{\\infty}}$"
        }
      </Latex>
    </p>
    <p className="paragraphStyle">
      <Latex>
        {
          "$\\text{This expression ultimately evaluates to the \\textbf{indeterminate form} } \\Large \\boldsymbol{\\frac{\\infty}{\\infty}}$"
        }
      </Latex>
    </p>
    <p className="paragraphStyle">
      <Latex>
        {"$\\Large \\lim_{x\\rightarrow \\infty} \\frac{\\infty}{\\infty}$"}
      </Latex>
    </p>
    <p className="paragraphStyle">
      <Latex>
        {
          "$\\text{This expression is known as indetermiant as infinity over infinity \\textbf{cannot be calculated precisely}.}$"
        }
      </Latex>
    </p>
    <p className="paragraphStyle">
      <Latex>
        {
          "$\\text{Hence, we can use \\textbf{L'Hospital's Rule} to evaluate this limit, which states an \\textbf{indeterminant limit in the form } }  \\boldsymbol{\\large \\lim_{x\\rightarrow c} \\frac{f(x)}{g(x)}} \\normalsize \\text{ can be evaluated as}$"
        }
      </Latex>
    </p>
    <p className="paragraphStyle">
      <Latex>{"$\\Large \\lim_{x\\rightarrow c} \\frac{f'(x)}{g'(x)}$"}</Latex>
    </p>
    <p className="paragraphStyle">
      <Latex>
        {
          "$\\text{The derivative of the numerator } e^{x} \\text{ is } e^x. \\text{ The derivative of the denominator } \\ln{x} \\text{ is } \\frac{1}{x}. \\text{ This comes together as: }$"
        }
      </Latex>
    </p>
    <p className="paragraphStyle">
      <Latex>
        {"$\\Large \\lim_{x\\rightarrow \\infty} \\frac{e^{x}}{\\frac{1}{x}}$"}
      </Latex>
    </p>
    <p className="paragraphStyle">
      <Latex>{"$\\text{This simplifies to: } $"}</Latex>
    </p>
    <p className="paragraphStyle">
      <Latex>
        {"$\\Large \\lim_{x\\rightarrow \\infty} \\frac{e^{x}x}{1}$"}
      </Latex>
    </p>
    <p className="paragraphStyle">
      <Latex>
        {
          "$\\boldsymbol{\\Large \\lim_{x\\rightarrow \\infty} \\frac{\\infty}{1} = \\infty}$"
        }
      </Latex>
    </p>
  </div>
</div>;
