import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import About from "../../components/about/About";
import Searchbar from "../../components/searchbar/Searchbar";
import './home.css'

const Home = () => {
  return (
    <div className="homePage">
      <Header />
      <Navbar />
      <Searchbar />
      <About />
      <Footer />
    </div>
  );
};

export default Home;
