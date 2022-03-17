import Card from "./context";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

function Home(){
  const activeUser = Cookies.get('loggedInUser');
    return (
      <Card
        bgcolor="danger"
        txtcolor="white"
        header="Fullstack Bank"
        title={activeUser ? ('') : (<div><Link style={{fontWeight:'bold', background:'-webkit-linear-gradient(rgba(26,188,156,0.3), #000000)', WebkitBackgroundClip: 'text', WebkitTextFillColor:'transparent'}} id="login-link" to="/login">Login</Link> to start a transaction.</div>)}
        text={activeUser ? ('') : (<span>Dont have an account? <Link style={{fontWeight:'bold', background:'-webkit-linear-gradient(rgba(26,188,156,0.3), #000000)', WebkitBackgroundClip: 'text', WebkitTextFillColor:'transparent'}} id="create-account-link" to="/createaccount"> Create one here.</Link></span>)}
        body={(<img src="https://static.thenounproject.com/png/92146-200.png" className="img-fluid" alt="Responsive image"/>)}
      />
    );  
  }
  
  export default Home;