"use client";
import { useState } from 'react';
import useGameStore from '@/store/useGameStore';

const DIFFICULTY_MAP = {
  '简单': { exp: 5, gold: 1 },
  '中等': { exp: 10, gold: 3 },
  '困难': { exp: 20, gold: 5 }
};

export default function TaskModal({ isOpen, onClose }) {
  const addTask = useGameStore(state => state.addItems);
  const skills = useGameStore(state => state.skills);
  const [form, setForm] = useState({
    title: '', type: '日常', difficulty: '简单', skill: '', skillId: '', deadline: ''
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    const rewards = DIFFICULTY_MAP[form.difficulty];
    addTask({ ...form, ...rewards });
    onClose();
  };

  const handleSkillChange = (e) => {
    const selectedSkillId = e.target.value;
    const selectedSkill = skills.find(s => s.id === selectedSkillId);
    if (selectedSkill) {
      setForm({...form, skill: selectedSkill.name, skillId: selectedSkill.id});
    } else {
      setForm({...form, skill: '', skillId: ''});
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl text-slate-900 font-black mb-6">发布新任务</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 ml-1">任务名称</label>
            <input 
              className="w-full p-3 bg-slate-50 text-slate-900 placeholder:text-slate-300  border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none" 
              placeholder="例如：学习Solidity 1小时..."
              onChange={(e) => setForm({...form, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 ml-1">任务类型</label>
              <select className="w-full p-3 bg-slate-50 text-slate-900 rounded-xl outline-none" onChange={(e) => setForm({...form, type: e.target.value})}>
                <option>日常</option><option>挑战</option><option>主线</option><option>可选</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 ml-1">难度等级</label>
              <select className="w-full p-3 bg-slate-50 text-slate-900 rounded-xl outline-none" onChange={(e) => setForm({...form, difficulty: e.target.value})}>
                <option>简单</option><option>中等</option><option>困难</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 ml-1">关联技能</label>
            <select 
              className="w-full p-3 bg-slate-50 text-slate-900 rounded-xl outline-none" 
              onChange={handleSkillChange}
              value={form.skillId}
            >
              <option value="">选择技能</option>
              {skills.map(skill => (
                <option key={skill.id} value={skill.id}>{skill.name}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all"
          >
            确认发布
          </button>
          <button onClick={onClose} className="w-full py-2 text-slate-400 font-bold">取消</button>
        </div>
      </div>
    </div>
  );
}