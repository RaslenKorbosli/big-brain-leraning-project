'use client';
import { Button } from '@/components/ui/button';
import {
  SignInButton,
  SignOutButton,
  useAuth,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { Authenticated, Unauthenticated } from 'convex/react';

export default function Home() {
  const auth = useUser();
  console.log(auth);
  return (
    <div>
      <Button>Click meee</Button>
      <Unauthenticated>
        <SignInButton mode="modal" />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        {/* <Content /> */}
      </Authenticated>
    </div>
  );
}
