"use client";
import { useState } from 'react';
import useGameStore from '@/store/useGameStore';
import { Shield, Briefcase, Coffee, Brain, Plus, TrendingUp, Trash2 } from 'lucide-react';
import SkillModal from '@/components/skills/SkillModal';
import useIsMobile from '@/hooks/useIsMobile';
import useLongPress from '@/hooks/useLongPress';

const CATEGORY_MAP = {
  '核心主线': { icon: Shield, color: 'text-red-500', bg: 'bg-red-50' },
  '职业技能': { icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
  '生活技能': { icon: Coffee, color: 'text-green-500', bg: 'bg-green-50' },
  '认知与自律': { icon: Brain, color: 'text-purple-500', bg: 'bg-purple-50' },
};

export default function SkillTree() {
  const { skills, tasks, deleteSkill } = useGameStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const activeTasks = tasks.filter((t) => t.status !== "archived");
  const taskCountBySkillId = activeTasks.reduce((acc, t) => {
    const key = String(t.skillId);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

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
          skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              config={CATEGORY_MAP[skill.category] || CATEGORY_MAP["生活技能"]}
              relatedTaskCount={taskCountBySkillId[String(skill.id)] || 0}
              onDelete={() => deleteSkill(skill.id)}
            />
          ))
        )}
      </div>

      <SkillModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function SkillCard({ skill, config, relatedTaskCount, onDelete }) {
  const isMobile = useIsMobile(768);
  const currentExp = skill.currentExp ?? skill.exp ?? 0;
  const nextLevelExp =
    skill.nextLevelExp ?? Math.floor(100 * Math.pow(Number(skill.level) || 1, 1.5));
  const progress = nextLevelExp > 0 ? (currentExp / nextLevelExp) * 100 : 0;

  const longPressHandlers = useLongPress({
    disabled: !isMobile,
    delay: 650,
    onLongPress: (e) => {
      const target = e?.target;
      if (target?.closest?.('[data-no-long-press="true"]')) return;

      const msg =
        relatedTaskCount > 0
          ? `确定删除技能「${skill.name}」吗？将影响 ${relatedTaskCount} 个进行中任务获取该技能经验。`
          : `确定删除技能「${skill.name}」吗？`;
      if (!confirm(msg)) return;
      onDelete();
    },
  });

  return (
    <div
      className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative"
      {...longPressHandlers}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${config.bg} ${config.color}`}>
          <config.icon size={24} />
        </div>
        <div className="flex items-start gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{skill.category}</span>
            <div className="text-2xl font-black text-indigo-600 italic">LV.{skill.level}</div>
          </div>

          {/* 桌面端删除按钮；移动端用长按 */}
          <button
            type="button"
            onClick={() => {
              const msg =
                relatedTaskCount > 0
                  ? `确定删除技能「${skill.name}」吗？将影响 ${relatedTaskCount} 个进行中任务获取该技能经验。`
                  : `确定删除技能「${skill.name}」吗？`;
              if (!confirm(msg)) return;
              onDelete();
            }}
            data-no-long-press="true"
            className="hidden md:inline-flex p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all mt-0.5"
            aria-label="删除技能"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-1">{skill.name}</h3>
      <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
        <TrendingUp size={12} /> 考核: {skill.assessment || "未设置"}
      </p>

      {/* 进度条 */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-indigo-500">EXP {currentExp}</span>
          <span className="text-slate-300">{nextLevelExp}</span>
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
}