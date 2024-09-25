// pages/auth.js
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useRouter } from 'next/router';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setError(error.message);
    else {
      setMessage('Sign-up successful! Please check your email for confirmation.');
      router.push('/');
    }
  };

  const handleSignIn = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) setError(error.message);
    else router.push('/protected');
  };

  return (
    <div>
      <h1>Authentication</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}
