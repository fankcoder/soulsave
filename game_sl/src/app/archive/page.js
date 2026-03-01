"use client";
import React, { useState } from 'react';
import  useGameStore from '@/store/useGameStore';
import { Plus, Trophy, CheckCircle, Lock } from 'lucide-react';
import clsx from 'clsx';

export default function AchievementPage() {
  const { achievements, completeAchievement, addCustomAchievement } = useGameStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  // 提交自定义成就
  const handleAdd = () => {
    if (!newTitle) return;
    addCustomAchievement({ name: newTitle, desc: '自定义设定的成就目标' });
    setNewTitle('');
    setShowAdd(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32">
      {/* 头部 */}
      <div className="p-8 max-w-6xl mx-auto flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-[900] text-slate-900 tracking-tight">成就大厅</h1>
          <p className="text-slate-500 mt-2 font-medium">手动记录你的每一个高光时刻</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="bg-slate-900 text-white p-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 font-bold"
        >
          <Plus size={20} /> 自定义成就
        </button>
      </div>

      {/* 成就平铺网格 */}
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {achievements.map((ach) => {
          const isDone = ach.status === '已完成';
          return (
            <div
              key={ach.id}
              onClick={() => !isDone && completeAchievement(ach.id)}
              className={clsx(
                "group relative p-6 rounded-[32px] border-4 transition-all duration-300 cursor-pointer flex flex-col items-center text-center",
                isDone 
                  ? "bg-white border-green-400 shadow-[0_20px_40px_-15px_rgba(74,222,128,0.3)]" 
                  : "bg-slate-100 border-slate-200 hover:border-slate-300 opacity-80"
              )}
            >
              {/* 勋章图标 */}
              <div className={clsx(
                "w-20 h-20 rounded-full mb-4 flex items-center justify-center text-5xl transition-all",
                isDone ? "scale-110 rotate-0" : "grayscale opacity-30 rotate-12 scale-90"
              )}>
                {ach.icon || '🏆'}
              </div>

              <h3 className={clsx("font-black text-lg", isDone ? "text-slate-800" : "text-slate-400")}>
                {ach.name}
              </h3>
              
              <p className="text-[11px] text-slate-500 mt-2 leading-tight font-medium">
                {ach.desc}
              </p>

              {/* 状态标签 */}
              <div className="mt-4">
                {isDone ? (
                  <div className="text-green-500 font-bold text-[10px] flex flex-col items-center">
                    <CheckCircle size={14} className="mb-1" />
                    {ach.date}
                  </div>
                ) : (
                  <div className="text-slate-400 font-bold text-[10px] flex flex-col items-center group-hover:text-slate-600">
                    <Lock size={14} className="mb-1" />
                    待解锁
                  </div>
                )}
              </div>

              {/* 稀有度小点 */}
              <div className={clsx(
                "absolute top-4 right-4 w-3 h-3 rounded-full",
                ach.rarity === '传说' ? "bg-amber-400 animate-ping" : 
                ach.rarity === '史诗' ? "bg-purple-400" : "bg-slate-300"
              )} />
            </div>
          );
        })}
      </div>

      {/* 新增成就弹窗 */}
      {showAdd && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[40px] p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-black mb-6">设定新目标</h2>
            <input 
              autoFocus
              placeholder="输入成就名称（如：完成马拉松）"
              className="w-full p-4 bg-slate-100 rounded-2xl border-none focus:ring-2 ring-slate-900 mb-6 font-bold"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAdd(false)}
                className="flex-1 p-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50"
              >
                取消
              </button>
              <button 
                onClick={handleAdd}
                className="flex-1 p-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg"
              >
                创建成就
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}