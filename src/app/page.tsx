'use client';
import MiniLoader from '@/components/mini-loader';
import UploadDocument from '@/components/upload-document';
import ShowDocumentData from '@/server/ShowDocumentData';

import { Suspense } from 'react';

export default function Home() {
  // const { user } = useUser();

  return (
    <div className="container pt-4">
      <div className="flex justify-between items-center py-6">
        <h1 className="text-2xl font-bold">My Documents</h1>
        <UploadDocument />
      </div>

      <Suspense fallback={<MiniLoader className="h-16 w-16" />}>
        <ShowDocumentData />
      </Suspense>
    </div>
  );
}
