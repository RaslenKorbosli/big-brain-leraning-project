import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Doc } from '../../../../convex/_generated/dataModel';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, EyeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import toast from 'react-hot-toast';

export default function ShowNotes({
  notesData,
}: {
  notesData: Doc<'notes'>[];
}) {
  const pathName = usePathname();
  const deleteNote = useMutation(api.note.deleteNote);
  return (
    // <ul className="flex-1 text-xl space-y-4">
    <Table className="flex-1 text-lg">
      <TableBody>
        {notesData?.map((note) => (
          <TableRow key={note._id}>
            <TableCell
              className={cn('hover:text-blue-400 ', {
                'text-blue-500 font-medium': pathName.endsWith(note._id),
              })}
            >
              {' '}
              {note.note.substring(0, 20)}
              {note.note.length > 20 ? '...' : ''}
            </TableCell>
            <TableCell className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/notes/${note._id}`}>
                  <EyeIcon className="w-4 h-4 mr-1" />
                  View
                </Link>
              </Button>{' '}
              <Button variant="default">
                <Edit className="w-4 h-4  mr-2" /> Edit
              </Button>
              <Button
                variant="destructive"
                onClick={async () => {
                  toast.success('Note Deleted Successfully');
                  await deleteNote({ noteId: note._id });
                }}
              >
                {' '}
                Delete
              </Button>
            </TableCell>
          </TableRow>
          // <li
          //   key={note._id}
          //   className="px-8 py-4 dark:bg-zinc-800 bg-zinc-100 rounded-lg w-fit"
          // >
          //   <Link
          //     href={`/dashboard/notes/${note._id}`}
          //     // className="hover:text-blue-400    "
          //     className={cn('hover:text-blue-400', {
          //       'text-blue-500': pathName.endsWith(note._id),
          //     })}
          //   >
          //     {note.note.substring(0, 20)}
          //     {note.note.length > 20 ? '...' : ''}
          //   </Link>
          // </li>
        ))}
      </TableBody>
    </Table>

    // </ul>
  );
}
