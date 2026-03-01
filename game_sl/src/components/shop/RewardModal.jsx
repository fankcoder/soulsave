"use client";
import { useState } from 'react';
import useGameStore from '@/store/useGameStore';

export default function RewardModal({ isOpen, onClose }) {
  const addReward = useGameStore(state => state.addReward);
  const [form, setForm] = useState({
    name: '', price: 5, stock: 1, frequency: '月', category: '美食', remark: ''
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!form.name) return;
    addReward({ ...form, price: Number(form.price), stock: Number(form.stock) });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8">
        <h2 className="text-2xl text-slate-900 font-black mb-6">上架新奖励</h2>
        <div className="space-y-4">
          <input 
            className="w-full p-4 bg-slate-50 text-slate-900 placeholder:text-slate-300 rounded-2xl outline-none border-2 border-transparent focus:border-orange-500 transition-all" 
            placeholder="商品名称 (如：看一部电影)"
            onChange={(e) => setForm({...form, name: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="number"
              className="w-full p-4 bg-slate-50 text-slate-900 placeholder:text-slate-300 rounded-2xl outline-none" 
              placeholder="所需金币"
              onChange={(e) => setForm({...form, price: e.target.value})}
            />
            <input 
              type="number"
              className="w-full p-4 bg-slate-50 text-slate-900 placeholder:text-slate-300 rounded-2xl outline-none" 
              placeholder="库存数量"
              onChange={(e) => setForm({...form, stock: e.target.value})}
            />
          </div>
          <select className="w-full p-4 bg-slate-50 text-slate-900 placeholder:text-slate-300 rounded-2xl outline-none" onChange={(e) => setForm({...form, frequency: e.target.value})}>
            <option>日</option><option>周</option><option>月</option><option>季度</option><option>年</option>
          </select>
          <select className="w-full p-4 bg-slate-50 text-slate-900 placeholder:text-slate-300 rounded-2xl outline-none" onChange={(e) => setForm({...form, category: e.target.value})}>
            <option>美食</option><option>娱乐</option><option>影视</option><option>实物</option>
          </select>
          <textarea 
            className="w-full p-4 bg-slate-50 text-slate-900 placeholder:text-slate-300 rounded-2xl outline-none" 
            placeholder="备注说明..."
            onChange={(e) => setForm({...form, remark: e.target.value})}
          />
          <button onClick={handleSubmit} className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black text-lg">确认上架</button>
        </div>
      </div>
    </div>
  );
}