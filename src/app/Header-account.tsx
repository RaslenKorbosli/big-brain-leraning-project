'use client';
import MiniLoader from '@/components/mini-loader';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react';
export default function HeaderAccount() {
  return (
    <>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton
          showName
          appearance={{
            elements: {
              username: 'text-sm font-semibold',
              userButtonBox:
                'flex items-center p-2 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer ring-0 focus:ring-0 shadow-none outline-none dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700',
            },
          }}
        />
      </Authenticated>
      <AuthLoading>
        {' '}
        <MiniLoader />
      </AuthLoading>
    </>
  );
}
