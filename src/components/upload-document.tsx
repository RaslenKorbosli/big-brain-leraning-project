import { useMutation } from 'convex/react';
import { Button } from './ui/button';
import { api } from '../../convex/_generated/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import UploadDocumentForm from './upload-document-form';
import { useState } from 'react';

export default function UploadDocument() {
  const [toggleForm, setToggleForm] = useState(false);
  return (
    <div>
      <Dialog open={toggleForm} onOpenChange={setToggleForm}>
        <DialogTrigger asChild>
          <Button>Upload Document</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload a Document</DialogTitle>
          </DialogHeader>
          <DialogContent>
            <UploadDocumentForm setToggleForm={setToggleForm} />
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}
