import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { QrCode, Mail, Lock, User, Chrome } from 'lucide-react';
import '../styles/Landing.css';

const Landing = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup, login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/create');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await googleSignIn();
      navigate('/create');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="landing-container">
      <div className="landing-left">
        <div className="landing-content">
          <div className="logo-section">
            <QrCode size={40} color="#0ea5e9" />
            <h1>vCard QR</h1>
          </div>
          <h2>Create Professional Digital Business Cards</h2>
          <p>Generate QR codes for your contact information. Share your details instantly with anyone, anywhere.</p>
          
          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>Instant QR Code Generation</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>Customizable Design</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>Save & Manage Cards</span>
            </div>
          </div>
        </div>
      </div>

      <div className="landing-right">
        <div className="auth-card">
          <h3>{isSignUp ? 'Create Account' : 'Welcome Back'}</h3>
          <p className="auth-subtitle">
            {isSignUp ? 'Sign up to start creating vCards' : 'Sign in to your account'}
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="input-group">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="input-group">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button onClick={handleGoogleSignIn} className="btn-google" disabled={loading}>
            <Chrome size={20} />
            Continue with Google
          </button>

          <p className="toggle-auth">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
