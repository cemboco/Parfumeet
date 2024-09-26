import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DeleteAccountModal = ({ open, onOpenChange, onConfirmDelete }) => {
  const [confirmText, setConfirmText] = useState('');

  const handleConfirmDelete = () => {
    if (confirmText.toLowerCase() === 'löschen') {
      onConfirmDelete();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account löschen</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p>Bitte geben Sie "Löschen" ein, um die Löschung Ihres Accounts zu bestätigen.</p>
          <div className="space-y-2">
            <Label htmlFor="confirmDelete">Bestätigung</Label>
            <Input 
              id="confirmDelete" 
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Löschen"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">Abbrechen</Button>
          <Button 
            variant="destructive" 
            onClick={handleConfirmDelete}
            disabled={confirmText.toLowerCase() !== 'löschen'}
            className="rounded-full"
          >
            Bestätigen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;