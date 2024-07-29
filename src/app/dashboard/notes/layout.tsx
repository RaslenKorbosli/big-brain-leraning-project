'use client';
import MiniLoader from '@/components/mini-loader';
import { useQuery } from 'convex/react';
import Link from 'next/link';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { api } from '../../../../convex/_generated/api';
import UploadNote from './upload-note';
import ShowNotes from './show-notes';

export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container pt-4">
      <Toaster position="bottom-right" />
      <div className="flex justify-between items-center py-6">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <UploadNote />
      </div>

      <div className="flex justify-between gap-6">
        <Suspense fallback={<MiniLoader className="h-16 w-16" />}>
          <ShowNotes />
        </Suspense>
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
}
