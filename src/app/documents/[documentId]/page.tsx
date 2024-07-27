'use client';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Doc, Id } from '../../../../convex/_generated/dataModel';
import ChatPanel from './chat-panel';

export default function ViewDocument({
  params,
}: {
  params: { documentId: string };
}) {
  // const { user } = useUser();
  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId as Id<'documents'>,
  }) as Doc<'documents'>;

  return (
    <div className="container pt-4">
      <div className=" py-6">
        <h1 className="text-2xl font-bold">My {document?.title} Document</h1>
        <div className="flex gap-12 h-[600px]">
          <div className="flex-1 dark:bg-zinc-800 bg-zinc-300">
            <iframe
              src={document?.documentUrl}
              className="w-full h-full   "
            ></iframe>
          </div>

          <ChatPanel documentId={document?._id as Id<'documents'>} />
        </div>
      </div>
    </div>
  );
}
