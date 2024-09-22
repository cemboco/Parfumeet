import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Dein Profil</h2>
      <img 
        src="/placeholder.svg" 
        alt="Profilbild" 
        className="w-32 h-32 rounded-full mb-4 object-cover"
      />
      <p className="text-foreground mb-1">Name: John Doe</p>
      <p className="text-foreground mb-4">Standort: Berlin, Deutschland</p>
      
      <h3 className="text-xl font-semibold mb-2 text-foreground">Meine Sammlung</h3>
      <ul className="list-disc list-inside mb-4 text-foreground">
        <li>Parfum 1 (Marke)</li>
        <li>Parfum 2 (Marke)</li>
        <li>Parfum 3 (Marke)</li>
      </ul>
      
      <Link to="/edit-profile">
        <Button>Profil bearbeiten</Button>
      </Link>
    </div>
  );
};

export default Profile;