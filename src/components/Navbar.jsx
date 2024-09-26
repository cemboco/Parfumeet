import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LoginModal from './LoginModal';

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/Parfumeet.png" alt="Parfumeet Logo" className="h-20 w-auto" />
            </Link>
          </div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="mr-2 rounded-full"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Sign Up
            </Button>
            <Button className="rounded-full">
              Login
            </Button>
          </div>
        </div>
      </div>
      <LoginModal open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
    </nav>
  );
};

export default Navbar;