import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import Link from 'next/link';

export default function ShowNotes() {
  const notesData = useQuery(api.note.getNotes);
  return (
    <ul className="flex-1">
      {notesData?.map((note) => (
        <li key={note._id}>
          <Link href={`/dashboard/notes/${note._id}`}>
            {note.note.substring(0, 20)}
            {note.note.length > 20 ? '...' : ''}
          </Link>{' '}
        </li>
      ))}
    </ul>
  );
}
