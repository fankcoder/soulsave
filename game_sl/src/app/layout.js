import "./globals.css";
import Navigation from "@/components/Navigation";
import TopHeader from "@/components/TopHeader";

export const metadata = {
  title: "人生存档",
  description: "将你的生活数字化、游戏化",
  manifest: "/manifest.json", // 引用配置文件
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export const viewport = {
  themeColor: "#0f172a",

}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className="bg-slate-50 placeholder:text-slate-300 text-slate-900 antialiased">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* 导航栏 - 内部处理移动端/桌面端显示 */}
          <Navigation />
          
          <main className="flex-1 flex flex-col pb-20 md:pb-0">
            {/* 顶部统一状态栏 */}
            <TopHeader />
            
            {/* 页面内容区 */}
            <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}