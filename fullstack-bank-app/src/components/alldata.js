import React from "react";
import Cookies from 'js-cookie';

function AllData(){
    const [data,setData] = React.useState('');
    const token = Cookies.get('token')
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);

//JWT auth
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow' 
};

    React.useEffect(()=> {
        // fetch all accounts from API
        fetch("/account/all", requestOptions)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setData(data)
        });
    }, []);

    return(<>
    {data.length < 1 ? (<>
        <h1>All Customer Data</h1>
        <div style={{width:'100%', height:'100%',backgroundColor:'red', padding:'150px'}}>
        <h4>To view the data on this page, you must have admin permissions.</h4>
        </div>
    </>) : (<>
        <h1>All Customer Data</h1>
        <table className="table table-sm table-dark" style={{height:'500px', border:'1px groove white'}}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Balance</th>
      <th scope="col">Permissions</th>
    </tr>
  </thead>
  <tbody>
    {data.map((user,i) => {
        return(
        <tr key={i}>
      <td>{i + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>${user.balance}</td>
      <td>{user.scopes || 'user'}</td>
        </tr>)
    })}
  </tbody>
</table>
    </>)}
    </>)
};

export default AllData;