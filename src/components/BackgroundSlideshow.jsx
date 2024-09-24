import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const images = [
  '/tolga-durgut-i6TnagtR2bk-unsplash.jpg',
  '/trung-do-bao-AynL5XXQsGc-unsplash.jpg',
  '/trung-do-bao-s8uBaa5XL8I-unsplash.jpg',
  '/kina.jpg',
  '/Givenchy.jpg'
];

const BackgroundSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1]">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
        <h1 className="text-6xl font-bold mb-5">Parfumeet</h1>
        <p className="text-xl mb-8 text-center max-w-md">Entdecke neue Düfte mit Hilfe deiner Community.</p>
        <div className="space-y-2">
          <Link to="/search" className="block mb-2">
            <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-full">Finde deinen perfekten Duft</Button>
          </Link>
          <Link to="/profile">
            <Button className="w-full bg-transparent border border-white hover:bg-blue-900 hover:border-blue-900 transition-colors rounded-full">
              Erstelle dein Profil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSlideshow;
