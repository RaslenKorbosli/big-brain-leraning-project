import { useAction, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<'documents'>;
}) {
  const askQuestion = useAction(api.documents.askQuestion);
  const chatRecord = useQuery(api.chats.getChatRecord, {
    documentId: documentId as Id<'documents'>,
  });
  return (
    <div className=" dark:bg-zinc-800 bg-zinc-300 flex flex-col justify-between">
      <div className="flex flex-col gap-2 overflow-y-auto h-[400px]">
        <div className=" bg-slate-500 dark:bg-zinc-700 rounded-lg p-6">
          AI:ask any question using ai about the document below
        </div>
        {chatRecord?.map((chat) => (
          <div
            key={chat._id}
            className={cn(
              {
                'bg-slate-400 dark:bg-zinc-500 text-right': chat.isHuman,
              },
              ' rounded-lg p-4 whitespace-pre-line'
            )}
          >
            {chat.isHuman ? 'YOU' : 'AI'}:{chat.text}
          </div>
        ))}
      </div>

      <form
        className="flex m-2"
        action=""
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const text = formData.get('text') as string;

          await askQuestion({ question: text, documentId: documentId }).then(
            console.log
          );
        }}
      >
        <Input type="text" name="text" />
        <Button>submit</Button>
      </form>
    </div>
  );
}
