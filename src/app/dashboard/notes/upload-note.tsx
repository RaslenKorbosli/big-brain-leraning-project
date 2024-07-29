'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon, Upload } from 'lucide-react';
import { useState } from 'react';
import UploadNoteForm from './upload-note-form';

export default function UploadNote() {
  const [toggleForm, setToggleForm] = useState(false);
  return (
    <div>
      <Dialog open={toggleForm} onOpenChange={setToggleForm}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            Add Note
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Note To Search Later</DialogTitle>
          </DialogHeader>
          <DialogContent>
            <UploadNoteForm setToggleForm={setToggleForm} />
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}
