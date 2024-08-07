'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import UploadDocumentForm from './upload-document-form';

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
