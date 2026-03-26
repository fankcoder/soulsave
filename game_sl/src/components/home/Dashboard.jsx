"use client";
import { useState } from 'react';
import useGameStore from '@/store/useGameStore';
import { Plus, MoreVertical, LayoutGrid, Sword, User, ShoppingBag, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { user, tasks } = useGameStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeTasks = tasks
    .filter((t) => t.status !== "archived")
    .slice(0, 6); // 首页只展示少量，避免拥挤

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

      {/* 进行中的任务（显示在任务大厅按钮下方） */}
      {activeTasks.length > 0 && (
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-slate-800 text-sm flex items-center gap-2">
              <span className="inline-flex w-2 h-2 rounded-full bg-indigo-500" />
              进行中的任务（{tasks.filter((t) => t.status !== "archived").length}）
            </h3>
            <Link href="/tasks" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
              去任务大厅
            </Link>
          </div>

          <div className="space-y-2">
            {activeTasks.map((t) => (
              <Link
                key={t.id}
                href="/tasks"
                className="flex items-start justify-between gap-3 p-3 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all"
              >
                <div className="min-w-0">
                  <div className="text-sm font-black text-slate-800 truncate">{t.title}</div>
                  <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap gap-x-2 gap-y-1">
                    <span>
                      {t.status === "completed" ? "已完成" : "进行中"} · {t.difficulty}
                    </span>
                    <span className="text-slate-400">|</span>
                    <span>技能：{t.skill}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-black text-indigo-600">+{t.exp} EXP</div>
                  <div className="text-[11px] font-bold text-amber-600">+{t.gold} 💰</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

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