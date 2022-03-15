import React from "react";
import Cookies from 'js-cookie';
import Card from "./context";
import {useHistory} from 'react-router-dom';

function Deposit(){
  const [balance,setBalance] = React.useState('');
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState(''); 
    const [loginData, setLoginData] =React.useState(
      Cookies.get('loginData')
      ? (JSON.parse(Cookies.get('loginData')))
      : (null)
    ); 

    let history = useHistory();
      function handleClick() {
        history.push("/login");
      };

    // Get account balance and check for user on page load
    React.useEffect(()=> {
      let balanceUri;
      let email;
      !loginData ? email = Cookies.get('email') : email = loginData.email;
      !loginData ? balanceUri = `/account/findOne/${email}` : balanceUri = `/account/googlefindOne/${email}`;
      // Push to login if not logged in
      if(!Cookies.get('loginData') && !Cookies.get('loggedInUser')) {
        handleClick()
    }
    // Get account balance
    fetch(balanceUri)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            setBalance(data.balance);
            console.log('JSON:', data);
            console.log('balance:', data.balance);
        } catch(err) {
            console.log('err:', err);
        }
    });
  
  }, []);
  
    return (
      <Card
        bgcolor="success"
        header={<div>
        <h5>Deposit</h5>
          <div style={{border:'solid 1px white', borderRadius:'3px'}}>
          {`Balance: ${balance}`}
          </div>
        </div>}
        status={status}
        body={show ? 
          <DepositForm setShow={setShow} setStatus={setStatus} balance={balance} setBalance={setBalance}/> :
          <DepositMsg setShow={setShow} setStatus={setStatus}/>}
      />
    )
  }
  function DepositMsg(props){
    return (<>
      <h5>Cha-Ching!</h5>
      <button type="submit" 
        className="btn btn-dark" 
        onClick={() => {
            props.setShow(true);
            props.setStatus('');
        }}>
          Make Another Deposit
      </button>
    </>);
  } 
  
  function DepositForm(props){
       const [amount, setAmount] = React.useState('');
       const [loginData, setLoginData] =React.useState(
        Cookies.get('loginData')
        ? (JSON.parse(Cookies.get('loginData')))
        : (null)
      );
        let email;
        let uri;
     !loginData ? email = Cookies.get('email') : email = loginData.email;
     !loginData ? uri = `/account/update/${email}` : uri = `/account/googleupdate/${email}`

       let invalidTransaction = true;
       if(amount >= 1) invalidTransaction = false;
       if(amount < 1) invalidTransaction = true;

    function handle(){
      let depositAmount = Number(amount);
      if(depositAmount < 1)return
      fetch(`${uri}/${depositAmount}`)
      .then(response => response.text())
      .then(text => {
          try {
            const data = JSON.parse(text);
              props.setStatus('Success');
              props.setShow(false);
              console.log('JSON:', data);
              props.setBalance(props.balance + depositAmount)
          } catch(err) {
              props.setStatus('Deposit failed')
              console.log('err:', text);
          }
      });
    }
  
    return(<>
    
      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-dark" 
        onClick={handle}
        disabled={invalidTransaction}
        >Deposit</button>
  
    </>);
  };

  export default Deposit;