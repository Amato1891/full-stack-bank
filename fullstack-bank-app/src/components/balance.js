import React from "react";
import Card from "./context";
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom'

function Balance(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');  
    let history = useHistory();
      function handleClick() {
        history.push("/login");
      };

    React.useEffect(()=> {
      // Push to login if not logged in
      if(!Cookies.get('loginData') && !Cookies.get('loggedInUser')) {
        handleClick()
    }}, []);
  
    return (
      <Card
        bgcolor="info"
        header="Balance"
        status={status}
        body={show ?
          <BalanceForm setShow={setShow} setStatus={setStatus}/> :
          <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
      />
    )
  
  }
  
  function BalanceMsg(props){
    return(<>
      <h5>Your Balance is :</h5>
    </>);
  }
  
  function BalanceForm(props){
    const [balance, setBalance] = React.useState(''); 
    const [loginData, setLoginData] =React.useState(
      Cookies.get('loginData')
      ? (JSON.parse(Cookies.get('loginData')))
      : (null)
    );
      let email;
      let uri;
   !loginData ? email = Cookies.get('email') : email = loginData.email;
   !loginData ? uri = `/account/findOne/${email}` : uri = `/account/googlefindOne/${email}`
  
    function handle(){
      fetch(uri)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setShow(false);
              setBalance(data.balance);
              props.setStatus(data.balance);
              // console.log('JSON:', data);
              // console.log('balance:', data.balance);
          } catch(err) {
              props.setStatus(text)
              // console.log('err:', text);
          }
      });
    }
  
    return (<>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>
          Check Balance
      </button>
    </>);
  }

  export default Balance;