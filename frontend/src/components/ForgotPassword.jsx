import frame from '/Frame 2.png'

const ForgotPassword = () => {
    return ( 
        <div className="home">
            <img src={frame} />
            <div className="form-container">
                <form>
                    <h3>Forgot Password</h3>
                    <p>Enter your email address below</p>
                    <input type="email" required />
                    <button>Continue</button>
                </form>
            </div>
        </div>
     );
}
 
export default ForgotPassword;