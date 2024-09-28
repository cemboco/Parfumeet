import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MessageBox from './MessageBox';

const MessageModal = ({ open, onOpenChange, recipientId, recipientName }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Message {recipientName}</DialogTitle>
        </DialogHeader>
        <MessageBox recipientId={recipientId} />
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;