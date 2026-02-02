import { useState } from 'react';

import Information from './Information';
import Results from './Results';

import './App.css'

function App() {
  const initialState = {
    amount: '',
    term: '',
    rate: '',
    type: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [ submitted, setSubmitted ] = useState(false);
  const [ mortgageCost, setMortgageCost ] = useState(0);
  const [ totalMortgageCost, setTotalMortgageCost ] = useState(1);

  return (
    <div className='container'>
      <div className='container-flex'>
        <Information 
        formData={formData} 
        setFormData={setFormData}  
        setSubmitted={setSubmitted} 
        mortgageCost={mortgageCost} 
        setMortgageCost={setMortgageCost} 
        setTotalMortgageCost={setTotalMortgageCost}>
        </Information>

        <Results 
        submitted={submitted} 
        mortgageCost={mortgageCost} 
        totalMortgageCost={totalMortgageCost}>
        </Results>
      </div>
    </div>
  )
}

export default App
