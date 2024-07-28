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
import Image from 'next/image';

export default async function ShowDocumentData() {
  const documentsData = useQuery(api.documents.getDocuments);
  if (documentsData?.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col gap-6 mt-24">
        <Image
          src="/noData.svg"
          alt="no data icon"
          width={400}
          height={400}
          className="dark:bg-zinc-900"
        />
        <h1 className="text-2xl capitalize">
          {' '}
          no documents yet , please upload one
        </h1>
      </div>
    );
  }
  return (
    <div className=" grid grid-cols-4 gap-4">
      {documentsData?.map((doc) => (
        <Card key={doc._id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{doc.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <p>
              {doc.description.length > 10
                ? doc.description.slice(0, 100) + '... '
                : doc.description.length}
            </p> */}
            <p>{doc.description}</p>
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
