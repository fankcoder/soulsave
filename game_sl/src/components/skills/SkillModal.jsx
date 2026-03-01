"use client";
import { useState } from 'react';
import useGameStore from '@/store/useGameStore';

export default function SkillModal({ isOpen, onClose }) {
  const addSkill = useGameStore(state => state.addSkill);
  const [form, setForm] = useState({
    name: '', category: '职业技能', assessment: ''
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!form.name) return;
    addSkill(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-end md:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-t-[2.5rem] md:rounded-[2.5rem] p-8 shadow-2xl">
        <h2 className="text-2xl font-black mb-6 text-slate-800">激活新技能</h2>
        
        <div className="space-y-5">
          <div>
            <label className="text-xs font-black text-slate-400 ml-1 uppercase">技能名称</label>
            <input 
              className="w-full p-4 bg-slate-50 text-slate-900 placeholder:text-slate-300 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all" 
              placeholder="如：Solidity 编程"
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
          </div>

          <div>
            <label className="text-xs font-black text-slate-400 ml-1 uppercase">技能领域</label>
            <select 
              className="w-full p-4 bg-slate-50 text-slate-900 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-500 transition-all appearance-none"
              onChange={(e) => setForm({...form, category: e.target.value})}
            >
              <option>核心主线</option>
              <option>职业技能</option>
              <option>生活技能</option>
              <option>认知与自律</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-black text-slate-400 ml-1 uppercase">考核/终点方式</label>
            <textarea 
              className="w-full p-4 bg-slate-50 text-slate-900 placeholder:text-slate-300 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-500 transition-all" 
              placeholder="例如：能够独立部署一个智能合约..."
              rows="3"
              onChange={(e) => setForm({...form, assessment: e.target.value})}
            />
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all"
          >
            刻入灵魂
          </button>
          <button onClick={onClose} className="w-full py-2 text-slate-400 font-bold">先不练了</button>
        </div>
      </div>
    </div>
  );
}