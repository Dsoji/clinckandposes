import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('snow@mailinator.com');
    const [password, setPassword] = useState('test123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            // If the user tries testing the default email and it's not created yet, automatically create it
            if (email === 'snow@mailinator.com' && (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential')) {
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                    return; // Successfully created and signed in
                } catch (createErr) {
                    setError('Failed to create default user. Please try again.');
                }
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-logo">
                    <span className="login-logo-text">C&amp;P</span>
                </div>
                <h1 className="login-title">Admin Access</h1>
                <p className="login-subtitle">Sign in to manage your portfolio</p>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="login-field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <a href="/" className="login-back-link">← Back to Site</a>
            </div>
        </div>
    );
};

export default AdminLogin;
