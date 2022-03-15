import React from "react";
import { Link } from 'react-router-dom';
import Card from "./context";
import Cookies from 'js-cookie';

function CreateAccount(){

    const[show,setShow] = React.useState(true);
    const[status,setStatus] = React.useState('');
    return(<> {show ? (
        <CreateForm setShow={setShow} setStatus={setStatus}/>
    ) : (
        <CreateMsg setShow={setShow} setStatus={setStatus}/>
    )
    }</>)
};

function CreateMsg(props){
    return(<>
    <Card
        bgcolor="success"
        header="Account Creation Success"
        body={<Link id="login-link" to="/login"> <button type="submit" className="btn btn-dark" >Login to your account</button></Link>}
      /> 
</>);
};

function CreateForm(props){
    const [name, setName]                     =React.useState('');
    const [email, setEmail]                   =React.useState('');
    const [password, setPassword]             =React.useState('');
    const [verifyPassword, setVerifyPassword] =React.useState('');
    const [errors, setErrors]                 =React.useState('');
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    

    function handle(){
        if(name.length < 2) return setErrors('Name cannot be left blank');
        if(email.length < 2) return setErrors('Email cannot be left blank');
        if(password.length < 2) return setErrors('Password cannot be left blank');
        if(password.length < 8) return setErrors('Password must be atleast 8 characters');
        if(!emailRegex.test(email)) return setErrors('Invalid Email');
        if(password !== verifyPassword) return setErrors('Passwords do not match');
       const url = `/account/create/${name}/${email}/${password}`;
       (async () => {
           var res = await fetch(url);
           console.log(res)
           if(res.status === 400) return setErrors('This email is already registered to another user.');
           var data = await res.json();
           console.log(data);
           props.setShow(false);
       })();
    }

    return(<>

<div className="container-login">
      <div className="wrapper">
      <small style={{color:'red', fontWeight:'bold', backgroundColor:'#ffcccb'}}>{errors}</small>
        <div className="title"><span>Sign Up</span></div>
        <form>
        <div className="row">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Name" value={name}
        onChange={e => setName(e.currentTarget.value)} required/>
          </div>
          <div className="row">
            <i className="fas fa-envelope"></i>
            <input type="text" placeholder="Email" value={email}
        onChange={e => setEmail(e.currentTarget.value)} required/>
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" value={password}
        onChange={e => setPassword(e.currentTarget.value)} required/>
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Confirm Password" value={verifyPassword}
        onChange={e => setVerifyPassword(e.currentTarget.value)} required/>
          </div>
          <div className="row button">
            <button id = 'submit-btn' onClick={handle} type="submit">Create Account</button>
          </div>
          <div className="signup-link">Already registered? <Link id="login-link" to="/login"> Login here.</Link></div>
        </form>
      </div>
    </div>
    </>);
}

export default CreateAccount;