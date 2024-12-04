import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'

function HomePage() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, password }),
            });

            const data = await response.json();
            console.log(data)

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('userId', data.userId);

            navigate('/InventoryHome');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div>
                <h3>Hello, please login to continue:</h3>
            </div>
            <form onSubmit={handleLogin}>
                <div>
                    <p>Username:</p>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    <p>Password:</p>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <br />
                    
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Log In</button>
            </form>
            <br />
            <Link to='/CreateAccount'>Create Account</Link>
            <Link to='/VisitorPage'>Continue as guest</Link>
        </>
    )

}

export default HomePage;