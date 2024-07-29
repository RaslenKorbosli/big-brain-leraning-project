'use client';
import MiniLoader from '@/components/mini-loader';
import UploadDocument from '@/components/upload-document';
import ShowDocumentData from '@/server/ShowDocumentData';

import { Suspense } from 'react';

export default function Home() {
  // const { user } = useUser();

  return (
    <div className="container pt-4">
      <h1>Welcome , to big brain</h1>
    </div>
  );
}
