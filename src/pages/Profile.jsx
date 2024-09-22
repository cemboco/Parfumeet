import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    location: "Berlin, Deutschland",
    collection: ["Parfum 1 (Marke)", "Parfum 2 (Marke)", "Parfum 3 (Marke)"]
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
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Dein Profil</h2>
      <img 
        src="/placeholder.svg" 
        alt="Profilbild" 
        className="w-32 h-32 rounded-full mb-4 object-cover"
      />
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
