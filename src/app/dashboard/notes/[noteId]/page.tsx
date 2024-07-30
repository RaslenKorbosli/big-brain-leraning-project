'use client';
import { useQuery } from 'convex/react';
import { Id } from '../../../../../convex/_generated/dataModel';
import { api } from '../../../../../convex/_generated/api';
import MiniLoader from '@/components/mini-loader';

export default function NotePage({
  params,
}: {
  params: { noteId: Id<'notes'> };
}) {
  const note = useQuery(api.note.getNote, { noteId: params.noteId });
  return (
    <div className="w-[1000px] h-fit dark:bg-zinc-800 bg-slate-50 rounded-lg p-4 ">
      {note === undefined ? <MiniLoader /> : <p className="">{note?.note}</p>}
    </div>
  );
}
