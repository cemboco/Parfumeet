import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import { supabase } from '../integrations/supabase/supabase';
import { MessageSquare, Settings } from 'lucide-react';

const Navbar = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', session.user.id)
          .single();
        setUser({ ...session.user, avatar_url: profile?.avatar_url });
      } else {
        setUser(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile }) => {
            setUser({ ...session.user, avatar_url: profile?.avatar_url });
          });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/Parfumeet.png" alt="Parfumeet Logo" className="h-20 w-auto" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/wie-es-funktioniert" className="text-gray-600 hover:text-gray-900">Wie es funktioniert</Link>
            <Link to="/kontakt" className="text-gray-600 hover:text-gray-900">Kontakt</Link>
            <Link to="/ueber-uns" className="text-gray-600 hover:text-gray-900">Über uns</Link>
            {!user ? (
              <>
                <Button variant="ghost" className="rounded-full" onClick={() => setIsSignupOpen(true)}>
                  Registrieren
                </Button>
                <Button className="rounded-full" onClick={() => setIsLoginOpen(true)}>
                  Anmelden
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Button className="rounded-full" onClick={handleLogout}>
                  Abmelden
                </Button>
                <Link to="/messages">
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/profile">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar_url} alt="Profile" />
                    <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <SignupModal open={isSignupOpen} onOpenChange={setIsSignupOpen} />
      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </nav>
  );
};

export default Navbar;