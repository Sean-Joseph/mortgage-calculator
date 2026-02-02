import { faSterlingSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ResultsProps = {
  submitted:boolean;
  mortgageCost: number;
  totalMortgageCost: number;
};

export default function Results({ submitted, mortgageCost, totalMortgageCost}: ResultsProps) {

    return (
      submitted ?  <>
      <div className="results">
        <h1>Your Results</h1>
        <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
        <div className="resultsCard">
            <p>Your monthly repayments</p>
          <p><FontAwesomeIcon icon={faSterlingSign} />
          {mortgageCost.toLocaleString('en-US')}</p>
          <hr />
          <p>Total you'll repay over the term</p>
          <p><FontAwesomeIcon icon={faSterlingSign} />{totalMortgageCost.toLocaleString("en-US")}</p>
        </div>
      </div>
      </> : 
      ( <div className="results">
          <img className="calculator" src="/calculator.png" />
          <div>
            <h1>Results shown here</h1>
            <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
          </div>
        </div> )
    )
  }