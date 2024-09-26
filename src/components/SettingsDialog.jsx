import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsDialog = ({ open, onOpenChange }) => {
  const [language, setLanguage] = useState('de');

  const handleIdentityVerification = () => {
    // Implementierung für Identitätsnachweis
    console.log("Identitätsnachweis-Prozess gestartet");
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    // Implementierung für Sprachänderung
    console.log("Sprache geändert zu:", value);
  };

  const handleDeleteAccount = () => {
    // Implementierung für Account-Löschung
    console.log("Account-Löschung angefordert");
  };

  const handleSaveSettings = () => {
    // Implementierung für das Speichern der Einstellungen
    console.log("Einstellungen gespeichert");
    onOpenChange(false); // Schließt den Dialog nach dem Speichern
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Einstellungen</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="identity" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="identity">Identität</TabsTrigger>
            <TabsTrigger value="language">Sprache</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="identity">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="identity">Identitätsnachweis</Label>
                <Input id="identity" type="file" />
              </div>
              <Button onClick={handleIdentityVerification}>Nachweis hochladen</Button>
            </div>
          </TabsContent>
          <TabsContent value="language">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="language">Sprache auswählen</Label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger id="language">
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
          <TabsContent value="account">
            <div className="space-y-4 py-4">
              <Button variant="destructive" onClick={handleDeleteAccount}>Account löschen</Button>
            </div>
          </TabsContent>
        </Tabs>
        <Button onClick={handleSaveSettings} className="mt-4 w-full">Speichern</Button>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;