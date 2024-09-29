import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '../integrations/supabase/supabase';

const CreateProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    about: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleGenderChange = (value) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      gender: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .upsert({ id: user.id, ...profile });

        if (error) throw error;
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error creating profile:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background p-4 pt-24">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Seite 2: Erstelle dein Profil</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={profile.name}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Standort</label>
          <Input
            id="location"
            name="location"
            type="text"
            value={profile.location}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-700">Über mich</label>
          <Textarea
            id="about"
            name="about"
            value={profile.about}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Geschlecht</label>
          <Select onValueChange={handleGenderChange} value={profile.gender}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Wähle dein Geschlecht" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Männlich</SelectItem>
              <SelectItem value="female">Weiblich</SelectItem>
              <SelectItem value="other">Divers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full rounded-full">Profil erstellen</Button>
      </form>
    </div>
  );
};

export default CreateProfile;