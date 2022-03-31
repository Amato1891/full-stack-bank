import React from 'react';
import Card from "./context";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import './/loan.css';

function Loan() {
  const [loadAnimation, setLoadAnimation] = React.useState('');
  const [submitDisable, setSubmitDisable] = React.useState(true);
  const [income, setIncome]               = React.useState('');
  const [loanType, setLoanType]           = React.useState('');
  const [loanAmount, setLoanAmount]       = React.useState('');
  const [repayment, setRepayment]         = React.useState('');
  let email = Cookies.get('email');
  let token = Cookies.get('token');
  const [loginData, setLoginData]         =React.useState(
    Cookies.get('loginData')
    ? (JSON.parse(Cookies.get('loginData')))
    : (null)
  ); 

  let history = useHistory();
      function handleRedirect(route) {
        history.push(`/${route}`);
      };

    // Check for user on page load
    React.useEffect(()=> {
      // Push to login if not logged in
      if(!Cookies.get('loginData') && !Cookies.get('loggedInUser')) {
        handleRedirect('login')
    }},[])
  let apr;
  //console.log(JSON.stringify({loan:{income:income, loantype:loanType, loanamount:loanAmount, repayment: repayment}}))
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);

//JWT auth
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow' 
};

  const getApr = () => {
    let apr;
    if(income === '$5000.00 - $15,000') apr = .25;
    if(income === '$15000.00 - $45,000') apr = .20;
    if(income === '$45000.00 - $100,000.00') apr = .15;
    if(income === '$100,000.00+') apr = .10;
    return apr;
  };

  const getPayment = () => {
    let apr = getApr();
    let financeCharge = Number(loanAmount) * Number(apr);
    let totalCharge = loanAmount + financeCharge;
    let payment = totalCharge / repayment;
    payment = payment.toFixed(2);
    return payment;
  };

  const handle = () => {
    const url = `/account/update/${email}/${loanType}/${loanAmount}/${repayment || 'Monthly'}`;
       (async () => {
           var res = await fetch(url, requestOptions);
           console.log(res)
           var data = await res.json();
           console.log(data);
       })()
       setLoadAnimation('loading');
       setTimeout(() => handleRedirect('dashboard'), 3000);
  };

  const checked = (e) => {
    setSubmitDisable(!e.target.checked);
  };

  const enableButton = () => {
    if(loanType === 'Credit Card'){
    setSubmitDisable(false);
    console.log(' FIRED ')
  };
  };
    return(<>
  
   <div className={loadAnimation}></div>
   
        <h1>Loan department</h1>
        <div style={{padding:'25px', border:'5px solid white',display:"flex", maxWidth:"900px"}}>
      <Form>
      <div style={{padding:'10px', fontSize:'1.2em'}}>To apply for a loan through Gbank, you will have to fill out a short application.</div>
        <FormGroup>
          <Label for="name">Name:</Label>
          <div><b>{Cookies.get('name')}</b></div>
        </FormGroup>
        <FormGroup>
          <Label for="name">Contact Email:</Label>
          <div><b>{email}</b></div>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Household Income</Label>
          <Input type="select" name="income"  id="income" onChange={e => setIncome(e.target.value)} disabled={income} required>
            <option></option>
            <option id='lowIncome'>$5000.00 - $15,000</option>
            <option id='midIncome'>$15000.00 - $45,000</option>
            <option id='highIncome'>$45000.00 - $100,000.00</option>
            <option id='bestIncome'>$100,000.00+</option>
          </Input>
        </FormGroup>
        {income ? ( <FormGroup>
          <Label for="exampleSelect">Loan Type</Label>
          <Input type="select" name="loanType" id="loanType" onChange={e => setLoanType(e.target.value)} disabled={loanType} required>
            <option></option>
            <option>Auto</option>
            <option>Boat</option>
            <option>Home</option>
            <option>Credit Card</option>
          </Input>
        </FormGroup>) : ('')}


        {loanType === 'Credit Card' ? (<FormGroup>
        <Label for="loanAmount">Credit Limit Requested <small>(min. $500)</small></Label>
          <Input type="number" name="loanAmount" id="loanAmount" placeholder="Amount" min='500' onChange={e => setLoanAmount(Math.round(e.target.value))} onClick={()=>enableButton()} required/>
        </FormGroup>) : loanType ? (<FormGroup>
        <Label for="loanAmount">Amount Requested <small>(min. $500)</small></Label>
          <Input type="number" name="loanAmount" id="loanAmount" placeholder="Amount" min='500' onChange={e => setLoanAmount(Math.round(e.target.value))} required/>
        </FormGroup>) : ('')}

        {loanType === 'Credit Card' ? ('') : loanAmount >= 500 ? (<FormGroup>
          <Label for="exampleSelectMulti">Repayment Length <small>(Months)</small></Label>
          <Input type="select" name="repayment" id="repayment" value ={repayment || ''} onChange={e => setRepayment(e.target.value)} disabled={repayment} required>
            <option></option>
            <option>12</option>
            <option>24</option>
            <option>36</option>
            <option>48</option>
            <option>60</option>
          </Input>
        </FormGroup>) : ('')}
        {repayment ? (<FormGroup check>
        <Label check>
            <Input type="checkbox" id='checkOne' onChange={e => checked(e)} required />{' '}
            By checking this box, I agree the income information submitted is accurate.
          </Label><br/>
          <Label check>
            <Input type="checkbox" id='checkTwo' onChange={e => checked(e)} required/>{' '}
            By checking this box, I agree to pay back this loan in the time alloted per details of the loan, if not I will be subject to incremental fees.
          </Label>
        </FormGroup>) : ('')}
        <Button onClick={handle} disabled={submitDisable}>Apply</Button><hr/>
        {repayment ? (
          <div style={{height:'200px',border:'2px solid black', textAlign:'center', maxWidth:"250px",overflow:'hidden'}}>Est. payments:
          <div style={{padding:'35px', fontSize:'2em'}}>${getPayment()}<small>/mo</small></div>
          <div>APR:{getApr()}%</div>
          </div>
          ) : ('')}
      </Form>
        </div>
        </>)
}

export default Loan