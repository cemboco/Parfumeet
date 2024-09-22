import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    location: "Berlin, Deutschland",
    collection: ["Parfum 1 (Marke)", "Parfum 2 (Marke)", "Parfum 3 (Marke)"],
    profilePicture: "/placeholder.svg"
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated profile to a backend
    console.log("Saving profile:", profile);
  };

  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfile({ ...profile, profilePicture: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Dein Profil</h2>
      <div className="relative mb-4">
        <img 
          src={profile.profilePicture} 
          alt="Profilbild" 
          className="w-32 h-32 rounded-full object-cover"
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
      {isEditing ? (
        <>
          <Input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mb-2"
          />
          <Input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="mb-4"
          />
        </>
      ) : (
        <>
          <p className="text-foreground mb-1">Name: {profile.name}</p>
          <p className="text-foreground mb-4">Standort: {profile.location}</p>
        </>
      )}
      
      <h3 className="text-xl font-semibold mb-2 text-foreground">Meine Sammlung</h3>
      <ul className="list-disc list-inside mb-4 text-foreground">
        {profile.collection.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      {isEditing ? (
        <Button onClick={handleSave}>Speichern</Button>
      ) : (
        <Button onClick={handleEdit}>Profil bearbeiten</Button>
      )}
    </div>
  );
};

export default Profile;
