import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Parfumeet
            </Link>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" className="mr-2">
              Sign Up
            </Button>
            <Button>
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;