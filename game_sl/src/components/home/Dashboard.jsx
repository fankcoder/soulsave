"use client";
import { useState } from 'react';
import useGameStore from '@/store/useGameStore';
import { Plus, MoreVertical, LayoutGrid, Sword, User, ShoppingBag, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useGameStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full space-y-6">
      {/* 顶部：人物简报 */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <img 
            src={user.gender === 'male' ? '/avatars/male_hero.png' : '/avatars/female_hero.png'} 
            className="w-16 h-16 rounded-full bg-slate-100 border-2 border-indigo-200 p-1"
            onError={(e) => { e.target.src = "https://api.dicebear.com/7.x/pixel-art/svg?seed=" + user.gender }}
          />
          <div>
            <h2 className="text-xl font-black">{user.name} <span className="text-sm font-normal text-slate-400">({user.job || '自由人'})</span></h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold">LV.{user.level}</span>
              <div className="w-24 h-2 bg-slate-100 rounded-full">
                <div className="bg-yellow-400 h-full rounded-full" style={{width: `${(user.exp/user.nextLevelExp)*100}%`}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* 隐藏菜单 */}
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <MoreVertical size={24} className="text-slate-500" />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
              {[
                { name: '任务大厅', icon: Sword, href: '/tasks' },
                { name: '技能树', icon: User, href: '/skills' },
                { name: '奖励商店', icon: ShoppingBag, href: '/shop' },
                { name: '成就馆', icon: Trophy, href: '/archive' },
              ].map((item) => (
                <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 text-slate-600 transition-colors">
                  <item.icon size={18} />
                  <span className="text-sm font-bold">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 核心数据仪表盘 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="我的资产" value={`${user.gold} 💰`} color="text-amber-600" />
        <StatCard label="今日达成" value={user.stats?.todayCompleted || 0} color="text-green-600" />
        <StatCard label="累计达成" value={user.stats?.totalCompleted || 0} color="text-blue-600" />
        <StatCard label="巅峰技能" value={user.stats?.highestSkill || "新手"} color="text-purple-600" />
      </div>

      {/* 创建任务大按钮 */}
      <Link href="/tasks" className="flex items-center justify-center gap-2 w-full py-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-3xl font-black text-xl shadow-xl hover:shadow-indigo-200 transition-all active:scale-95">
        <Plus size={28} />
        创建新任务
      </Link>

      {/* 最近成就 */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-black text-slate-800 flex items-center gap-2 mb-4">
          <Trophy className="text-amber-400" size={20} /> 最近荣誉
        </h3>
        <p className="text-center py-4 text-slate-400 italic text-sm">还没有获得成就？快去完成任务吧！</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
      <span className="text-xs text-slate-400 mb-1">{label}</span>
      <span className={`text-xl font-black ${color}`}>{value}</span>
    </div>
  );
}