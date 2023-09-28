import { Link } from "react-router-dom";

const Footer = () => {

    const Copyright = String.fromCodePoint(0x00A9)

  return (
    <footer>
        <Link to='/about-us'>About us</Link>
        <Link to='/PrivacyStatment'>Privacy Statment</Link>
       <strong><p>Copyright {Copyright}2023 Acuntoz, All rights reserved</p></strong>
    </footer>
  )
};

export default Footer;
