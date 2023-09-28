import LoginForm from '../components/LoginForm';
import frame from '/Frame 2.png'

const Home = () => {
    return ( 
        <div className="home">
            <img src={frame} />
            <div className="form-container">
            <LoginForm />
            </div>
        </div>
     );
}
 
export default Home;