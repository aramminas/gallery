import React from "react";
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="footer-box">
                <span>© {(new Date()).getFullYear()}  Copyright:</span>
                <Link className="link" to={'/'}>WebCompany.com</Link>
            </div>
        </footer>
    );
}

export default Footer;


