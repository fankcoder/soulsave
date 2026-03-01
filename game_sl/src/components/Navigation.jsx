"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sword, User, ShoppingBag, Trophy } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { name: '首页', href: '/', icon: Sword },
  { name: '技能', href: '/skills', icon: User },
  { name: '商店', href: '/shop', icon: ShoppingBag },
  { name: '成就', href: '/archive', icon: Trophy },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* 桌面端侧边栏 */}
      <nav className="hidden md:flex flex-col w-64 bg-white border-r p-6 fixed h-full">
        <div className="text-2xl font-black text-indigo-600 mb-10 tracking-tighter">GAME LIFE</div>
        <div className="space-y-2">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                pathname === link.href ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "hover:bg-gray-100 text-gray-500"
              )}
            >
              <link.icon size={20} />
              <span className="font-bold">{link.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* 移动端底部导航 */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white/80 backdrop-blur-lg border-t flex justify-around py-3 z-50">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={clsx(
            "flex flex-col items-center gap-1",
            pathname === link.href ? "text-indigo-600" : "text-gray-400"
          )}>
            <link.icon size={24} />
            <span className="text-[10px] font-medium">{link.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}