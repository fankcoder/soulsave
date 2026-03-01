"use client";
import useGameStore from '@/store/useGameStore';
import { Trophy, Lock, CheckCircle2, Calendar, Star } from 'lucide-react';

export default function AchievementHall() {
  const { achievements } = useGameStore();

  // 按状态排序：已完成的在前
  const sortedAchievements = [...achievements].sort((a, b) => {
    const score = { '完成': 0, '进行中': 1, '未开始': 2 };
    return score[a.status] - score[b.status];
  });

  return (
    <div className="space-y-8 pb-24">
      {/* 头部荣誉榜单 */}
      <div className="text-center py-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute rotate-45 -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <Trophy className="mx-auto mb-4 text-yellow-400" size={64} />
        <h1 className="text-4xl font-black tracking-tighter">成就勋章墙</h1>
        <p className="text-slate-400 mt-2 font-medium">
          已收集 {achievements.filter(a => a.status === '完成').length} / {achievements.length} 枚勋章
        </p>
      </div>

      {/* 成就列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedAchievements.map((ach) => (
          <div 
            key={ach.id}
            className={`relative overflow-hidden p-6 rounded-3xl border-2 transition-all duration-500 ${
              ach.status === '完成' 
              ? 'bg-white border-yellow-200 shadow-xl shadow-yellow-50' 
              : 'bg-slate-50 placeholder:text-slate-300 border-transparent grayscale'
            }`}
          >
            {/* 已完成的角标 */}
            {ach.status === '完成' && (
              <div className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-bl-2xl text-white">
                <Star size={16} fill="white" />
              </div>
            )}

            <div className="flex items-start gap-5">
              {/* 图标区 */}
              <div className={`w-20 h-20 flex items-center justify-center text-4xl rounded-2xl shadow-inner ${
                ach.status === '完成' ? 'bg-yellow-50' : 'bg-slate-200'
              }`}>
                {ach.status === '完成' ? ach.icon : <Lock className="text-slate-400" size={28} />}
              </div>

              {/* 内容区 */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`text-xl font-black ${ach.status === '完成' ? 'text-slate-800' : 'text-slate-400'}`}>
                    {ach.name}
                  </h3>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                    ach.status === '完成' ? 'bg-green-100 text-green-600' : 
                    ach.status === '进行中' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {ach.status}
                  </span>
                </div>
                
                <p className="text-sm text-slate-500 mt-1 font-medium italic">
                  “ {ach.condition} ”
                </p>

                {ach.status === '完成' && (
                  <div className="mt-4 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                    <Calendar size={12} /> 获得于 {ach.date}
                  </div>
                )}
                
                {ach.status === '进行中' && (
                  <div className="mt-4 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-1/2 animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 成就激励标语 */}
      <div className="text-center py-8">
        <p className="text-slate-300 text-sm font-bold tracking-widest uppercase">
          — 每一份努力都将被铭记 —
        </p>
      </div>
    </div>
  );
}