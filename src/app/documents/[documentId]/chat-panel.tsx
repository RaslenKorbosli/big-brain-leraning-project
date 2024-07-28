import { cn } from '@/lib/utils';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import QuestionForm from './question-form';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { BotMessageSquare } from 'lucide-react';
import { useRef } from 'react';

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<'documents'>;
}) {
  const chatRecord = useQuery(api.chats.getChatRecord, {
    documentId: documentId as Id<'documents'>,
  });
  const { user } = useUser();
  const viewButton = useRef<HTMLDivElement>(null);

  return (
    <div className=" dark:bg-zinc-800 bg-zinc-300 flex flex-col justify-between">
      <div className="flex flex-col gap-2 overflow-y-auto h-[400px] no-scrollbar">
        <div className=" bg-slate-500 dark:bg-zinc-700 rounded-lg p-6 flex">
          <BotMessageSquare className="mr-2" />
          ask any question using ai about the document below
        </div>

        {chatRecord?.map((chat) => (
          <div
            key={chat._id}
            className={cn(
              {
                'bg-slate-400 dark:bg-zinc-500 text-right': chat.isHuman,
              },
              ' rounded-lg p-4 whitespace-pre-line flex'
            )}
          >
            {chat.isHuman ? (
              <div className="relative aspect-square h-full flex items-center justify-center mr-2">
                <Image
                  src={user?.imageUrl ?? ''}
                  className="absolute rounded-full h-full w-full"
                  alt="profile photo"
                  width={20}
                  height={20}
                />
              </div>
            ) : (
              <BotMessageSquare className="mr-2" />
            )}
            {chat.text}
          </div>
        ))}
      </div>
      <QuestionForm documentId={documentId} />
    </div>
  );
}
