import { ModeToggle } from '@/components/mode-toggle';
import Image from 'next/image';
import HeaderAccount from './Header-account';
import Link from 'next/link';

import NavBar from '@/components/nav-bar';

export default function Header() {
  return (
    <div className=" py-4 bg-gray-100 dark:bg-zinc-800">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="logo image"
              className="rounded-lg"
            />
            <h1 className="text-2xl">Big Brain</h1>
          </div>{' '}
        </Link>
        <NavBar />
        <div className="flex justify-center items-center gap-4">
          <HeaderAccount />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
