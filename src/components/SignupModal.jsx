import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '../integrations/supabase/supabase';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name muss mindestens 2 Zeichen lang sein" }),
  email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
  password: z.string().min(6, { message: "Passwort muss mindestens 6 Zeichen lang sein" }),
});

const SignupModal = ({ open, onOpenChange, onSwitchToLogin }) => {
  const [signupStatus, setSignupStatus] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const validateForm = (data) => {
    // The form is already validated by react-hook-form and zod
    // This function can be used for any additional custom validation if needed
    return true;
  };

  const handleSubmit = async (data, e) => {
    e.preventDefault();
    if (!validateForm(data)) return;

    setSignupStatus('loading');

    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { name: data.name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Detailed error:', error);
        throw error;
      }

      if (authData.user) {
        setSignupStatus('success');
      } else {
        // This case handles when data.user is null but no error was thrown
        console.error('No user data returned:', authData);
        setSignupStatus('error');
      }
    } catch (error) {
      console.error('Error signing up:', error.message, error.status);
      setSignupStatus('error');
      // Display more specific error message
      alert(`Fehler bei der Registrierung: ${error.message}`);
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name *</Label>
            <Input
              id="name"
              type="text"
              {...register('name')}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-Mail *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Passwort *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register('password')}
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
