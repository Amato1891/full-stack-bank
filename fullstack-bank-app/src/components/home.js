import Card from "./context";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import './/home.css'

function Home(){
  const activeUser = Cookies.get('loggedInUser');
    return (
     
      <div className="container">
        <div style={{textAlign:'center'}}>
        <h1>Your life. Your finances.</h1>
        <p style={{fontFamily: "Times New Roman", fontSize:'1.3rem'}}>GBANK has the tools you need to help take charge of your financial life. </p>
      <img src="https://media.istockphoto.com/photos/3d-rendering-of-corporate-buildings-with-sunlight-picture-id1135793300?k=20&m=1135793300&s=612x612&w=0&h=XU0lLtVZCpQ632IiLuOKFYgevQvEC6Gvx5rCondfFXI=" width='70%'/>
      <div className="services-container">
      <div>
      <h5>You have financial needs and we've got you covered!</h5>
      <ul className='service-description'>
        <li>100% free checking accounts.</li>
        <li>Bad credit? No credit? No problem! We offer credit cards to everyone of all credit scores and we have competitive rates!</li>
        <li>Loans for all of lifes major purchases like cars,boats,homes and more!</li>
      </ul>
      </div>
            <ul className="services-icons">
            Checkings Account<br/>
              <li><Link to="/dashboard"><a className="checking" href="/"><i className="fa-solid fa-money-check-dollar"></i></a></Link></li>
              <hr/>Credit Cards<br/>
              <li><Link to="/loan"><a className="credit-card" href="/"><i className="fa-solid fa-credit-card"></i></a></Link></li>
              <hr/>Loans<br/>
              <li><Link to="/loan"><a className="loan"><i className="fa-solid fa-landmark"></i></a></Link></li>   
            </ul>
          </div>
        </div>
        <div style={{fontSize:'.8rem'}}>
          <h5>Disclosures</h5>
          <b><h6>Investment and Insurance Products:</h6>
• Are Not FDIC or any other Government Agency Insured • Are Not Bank Guaranteed • May Lose Value</b><br/>

<p>Services provided by the following affiliates of GBank Financial Corporation (GBank): Banking products and services, including loans and deposit accounts, are provided by GBank Bank, Member FDIC. Trust and investment management services are provided by GBank Bank, and GBank Delaware Trust Company. Securities, brokerage accounts and /or insurance (including annuities) are offered by GBank Investment Services, Inc., and P.J. Robb Variable Corp., which are SEC registered broker-dealers, members FINRA SIPC and a licensed insurance agency where applicable. Investment advisory services are offered by GBank Advisory Services, Inc., GFO Advisory Services, LLC, Sterling Capital Management, LLC, and Precept Advisory Group, LLC, each SEC registered investment advisers. Sterling Capital Funds are advised by Sterling Capital Management, LLC. Insurance products and services are offered through McGriff Insurance Services, Inc. Life insurance products are offered through GBank Life Insurance Services, a division of Crump Life Insurance Services, Inc., AR license #100103477. Both McGriff and Crump are wholly owned subsidiaries of GBank Insurance Holdings, Inc.</p><br/>

<b>Mortgage products and services are offered through GBank.</b> All GBank mortgage professionals are registered on the Nationwide Mortgage Licensing System & Registry (NMLS), which promotes uniformity and transparency throughout the residential real estate industry. Search the NMLS Registry.<br/>

Comments regarding tax implications are informational only. GBank and its representatives do not provide tax or legal advice. You should consult your individual tax or legal professional before taking any action that may have tax or legal consequences.<br/>

<b>"GBank Advisors"</b> may be officers and/or associated persons of the following affiliates of GBank, GBank Investment Services, Inc., and/or GBank Advisory Services, Inc. GBank Wealth, International Wealth, Center for Family Legacy, Business Owner Specialty Group, Sports and Entertainment Group, and Legal and Medical Specialty Groups are trade names used by GBank Bank, GBank Investment Services, Inc., and GBank Advisory Services, Inc.<br/>

<b>GBank Securities</b> is a trademark of GBank Financial Corporation. GBank Securities is a trade name for the corporate and investment banking services of GBank Financial Corporation and its subsidiaries. All rights reserved. Securities and strategic advisory services are provided by GBank Securities, Inc., member FINRA and SIPC. Lending, financial risk management, and treasury management and payment services are offered by GBank Bank. Deposit products are offered by GBank Bank.<br/>

<b>Limited English Proficiency Support</b>
Borrowers with Limited English Proficiency (LEP) needing information can use the following resources:

The Consumer Financial Protection Bureau (CFPB) offers help in more than 180 languages, call 855-411-2372 from 8 a.m. to 8 p.m. ET, Monday through Friday for assistance by phone.
CFPB additional resources for homeowners seeking payment assistance in 7 additional languages: Spanish, Traditional Chinese, Vietnamese, Korean, Tagalog, and Arabic.
www.consumerfinance.gov/coronavirus/mortgage-and-housing-assistance/help-for-homeowners/

        </div>
      </div>

);  
  }
  
  export default Home;