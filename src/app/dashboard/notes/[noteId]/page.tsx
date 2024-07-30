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
    <div className="max-w-[500px] h-screen dark:bg-zinc-800 overflow-x-auto bg-slate-50  rounded-lg p-4 ">
      {!note ? <MiniLoader /> : note.note}
    </div>
  );
}
