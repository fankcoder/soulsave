"use client";
import { useState } from 'react';
import useGameStore from '@/store/useGameStore';
import { Shield, Briefcase, Coffee, Brain, Plus, TrendingUp } from 'lucide-react';
import SkillModal from '@/components/skills/SkillModal';

const CATEGORY_MAP = {
  '核心主线': { icon: Shield, color: 'text-red-500', bg: 'bg-red-50' },
  '职业技能': { icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
  '生活技能': { icon: Coffee, color: 'text-green-500', bg: 'bg-green-50' },
  '认知与自律': { icon: Brain, color: 'text-purple-500', bg: 'bg-purple-50' },
};

export default function SkillTree() {
  const { skills } = useGameStore();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-8 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">属性面板</h1>
          <p className="text-slate-400">所有技能的磨炼最终都会回报你</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-slate-900 text-white p-3 rounded-2xl hover:scale-105 transition-transform shadow-lg"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* 技能卡片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl">
            <p className="text-slate-400 italic">暂无技能，点击右上角按钮激活你的天赋</p>
          </div>
        ) : (
          skills.map((skill) => {
            const config = CATEGORY_MAP[skill.category] || CATEGORY_MAP['生活技能'];
            const progress = (skill.currentExp / skill.nextLevelExp) * 100;

            return (
              <div key={skill.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${config.bg} ${config.color}`}>
                    <config.icon size={24} />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{skill.category}</span>
                    <div className="text-2xl font-black text-indigo-600 italic">LV.{skill.level}</div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-1">{skill.name}</h3>
                <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                  <TrendingUp size={12} /> 考核: {skill.assessment}
                </p>

                {/* 进度条 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-indigo-500">EXP {skill.currentExp}</span>
                    <span className="text-slate-300">{skill.nextLevelExp}</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <SkillModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}