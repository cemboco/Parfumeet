import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '../integrations/supabase/supabase';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const SignupModal = ({ open, onOpenChange, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupStatus, setSignupStatus] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupStatus('loading');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      setSignupStatus('success');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setSignupStatus('error');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Willkommen bei Parfumeet</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600 mb-6">Registriere dich, um deine Düfte zu teilen und neue zu entdecken.</p>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-Mail *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Passwort *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-midnight-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={signupStatus === 'loading'}
          >
            {signupStatus === 'loading' ? 'Registrierung läuft...' : 'Registrieren'}
          </Button>
        </form>
        {signupStatus === 'success' && (
          <p className="mt-4 text-green-600">
            Registrierung erfolgreich! Bitte überprüfen Sie Ihre E-Mail für den Bestätigungslink.
          </p>
        )}
        {signupStatus === 'error' && (
          <p className="mt-4 text-red-600">
            Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
          </p>
        )}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Bereits registriert? <a href="#" className="font-medium text-green-600 hover:text-green-500" onClick={onSwitchToLogin}>Anmelden</a>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;