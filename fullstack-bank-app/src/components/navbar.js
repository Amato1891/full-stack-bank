import React from "react";
function NavBar(props){

    const [loggedInUser,setLoggedInUser] = React.useState(props.loggedInUser);
  
      return(<>{ loggedInUser ? (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#"><i className="fa fa-home"></i></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="#/deposit">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="#/withdraw">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="#/balance">Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="#/alldata">All Data</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
      ) : (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <a className="navbar-brand" href="#"><i className="fa fa-home"></i></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#/CreateAccount">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login">Login</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
      )}
  </>);
  };
      
  export default NavBar;