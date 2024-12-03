import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function CreateAccount() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) {
            return;
        }

        if (!userName || !password) {
            setMessage('All fields are required.');
            return;
        }
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/createAccount', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message}`);
                setLoading(false);
                return;
            }

            const data = await response.json();
            setMessage('Account created successfully!');
            console.log('Success:', data);

            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Network error:', error);
            setMessage('An unexpected error occurred.');
            setLoading(false);
        }
    };

    return (
        <div className="create-acount-page">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateAccount;