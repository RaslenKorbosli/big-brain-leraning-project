'use client';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Doc, Id } from '../../../../convex/_generated/dataModel';
import ChatPanel from './chat-panel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        <Tabs defaultValue="document" className="w-full h-fit">
          <TabsList>
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="chatGPT">ChatGPT</TabsTrigger>
          </TabsList>
          <TabsContent
            value="document"
            className=" dark:bg-zinc-800 bg-zinc-300 rounded-lg"
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
