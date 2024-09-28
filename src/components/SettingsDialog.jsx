import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import DeleteAccountModal from './DeleteAccountModal';
import { supabase } from '../integrations/supabase/supabase';

const SettingsDialog = ({ open, onOpenChange }) => {
  const [language, setLanguage] = useState('de');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState('');

  useEffect(() => {
    fetchUserSettings();
  }, []);

  const fetchUserSettings = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('location_enabled, location')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user settings:', error);
      } else if (data) {
        setLocationEnabled(data.location_enabled || false);
        setUserLocation(data.location || '');
      }
    }
  };

  const handleIdentityVerification = () => {
    console.log("Identitätsnachweis-Prozess gestartet");
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    console.log("Sprache geändert zu:", value);
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  const handleLocationToggle = async () => {
    const newLocationEnabled = !locationEnabled;
    setLocationEnabled(newLocationEnabled);

    if (newLocationEnabled) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = `${latitude},${longitude}`;
          setUserLocation(newLocation);
          await updateUserLocation(newLocation, true);
        }, (error) => {
          console.error("Error getting location:", error);
          setLocationEnabled(false);
        });
      } else {
        console.log("Geolocation is not available");
        setLocationEnabled(false);
      }
    } else {
      await updateUserLocation('', false);
    }
  };

  const updateUserLocation = async (location, enabled) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          location: location,
          location_enabled: enabled
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating user location:', error);
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Einstellungen</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="identity" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="identity">Identität</TabsTrigger>
              <TabsTrigger value="language">Sprache</TabsTrigger>
              <TabsTrigger value="location">Standort</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            <TabsContent value="identity">
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="identity">Identitätsnachweis</Label>
                  <Input id="identity" type="file" />
                </div>
                <Button onClick={handleIdentityVerification} className="w-full rounded-full">Nachweis hochladen</Button>
              </div>
            </TabsContent>
            <TabsContent value="language">
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Sprache auswählen</Label>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger id="language" className="rounded-full">
                      <SelectValue placeholder="Sprache wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="en">Englisch</SelectItem>
                      <SelectItem value="fr">Französisch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="location">
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="location-toggle">Standort freigeben</Label>
                  <Switch
                    id="location-toggle"
                    checked={locationEnabled}
                    onCheckedChange={handleLocationToggle}
                  />
                </div>
                {locationEnabled && (
                  <div className="space-y-2">
                    <Label>Aktueller Standort</Label>
                    <Input value={userLocation} readOnly className="rounded-full" />
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="account">
              <div className="space-y-4 py-4">
                <Button variant="destructive" onClick={handleDeleteAccount} className="w-full rounded-full">Account löschen</Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      <DeleteAccountModal 
        open={isDeleteModalOpen} 
        onOpenChange={setIsDeleteModalOpen}
        onConfirmDelete={() => {
          console.log("Account deletion confirmed");
          setIsDeleteModalOpen(false);
        }}
      />
    </>
  );
};

export default SettingsDialog;