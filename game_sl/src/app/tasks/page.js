"use client";
import { useState } from 'react';
import useGameStore from '@/store/useGameStore';
import { Plus, CheckCircle2, Circle, Clock, Sword, Star, Trophy, Trash2 } from 'lucide-react';
import TaskModal from '@/components/tasks/TaskModal';

export default function TaskHall() {
  const { tasks, claimTaskReward } = useGameStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('active'); // active, history

  const activeTasks = tasks.filter(t => t.status !== 'archived');
  const historyTasks = tasks.filter(t => t.status === 'archived');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 头部控制区 */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800">任务大厅</h1>
          <p className="text-slate-400 text-sm">今日事，今日毕，经验值 +99</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95"
        >
          <Plus size={20} /> 创建任务
        </button>
      </div>

      {/* 状态切换 Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setFilter('active')}
          className={`pb-2 px-2 font-bold transition-all ${filter === 'active' ? 'border-b-4 border-indigo-600 text-indigo-600' : 'text-slate-400'}`}
        >
          进行中 ({activeTasks.length})
        </button>
        <button 
          onClick={() => setFilter('history')}
          className={`pb-2 px-2 font-bold transition-all ${filter === 'history' ? 'border-b-4 border-indigo-600 text-indigo-600' : 'text-slate-400'}`}
        >
          历史记录
        </button>
      </div>

      {/* 任务列表区 */}
      <div className="grid gap-4">
        {(filter === 'active' ? activeTasks : historyTasks).map((task) => (
          <div 
            key={task.id} 
            className={`group relative bg-white p-5 rounded-2xl border transition-all hover:shadow-md ${task.status === 'completed' ? 'border-green-200 bg-green-50' : 'border-slate-100'}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className={`p-3 rounded-xl ${getTypeColor(task.type)}`}>
                  <Sword size={24} />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${task.status === 'archived' ? 'line-through  text-slate-500' : 'text-slate-500'}`}>
                    {task.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge icon={Star} text={`${task.difficulty} | ${task.skill}`} color="bg-amber-50 text-amber-600" />
                    <Badge icon={Clock} text={task.deadline || '无期限'} color="bg-slate-50 placeholder:text-slate-300 text-slate-500" />
                    <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded">
                      EXP +{task.exp} | GOLD +{task.gold}
                    </span>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              {filter === 'active' && (
                <button 
                  onClick={() => claimTaskReward(task.id)}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${task.status === 'completed' ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-indigo-100 hover:text-indigo-600'}`}
                >
                  {task.status === 'completed' ? '归档' : '完成任务'}
                </button>
              )}
            </div>
            {task.finishedAt && (
              <div className="mt-3 pt-3 border-t border-dashed border-slate-200 text-xs text-slate-400">
                完成时间：{new Date(task.finishedAt).toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 创建任务模态框 */}
      <TaskModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

// 辅助组件：徽章
function Badge({ icon: Icon, text, color }) {
  return (
    <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${color}`}>
      <Icon size={12} /> {text}
    </span>
  );
}

// 辅助函数：类型颜色
function getTypeColor(type) {
  const colors = {
    '日常': 'bg-blue-100 text-blue-600',
    '挑战': 'bg-red-100 text-red-600',
    '主线': 'bg-purple-100 text-purple-600',
    '可选': 'bg-slate-100 text-slate-600',
  };
  return colors[type] || colors['日常'];
}