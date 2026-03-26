"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Download, X, Upload } from 'lucide-react';
import useGameStore from '@/store/useGameStore';
import InitProfile from '@/components/home/InitProfile';
import Dashboard from '@/components/home/Dashboard';
import { Trash2, Settings2 } from 'lucide-react';

export default function HomePage() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const isInitialized = useGameStore((state) => state.isInitialized);
  const { resetAllData, exportGameData, importGameData } = useGameStore();
  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   // 监听浏览器的安装提示事件
  //   window.addEventListener('beforeinstallprompt', (e) => {
  //     e.preventDefault();
  //     setDeferredPrompt(e); // 保存事件对象
  //     setShowInstallBanner(true); // 显示自定义安装按钮
  //   });

  //   // 如果已经安装了，隐藏按钮
  //   window.addEventListener('appinstalled', () => {
  //     setShowInstallBanner(false);
  //     setDeferredPrompt(null);
  //   });
  // }, []);

  // const handleInstallClick = async () => {
  //   if (!deferredPrompt) return;
  //   deferredPrompt.prompt(); // 弹出系统安装菜单
  //   const { outcome } = await deferredPrompt.userChoice;
  //   if (outcome === 'accepted') {
  //     console.log('用户接受了安装');
  //   }
  //   setDeferredPrompt(null);
  //   setShowInstallBanner(false);
  // };

  return (
    <div className="relative min-h-screen">
      {/* ... 你原有的首页内容 ... */}

      {/* 底部导航栏上方的安装提示条 */}
      {/* {showInstallBanner && (
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
      )} */}

      {!isInitialized ? (
        <InitProfile />
      ) : (
        <Dashboard />
      )}

      {/* 系统管理区域 */}
      <div className="mt-12 p-6 bg-white rounded-[32px] border border-slate-100">
        <h3 className="text-slate-900 font-black flex items-center gap-2 mb-6">
          <Settings2 size={20} /> 系统管理
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* 清除所有数据 */}
          <button
            onClick={resetAllData}
            className="flex flex-col items-center justify-center p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-all border-2 border-transparent active:border-red-300"
          >
            <Trash2 className="mb-2" />
            <span className="text-xs font-bold">清除所有数据</span>
          </button>

          {/* 导出数据 */}
          <button
            onClick={() => {
              const payload = exportGameData();
              const text = JSON.stringify(payload, null, 2);
              const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
              const url = URL.createObjectURL(blob);

              const a = document.createElement('a');
              const date = new Date().toISOString().slice(0, 10);
              a.href = url;
              a.download = `gamelife-export-${date}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="flex flex-col items-center justify-center p-4 bg-indigo-50 text-indigo-700 rounded-2xl hover:bg-indigo-100 transition-all border-2 border-transparent active:border-indigo-300"
          >
            <Download className="mb-2" />
            <span className="text-xs font-bold">导出数据(JSON)</span>
          </button>

          {/* 导入数据 */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700 rounded-2xl hover:bg-slate-100 transition-all border-2 border-transparent active:border-slate-300"
          >
            <Upload className="mb-2" />
            <span className="text-xs font-bold">导入数据(JSON)</span>
          </button>
          <button 
            onClick={() => setShowInstallBanner(false)}
            className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-700 rounded-2xl hover:bg-slate-100 transition-all border-2 border-transparent active:border-slate-300"
          >
            <span className="text-xs font-bold">安装 GameLife 轻量版App</span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            try {
              const text = await file.text();
              const json = JSON.parse(text);
              const ok = importGameData(json);
              if (!ok) {
                alert('导入失败：JSON 格式不正确或缺少必要字段。');
                return;
              }
              alert('导入成功：数据已覆盖到当前设备。');
              window.location.reload();
            } catch (err) {
              console.error(err);
              alert('导入失败：无法解析 JSON。');
            } finally {
              e.target.value = '';
            }
          }}
        />
      </div>

    </div>
  );
}