import { useState, type ChangeEvent, type FormEvent } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { faPercent } from "@fortawesome/free-solid-svg-icons/faPercent";
import { faSterlingSign } from "@fortawesome/free-solid-svg-icons/faSterlingSign";

type FormData = {
    amount: string;
    term: string;
    rate: string;
    type: string;
  };
  
  type InfoProps = {
    formData: FormData;
    mortgageCost: number;
    setTotalMortgageCost:React.Dispatch<React.SetStateAction<number>>;
    setMortgageCost:React.Dispatch<React.SetStateAction<number>>;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  };

  type FormErrors = {
    amount?: string;
    term?: string;
    rate?: string;
  };

export default function Information({formData, setFormData, setSubmitted, mortgageCost, setMortgageCost, setTotalMortgageCost}: InfoProps) {

const [errors, setErrors] = useState<FormErrors>({});
const [ isFocused, setIsFocused ] = useState(false);

  // Clears the form
  function clearForm() {
    (setFormData({ amount: '', term: '', rate: '', type: '' }));
    setSubmitted(false);
  }

   // Handles Focus
   function handleFocus() {
   setIsFocused(true);
  }

  // Handles input changes
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Handles form submission
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!formData.amount) {
      newErrors.amount = "This field is required";
    }
  
    if (!formData.term) {
      newErrors.term = "This field is required";
    }
  
    if (!formData.rate) {
      newErrors.rate = "This field is required";
    }
  
    // stop if errors exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // clear errors if valid
    setErrors({});

    const principal = Number(formData.amount);
    const mortgageTerm = Number(formData.term);
    const annualRate = Number(formData.rate)/100;
    const monthlyRate = annualRate/12;
    const numOfPayments = mortgageTerm * 12;

    mortgageCost = (principal * monthlyRate * Math.pow(1 + monthlyRate, numOfPayments)) /
    (Math.pow(1 + monthlyRate, numOfPayments) - 1);

    setTotalMortgageCost((Math.floor(mortgageCost*12*mortgageTerm*100))/100);

    setMortgageCost((Math.floor(mortgageCost*100))/100);

    setSubmitted(true);
  }

  return (
    <div className="information">
      <div className="headerForm">
        <h1>Mortgage Calculator</h1>
        <button type="button" onClick={clearForm}>Clear All</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="amount">Mortgage Amount</label>
          <div className="wrap">
            <div className={ errors.amount ? 'icon-wrap-error' : 'icon-wrap'}>
                <FontAwesomeIcon icon={faSterlingSign} />              
            </div>
            {errors.amount ? <p className="errorText">This field is required</p>: <></>}  
            <input 
                type="number" 
                name="amount" 
                id="amount" 
                min={0} 
                value={formData.amount}
                onChange={handleChange}
                onFocus={handleFocus}
                />
           </div>
        </div>
        <div className="term-rate">
            <div className="terms-rates">
                <label htmlFor="term">Mortgage&nbsp;Term</label>
                <div className="wrap term-wrap">
                    <div className={errors.rate ? 'icon-wrap-error-terms' : 'icon-wrap'}>
                        <p>years</p>
                    </div>
                {errors.term ? <p className="errorText">This field is required</p>: <></>}  
                <input 
                type="number" 
                name="term" 
                id="term" 
                value={formData.term}
                onChange={handleChange}
                />
                </div>
            </div>
            <div className="terms-rates">
                <label htmlFor="rate">Interest Rate</label>
                <div className="wrap interest-wrap">
                    <div className={errors.rate ? 'icon-wrap-error-terms' : 'icon-wrap'}>
                        <FontAwesomeIcon icon={faPercent} />
                    </div>
                {errors.rate ? <p className="errorText">This field is required</p>: <></>}  
                <input 
                    type="number" 
                    name="rate" 
                    id="rate"
                    value={formData.rate} 
                    onChange={handleChange}
                    />
                </div>
            </div>
        </div>
        <div className="mortgageType">
          <label>Mortgage Type</label>
          <div className="repaymentType">
            <input 
              type="radio" 
              name="type" 
              value="repayment"
              checked={formData.type === "repayment"}
              onChange={handleChange}
            />
            <span>Repayment</span>
          </div>
          <div className="repaymentType">
            <input 
              type="radio" 
              name="type" 
              value="interest"
              checked={formData.type === "interest"}
              onChange={handleChange}
            />
            <span>Variable</span>
          </div>
        </div>
        <div className="repayment">
            <FontAwesomeIcon icon={faCalculator} />
            <button type="submit" className="">Calculate Repayments</button>
        </div>
      </form>
    </div>
  );
}