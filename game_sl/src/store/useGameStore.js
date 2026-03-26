"use client";
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';

const useGameStore = create(
  persist(
  (set, get) => ({
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
      tasks: [
        { 
          id: 'task-001', 
          title: '早起并饮水 500ml', 
          status: 'pending', 
          type: '日常', 
          difficulty: '简单', 
          skill: '身体素质', 
          skillId: 'physical-fitness', 
          exp: 5, 
          gold: 1, 
          deadline: '每日' 
        },
        { 
          id: 'task-002', 
          title: '完成 30 分钟深度阅读', 
          status: 'pending', 
          type: '日常', 
          difficulty: '中等', 
          skill: '专注力', 
          skillId: 'focus-power', 
          exp: 10, 
          gold: 3, 
          deadline: '每日' 
        },
        { 
          id: 'task-004', 
          title: '复盘今日工作/学习得失', 
          status: 'pending', 
          type: '日常', 
          difficulty: '简单', 
          skill: '复盘习惯', 
          skillId: 'reflection-habit', 
          exp: 5, 
          gold: 1, 
          deadline: '23:00' 
        },
        { 
          id: 'task-005', 
          title: '学习并练习 1 个 AI 提示词技巧', 
          status: 'pending', 
          type: '挑战', 
          difficulty: '中等', 
          skill: 'AI 应用', 
          skillId: 'ai-prompt-engineering', 
          exp: 10, 
          gold: 3, 
          deadline: '' 
        },
        { 
          id: 'task-006', 
          title: '拒绝一次不必要的外卖/奶茶', 
          status: 'pending', 
          type: '日常', 
          difficulty: '简单', 
          skill: '理财能力', 
          skillId: 'wealth-management', 
          exp: 5, 
          gold: 1, 
          deadline: '' 
        },
        { 
          id: 'task-007', 
          title: '背诵 20 个核心行业词汇', 
          status: 'pending', 
          type: '挑战', 
          difficulty: '中等', 
          skill: '外语水平', 
          skillId: 'foreign-language', 
          exp: 10, 
          gold: 3, 
          deadline: '' 
        },
        { 
          id: 'task-008', 
          title: '完成一次高强度间歇训练 (HIIT)', 
          status: 'pending', 
          type: '挑战', 
          difficulty: '困难', 
          skill: '身体素质', 
          skillId: 'physical-fitness', 
          exp: 20, 
          gold: 5, 
          deadline: '' 
        }
      ],
      skills: [
        // --- 核心主线 ---
        { id: 'physical-fitness', name: '身体素质', level: 1, exp: 0, category: '核心主线' },
        { id: 'emotional-resilience', name: '情绪管理', level: 1, exp: 0, category: '核心主线' },
        { id: 'social-intuition', name: '社交能力', level: 1, exp: 0, category: '核心主线' },
        { id: 'adversity-quotient', name: '逆商 (AQ)', level: 1, exp: 0, category: '核心主线' },

        // --- 认知与自律 ---
        { id: 'focus-power', name: '专注力', level: 1, exp: 0, category: '认知与自律' },
        { id: 'reflection-habit', name: '复盘习惯', level: 1, exp: 0, category: '认知与自律' },
        { id: 'structured-expression', name: '结构化表达', level: 1, exp: 0, category: '认知与自律' },
        { id: 'sleep-management', name: '睡眠管理', level: 1, exp: 0, category: '认知与自律' },

        // --- 生活技能 ---
        { id: 'nutritional-cooking', name: '营养烹饪', level: 1, exp: 0, category: '生活技能' },
        { id: 'organization-storage', name: '收纳整理', level: 1, exp: 0, category: '生活技能' },
        { id: 'first-aid', name: '急救常识', level: 1, exp: 0, category: '生活技能' },
        { id: 'driving-travel', name: '驾驶出行', level: 1, exp: 0, category: '生活技能' },

        // --- 职业技能 ---
        { id: 'coding-automation', name: '编程开发', level: 1, exp: 0, category: '职业技能' },
        { id: 'foreign-language', name: '外语水平', level: 1, exp: 0, category: '职业技能' },
        { id: 'make-money', name: '投资理财', level: 1, exp: 0, category: '职业技能' },
        { id: 'copywriting-planning', name: '文案策划', level: 1, exp: 0, category: '职业技能' },
        { id: 'public-speaking', name: '演讲汇报', level: 1, exp: 0, category: '职业技能' },
        { id: 'project-management', name: '项目管理', level: 1, exp: 0, category: '职业技能' },
        { id: 'negotiation-skills', name: '谈判技巧', level: 1, exp: 0, category: '职业技能' },
        { id: 'visual-design', name: '视觉设计', level: 1, exp: 0, category: '职业技能' },
        { id: 'data-analysis', name: '数据分析', level: 1, exp: 0, category: '职业技能' },
        { id: 'collaboration-tools', name: '协作工具', level: 1, exp: 0, category: '职业技能' },
        { id: 'sales-marketing', name: '销售技巧', level: 1, exp: 0, category: '职业技能' },
        { id: 'teaching-coaching', name: '教学教练', level: 1, exp: 0, category: '职业技能' },
        { id: 'ai-prompt-engineering', name: 'AI 应用', level: 1, exp: 0, category: '职业技能' },
      ],
      rewards: [// 存储商品列表
        // --- 1. 瞬时多巴胺 (低价位: 5-20 金币) ---
        { id: 'r-001', name: '刷 15 分钟短视频', price: 5, category: '娱乐', stock: 99 },
        { id: 'r-002', name: '1小时游戏时间', price: 10, category: '娱乐', stock: 8 },
        { id: 'r-004', name: '发呆/放空 10 分钟', price: 5, category: '放松', stock: 99 },
        { id: 'r-005', name: '在群里发一个闲聊话题', price: 5, category: '社交', stock: 99 },
        { id: 'r-006', name: '玩一局轻量消消乐/小游戏', price: 2, category: '娱乐', stock: 99 },
        { id: 'r-008', name: '喝一杯冰镇可乐/苏打水', price: 5, category: '饮食', stock: 99 },
        { id: 'r-013', name: '在社交平台发布一张精修图', price: 15, category: '社交', stock: 99 },
        { id: 'r-015', name: '听一段解压的 ASMR', price: 10, category: '放松', stock: 99 },

        // --- 2. 生活仪式感 (中价位: 30-100 金币) ---
        { id: 'r-016', name: '外卖奶茶/咖啡一杯', price: 35, category: '饮食', stock: 99 },
        { id: 'r-017', name: '看一场最新的院线电影', price: 60, category: '娱乐', stock: 99 },
        { id: 'r-018', name: '购买一本心仪的纸质书', price: 50, category: '学习', stock: 99 },
        { id: 'r-019', name: '点一份豪华版单人套餐', price: 80, category: '饮食', stock: 99 },
        { id: 'r-020', name: '去电玩城抓一次娃娃/玩游戏', price: 40, category: '娱乐', stock: 99 },
        { id: 'r-024', name: '升级一个 App 的去广告会员', price: 50, category: '数字', stock: 99 },
        { id: 'r-029', name: '享受一次专业洗剪吹', price: 80, category: '形象', stock: 99 },
        { id: 'r-030', name: '奖励自己一次不设闹钟的觉', price: 100, category: '休息', stock: 99 },

        // --- 3. 物质进阶 (高价位: 150-500 金币) ---
        { id: 'r-031', name: '一顿双人海底捞/大餐', price: 300, category: '饮食', stock: 99 },
        { id: 'r-032', name: '一套心仪已久的护肤品', price: 450, category: '形象', stock: 99 },
        { id: 'r-033', name: '新款 3A 游戏大作一份', price: 400, category: '娱乐', stock: 99 },
        { id: 'r-034', name: '周边商城手办一个', price: 350, category: '收藏', stock: 99 },
        { id: 'r-036', name: '购买专业运动装备/跑鞋', price: 500, category: '健康', stock: 99 },
        { id: 'r-037', name: '付费课程/工作坊门票', price: 400, category: '成长', stock: 99 },
        { id: 'r-038', name: '一次全身按摩/足疗', price: 280, category: '放松', stock: 99 },
        { id: 'r-039', name: '购买一个高质量数码周边', price: 500, category: '办公', stock: 99 },
        { id: 'r-040', name: '心仪的潮牌 T 恤一件', price: 300, category: '形象', stock: 99 },
        { id: 'r-042', name: '主题公园门票一张', price: 400, category: '娱乐', stock: 99 },
        { id: 'r-043', name: '一次短途近郊自驾游', price: 450, category: '旅行', stock: 99 },
        { id: 'r-045', name: '奖励一次“全天拒绝社交”', price: 200, category: '自由', stock: 99 },

        // --- 4. 终极梦想 (顶级价位: 1000+ 金币) ---
        { id: 'r-046', name: '新款智能手机/平板电脑', price: 5000, category: '科技', stock: 1 },
        { id: 'r-047', name: '国内城市三天两夜旅行', price: 2500, category: '旅行', stock: 5 },
        { id: 'r-048', name: '全套高配置组装电脑', price: 8000, category: '科技', stock: 1 },
        { id: 'r-049', name: '专业单反/微单相机', price: 6000, category: '收藏', stock: 1 },
        { id: 'r-050', name: '健身房年度会员卡', price: 2000, category: '健康', stock: 1 },
        { id: 'r-051', name: '一门深度专业进阶培训课', price: 1500, category: '成长', stock: 5 },
        { id: 'r-052', name: '高档品牌皮包/手表', price: 4000, category: '形象', stock: 1 },
        { id: 'r-053', name: '人体工学椅顶配款', price: 1800, category: '办公', stock: 1 },
        { id: 'r-054', name: '演唱会/音乐节前排门票', price: 1200, category: '娱乐', stock: 3 },
      ],
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

      // 删除任务（用于“任务大厅”进行中任务的管理）
      deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter((t) => String(t.id) !== String(taskId)),
      })),

      // 领取奖励并移入历史
      claimTaskReward: (taskId) => set((state) => {
        const task = state.tasks.find(t => t.id === taskId);
        if (!task) return state;

        const now = new Date().toISOString();

        // 状态机：
        // pending(待完成) -> completed(已完成，待归档)
        // completed(已完成) -> archived(已归档/历史)
        // 说明：为了匹配当前 UI（一次点击“完成任务”就应看到仪表盘变化），
        // 奖励与完成计数在 pending -> completed 时发放；归档只改变 tasks 状态。
        const updatedTasks = state.tasks.map(t => {
          if (t.id !== taskId) return t;

          if (t.status === 'completed') {
            return { ...t, status: 'archived' };
          }

          // 兼容老数据：没有 status 或 status 非预期时，当作 pending 处理
          if (!t.status || t.status === 'pending') {
            return { ...t, status: 'completed', finishedAt: now };
          }

          return t;
        });

        // pending -> completed：发放经验/金币/技能经验 + 更新完成计数
        if (!task.status || task.status === 'pending') {
          let { exp, level, nextLevelExp, gold } = state.user;
          const expGain = Number(task.exp) || 0;
          const goldGain = Number(task.gold) || 0;
          const skillId = task.skillId;

          const newSkills = [...state.skills];

          // 1) 更新全局经验和金币
          exp += expGain;
          gold += goldGain;
          while (exp >= nextLevelExp) {
            exp -= nextLevelExp;
            level += 1;
            nextLevelExp = Math.floor(100 * Math.pow(level, 1.5));
          }

          // 2) 更新特定技能经验（兼容 currentExp/exp 两种字段）
          const skillIndex = newSkills.findIndex(s => s.id === skillId);
          if (skillIndex !== -1) {
            const skill = newSkills[skillIndex];
            const skillLevel0 = Number(skill.level) || 1;
            let skillNextLevelExp = Number(skill.nextLevelExp);
            if (!Number.isFinite(skillNextLevelExp)) {
              skillNextLevelExp = Math.floor(100 * Math.pow(skillLevel0, 1.5));
            }

            let currentExp = Number(skill.currentExp);
            if (!Number.isFinite(currentExp)) {
              currentExp = Number(skill.exp) || 0;
            }

            currentExp += expGain;
            let skillLevel = skillLevel0;

            while (currentExp >= skillNextLevelExp) {
              currentExp -= skillNextLevelExp;
              skillLevel += 1;
              skillNextLevelExp = Math.floor(100 * Math.pow(skillLevel, 1.5));
            }

            newSkills[skillIndex] = {
              ...skill,
              level: skillLevel,
              currentExp,
              nextLevelExp: skillNextLevelExp,
              // 保留老字段，避免已持久化数据与旧 UI/逻辑不一致
              exp: currentExp,
            };
          }

          const today = new Date().toLocaleDateString();
          const prevLast = state.user.stats?.lastCompletedDate;
          const resetToday = prevLast !== today;

          const todayCompleted = resetToday ? 0 : (state.user.stats?.todayCompleted || 0);
          const totalCompleted = (state.user.stats?.totalCompleted || 0) + 1;

          const highestSkillLevel = newSkills.reduce((max, s) => {
            const lv = Number(s.level) || 0;
            return lv > max ? lv : max;
          }, 0);

          return {
            tasks: updatedTasks,
            user: {
              ...state.user,
              exp,
              level,
              nextLevelExp,
              gold,
              stats: {
                ...state.user.stats,
                todayCompleted: todayCompleted + 1,
                totalCompleted,
                highestSkill: highestSkillLevel,
                lastCompletedDate: today,
              },
            },
            skills: newSkills,
          };
        }

        // completed -> archived：仅归档
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
          const skill = newSkills[skillIndex];
          const skillLevel0 = Number(skill.level) || 1;
          let skillNextLevelExp = Number(skill.nextLevelExp);
          if (!Number.isFinite(skillNextLevelExp)) {
            skillNextLevelExp = Math.floor(100 * Math.pow(skillLevel0, 1.5));
          }

          let currentExp = Number(skill.currentExp);
          if (!Number.isFinite(currentExp)) {
            currentExp = Number(skill.exp) || 0;
          }

          currentExp += expGain;
          let skillLevel = skillLevel0;

          while (currentExp >= skillNextLevelExp) {
            currentExp -= skillNextLevelExp;
            skillLevel += 1;
            skillNextLevelExp = Math.floor(100 * Math.pow(skillLevel, 1.5));
          }

          newSkills[skillIndex] = {
            ...skill,
            level: skillLevel,
            currentExp,
            nextLevelExp: skillNextLevelExp,
            // 保留老字段
            exp: currentExp,
          };
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

      // 删除技能（用于“技能树/属性面板”的管理）
      deleteSkill: (skillId) => set((state) => ({
        skills: state.skills.filter((s) => String(s.id) !== String(skillId)),
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

      // 删除商店奖励（用于“奖励兑换商店”的管理）
      deleteReward: (rewardId) => set((state) => ({
        rewards: state.rewards.filter((r) => String(r.id) !== String(rewardId)),
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
        // --- 1. 意志力与习惯 (25个) ---
        { id: 'h-001', name: '新手村毕业', desc: '连续3天完成每日任务', status: '未完成', date: '-', icon: '🎓', rarity: '普通' },
        { id: 'h-002', name: '晨曦使者', desc: '累计 5 天在早上 7:00 前起床并签到', status: '未完成', date: '-', icon: '🌅', rarity: '普通' },
        { id: 'h-003', name: '断舍离大师', desc: '清理并丢弃 10 件不再需要的物品', status: '未完成', date: '-', icon: '🧹', rarity: '普通' },
        { id: 'h-004', name: '深度专注', desc: '累计进行 10 次超过 45 分钟的深度工作', status: '未完成', date: '-', icon: '🧘', rarity: '稀有' },
        { id: 'h-005', name: '习惯的力量', desc: '任何一项健康习惯坚持 21 天', status: '未完成', date: '-', icon: '🧪', rarity: '史诗' },
        { id: 'h-006', name: '拒绝对抗', desc: '成功抵制 5 次高热量食物的诱惑', status: '未完成', date: '-', icon: '🍩', rarity: '稀有' },
        { id: 'h-007', name: '阅读灯火', desc: '读完一整本严肃书籍', status: '未完成', date: '-', icon: '📖', rarity: '普通' },
        { id: 'h-008', name: '自律之魂', desc: '连续 30 天没有任何任务延期', status: '未完成', date: '-', icon: '🛡️', rarity: '传说' },
        { id: 'h-009', name: '冷水挑战', desc: '尝试并完成 3 次冷水淋浴', status: '未完成', date: '-', icon: '🚿', rarity: '稀有' },
        { id: 'h-010', name: '数字排毒', desc: '连续 24 小时不接触任何电子社交媒体', status: '未完成', date: '-', icon: '📵', rarity: '史诗' },
        // ... (此类推至 h-025)

        // --- 2. 财富与资源 (25个) ---
        { id: 'w-001', name: '储蓄起步', desc: '成功存下人生的第一个 1000 元（现实）', status: '未完成', date: '-', icon: '🪙', rarity: '普通' },
        { id: 'w-002', name: '投资萌芽', desc: '第一次通过非工资手段获得收益', status: '未完成', date: '-', icon: '🌱', rarity: '稀有' },
        { id: 'w-003', name: '理性消费者', desc: '在一个月内没有任何冲动购物行为', status: '未完成', date: '-', icon: '⚖️', rarity: '史诗' },
        { id: 'w-004', name: '记账达人', desc: '连续 15 天记录每一笔开支', status: '未完成', date: '-', icon: '📝', rarity: '普通' },
        { id: 'w-005', name: '金库守护者', desc: '累计在 App 内赚取 500 金币', status: '未完成', date: '-', icon: '🏦', rarity: '稀有' },
        { id: 'w-006', name: '慷慨之心', desc: '为他人购买一份超过 50 元的礼物', status: '未完成', date: '-', icon: '🎁', rarity: '普通' },
        { id: 'w-007', name: '财务自由初探', desc: '被动收入可以覆盖一天的伙食费', status: '未完成', date: '-', icon: '🍕', rarity: '传说' },
        { id: 'w-008', name: '谈判专家', desc: '通过沟通成功降低了一笔开支或合同价格', status: '未完成', date: '-', icon: '🤝', rarity: '史诗' },
        { id: 'w-009', name: '装备升级', desc: '购买了一件能显著提升效率的生产力工具', status: '未完成', date: '-', icon: '🛠️', rarity: '普通' },
        { id: 'w-010', name: '保险意识', desc: '为自己或家人配置了一份有效的保险', status: '未完成', date: '-', icon: '☂️', rarity: '稀有' },
        // ... (此类推至 w-025)

        // --- 3. 技能与职业 (25个) ---
        { id: 's-001', name: '初学者', desc: '任意技能达到 LV.5', status: '未完成', date: '-', icon: '👶', rarity: '普通' },
        { id: 's-002', name: '多面手', desc: '拥有 3 个不同领域的 LV.5 技能', status: '未完成', date: '-', icon: '🎨', rarity: '稀有' },
        { id: 's-003', name: '行业敲门砖', desc: '获得一个职业相关的初级证书', status: '未完成', date: '-', icon: '🔖', rarity: '史诗' },
        { id: 's-004', name: '代码诗人', desc: '独立开发并上线一个个人项目', status: '未完成', date: '-', icon: '💻', rarity: '史诗' },
        { id: 's-005', name: '演讲家', desc: '在超过 10 人的场合进行一次正式发言', status: '未完成', date: '-', icon: '📢', rarity: '稀有' },
        { id: 's-006', name: '外语桥梁', desc: '能够不用翻译看懂一篇外文技术文章', status: '未完成', date: '-', icon: '🌍', rarity: '史诗' },
        { id: 's-007', name: '协作基石', desc: '主导并成功完成一次团队合作任务', status: '未完成', date: '-', icon: '🧱', rarity: '普通' },
        { id: 's-008', name: '知识输出', desc: '在社交媒体或社区发布 3 篇原创教程', status: '未完成', date: '-', icon: '✍️', rarity: '稀有' },
        { id: 's-009', name: '效率之神', desc: '学会使用一种新的自动化工具替代重复劳动', status: '未完成', date: '-', icon: '⚡', rarity: '史诗' },
        { id: 's-010', name: '全能专家', desc: '任意职业技能达到 LV.20', status: '未完成', date: '-', icon: '🏅', rarity: '传说' },
        // ... (此类推至 s-025)

        // --- 4. 探索与生活 (25个) ---
        { id: 'l-001', name: '城市漫游', desc: '去一个从未去过的本市景点/街道', status: '未完成', date: '-', icon: '📍', rarity: '普通' },
        { id: 'l-002', name: '厨神降临', desc: '完全独立烹饪出一道复杂的硬菜', status: '未完成', date: '-', icon: '🍳', rarity: '普通' },
        { id: 'l-003', name: '社交突破', desc: '主动作自我介绍并结识一位陌生人', status: '未完成', date: '-', icon: '👋', rarity: '稀有' },
        { id: 'l-004', name: '自然之子', desc: '完成一次超过 10 公里的徒步或爬山', status: '未完成', date: '-', icon: '⛰️', rarity: '稀有' },
        { id: 'l-005', name: '胶片记忆', desc: '打印并冲洗 10 张生活照片', status: '未完成', date: '-', icon: '📸', rarity: '普通' },
        { id: 'l-006', name: '爱心使者', desc: '参与一次公益活动或捐赠行为', status: '未完成', date: '-', icon: '❤️', rarity: '史诗' },
        { id: 'l-007', name: '听觉盛宴', desc: '去现场听一次音乐会或演唱会', status: '未完成', date: '-', icon: '🎵', rarity: '稀y' },
        { id: 'l-008', name: '应急达人', desc: '整理出一个标准的家庭急救包', status: '未完成', date: '-', icon: '🏥', rarity: '普通' },
        { id: 'l-009', name: '世界那么大', desc: '完成一次独自一人的跨城旅行', status: '未完成', date: '-', icon: '✈️', rarity: '传说' },
        { id: 'l-010', name: '灵魂共鸣', desc: '找到并深入交流一个志同道合的小圈子', status: '未完成', date: '-', icon: '🫂', rarity: '史诗' },
        // ... (以此类推补全至 100 个)
      ],

      // 1. 完成成就的动作
      completeAchievement: (id) => {
        const { achievements, user } = get();
        const today = new Date().toLocaleDateString();
        
        // 稀有度奖金
        const rewards = { '普通': 10, '稀有': 50, '史诗': 200, '传说': 1000 };

        const updated = achievements.map(ach => {
          // 只要 ID 匹配且是未完成状态
          if (String(ach.id) === String(id) && ach.status === '未完成') {
            const bonus = rewards[ach.rarity] || 10;
            
            // 增加金币
            set((state) => ({ 
              user: { ...state.user, gold: (state.user.gold || 0) + bonus } 
            }));
            
            return { ...ach, status: '已完成', date: today };
          }
          return ach;
        });

        set({ achievements: updated });
      },

      // 撤销成就：回滚“已完成”并扣除对应金币
      cancelAchievement: (id) => {
        const today = '-';
        const rewards = { '普通': 10, '稀有': 50, '史诗': 200, '传说': 1000 };

        set((state) => {
          const ach = state.achievements.find((a) => String(a.id) === String(id));
          if (!ach) return state;
          if (ach.status !== '已完成') return state;

          const bonus = rewards[ach.rarity] || 10;
          const currentGold = Number(state.user?.gold) || 0;
          const nextGold = currentGold - bonus;

          if (nextGold < 0) {
            alert(`撤销失败：当前金币不足以扣除 ${bonus} 💰。`);
            return state;
          }

          return {
            user: {
              ...state.user,
              gold: nextGold,
            },
            achievements: state.achievements.map((a) => {
              if (String(a.id) !== String(id)) return a;
              return { ...a, status: '未完成', date: today };
            }),
          };
        });
      },

      // 2. 自定义添加成就的动作
      addCustomAchievement: (newAch) => {
        set((state) => ({
          achievements: [
            ...state.achievements,
            {
              id: Date.now().toString(), // 生成唯一ID
              status: '未完成',
              date: '-',
              rarity: '普通',
              icon: '🏆',
              ...newAch
            }
          ]
        }));
      },

      // =========================
      // 数据导入 / 导出（跨端同步）
      // =========================
      exportGameData: () => {
        const state = get();
        return {
          version: 1,
          exportedAt: new Date().toISOString(),
          data: {
            user: state.user,
            tasks: state.tasks,
            skills: state.skills,
            rewards: state.rewards,
            achievements: state.achievements,
          },
        };
      },

      importGameData: (raw) => {
        try {
          if (!raw) return false;

          const payload = raw.data ? raw : { data: raw };
          const data = payload.data || {};

          const tasks = Array.isArray(data.tasks) ? data.tasks : null;
          const skills = Array.isArray(data.skills) ? data.skills : null;
          const user = data.user && typeof data.user === 'object' ? data.user : null;

          // rewards/achievements 允许缺失（用当前状态兜底）
          const rewards = Array.isArray(data.rewards) ? data.rewards : null;
          const achievements = Array.isArray(data.achievements) ? data.achievements : null;

          if (!user || !tasks || !skills) return false;

          // 基础校验：task 必须有 id
          const cleanedTasks = tasks.filter(t => t && typeof t === 'object' && t.id);
          const cleanedSkills = skills.filter(s => s && typeof s === 'object' && s.id);

          if (cleanedTasks.length === 0 || cleanedSkills.length === 0) return false;

          const today = new Date().toLocaleDateString();
          let todayCompleted = 0;
          let totalCompleted = 0;

          for (const t of cleanedTasks) {
            if ((t.status === 'completed' || t.status === 'archived') && t.finishedAt) {
              totalCompleted += 1;
              const finishedDay = new Date(t.finishedAt).toLocaleDateString();
              if (finishedDay === today) todayCompleted += 1;
            }
          }

          const highestSkillLevel = cleanedSkills.reduce((max, s) => {
            const lv = Number(s.level) || 0;
            return lv > max ? lv : max;
          }, 0);

          set((state) => ({
            ...state,
            isInitialized: true,
            user: {
              ...state.user,
              ...user,
              stats: {
                todayCompleted,
                totalCompleted,
                highestSkill: highestSkillLevel,
                lastCompletedDate: totalCompleted > 0 ? today : '',
              },
            },
            tasks: cleanedTasks,
            skills: cleanedSkills,
            rewards: rewards || state.rewards,
            achievements: achievements || state.achievements,
          }));

          return true;
        } catch (e) {
          console.error('importGameData failed:', e);
          return false;
        }
      },

      // 初始化角色方法
      initializeUser: (userData) => set({ 
        user: { 
          ...userData, 
          level: 1, 
          exp: 0, 
          nextLevelExp: 100, 
          gold: 0, 
          stats: { todayCompleted: 0, totalCompleted: 0, highestSkill: "无", lastCompletedDate: "" } 
        },
        isInitialized: true 
      }),


      // 2. 清除所有数据 (彻底重置回初始状态)
      resetAllData: () => {
        if (confirm("确定要永久清除所有进度、金币和成就吗？此操作无法撤销。")) {
          localStorage.clear(); // 如果你使用了 persist 中间件，这会确保缓存也被清空
          // persist 使用的是 localforage（IndexedDB），需要一起清理
          localforage.clear().finally(() => window.location.reload()); // 刷新页面以确保状态完全同步
        }
      }
    }),
    {
      name: 'game-life-storage',
      storage: createJSONStorage(() => localforage),
    }
  )
);

export default useGameStore;