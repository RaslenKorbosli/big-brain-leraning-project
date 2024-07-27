import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAction } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<'documents'>;
}) {
  const askQuestion = useAction(api.documents.askQuestion);
  return (
    <div className="w-[300px] dark:bg-zinc-800 bg-zinc-300 flex flex-col justify-between">
      <div className="flex flex-col gap-2 overflow-y-auto">
        <div className="p-4 bg-zinc-400 dark:bg-zinc-600">hello</div>
        <div className="p-4 bg-zinc-400 dark:bg-zinc-600">hello</div>
        <div className="p-4 bg-zinc-400 dark:bg-zinc-600">hello</div>
        <div className="p-4 bg-zinc-400 dark:bg-zinc-600">hello</div>
      </div>

      <form
        className="flex"
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
