import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-5 text-foreground">Parfumeet</h1>
      <p className="text-lg mb-8 text-muted-foreground">Entdecke neue Düfte mit Hilfe deiner Community.</p>
      <div className="space-y-4">
        <Link to="/search">
          <Button className="w-full">Finde deinen perfekten Duft</Button>
        </Link>
        <Link to="/profile">
          <Button className="w-full" variant="outline">Erstelle dein Profil</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
