import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, MapPin, AlertTriangle, Plus, X, Settings, MessageSquare } from "lucide-react";
import SettingsDialog from '../components/SettingsDialog';
import { supabase } from '../integrations/supabase/supabase';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    about: "",
    gender: "",
    collection: [],
    avatar_url: ""
  });
  const [newPerfume, setNewPerfume] = useState({ name: "", image: "" });
  const [currentUser, setCurrentUser] = useState(null);

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

  const handleAddPerfume = () => {
    if (newPerfume.name.trim() !== "") {
      setProfile({
        ...profile,
        collection: [...profile.collection, { ...newPerfume, image: newPerfume.image || "/placeholder.svg" }]
      });
      setNewPerfume({ name: "", image: "" });
    }
  };

  const handleRemovePerfume = (index) => {
    const updatedCollection = profile.collection.filter((_, i) => i !== index);
    setProfile({ ...profile, collection: updatedCollection });
  };

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

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSendMessage = () => {
    console.log("Send message to:", profile.name);
    // Implement actual messaging functionality here
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
              onClick={handleSendMessage}
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
                <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
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

          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Über mich</h3>
            {isEditing ? (
              <Textarea
                name="about"
                value={profile.about}
                onChange={handleChange}
                className="w-full rounded-lg"
              />
            ) : (
              <p>{profile.about}</p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Profil-Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="font-medium">Geschlecht:</p>
                {isEditing ? (
                  <Input
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    className="rounded-full"
                  />
                ) : (
                  <p>{profile.gender}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Meine Sammlung</h3>
            <div className="grid grid-cols-3 gap-4">
              {profile.collection.map((item, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg relative">
                  <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2 rounded-lg" />
                  <p className="text-center">{item.name}</p>
                  {isEditing && (
                    <button
                      onClick={() => handleRemovePerfume(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
                  <Input
                    type="text"
                    value={newPerfume.name}
                    onChange={(e) => setNewPerfume({ ...newPerfume, name: e.target.value })}
                    placeholder="Neues Parfum"
                    className="mb-2 rounded-full"
                  />
                  <Input
                    type="text"
                    value={newPerfume.image}
                    onChange={(e) => setNewPerfume({ ...newPerfume, image: e.target.value })}
                    placeholder="Bild-URL"
                    className="mb-2 rounded-full"
                  />
                  <Button onClick={handleAddPerfume} className="w-full rounded-full">
                    <Plus className="w-4 h-4 mr-2" /> Hinzufügen
                  </Button>
                </div>
              )}
            </div>
          </div>

          {isOwnProfile && (
            isEditing ? (
              <Button onClick={handleSave} className="w-full rounded-full">Speichern</Button>
            ) : (
              <Button onClick={handleEdit} className="w-full rounded-full">Profil bearbeiten</Button>
            )
          )}
        </div>
      </div>
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </div>
  );
};

export default Profile;