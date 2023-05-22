const Footer = () => {
  return (
    <footer className="site-footer">
  <div className="bottom">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-xs-12 text-lg-start text-center">
          <p className="copyright-text">
            © Copyright <strong>{new Date().getFullYear()}</strong>. All Rights Reserved
          </p>
        </div>
        <div className="col-lg-6 col-xs-12 text-lg-right text-center">
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="index.html">Home</a>
            </li>
            <li className="list-inline-item">
              <a href="#about">About Us</a>
            </li>
            <li className="list-inline-item">
              <a href="#features">Features</a>
            </li>
            <li className="list-inline-item">
              <a href="#portfolio">Portfolio</a>
            </li>
            <li className="list-inline-item">
              <a href="#team">Team</a>
            </li>
            <li className="list-inline-item">
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="header-social-links d-flex align-items-center">
      <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
      <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
      <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
      <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
    </div>
      </div>
    </div>
  </div>
</footer>


  );
};

export default Footer;
