import { Link } from "react-router-dom";
import CreateAccount from "./CreateAccount";

function HomePage() {

return (
    <>
        <div>
            <h3>Hello, please login to continue:</h3>
        </div>
        <div>
            <p>Username:</p>
            <input type="text" placeholder="Username"/>
            <p>Password:</p>
            <input type="text" placeholder="Password"/>
            <br />
            <Link to='/CreateAccount'>Create Account</Link>
        </div>
    </>
)

}

export default HomePage;