"use client";
import { useState } from 'react';
import useGameStore from '@/store/useGameStore';
import { User, UserFemale, Sparkles } from 'lucide-react'; // 假设使用图标代替

export default function InitProfile() {
  const initializeUser = useGameStore((state) => state.initializeUser);
  const [formData, setFormData] = useState({
    name: '', gender: 'male', age: '', job: '', constellation: ''
  });

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 border-4 border-indigo-100">
      <h2 className="text-3xl font-black text-center text-indigo-600 mb-8 tracking-tight">
        ✨ 开启你的第二人生
      </h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧：人物预览 */}
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 placeholder:text-slate-300 rounded-2xl p-6 border-2 border-dashed border-slate-200">
          <div className="w-48 h-48 relative transition-all duration-500 transform hover:scale-105">
            {/* 根据性别切换占位图 */}
            <img 
              src={formData.gender === 'male' ? '/avatars/male_hero.png' : '/avatars/female_hero.png'} 
              alt="Character"
              className="w-full h-full object-contain"
              onError={(e) => { e.target.src = "https://api.dicebear.com/7.x/pixel-art/svg?seed=" + formData.gender }}
            />
          </div>
          <p className="mt-4 font-bold text-slate-500">角色预检完成</p>
        </div>

        {/* 右侧：表单 */}
        <div className="flex-[1.5] space-y-4">
          <input 
            className="w-full p-3 rounded-xl border-2 border-slate-100  text-slate-900 placeholder:text-slate-300 focus:border-indigo-400 outline-none" 
            placeholder="输入你的勇者名..."
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <div className="flex gap-2">
            <button 
              onClick={() => setFormData({...formData, gender: 'male'})}
              className={`flex-1 p-2 rounded-lg border-2 ${formData.gender === 'male' ? 'border-blue-500 bg-blue-50 text-slate-900' : 'border-slate-100'}`}
            >男</button>
            <button 
              onClick={() => setFormData({...formData, gender: 'female'})}
              className={`flex-1 p-2 rounded-lg border-2 ${formData.gender === 'female' ? 'border-pink-500 bg-pink-50 text-slate-900' : 'border-slate-100'}`}
            >女</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input className="p-3 rounded-xl border-2 text-slate-900 placeholder:text-slate-300 border-slate-100" placeholder="年龄" type="number" onChange={(e) => setFormData({...formData, age: e.target.value})}/>
            <input className="p-3 rounded-xl border-2 text-slate-900 placeholder:text-slate-300 border-slate-100" placeholder="星座(选)" onChange={(e) => setFormData({...formData, constellation: e.target.value})}/>
          </div>
          <input className="w-full p-3 rounded-xl border-2 text-slate-900 placeholder:text-slate-300 border-slate-100" placeholder="当前职业(选)" onChange={(e) => setFormData({...formData, job: e.target.value})}/>
          
          <button 
            onClick={() => initializeUser(formData)}
            disabled={!formData.name}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xl shadow-lg transition-all disabled:opacity-50"
          >
            创建人生
          </button>
        </div>
      </div>
    </div>
  );
}