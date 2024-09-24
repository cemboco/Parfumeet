import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import BackgroundSlideshow from '../components/BackgroundSlideshow';

const Index = () => {
  return (
    <>
      <BackgroundSlideshow />
      <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50 text-white">
        <h1 className="text-6xl font-bold mb-5">Parfumeet</h1>
        <p className="text-xl mb-8 text-center max-w-md">Entdecke neue Düfte mit Hilfe deiner Community.</p>
        <div className="space-y-2"> {/* Reduzierter Abstand von 8 auf 2 */}
          <Link to="/search" className="block mb-2"> {/* Zusätzlicher Abstand unten */}
            <Button className="w-full bg-white text-black hover:bg-gray-200">Finde deinen perfekten Duft</Button>
          </Link>
          <Link to="/profile">
            <Button className="w-full bg-transparent border border-white hover:bg-midnight-blue hover:border-midnight-blue transition-colors">
              Erstelle dein Profil
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
