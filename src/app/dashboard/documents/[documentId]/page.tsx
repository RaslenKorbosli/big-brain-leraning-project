'use client';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Doc, Id } from '../../../../../convex/_generated/dataModel';
import ChatPanel from './chat-panel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DeleteDocumentButton from '@/components/delete-document-button';
import { Toaster } from 'react-hot-toast';

export default function ViewDocument({
  params,
}: {
  params: { documentId: Id<'documents'> };
}) {
  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId as Id<'documents'>,
  }) as Doc<'documents'>;

  return (
    <div className="container pt-4">
      <Toaster />
      <div className=" py-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold"> {document?.title} Document</h1>
          {document && <DeleteDocumentButton document={document} />}
        </div>

        <Tabs defaultValue="document" className="w-full h-fit mt-6">
          <TabsList>
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="chatGPT">ChatGPT</TabsTrigger>
          </TabsList>
          <TabsContent
            value="document"
            className=" dark:bg-zinc-800 bg-zinc-300 rounded-lg "
          >
            <iframe
              src={document?.documentUrl}
              className="w-full  h-[500px]   "
            ></iframe>
          </TabsContent>
          <TabsContent value="chatGPT">
            <ChatPanel documentId={document?._id as Id<'documents'>} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
