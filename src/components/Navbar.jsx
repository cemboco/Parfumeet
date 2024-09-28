import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import { supabase } from '../integrations/supabase/supabase';

const Navbar = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
              <Button className="rounded-full" onClick={handleLogout}>
                Abmelden
              </Button>
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