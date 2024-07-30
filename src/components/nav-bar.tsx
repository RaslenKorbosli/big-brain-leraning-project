'use client';
import { cn } from '@/lib/utils';
import { LayoutDashboard, PenBox, SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const navLinks = [
  {
    id: 1,
    link: '/dashboard/documents',
    linkIcon: <LayoutDashboard />,
    linkTitle: 'documents',
  },
  {
    id: 2,
    link: '/dashboard/notes',
    linkIcon: <PenBox />,
    linkTitle: 'notes',
  },
  {
    id: 3,
    link: '/dashboard/settings',
    linkIcon: <SettingsIcon />,
    linkTitle: 'settings',
  },
];
export default function NavBar() {
  const pathName = usePathname();
  return (
    <nav className="flex gap-8 ">
      {navLinks.map((link) => (
        <Link
          key={link.id}
          href={link.link}
          className={cn('flex gap-2 hover:text-blue-400', {
            'text-blue-500 font-semibold': pathName.includes(link.linkTitle),
          })}
        >
          {' '}
          {link.linkIcon} {link.linkTitle}
        </Link>
      ))}
    </nav>
  );
}
