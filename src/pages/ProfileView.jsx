import React from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";

const ProfileView = () => {
  const location = useLocation();
  const profile = location.state?.profile;

  if (!profile) {
    return <div className="text-center mt-20">No profile data available.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md space-y-8 bg-white shadow-lg rounded-lg p-6 mt-20">
        <h2 className="text-2xl font-bold mb-4 text-center text-foreground">Dein Profil</h2>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile.avatarUrl} alt="Profile" />
            <AvatarFallback>{profile.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold">{profile.name}</h3>
          {profile.location && (
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.gender && (
            <p className="text-gray-600">Geschlecht: {profile.gender}</p>
          )}
          {profile.about && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Über mich</h4>
              <p className="text-gray-600">{profile.about}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;