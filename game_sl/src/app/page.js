"use client";
import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import useGameStore from '@/store/useGameStore';
import InitProfile from '@/components/home/InitProfile';
import Dashboard from '@/components/home/Dashboard';

export default function HomePage() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const isInitialized = useGameStore((state) => state.isInitialized);

  useEffect(() => {
    // 监听浏览器的安装提示事件
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // 保存事件对象
      setShowInstallBanner(true); // 显示自定义安装按钮
    });

    // 如果已经安装了，隐藏按钮
    window.addEventListener('appinstalled', () => {
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); // 弹出系统安装菜单
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('用户接受了安装');
    }
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* ... 你原有的首页内容 ... */}

      {/* 底部导航栏上方的安装提示条 */}
      {showInstallBanner && (
        <div className="fixed bottom-24 left-4 right-4 z-40 animate-bounce-in">
          <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-2xl border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3" onClick={handleInstallClick}>
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Download size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">安装 GameLife</h4>
                <p className="text-[10px] text-slate-400">像原生 App 一样体验游戏人生</p>
              </div>
            </div>
            <button 
              onClick={() => setShowInstallBanner(false)}
              className="p-2 hover:bg-slate-800 rounded-full text-slate-500"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {!isInitialized ? (
        <InitProfile />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}