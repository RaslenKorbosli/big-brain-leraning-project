import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'convex/react';
import { ArrowUpIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import MiniLoader from '@/components/mini-loader';

const formSchema = z.object({
  question: z.string().min(2, {
    message: 'question must be at least 2 characters.',
  }),
});

export default function QuestionForm({
  documentId,
}: {
  documentId: Id<'documents'>;
}) {
  const askQuestion = useAction(api.documents.askQuestion);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    await askQuestion({ question: values.question, documentId: documentId });
    form.reset();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 items-center justify-between p-4"
      >
        <div className="flex-1">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="How Can Ai Help You ?"
                    {...field}
                    className="p-4"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="rounded-xl p-3 aspect-square"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <MiniLoader className="h-6 w-6" />
          ) : (
            <ArrowUpIcon className="h-8 w-8" />
          )}
        </Button>
      </form>
    </Form>
  );
}
