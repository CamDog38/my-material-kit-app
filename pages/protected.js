// pages/protected.js
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useRouter } from 'next/router';

export default function Protected() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!_event.includes('SIGNED_IN')) {
        router.push('/auth');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, [router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {user.email}!</p>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </div>
  );
}
