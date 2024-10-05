import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

const ProfileCollection = ({ profile, isEditing, setProfile }) => {
  const [newPerfume, setNewPerfume] = useState({ name: "", image: "" });

  const handleAddPerfume = () => {
    if (newPerfume.name.trim() !== "") {
      setProfile({
        ...profile,
        collection: [...profile.collection, { ...newPerfume, image: newPerfume.image || "/placeholder.svg" }]
      });
      setNewPerfume({ name: "", image: "" });
    }
  };

  const handleRemovePerfume = (index) => {
    const updatedCollection = profile.collection.filter((_, i) => i !== index);
    setProfile({ ...profile, collection: updatedCollection });
  };

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Meine Sammlung</h3>
      <div className="grid grid-cols-3 gap-4">
        {profile.collection.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg relative">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2 rounded-lg" />
            <p className="text-center">{item.name}</p>
            {isEditing && (
              <button
                onClick={() => handleRemovePerfume(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        {isEditing && (
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
            <Input
              type="text"
              value={newPerfume.name}
              onChange={(e) => setNewPerfume({ ...newPerfume, name: e.target.value })}
              placeholder="Neues Parfum"
              className="mb-2 rounded-full"
            />
            <Input
              type="text"
              value={newPerfume.image}
              onChange={(e) => setNewPerfume({ ...newPerfume, image: e.target.value })}
              placeholder="Bild-URL"
              className="mb-2 rounded-full"
            />
            <Button onClick={handleAddPerfume} className="w-full rounded-full">
              <Plus className="w-4 h-4 mr-2" /> Hinzufügen
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCollection;