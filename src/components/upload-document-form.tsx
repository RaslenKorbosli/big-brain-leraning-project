import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '../../convex/_generated/api';
import LoadingButton from './loading-button';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  file: z.instanceof(File),
});

export default function UploadDocumentForm({
  setToggleForm,
}: {
  setToggleForm: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });
  const addDocument = useMutation(api.documents.createDocument);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': values.file!.type },
      body: values.file,
    });
    const { storageId } = await result.json();
    await addDocument({ title: values.title, fileId: storageId });
    setToggleForm(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Title</FormLabel>
              <FormControl>
                <Input placeholder="expense report" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...propsField } }) => (
            <FormItem>
              <FormLabel> File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".txt,.xml,.doc"
                  {...propsField}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    onChange(file);
                  }}
                />
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
