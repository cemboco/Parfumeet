import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '../integrations/supabase/supabase';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    about: '',
    gender: '',
  });
  const [avatarUrl, setAvatarUrl] = useState('');

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

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const profileData = { ...profile, id: user.id, avatarUrl };

        // Here you would typically save the profile data to your backend
        // For demonstration, we'll just show the toast and navigate
        toast.success("Profil gespeichert");
        navigate('/profile-view', { state: { profile: profileData } });
      }
    } catch (error) {
      console.error('Error creating profile:', error.message);
      toast.error("Fehler beim Speichern des Profils");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md space-y-8 bg-white shadow-lg rounded-lg p-6 mt-20">
        <h2 className="text-2xl font-bold mb-4 text-center text-foreground">Erstelle dein Profil</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarUrl} alt="Profile" />
              <AvatarFallback>{profile.name ? profile.name[0].toUpperCase() : 'P'}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Profilbild</label>
            <Input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-1"
            />
          </div>
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
    </div>
  );
};

export default CreateProfile;
