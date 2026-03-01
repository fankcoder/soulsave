"use client";
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';

const useGameStore = create(
  persist(
    (set) => ({
      isInitialized: false, // 核心逻辑：判断是否显示“创建人生”
      user: {
        name: "",
        gender: "male", // 'male' | 'female'
        age: "",
        job: "",
        constellation: "",
        level: 1,
        exp: 0,
        nextLevelExp: 100,
        gold: 0,
        stats: {
          todayCompleted: 0,
          totalCompleted: 0,
          highestSkill: "新手",
        }
      },
      achievements: [], // 存储最近获得的成就
      tasks: [
        
      ],
      skills: [
        { id: 'coding', name: '编程', level: 1, exp: 0 },
        { id: 'fitness', name: '体能', level: 1, exp: 0 }
      ],
      rewards: [], // 存储商品列表
      addItems: (newTask) => set((state) => ({
        tasks: [
          { 
            id: crypto.randomUUID(), 
            status: 'pending', // pending(待完成), completed(已完成未领取), archived(已领取/历史)
            createdAt: new Date().toISOString(),
            ...newTask 
          }, 
          ...state.tasks
        ]
      })),

      // 领取奖励并移入历史
      claimTaskReward: (taskId) => set((state) => {
        const task = state.tasks.find(t => t.id === taskId);
        if (!task) return state;

        // 触发之前定义的 addProgress(exp, gold)
        // 逻辑：更新 user 状态并把该 task 状态设为 archived
        const updatedTasks = state.tasks.map(t => 
          t.id === taskId ? { ...t, status: 'archived', finishedAt: new Date().toISOString() } : t
        );
        
        return { tasks: updatedTasks };
      }),
      // 核心方法：完成任务领奖
      completeTask: (expGain, goldGain, skillId) => set((state) => {
        let { exp, level, nextLevelExp, gold } = state.user;
        let newSkills = [...state.skills];

        // 1. 更新全局经验和金币
        exp += expGain;
        gold += goldGain;
        while (exp >= nextLevelExp) {
          exp -= nextLevelExp;
          level += 1;
          nextLevelExp = Math.floor(100 * Math.pow(level, 1.5));
        }

        // 2. 更新特定技能经验
        const skillIndex = newSkills.findIndex(s => s.id === skillId);
        if (skillIndex !== -1) {
          newSkills[skillIndex].exp += expGain;
          // 简易技能升级逻辑
          if (newSkills[skillIndex].exp >= 100) {
             newSkills[skillIndex].level += 1;
             newSkills[skillIndex].exp = 0;
          }
        }

        return { 
          user: { ...state.user, exp, level, nextLevelExp, gold },
          skills: newSkills 
        };
      }),
      // 添加技能
      addSkill: (newSkill) => set((state) => ({
        skills: [
          { 
            id: crypto.randomUUID(), 
            level: 1, 
            currentExp: 0, 
            nextLevelExp: 100, // 初始 100
            ...newSkill 
          }, 
          ...state.skills
        ]
      })),
      
      // 添加商品
      addReward: (newReward) => set((state) => ({
        rewards: [
          { 
            id: crypto.randomUUID(), 
            redeemedCount: 0, 
            totalSpent: 0, 
            ...newReward 
          }, 
          ...state.rewards
        ]
      })),
      // 兑换逻辑
      redeem: (rewardId) => set((state) => {
        const reward = state.rewards.find(r => r.id === rewardId);
        if (!reward || state.user.gold < reward.price || reward.stock <= 0) {
          alert("金币不足或库存见底！继续去肝任务吧！");
          return state;
        }

        return {
          user: { 
            ...state.user, 
            gold: state.user.gold - reward.price 
          },
          rewards: state.rewards.map(r => 
            r.id === rewardId ? { 
              ...r, 
              stock: r.stock - 1, 
              redeemedCount: r.redeemedCount + 1,
              totalSpent: r.totalSpent + r.price
            } : r
          )
        };
      }),
      achievements: [
        { id: 1, name: '新手村毕业', condition: '连续3天完成每日任务', status: '完成', date: '2026/01/01', icon: '🎓' },
        { id: 2, name: '现实赢家', condition: '连续坚持学习30天', status: '进行中', date: '', icon: '🏆' },
        { id: 3, name: '架构初成', condition: '模块化重构旧项目代码一次', status: '未开始', date: '', icon: '🏗️' },
        { id: 4, name: '金币专家', condition: '累计获得1000金币', status: '未开始', date: '', icon: '💰' },
      ],

      // 激活成就的方法
      unlockAchievement: (id) => set((state) => ({
        achievements: state.achievements.map(a => 
          a.id === id ? { ...a, status: '完成', date: new Date().toLocaleDateString() } : a
        )
      })),
      // 初始化角色方法
      initializeUser: (userData) => set({ 
        user: { ...userData, level: 1, exp: 0, nextLevelExp: 100, gold: 0, stats: { todayCompleted: 0, totalCompleted: 0, highestSkill: "无" } },
        isInitialized: true 
      }),
    }),
    {
      name: 'game-life-storage',
      storage: createJSONStorage(() => localforage),
    }
  )
);

export default useGameStore;