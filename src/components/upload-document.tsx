'use client';
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
import { Upload } from 'lucide-react';

export default function UploadDocument() {
  const [toggleForm, setToggleForm] = useState(false);
  return (
    <div>
      <Dialog open={toggleForm} onOpenChange={setToggleForm}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Document
          </Button>
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
