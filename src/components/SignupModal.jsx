import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '../integrations/supabase/supabase';

const SignupModal = ({ open, onOpenChange }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [signupStatus, setSignupStatus] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupStatus('loading');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      setSignupStatus('success');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setSignupStatus('error');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mach dich auf die Suche nach deinem Duft!</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-full"
            />
          </div>
          <Button type="submit" className="w-full rounded-full" disabled={signupStatus === 'loading'}>
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
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;