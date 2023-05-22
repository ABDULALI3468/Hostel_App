const Header = () => {
  return (
    <section id="hero" className="hero">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <a className="hero-brand" href="/" title="Home">
              <img alt="Logo" src="https://bizzy.org/_next/image?url=https%3A%2F%2Fbizzy.ams3.digitaloceanspaces.com%2Fprod%2Fcompanies%2Fbe%2Flogos%2Feb0dfadf-e8cd-427a-9a37-68bed6e72ca6%2F1155365443.png&w=256&q=75" />
            </a>
          </div>
        </div>
        <div className="col-md-12">
          <h1>Fast &amp; Easy Way To Rent A Room</h1>
          <p className="tagline">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts</p>
          <a className="btn btn-full scrollto" href="#about">
            Reserve Your Perfact Room
          </a>
        </div>
      </div>
    </section>
  );
};

export default Header;
