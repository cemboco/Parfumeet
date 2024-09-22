import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, MapPin, AlertTriangle } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Cemil Bocohonsi",
    location: "Berlin, Deutschland",
    about: "Parfüm-Enthusiast mit einer Vorliebe für holzige und orientalische Düfte. Immer auf der Suche nach neuen olfaktorischen Erlebnissen!",
    username: "cxboco",
    gender: "männlich",
    collection: ["Parfum 1", "Parfum 2", "Parfum 3"],
    profilePicture: "/placeholder.svg"
  });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving profile:", profile);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile({ ...profile, profilePicture: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background p-4 max-w-2xl mx-auto">
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <div className="flex items-start mb-6">
          <div className="relative mr-4">
            <img 
              src={profile.profilePicture} 
              alt="Profilbild" 
              className="w-24 h-24 rounded-full object-cover"
            />
            {isEditing && (
              <label htmlFor="profilePicture" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer">
                <Camera className="w-8 h-8 text-blue-900" />
                <Input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={handleChange}
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
              className="w-full"
            />
          ) : (
            <p>{profile.about}</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Profil-Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Benutzername:</p>
              {isEditing ? (
                <Input
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.username}</p>
              )}
            </div>
            <div>
              <p className="font-medium">Geschlecht:</p>
              {isEditing ? (
                <Input
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
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
              <div key={index} className="bg-gray-100 p-4 rounded">
                <div className="w-full h-32 bg-gray-300 mb-2 rounded"></div>
                <p className="text-center">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {isEditing ? (
          <Button onClick={handleSave} className="w-full">Speichern</Button>
        ) : (
          <Button onClick={handleEdit} className="w-full">Profil bearbeiten</Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
