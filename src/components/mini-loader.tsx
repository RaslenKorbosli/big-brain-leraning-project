import { Loader2 } from 'lucide-react';

export default function MiniLoader({ className }: { className?: string }) {
  return (
    <div className="">
      <Loader2 className={`animate-spin  ${className} `} />
    </div>
  );
}
