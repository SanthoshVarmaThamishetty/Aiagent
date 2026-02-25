import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AuthPage from './AuthPage';
import ChatPage from './ChatPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{color:'white',padding:'2rem'}}>Loading...</div>;
  return user ? <ChatPage user={user} /> : <AuthPage />;
}