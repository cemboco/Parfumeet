import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import BackgroundSlideshow from '../components/BackgroundSlideshow';
import MapComponent from '../components/MapComponent';

const Index = () => {
  return (
    <>
      <BackgroundSlideshow />
      <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50 text-white">
        <h1 className="text-6xl font-bold mb-5">Parfumeet</h1>
        <p className="text-xl mb-8 text-center max-w-md">Entdecke neue Düfte mit Hilfe deiner Community.</p>
        <div className="space-y-2">
          <Link to="/search" className="block mb-2">
            <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-full">Finde deinen Duft</Button>
          </Link>
          <Link to="/profile">
            <Button className="w-full bg-transparent border border-white hover:bg-gray-200 hover:text-black transition-colors rounded-full">
              Erstelle ein Profil
            </Button>
          </Link>
        </div>
      </div>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Entdecke Düfte in deiner Nähe</h2>
          <MapComponent />
        </div>
      </section>
    </>
  );
};

export default Index;