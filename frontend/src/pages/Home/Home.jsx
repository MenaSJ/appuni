import Header from "../../Components/Header/Header"
import ExploreUnis from "../../Components/ExploreUnis/ExploreUnis";
import "./Home.css";
const Home = () => {
    return (
        <div className="home main-container">
            <Header />
            <ExploreUnis />
        </div>
    )
}

export default Home