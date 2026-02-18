import React from 'react';
import { Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  title: string;
  theme?: 'lilac' | 'blue';
}

export default function Navbar({ title, theme = 'lilac' }: NavbarProps) {
  const { user } = useApp();
  const initial = user?.name?.charAt(0) || 'U';
  
  const avatarColor = theme === 'lilac' ? 'bg-[#A78BFA]' : 'bg-[#3B82F6]';

  return (
    <div className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-8">
      <h1 className="text-xl font-semibold text-[#1F2937]">{title}</h1>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-[#6B7280]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className={`w-10 h-10 ${avatarColor} rounded-full flex items-center justify-center text-white font-semibold`}>
          {initial}
        </div>
      </div>
    </div>
  );
}
