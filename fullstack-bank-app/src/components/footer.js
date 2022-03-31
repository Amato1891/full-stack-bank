import React from "react";
import './/footer.css'

function Footer() {
    return(<>
        <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">We are a small local bank located in Tampa, FL . Our mission it to help <b>EVERYONE</b> accomplish their financial goals.</p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Contribute</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved by<br/> 
         <a href="#">Jim Amato</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="https://www.facebook.com/james.amato.3"><i className="fa fa-facebook"></i></a></li>
              <li><a className="twitter" href="https://twitter.com/The_Amato1891"><i className="fa fa-twitter"></i></a></li>
              <li><a className="linkedin" href="https://www.linkedin.com/in/jim-amato-webdev/"><i className="fa fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
   </> )
}

export default Footer;