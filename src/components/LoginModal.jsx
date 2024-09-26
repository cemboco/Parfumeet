import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Google } from "lucide-react";

const LoginModal = ({ open, onOpenChange }) => {
  const handleGoogleSignIn = () => {
    // Implement Google sign-in logic here
    console.log("Google sign-in clicked");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Welcome Back</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          <p className="text-center text-gray-600">Choose a method to log in</p>
          <Button 
            onClick={handleGoogleSignIn} 
            className="w-full max-w-sm flex items-center justify-center space-x-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          >
            <Google className="w-5 h-5" />
            <span>Continue with Google</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;