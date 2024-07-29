'use client';
import { useQuery } from 'convex/react';
import { Id } from '../../../../../convex/_generated/dataModel';
import { api } from '../../../../../convex/_generated/api';

export default function NotePage({
  params,
}: {
  params: { noteId: Id<'notes'> };
}) {
  const note = useQuery(api.note.getNote, { noteId: params.noteId });
  return <div>{note?.note}</div>;
}
