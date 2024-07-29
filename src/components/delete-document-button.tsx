import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { api } from '../../convex/_generated/api';
import { Doc } from '../../convex/_generated/dataModel';
import { Button } from './ui/button';
import toast from 'react-hot-toast';

export default function DeleteDocumentButton({
  document,
}: {
  document: Doc<'documents'>;
}) {
  const deleteDocument = useMutation(api.documents.deleteDocument);
  const router = useRouter();
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive"> Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              document.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteDocument({
                  documentId: document._id,
                  fileId: document.fileId,
                });
                toast.success('Document Deleted Successfully', {
                  duration: 3000,
                  style: {
                    padding: '16px',
                    color: '#27272a',
                    fontWeight: 500,
                  },
                  position: 'bottom-right',
                });
                router.push('/dashboard/documents');
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
