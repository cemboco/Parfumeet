import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import BackgroundSlideshow from '../components/BackgroundSlideshow';
import MapComponent from '../components/MapComponent';

const perfumeShops = [
  { name: "Douglas", address: "Königstraße 44, 70173 Stuttgart", coordinates: [48.7758, 9.1754] },
  { name: "Parfümerie Breuninger", address: "Marktstraße 1-3, 70173 Stuttgart", coordinates: [48.7764, 9.1733] },
  { name: "Flaconi Store", address: "Königstraße 41, 70173 Stuttgart", coordinates: [48.7760, 9.1751] },
  { name: "Le Parfum", address: "Calwer Straße 25, 70173 Stuttgart", coordinates: [48.7778, 9.1760] },
  { name: "Parfümerie Akzente", address: "Rotebühlplatz 20, 70173 Stuttgart", coordinates: [48.7741, 9.1721] }
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen pt-24">
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
          <h2 className="text-3xl font-bold mb-8 text-center">Entdecke Parfümerien in Stuttgart</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">Parfümerien in Stuttgart</h3>
              <ul className="space-y-4">
                {perfumeShops.map((shop, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-bold">{shop.name}</h4>
                    <p>{shop.address}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2">
              <MapComponent shops={perfumeShops} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;