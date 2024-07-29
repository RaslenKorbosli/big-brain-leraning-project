import MiniLoader from './mini-loader';
import { Button } from './ui/button';

export default function LoadingButton({
  isSubmitting,
}: {
  isSubmitting: boolean;
  eventName?: string;
}) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className="flex items-center justify-center gap-2"
    >
      {isSubmitting ? (
        <>
          <MiniLoader /> Uploading
        </>
      ) : (
        'Upload'
      )}
    </Button>
  );
}
