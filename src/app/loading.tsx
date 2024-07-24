import { Loader2 } from 'lucide-react';

export default function loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="animate-spin h-32 w-32" />
    </div>
  );
}
