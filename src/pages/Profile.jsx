import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [location, setLocation] = useState('Berlin, Deutschland');
  const [collection, setCollection] = useState([
    'Parfum 1 (Marke)',
    'Parfum 2 (Marke)',
    'Parfum 3 (Marke)'
  ]);

  const handleSave = () => {
    // Implement save functionality here
    console.log('Saving profile:', { name, location, collection });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Dein Profil</h2>
      <img 
        src="/placeholder.svg" 
        alt="Profilbild" 
        className="w-32 h-32 rounded-full mb-4 object-cover"
      />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 w-full max-w-md"
        placeholder="Name"
      />
      <Input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="mb-4 w-full max-w-md"
        placeholder="Standort"
      />
      
      <h3 className="text-xl font-semibold mb-2 text-foreground">Meine Sammlung</h3>
      <ul className="list-disc list-inside mb-4 text-foreground">
        {collection.map((item, index) => (
          <li key={index}>
            <Input
              value={item}
              onChange={(e) => {
                const newCollection = [...collection];
                newCollection[index] = e.target.value;
                setCollection(newCollection);
              }}
              className="mb-2 w-full max-w-md"
            />
          </li>
        ))}
      </ul>
      
      <div className="space-x-2">
        <Button onClick={handleSave}>Speichern</Button>
        <Link to="/edit-profile">
          <Button variant="outline">Profil bearbeiten</Button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
