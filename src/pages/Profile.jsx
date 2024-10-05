import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, MapPin, AlertTriangle, Plus, X, Settings, MessageSquare } from "lucide-react";
import SettingsDialog from '../components/SettingsDialog';
import MessageModal from '../components/MessageModal';
import { supabase } from '../integrations/supabase/supabase';
import { useNavigate } from 'react-router-dom';
import ProfileDetails from '../components/ProfileDetails';
import ProfileCollection from '../components/ProfileCollection';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    location: "",
    about: "",
    gender: "",
    collection: [],
    avatar_url: ""
  });
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchCurrentUser();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setProfile(data);
      }
    }
  };

  const fetchCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, ...profile });

      if (error) {
        console.error('Error updating profile:', error);
      } else {
        setIsEditing(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAvatarChange = async (e) => {
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    const { data: { user } } = await supabase.auth.getUser();
    if (file && user) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Error uploading avatar:', uploadError);
      } else {
        const { data: { publicUrl }, error: urlError } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        if (urlError) {
          console.error('Error getting public URL:', urlError);
        } else {
          setProfile({ ...profile, avatar_url: publicUrl });
          const { error: updateError } = await supabase
            .from('profiles')
            .upsert({ id: user.id, avatar_url: publicUrl });

          if (updateError) {
            console.error('Error updating profile with new avatar:', updateError);
          }
        }
      }
    }
  };
  };

  const isOwnProfile = currentUser && profile.id === currentUser.id;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-grow w-full max-w-2xl mx-auto p-4 pt-8 relative">
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="h-6 w-6" />
          </Button>
          {!isOwnProfile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMessageModalOpen(true)}
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-start mb-6">
            <div className="relative mr-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar_url} alt="Profilbild" />
                <AvatarFallback>{profile.name ? profile.name[0].toUpperCase() : 'P'}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <label htmlFor="avatar" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                  <Input
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
              <div className="flex items-center text-gray-600 mb-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center text-yellow-500">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span>Nicht verifiziert</span>
              </div>
            </div>
          </div>

          <ProfileDetails profile={profile} isEditing={isEditing} handleChange={handleChange} />
          <ProfileCollection profile={profile} isEditing={isEditing} setProfile={setProfile} />

          {isOwnProfile && (
            <Button 
              onClick={isEditing ? handleSave : handleEdit} 
              className="w-full rounded-full mt-4"
            >
              {isEditing ? 'Änderungen speichern' : 'Profil bearbeiten'}
            </Button>
          )}
        </div>
      </div>
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      <MessageModal
        open={isMessageModalOpen}
        onOpenChange={setIsMessageModalOpen}
        recipientId={profile.id}
        recipientName={profile.name}
      />
    </div>
  );
};

export default Profile;
