import LoadingButton from '@/components/loading-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import toast, { Toaster } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '../../../../convex/_generated/api';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  note: z.string().min(2, {
    message: 'note must be at least 2 characters.',
  }),
});

export default function UploadNoteForm({
  setToggleForm,
}: {
  setToggleForm: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: '',
    },
  });
  const createNote = useMutation(api.note.createNote);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createNote({ note: values.note });
    toast.success('Note Added Successfully', {
      duration: 3000,
      style: {
        padding: '16px',
        color: '#27272a',
        fontWeight: 500,
      },
    });
    setToggleForm(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Note</FormLabel>
              <FormControl>
                <Textarea placeholder="your note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isSubmitting={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}
