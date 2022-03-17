import React from 'react';
import './App.css';
import { Route, HashRouter, Link, Switch } from "react-router-dom";
import NavBar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import CreateAccount from './components/createaccount';
import Balance from './components/balance';
import AllData from './components/alldata';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import Footer from './components/footer';
import Cookies from 'js-cookie';
let loggedInUser = Cookies.get('loggedInUser');

function Spa(){

  const [loginData, setLoginData] =React.useState(
    Cookies.get('loginData')
    ? (JSON.parse(Cookies.get('loginData')))
    : (null)
  );
    let name;
 !loginData ? name = Cookies.get('name') : name = loginData.name;

  return(
    <HashRouter>
    <NavBar loggedInUser={loggedInUser}/> 
    <div className ="container" style={{padding: "20px"}}></div>
    {loggedInUser || loginData ? (
           
           <div style={{position:'relative', color:'#ffffff', left:'55%',fontSize:'1.2rem'}}>{`Welcome, ${name || ''} `} 
        <Link to="/">
            <button className="btn btn-dark" onClick={()=>{
            Cookies.remove('name');
            Cookies.remove('email');
            Cookies.remove('loggedInUser');
            Cookies.remove('token');
            Cookies.remove('loginData');
            setLoginData(null);
            window.location.reload();
            }}>
            <i className="fa-solid fa-right-from-bracket"></i></button>
        </Link>
        </div>

           ) : ('')}


    <Switch>
    <Route exact path="/"><Home/></Route>
            <Route path="/login"><Login/></Route>
            <Route path="/CreateAccount"><CreateAccount/></Route>
            <Route path="/Balance"><Balance/></Route>
            <Route path="/AllData"><AllData/></Route>
            <Route path="/Deposit"><Deposit/></Route>
            <Route path="/Withdraw"> <Withdraw/></Route>
    </Switch>
    <Footer/>
  </HashRouter>
  )
};

export default Spa;
