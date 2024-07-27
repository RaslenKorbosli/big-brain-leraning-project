import { useQuery } from 'convex/react';
import { Doc } from '../../convex/_generated/dataModel';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { api } from '../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';

export default async function ShowDocumentData() {
  const documentsData = useQuery(api.documents.getDocuments);
  return (
    <div className=" grid grid-cols-4 gap-4">
      {documentsData?.map((doc) => (
        <Card key={doc._id}>
          <CardHeader>
            <CardTitle>{doc.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              variant="secondary"
              className="flex gap-2 items-center"
            >
              <Link href={`documents/${doc._id}`}>
                <EyeIcon className="w-4 h-4" />
                view
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
