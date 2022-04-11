import React from "react";
import { Link } from 'react-router-dom';
import Card from "./context";
import Cookies from 'js-cookie';
import './/login.css';
import { GoogleLogin } from 'react-google-login';

function Login(){
    const currentUser = Cookies.get('loggedInUser');
    return(<>
      {currentUser ? (<AfterLogin></AfterLogin>) : <LoginForm></LoginForm>}
        </>)
};

function AfterLogin(){
  return(<>{Cookies.get('loginData') ? (
    <div style={{padding:'25px'}}><div style={{padding:'25px', textAlign:'center', background:'red',border:'3px solid black'}}><h5>Accounts created with Google Login are not fully supported in the app yet. We are working to enable all features for Google accounts. Please logout and join with your email to access all the features of this app.</h5></div></div>) : (<>
    <h3 style={{textAlign:'center'}}>What would you like to do?</h3>
      <div className="link-container">
        <div className="link-item"><Link to="/deposit"> <button id = 'link-btn' type="submit" className="btn btn-dark" >Deposit Funds</button></Link></div>
        <div className="link-item"><Link to="/withdraw"> <button id = 'link-btn' type="submit"className="btn btn-dark" >Withdraw Funds</button></Link></div>
        <div className="link-item"><Link to="/balance"> <button id = 'link-btn' type="submit" className="btn btn-dark" >Transaction History</button></Link></div>
        <div className="link-item"><Link to="/dashboard"> <button id = 'link-btn' type="submit" className="btn btn-dark" >Dashboard</button></Link></div>
        <div className="link-item"><Link to="/loan"> <button id = 'link-btn' type="submit" className="btn btn-dark" >Loans</button></Link></div>
        </div>
  </>)}
  
  </>)
}

function LoginForm(props){
    const [email, setEmail]       =React.useState('');
    const [password, setPassword] =React.useState('');
    const [errorMsg, setErrorMsg] =React.useState('');
    const [loginData, setLoginData] =React.useState(
      Cookies.get('loginData')
      ? (JSON.parse(Cookies.get('loginData')))
      : (null)
    );

    let disable = true;
    if(email.length > 2 && password.length > 2) disable = false;

    function handle(){
      var expiration = new Date(new Date().getTime() + 60 * 60 * 1000);
      let lowerEmail = email.toLowerCase();
        fetch(`/account/login/${lowerEmail}/${password}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                //console.log('JSON:', data);
                Cookies.set('loggedInUser', true, { expires: expiration });
                Cookies.set('name', data.name, { expires: expiration });
                Cookies.set('email', data.email, { expires: expiration });
                Cookies.set('token', data.token, { expires: expiration });
                window.location.reload();
            } catch(err) {
                 setErrorMsg(text)
            }
        });
      };

      const handleFailure = (result) => {
        alert(JSON.stringify(result));
      };

      const handleLogin = (googleData) => {
        var expiration = new Date(new Date().getTime() + 60 * 60 * 1000);
         const googleUserData = {name:googleData.profileObj.givenName, email:googleData.profileObj.email, googleId:googleData.profileObj.googleId}
         Cookies.set('loginData',JSON.stringify(googleUserData), { expires: expiration });
         Cookies.set('loggedInUser', { expires: expiration })
         setLoginData(googleUserData);
         window.location.reload();
        googleUser();
  };

    const googleUser = () => {
      let parsedData = JSON.parse(Cookies.get('loginData'))
      //console.log(parsedData)
      const url = `/account/googlecreate/${parsedData.name}/${parsedData.email}/${parsedData.googleId}`;
       (async () => {
           var res = await fetch(url);
           //console.log(res)
          //  if(res.status === 400) return setErrors('This email is already registered to another user.');
           var data = await res.json();
           //console.log(data);
           props.setShow(false);
       })();
    }

    return(<>
<div className="container-login">
      <div className="wrapper">
      <small style={{color:'red', fontWeight:'bold', backgroundColor:'#ffcccb'}}>{errorMsg}</small>
        <div className="title"><span>Login To Your Account</span></div>
        <form>
          <div className="row">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Email" value={email}
        onChange={e => setEmail(e.currentTarget.value)} required/>
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" value={password}
        onChange={e => setPassword(e.currentTarget.value)} required/>
          </div>
          <div className="row button">
            <button id = 'submit-btn' onClick={handle} type="submit" disabled={disable}>Login</button>
          </div>
          <hr/>
          { loginData ? ('') : (
          <GoogleLogin
          clientId={'77760153420-mb0hci7u2tabpan5vdc0v76igcch724u.apps.googleusercontent.com'}
          buttonText='Log in with Google'
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
          ></GoogleLogin>
          )}
          <hr/>
          <div className="signup-link">Not a member? <Link id="create-account-link" to="/createaccount"> Sign up here.</Link></div>
        </form>
      </div>
    </div>
    </>);
};

export default Login;