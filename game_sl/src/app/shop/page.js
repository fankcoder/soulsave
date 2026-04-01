"use client";
import { useState } from 'react';
import useGameStore from '@/store/useGameStore';
import { ShoppingCart, Package, RefreshCw, Utensils, Gamepad2, Film, Gift, Plus, Trash2 } from 'lucide-react';
import RewardModal from '@/components/shop/RewardModal';
import useIsMobile from '@/hooks/useIsMobile';
import useLongPress from '@/hooks/useLongPress';

const TYPE_ICONS = {
  '美食': { icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-100' },
  '娱乐': { icon: Gamepad2, color: 'text-pink-500', bg: 'bg-pink-100' },
  '影视': { icon: Film, color: 'text-blue-500', bg: 'bg-blue-100' },
  '实物': { icon: Gift, color: 'text-purple-500', bg: 'bg-purple-100' },
};

export default function RewardShop() {
  const { rewards, user, redeem, deleteReward } = useGameStore();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-24">
      {/* 顶部余额展示 */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-[2.5rem] p-8 text-white shadow-lg flex justify-between items-center">
        <div>
          <p className="text-amber-100 font-bold uppercase tracking-wider text-sm">当前可用资产</p>
          <h2 className="text-5xl font-black mt-1 flex items-center gap-3">
            {user.gold} <span className="text-2xl">💰</span>
          </h2>
        </div>
        <ShoppingCart size={60} className="opacity-20" />
      </div>

      <div className="flex justify-between items-center px-2">
        <h3 className="text-2xl font-black text-slate-800">奖励清单</h3>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-white border-2 border-slate-100 p-2 rounded-xl hover:bg-slate-50 placeholder:text-slate-300 transition-colors"
        >
          <Plus size={24} className="text-slate-600" />
        </button>
      </div>

      {/* 奖励卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
            <p className="text-slate-400">货架空空如也，快去上架一些奖励激励自己吧！</p>
          </div>
        ) : (
          rewards.map((item) => (
            <RewardCard
              key={item.id}
              item={item}
              Config={TYPE_ICONS[item.category] || TYPE_ICONS["实物"]}
              gold={user.gold}
              onRedeem={() => redeem(item.id)}
              onDelete={() => deleteReward(item.id)}
            />
          ))
        )}
      </div>

      <RewardModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function RewardCard({ item, Config, gold, onRedeem, onDelete }) {
  const isMobile = useIsMobile(768);

  const longPressHandlers = useLongPress({
    disabled: !isMobile,
    delay: 650,
    onLongPress: (e) => {
      const target = e?.target;
      if (target?.closest?.('[data-no-long-press="true"]')) return;
      if (!confirm(`确定删除奖励「${item.name}」吗？`)) return;
      onDelete();
    },
  });

  const canRedeem = gold >= item.price;

  return (
    <div
      className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between relative"
      {...longPressHandlers}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-2xl ${Config.bg} ${Config.color}`}>
            <Config.icon size={24} />
          </div>
          <div className="flex items-start gap-3">
            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {item.frequency}更新
              </span>
              <div className="text-xl font-black text-amber-500">{item.price} 💰</div>
            </div>

            {/* 桌面端删除按钮；移动端用长按 */}
            <button
              type="button"
              onClick={() => {
                if (!confirm(`确定删除奖励「${item.name}」吗？`)) return;
                onDelete();
              }}
              data-no-long-press="true"
              className="hidden md:inline-flex p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all mt-0.5"
              aria-label="删除奖励"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <h4 className="text-lg font-black text-slate-800">{item.name}</h4>
        <p className="text-sm text-slate-400 mt-1 mb-4">{item.remark || "暂无备注"}</p>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="bg-slate-50 placeholder:text-slate-300 p-2 rounded-xl text-center">
            <div className="text-[10px] text-slate-400 font-bold">剩余库存</div>
            <div className="font-black text-slate-700">{Math.max(0, item.stock - (item.redeemedCount || 0))}</div>
          </div>
          <div className="bg-slate-50 placeholder:text-slate-300 p-2 rounded-xl text-center">
            <div className="text-[10px] text-slate-400 font-bold">已兑换</div>
            <div className="font-black text-slate-700">{item.redeemedCount || 0}</div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onRedeem}
        disabled={!canRedeem}
        data-no-long-press="true"
        className={`w-full py-4 rounded-2xl font-black transition-all shadow-md active:scale-95 ${
          canRedeem
            ? "bg-slate-900 text-white hover:bg-indigo-600 shadow-indigo-100"
            : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
        }`}
      >
        立即兑换
      </button>
    </div>
  );
}