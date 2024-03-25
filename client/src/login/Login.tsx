import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


interface LoginProps {
    login:(userid:string) => void
}
function Login({login}:LoginProps) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent form submission
    
        // Perform validation
        if (!name || !password) {
            setError('Please enter both username and password.');
            return;
        }
    
        // Make API call to authenticate user
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password, room:""})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid username or password.');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful login
            console.log('Login successful:', data);
            login(data.user.name)
            navigate('/home')
            // Redirect user or update state as needed
        })
        .catch(error => {
            // Handle login error
            setError(error.message);
        });
    }
    

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="username" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your username" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                                <div className="text-center">
                                    <Link to="/register" className="btn btn-link">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
