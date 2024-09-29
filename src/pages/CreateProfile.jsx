import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '../integrations/supabase/supabase';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    about: '',
    gender: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);

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

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let profileData = { ...profile, id: user.id };

        if (profilePicture) {
          const fileExt = profilePicture.name.split('.').pop();
          const fileName = `${user.id}${Math.random()}.${fileExt}`;
          const { data, error } = await supabase.storage
            .from('profile-pictures')
            .upload(fileName, profilePicture);

          if (error) throw error;

          const { data: { publicUrl }, error: urlError } = supabase.storage
            .from('profile-pictures')
            .getPublicUrl(fileName);

          if (urlError) throw urlError;

          profileData.avatar_url = publicUrl;
        }

        const { error } = await supabase
          .from('profiles')
          .upsert(profileData);

        if (error) throw error;
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error creating profile:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md space-y-8 bg-white shadow-lg rounded-lg p-6 mt-20">
        <h2 className="text-2xl font-bold mb-4 text-center text-foreground">Erstelle dein Profil</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profilePicture ? URL.createObjectURL(profilePicture) : ''} />
              <AvatarFallback>PB</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profilbild</label>
            <Input
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
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