import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/common/Logo';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== passwordConfirm) {
            return setError("Passwords do not match");
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password, name);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create an account. ' + err.message);
        }

        setLoading(false);
    }

    return (
        <div className="page-container auth-page-bg" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: '100px', paddingBottom: '2rem' }}>
            <div style={{ background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', width: '100%', maxWidth: '450px', margin: 'auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Link to="/" style={{ display: 'flex' }}><Logo width={100} /></Link>
                    <h2 style={{ color: 'var(--primary-dark)', marginTop: '0', fontSize: '1.8rem', textAlign: 'center' }}>Get Started</h2>
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '1.5rem' }}>Create an account to track expenses</p>
                </div>

                {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--primary-dark)', fontWeight: 600 }}>Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '1rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--primary-dark)', fontWeight: 600 }}>Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '1rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--primary-dark)', fontWeight: 600 }}>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '1rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--primary-dark)', fontWeight: 600 }}>Confirm Password</label>
                        <input
                            type="password"
                            required
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '1rem' }}
                        />
                    </div>
                    <button disabled={loading} type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '1rem' }}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary-light)', fontWeight: 600 }}>Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
