'use client';
import { Toaster } from 'react-hot-toast';
import ShowNotes from './show-notes';
import UploadNote from './upload-note';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Suspense } from 'react';
import MiniLoader from '@/components/mini-loader';
import { useParams } from 'next/navigation';
import { Id } from '../../../../convex/_generated/dataModel';

export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notesData = useQuery(api.note.getNotes);
  const params = useParams<{ noteId: Id<'notes'> }>();
  console.log(params);
  return (
    <main className="container pt-4">
      <Toaster position="bottom-right" />
      <div className="flex justify-between items-center py-6">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <UploadNote />
      </div>

      <div className=" mt-4">
        {!notesData ? (
          <MiniLoader className="h-16 w-16 flex items-center justify-center" />
        ) : (
          <div className="flex gap-6">
            <ShowNotes notesData={notesData} />

            {children}
          </div>
        )}
      </div>
    </main>
  );
}
