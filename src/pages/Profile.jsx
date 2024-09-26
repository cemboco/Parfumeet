import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, MapPin, AlertTriangle, Plus, X, Settings } from "lucide-react";
import SettingsDialog from '../components/SettingsDialog';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Cemil Bocohonsi",
    location: "Berlin, Deutschland",
    about: "Parfüm-Enthusiast mit einer Vorliebe für holzige und orientalische Düfte. Immer auf der Suche nach neuen olfaktorischen Erlebnissen!",
    gender: "männlich",
    collection: [
      { name: "Parfum 1", image: "/placeholder.svg" },
      { name: "Parfum 2", image: "/placeholder.svg" },
      { name: "Parfum 3", image: "/placeholder.svg" },
    ],
    profilePicture: "/placeholder.svg"
  });
  const [newPerfume, setNewPerfume] = useState({ name: "", image: "" });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving profile:", profile);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile({ ...profile, profilePicture: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

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
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-grow w-full max-w-2xl mx-auto p-4 pt-8 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Settings className="h-6 w-6" />
        </Button>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-start mb-6">
            <div className="relative mr-4">
              <img 
                src={profile.profilePicture} 
                alt="Profilbild" 
                className="w-24 h-24 rounded-full object-cover"
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
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
              <div className="flex items-center text-gray-600 mb-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center text-yellow-500">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span>Nicht verifiziert</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Über mich</h3>
            {isEditing ? (
              <Textarea
                name="about"
                value={profile.about}
                onChange={handleChange}
                className="w-full rounded-lg"
              />
            ) : (
              <p>{profile.about}</p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Profil-Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="font-medium">Geschlecht:</p>
                {isEditing ? (
                  <Input
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    className="rounded-full"
                  />
                ) : (
                  <p>{profile.gender}</p>
                )}
              </div>
            </div>
          </div>

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

          {isEditing ? (
            <Button onClick={handleSave} className="w-full rounded-full">Speichern</Button>
          ) : (
            <Button onClick={handleEdit} className="w-full rounded-full">Profil bearbeiten</Button>
          )}
        </div>
      </div>
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </div>
  );
};

export default Profile;