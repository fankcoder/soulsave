# 游戏人生 API 接口文档

## 基础信息

- **基础URL**: `http://localhost:8000/api`
- **认证方式**: Bearer Token (JWT)
- **响应格式**: JSON
- **日期格式**: `YYYY-MM-DD HH:MM:SS`

---

## 目录

1. [认证模块](#1-认证模块)
2. [任务模块](#2-任务模块)
3. [技能模块](#3-技能模块)
4. [商店模块](#4-商店模块)
5. [成就模块](#5-成就模块)
6. [日志模块](#6-日志模块)
7. [仪表盘模块](#7-仪表盘模块)

---

## 1. 认证模块

### 1.1 用户注册

**端点**: `POST /auth/register/`

**请求体**:
```json
{
  "username": "player1",
  "password": "securepass123",
  "password2": "securepass123",
  "email": "player1@example.com",
  "nickname": "游戏玩家1"
}
```

**成功响应** (201 Created):
```json
{
  "id": 1,
  "username": "player1",
  "email": "player1@example.com",
  "nickname": "游戏玩家1"
}
```

**错误响应** (400 Bad Request):
```json
{
  "username": ["用户已存在"],
  "password": ["两次输入的密码不一致"]
}
```

### 1.2 用户登录

**端点**: `POST /auth/login/`

**请求体**:
```json
{
  "username": "player1",
  "password": "securepass123"
}
```

**成功响应** (200 OK):
```json
{
  "access": "eyJ0eXAiOiJKV1Qi...",
  "refresh": "eyJ0eXAiOiJKV1Qi..."
}
```

### 1.3 刷新令牌

**端点**: `POST /auth/token/refresh/`

**请求体**:
```json
{
  "refresh": "eyJ0eXAiOiJKV1Qi..."
}
```

**成功响应** (200 OK):
```json
{
  "access": "eyJ0eXAiOiJKV1Qi..."
}
```

### 1.4 获取当前用户信息

**端点**: `GET /auth/me/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "id": 1,
  "username": "player1",
  "email": "player1@example.com",
  "nickname": "游戏玩家1",
  "avatar": "/media/avatars/avatar1.jpg",
  "level": 10,
  "total_exp": 12500,
  "gold_coins": 500,
  "tasks_completed": 150,
  "daily_streak": 7,
  "date_joined": "2024-01-01 10:00:00",
  "last_login": "2024-01-15 20:30:00"
}
```

### 1.5 更新用户资料

**端点**: `PUT /auth/me/update/`

**Headers**: `Authorization: Bearer <access_token>`
**Content-Type**: `multipart/form-data`

**请求体**:
```
nickname: "新昵称"
email: "new@example.com"
avatar: [文件上传]
```

**成功响应** (200 OK):
```json
{
  "id": 1,
  "username": "player1",
  "nickname": "新昵称",
  "email": "new@example.com",
  "avatar": "/media/avatars/new_avatar.jpg"
}
```

### 1.6 修改密码

**端点**: `POST /auth/me/change-password/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "old_password": "oldpass123",
  "new_password": "newpass123",
  "new_password2": "newpass123"
}
```

**成功响应** (200 OK):
```json
{
  "message": "密码修改成功"
}
```

### 1.7 获取用户统计

**端点**: `GET /auth/me/stats/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "level": 10,
  "total_exp": 12500,
  "gold_coins": 500,
  "tasks_completed": 150,
  "daily_streak": 7
}
```

### 1.8 检查用户名

**端点**: `GET /auth/check-username/`

**查询参数**:
- `username`: 要检查的用户名

**成功响应** (200 OK):
```json
{
  "username": "player1",
  "available": true,
  "message": "用户名可用"
}
```

### 1.9 获取排行榜

**端点**: `GET /auth/leaderboard/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "current_user_rank": 15,
  "leaderboard": [
    {
      "rank": 1,
      "username": "top_player",
      "nickname": "大神",
      "level": 50,
      "total_exp": 125000,
      "tasks_completed": 1000,
      "daily_streak": 30
    }
  ]
}
```

---

## 2. 任务模块

### 2.1 获取任务分类

**端点**: `GET /tasks/categories/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
[
  {
    "id": 1,
    "name": "学习",
    "icon": "book",
    "color": "#3498db",
    "description": "学习新知识、技能"
  }
]
```

### 2.2 获取任务模板列表

**端点**: `GET /tasks/templates/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `search`: 搜索关键词
- `ordering`: 排序字段 (created_at, base_exp, difficulty)
- `category_id`: 分类ID

**成功响应** (200 OK):
```json
[
  {
    "id": 1,
    "title": "学习编程1小时",
    "description": "学习编程知识，实践代码",
    "task_type": "daily",
    "category": {
      "id": 1,
      "name": "学习",
      "icon": "book"
    },
    "base_exp": 50,
    "base_gold": 35,
    "difficulty": 3,
    "related_skill": {
      "id": 1,
      "name": "Python",
      "category": "编程开发"
    },
    "skill_exp_bonus": 10,
    "reset_type": "daily",
    "is_public": true,
    "created_by_username": "admin",
    "created_at": "2024-01-01 10:00:00"
  }
]
```

### 2.3 创建任务模板

**端点**: `POST /tasks/templates/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "title": "学习React",
  "description": "学习React基础知识",
  "task_type": "normal",
  "category_id": 1,
  "base_exp": 50,
  "base_gold": 30,
  "difficulty": 3,
  "related_skill": 1,
  "skill_exp_bonus": 10,
  "reset_type": "none",
  "is_public": false
}
```

**成功响应** (201 Created):
```json
{
  "id": 2,
  "title": "学习React",
  "task_type": "normal",
  "category": {
    "id": 1,
    "name": "学习"
  },
  "created_at": "2024-01-15 20:30:00"
}
```

### 2.4 获取用户任务列表

**端点**: `GET /tasks/user/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `status`: active/completed/expired/all
- `task_type`: daily/weekly/normal/all
- `category_id`: 分类ID
- `search`: 搜索关键词
- `is_archived`: true/false
- `date_from`: 开始日期
- `date_to`: 结束日期

**成功响应** (200 OK):
```json
[
  {
    "id": 123,
    "title": "学习编程",
    "description": "完成编程练习",
    "task_type": "daily",
    "category": {
      "id": 1,
      "name": "学习",
      "color": "#3498db"
    },
    "base_exp": 50,
    "base_gold": 30,
    "difficulty": 3,
    "related_skill": {
      "id": 1,
      "name": "Python"
    },
    "status": "active",
    "progress_current": 2,
    "progress_target": 5,
    "progress_percentage": 40,
    "deadline": "2024-01-16 23:59:59",
    "time_remaining": 86400,
    "is_expired": false,
    "created_at": "2024-01-15 10:00:00"
  }
]
```

### 2.5 创建任务

**端点**: `POST /tasks/user/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "title": "完成项目文档",
  "description": "编写项目README",
  "task_type": "normal",
  "category_id": 2,
  "base_exp": 30,
  "base_gold": 20,
  "difficulty": 2,
  "deadline": "2024-01-20 23:59:59",
  "progress_target": 1
}
```

**成功响应** (201 Created):
```json
{
  "id": 124,
  "title": "完成项目文档",
  "status": "active",
  "created_at": "2024-01-15 20:30:00"
}
```

### 2.6 完成任务

**端点**: `POST /tasks/complete/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "task_id": 123
}
```

**成功响应** (200 OK):
```json
{
  "message": "任务完成",
  "task": {
    "id": 123,
    "title": "学习编程",
    "status": "completed"
  },
  "rewards": {
    "exp": 150,
    "gold": 90
  }
}
```

### 2.7 更新任务进度

**端点**: `POST /tasks/update-progress/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "task_id": 123,
  "progress_value": 3
}
```

**成功响应** (200 OK):
```json
{
  "message": "进度更新成功",
  "task": {
    "id": 123,
    "progress_current": 3,
    "progress_percentage": 60
  }
}
```

### 2.8 批量完成任务

**端点**: `POST /tasks/batch-complete/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "task_ids": [123, 124, 125]
}
```

**成功响应** (200 OK):
```json
{
  "message": "成功完成 3 个任务",
  "total_exp": 450,
  "total_gold": 270,
  "completed_tasks": [
    {
      "id": 123,
      "title": "任务1",
      "exp": 150,
      "gold": 90
    }
  ]
}
```

### 2.9 删除任务（归档）

**端点**: `DELETE /tasks/user/{id}/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (204 No Content)

### 2.10 从模板创建任务

**端点**: `POST /tasks/create-from-template/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "template_id": 1,
  "deadline": "2024-12-31 23:59:59",
  "progress_target": 10
}
```

**成功响应** (201 Created):
```json
{
  "id": 125,
  "title": "学习编程1小时",
  "status": "active",
  "progress_target": 10
}
```

### 2.11 获取任务统计

**端点**: `GET /tasks/statistics/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "total": 150,
  "completed": 120,
  "active": 25,
  "expired": 5,
  "completion_rate": 80,
  "by_type": {
    "daily": 50,
    "weekly": 30,
    "normal": 70
  },
  "by_category": [
    {
      "category_id": 1,
      "category_name": "学习",
      "total": 60,
      "completed": 50,
      "completion_rate": 83
    }
  ],
  "recent_completed": [
    {
      "id": 123,
      "title": "任务1",
      "completed_at": "2024-01-15 20:30:00"
    }
  ],
  "upcoming_deadlines": [
    {
      "id": 124,
      "title": "任务2",
      "deadline": "2024-01-16 23:59:59",
      "progress": 50
    }
  ]
}
```

### 2.12 重置每日任务

**端点**: `POST /tasks/reset-daily/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "message": "已过期 3 个每日任务"
}
```

---

## 3. 技能模块

### 3.1 获取技能分类

**端点**: `GET /skills/categories/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
[
  {
    "id": 1,
    "name": "编程开发",
    "icon": "code",
    "color": "#3498db",
    "description": "编程语言、框架、开发工具",
    "sort_order": 1,
    "skill_count": 10
  }
]
```

### 3.2 获取技能列表

**端点**: `GET /skills/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `category`: 分类ID
- `only_unlearned`: true/false
- `search`: 搜索关键词

**成功响应** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Python",
    "category": {
      "id": 1,
      "name": "编程开发"
    },
    "icon": "python",
    "description": "Python编程语言",
    "max_level": 100,
    "exp_per_level": 100,
    "is_active": true
  }
]
```

### 3.3 获取用户技能列表

**端点**: `GET /skills/user/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `category`: 分类ID
- `only_upgradable`: true/false
- `search`: 搜索关键词

**成功响应** (200 OK):
```json
[
  {
    "id": 1,
    "skill": {
      "id": 1,
      "name": "Python",
      "icon": "python",
      "category": "编程开发"
    },
    "level": 5,
    "current_exp": 350,
    "total_exp_earned": 1350,
    "current_level_progress": 350,
    "next_level_exp_needed": 500,
    "progress_percentage": 70,
    "last_updated": "2024-01-15 20:30:00"
  }
]
```

### 3.4 学习新技能

**端点**: `POST /skills/user/learn/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "skill_id": 2
}
```

**成功响应** (201 Created):
```json
{
  "id": 2,
  "skill": {
    "id": 2,
    "name": "JavaScript"
  },
  "level": 1,
  "current_exp": 0
}
```

### 3.5 增加技能经验

**端点**: `POST /skills/user/add-exp/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "user_skill_id": 1,
  "exp_amount": 50,
  "source": "task_complete",
  "source_id": 123
}
```

**成功响应** (200 OK):
```json
{
  "message": "经验增加成功",
  "user_skill": {
    "id": 1,
    "level": 5,
    "current_exp": 400
  },
  "level_up": false,
  "old_level": 5,
  "new_level": 5
}
```

### 3.6 批量增加技能经验

**端点**: `POST /skills/user/bulk-add-exp/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "exp_list": [
    {"skill_id": 1, "exp_amount": 30},
    {"skill_id": 2, "exp_amount": 20}
  ]
}
```

**成功响应** (200 OK):
```json
{
  "message": "批量处理完成，1 个技能升级",
  "results": [
    {
      "skill_id": 1,
      "skill_name": "Python",
      "exp_added": 30,
      "level_up": true,
      "new_level": 6,
      "success": true
    }
  ]
}
```

### 3.7 获取技能树

**端点**: `GET /skills/tree/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "categories": [
    {
      "id": 1,
      "name": "编程开发",
      "icon": "code",
      "color": "#3498db",
      "skills": [
        {
          "id": 1,
          "name": "Python",
          "icon": "python",
          "description": "Python编程",
          "max_level": 100,
          "exp_per_level": 100,
          "is_learned": true,
          "user_skill": {
            "level": 5,
            "current_exp": 350,
            "progress": 70
          }
        }
      ]
    }
  ],
  "user_skills": [...],
  "total_skills": 50,
  "learned_skills": 12,
  "mastery_percentage": 24
}
```

### 3.8 获取技能统计

**端点**: `GET /skills/statistics/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "total_skills": 50,
  "learned_skills": 12,
  "avg_level": 3.5,
  "total_exp_earned": 12500,
  "highest_skill": {
    "id": 1,
    "name": "Python",
    "level": 5,
    "icon": "python"
  },
  "recent_upgrades": [
    {
      "created_at": "2024-01-15 20:30:00",
      "title": "技能升级: Python",
      "metadata": {
        "old_level": 4,
        "new_level": 5
      }
    }
  ],
  "by_category": [
    {
      "category_id": 1,
      "category_name": "编程开发",
      "total": 10,
      "learned": 3,
      "completion_rate": 30
    }
  ],
  "level_distribution": [
    {"level": 1, "count": 5},
    {"level": 2, "count": 3}
  ]
}
```

### 3.9 获取技能推荐

**端点**: `GET /skills/recommendations/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
[
  {
    "id": 5,
    "name": "数据库",
    "category": "编程开发",
    "icon": "database",
    "description": "学习SQL和数据库设计...",
    "max_level": 80
  }
]
```

### 3.10 获取技能排行榜

**端点**: `GET /skills/ranking/{skill_id}/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "skill_name": "Python",
  "total_players": 150,
  "current_user_rank": 25,
  "rankings": [
    {
      "rank": 1,
      "user_id": 10,
      "username": "python_master",
      "nickname": "Python大神",
      "level": 50,
      "total_exp": 125000
    }
  ]
}
```

---

## 4. 商店模块

### 4.1 获取奖励分类

**端点**: `GET /store/categories/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
[
  {
    "id": 1,
    "name": "美食",
    "icon": "utensils",
    "description": "奶茶、零食、美食等",
    "sort_order": 1,
    "reward_count": 10
  }
]
```

### 4.2 获取奖励列表

**端点**: `GET /store/rewards/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `search`: 搜索关键词
- `category_id`: 分类ID
- `min_gold`: 最小金币
- `max_gold`: 最大金币
- `min_level`: 所需等级
- `reward_type`: entertainment/snack/purchase/break/custom
- `in_stock_only`: true/false
- `affordable_only`: true/false
- `ordering`: 排序字段

**成功响应** (200 OK):
```json
[
  {
    "id": 1,
    "name": "一杯奶茶",
    "category": {
      "id": 1,
      "name": "美食",
      "icon": "utensils"
    },
    "reward_type": "snack",
    "gold_cost": 50,
    "level_required": 1,
    "description": "奖励自己一杯美味的奶茶",
    "image": "/media/rewards/milk_tea.jpg",
    "stock": -1,
    "sold_count": 150,
    "is_active": true,
    "can_afford": true,
    "meets_level_requirement": true,
    "is_available": true
  }
]
```

### 4.3 兑换奖励

**端点**: `POST /store/redeem/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "reward_id": 1,
  "note": "今天完成学习任务，奖励自己"
}
```

**成功响应** (201 Created):
```json
{
  "message": "兑换成功",
  "redemption": {
    "id": 1001,
    "user": 1,
    "reward": 1,
    "reward_name": "一杯奶茶",
    "gold_spent": 50,
    "status": "pending",
    "redeemed_at": "2024-01-15 20:30:00",
    "note": "今天完成学习任务，奖励自己"
  },
  "remaining_gold": 450
}
```

### 4.4 批量兑换奖励

**端点**: `POST /store/redeem/bulk/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "reward_ids": [1, 2, 3],
  "note": "周末奖励"
}
```

**成功响应** (201 Created):
```json
{
  "message": "成功兑换 3 个奖励",
  "total_cost": 200,
  "remaining_gold": 300,
  "redemptions": [...]
}
```

### 4.5 获取我的兑换记录

**端点**: `GET /store/my-redemptions/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `status`: pending/completed/cancelled
- `date_from`: 开始日期
- `date_to`: 结束日期

**成功响应** (200 OK):
```json
[
  {
    "id": 1001,
    "reward_name": "一杯奶茶",
    "reward_icon": "utensils",
    "reward_image": "/media/rewards/milk_tea.jpg",
    "gold_spent": 50,
    "status": "pending",
    "redeemed_at": "2024-01-15 20:30:00",
    "note": "今天完成学习任务"
  }
]
```

### 4.6 获取商店统计

**端点**: `GET /store/statistics/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "total_rewards": 50,
  "available_rewards": 45,
  "total_redemptions": 1500,
  "total_gold_spent": 75000,
  "popular_rewards": [
    {
      "reward_id": 1,
      "reward_name": "一杯奶茶",
      "count": 150,
      "gold_cost": 50
    }
  ],
  "by_category": [
    {
      "category_id": 1,
      "category_name": "美食",
      "rewards_count": 10,
      "redemptions_count": 500
    }
  ],
  "user_stats": {
    "my_redemptions": 25,
    "my_gold_spent": 1250,
    "available_rewards": 45
  }
}
```

### 4.7 获取奖励推荐

**端点**: `GET /store/suggestions/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
[
  {
    "id": 1,
    "name": "一杯奶茶",
    "category": "美食",
    "gold_cost": 50,
    "level_required": 1,
    "can_afford": true,
    "meets_level_requirement": true
  }
]
```

### 4.8 取消兑换

**端点**: `POST /store/redeem/{redemption_id}/cancel/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "message": "兑换已取消",
  "refunded_gold": 50
}
```

---

## 5. 成就模块

### 5.1 获取成就列表

**端点**: `GET /achievements/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `rarity`: common/rare/epic/legendary
- `type`: task/skill/streak/special
- `status`: earned/not_earned/in_progress

**成功响应** (200 OK):
```json
[
  {
    "id": 1,
    "name": "初出茅庐",
    "description": "完成第一个任务",
    "icon": "star",
    "type": "task",
    "type_display": "任务成就",
    "condition_type": "tasks_completed",
    "condition_value": 1,
    "reward_exp": 50,
    "reward_gold": 30,
    "rarity": "common",
    "rarity_display": "普通",
    "is_earned": true,
    "earned_at": "2024-01-01 10:00:00",
    "progress_current": 1,
    "progress_percentage": 100
  }
]
```

### 5.2 获取成就墙

**端点**: `GET /achievements/my/wall/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
[
  {
    "id": 1,
    "name": "初出茅庐",
    "description": "完成第一个任务",
    "icon": "star",
    "rarity": "common",
    "is_earned": true,
    "progress": {
      "current": 1,
      "percentage": 100
    }
  }
]
```

### 5.3 获取我的成就

**端点**: `GET /achievements/my/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
[
  {
    "id": 1,
    "achievement": {
      "id": 1,
      "name": "初出茅庐",
      "icon": "star"
    },
    "earned_at": "2024-01-01 10:00:00",
    "is_displayed": true
  }
]
```

### 5.4 获取成就进度

**端点**: `GET /achievements/my/progress/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
[
  {
    "id": 1,
    "achievement": {
      "id": 2,
      "name": "任务达人",
      "icon": "tasks",
      "condition_value": 100
    },
    "current_value": 50,
    "last_updated": "2024-01-15 20:30:00"
  }
]
```

### 5.5 获取成就统计

**端点**: `GET /achievements/my/statistics/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "total_achievements": 50,
  "earned_achievements": 12,
  "completion_percentage": 24,
  "total_reward_exp": 600,
  "total_reward_gold": 360,
  "by_rarity": [
    {
      "rarity": "common",
      "display": "普通",
      "total": 30,
      "earned": 10,
      "percentage": 33.3
    }
  ],
  "by_type": [...],
  "recent_earned": [
    {
      "id": 1,
      "name": "初出茅庐",
      "icon": "star",
      "rarity": "common",
      "earned_at": "2024-01-01 10:00:00"
    }
  ],
  "next_achievements": [
    {
      "id": 2,
      "name": "任务达人",
      "icon": "tasks",
      "rarity": "rare",
      "progress_current": 50,
      "progress_target": 100,
      "progress_percentage": 50
    }
  ]
}
```

### 5.6 检查成就进度

**端点**: `POST /achievements/check/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "event_type": "task_complete",
  "event_data": {
    "task_id": 123,
    "task_type": "daily"
  }
}
```

**成功响应** (200 OK):
```json
{
  "message": "检查完成，获得 1 个新成就",
  "new_achievements": [
    {
      "id": 2,
      "name": "任务达人",
      "rarity": "rare"
    }
  ]
}
```

### 5.7 更新成就进度

**端点**: `POST /achievements/update-progress/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "condition_type": "tasks_completed",
  "increment": 1
}
```

**成功响应** (200 OK):
```json
{
  "message": "进度更新完成，获得 0 个新成就",
  "new_achievements": []
}
```

### 5.8 分享成就

**端点**: `POST /achievements/share/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "achievement_id": 1,
  "platform": "wechat"
}
```

**成功响应** (200 OK):
```json
{
  "share_text": "我在游戏人生中获得了【初出茅庐】成就！完成第一个任务",
  "share_url": "https://yourapp.com/achievement/1",
  "platform": "wechat"
}
```

### 5.9 切换成就显示状态

**端点**: `POST /achievements/toggle-display/{achievement_id}/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "message": "更新成功",
  "is_displayed": false
}
```

### 5.10 比较成就

**端点**: `GET /achievements/compare/{user_id}/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "user1": {
    "id": 1,
    "username": "player1",
    "total": 12
  },
  "user2": {
    "id": 2,
    "username": "friend",
    "total": 15
  },
  "common": {
    "count": 5,
    "achievements": [...]
  },
  "unique_to_me": {
    "count": 7,
    "achievements": [...]
  },
  "unique_to_other": {
    "count": 10,
    "achievements": [...]
  }
}
```

---

## 6. 日志模块

### 6.1 获取活动日志

**端点**: `GET /logs/activities/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `activity_type`: 活动类型
- `start_date`: 开始日期
- `end_date`: 结束日期
- `object_type`: 对象类型
- `min_exp`: 最小经验
- `min_gold`: 最小金币

**成功响应** (200 OK):
```json
[
  {
    "id": 1001,
    "user": 1,
    "user_username": "player1",
    "activity_type": "task_complete",
    "title": "完成任务: 学习编程",
    "description": "获得 50 经验, 30 金币",
    "object_id": 123,
    "object_type": "task",
    "exp_change": 50,
    "gold_change": 30,
    "metadata": {
      "task_id": 123,
      "task_title": "学习编程",
      "difficulty": 3
    },
    "time_ago": "2小时前",
    "created_at": "2024-01-15 18:30:00"
  }
]
```

### 6.2 记录事件

**端点**: `POST /logs/events/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "event_type": "task_completed_at_night",
  "event_data": {
    "task_id": 123,
    "hour": 23
  }
}
```

**成功响应** (201 Created):
```json
{
  "message": "事件记录成功",
  "event_id": 5001
}
```

### 6.3 查询事件

**端点**: `GET /logs/events/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `event_type`: 事件类型
- `start_date`: 开始日期
- `end_date`: 结束日期
- `aggregate`: true/false

**成功响应** (200 OK):
```json
[
  {
    "id": 5001,
    "user": 1,
    "event_type": "task_completed_at_night",
    "event_data": {
      "task_id": 123,
      "hour": 23
    },
    "created_at": "2024-01-15 23:00:00"
  }
]
```

### 6.4 记录时间序列数据

**端点**: `POST /logs/timeseries/`

**Headers**: `Authorization: Bearer <access_token>`

**请求体**:
```json
{
  "data_type": "daily_tasks",
  "value": 5,
  "period": "day",
  "metadata": {
    "category": "学习"
  }
}
```

**成功响应** (201 Created):
```json
{
  "message": "数据记录成功",
  "id": 3001
}
```

### 6.5 获取时间序列数据

**端点**: `GET /logs/timeseries/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `data_type`: 数据类型
- `period`: day/week/month
- `days`: 天数

**成功响应** (200 OK):
```json
{
  "daily_tasks": [
    {
      "date": "2024-01-15",
      "value": 5,
      "count": 1
    }
  ]
}
```

### 6.6 获取用户活动统计

**端点**: `GET /logs/stats/activity/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `days`: 天数，默认30

**成功响应** (200 OK):
```json
{
  "total_logs": 150,
  "total_exp_gained": 7500,
  "total_gold_gained": 4500,
  "total_gold_spent": 2000,
  "net_gold": 2500,
  "activity_breakdown": [
    {
      "activity_type": "task_complete",
      "count": 120,
      "total_exp": 6000,
      "total_gold": 3600
    }
  ],
  "daily_average": {
    "logs": 5,
    "exp": 250,
    "gold": 83
  },
  "peak_hours": [
    {
      "hour": "20:00:00",
      "count": 30
    }
  ],
  "heatmap_data": [
    {
      "weekday": 0,
      "hour": 20,
      "count": 10
    }
  ]
}
```

### 6.7 查询成就进度

**端点**: `GET /logs/stats/achievement-progress/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `condition_type`: 条件类型
- `target_value`: 目标值
- `skill_id`: 技能ID（可选）
- `category`: 分类（可选）
- `level`: 等级（可选）

**成功响应** (200 OK):
```json
{
  "condition_type": "early_bird",
  "current_value": 8,
  "target_value": 10,
  "percentage": 80,
  "related_data": {}
}
```

### 6.8 获取时间范围统计

**端点**: `GET /logs/stats/time-range/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `period`: day/week/month/year
- `start_date`: 开始日期
- `end_date`: 结束日期

**成功响应** (200 OK):
```json
{
  "date_range": ["2024-01-01", "2024-01-15"],
  "task_stats": [
    {
      "date": "2024-01-01",
      "value": 5
    }
  ],
  "exp_stats": [...],
  "gold_stats": [...],
  "activity_heatmap": [...]
}
```

### 6.9 导出数据

**端点**: `GET /logs/export/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `type`: all/logs/daily/events
- `format`: json/csv

**成功响应**:
- JSON格式: 200 OK
- CSV格式: 文件下载

---

## 7. 仪表盘模块

### 7.1 获取仪表盘概览

**端点**: `GET /dashboard/overview/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "overview": {
    "user_info": {
      "id": 1,
      "username": "player1",
      "nickname": "游戏玩家",
      "avatar": null,
      "level": 10,
      "gold": 500,
      "join_date": "2024-01-01"
    },
    "level_progress": {
      "current_level": 10,
      "current_exp": 250,
      "exp_to_next_level": 750,
      "progress_percentage": 25,
      "total_exp": 12500
    },
    "today_stats": {
      "tasks_completed": 3,
      "tasks_planned": 5,
      "exp_earned": 150,
      "gold_earned": 90,
      "gold_spent": 0,
      "net_gold": 90,
      "daily_goal_progress": {
        "goal": 5,
        "current": 3,
        "percentage": 60
      },
      "tasks_by_category": [
        {
          "category": "学习",
          "count": 2
        }
      ]
    },
    "quick_actions": [
      {
        "id": "add_task",
        "title": "添加任务",
        "icon": "plus-circle",
        "color": "#3498db",
        "url": "/tasks/add"
      }
    ],
    "recent_activities": [
      {
        "id": 1001,
        "type": "task_complete",
        "title": "完成任务: 学习编程",
        "time_ago": "2小时前",
        "icon": "check-circle",
        "color": "#2ecc71"
      }
    ],
    "pending_tasks": [
      {
        "id": 124,
        "title": "完成文档",
        "category": "工作",
        "category_color": "#2ecc71",
        "deadline": "2024-01-16 23:59:59",
        "deadline_display": "明天",
        "priority": "high",
        "progress": 0
      }
    ]
  },
  "skills": {
    "total_skills": 8,
    "avg_level": 3.5,
    "top_skills": [
      {
        "id": 1,
        "name": "Python",
        "level": 5,
        "icon": "python",
        "progress": 70
      }
    ],
    "recent_upgrades": [
      {
        "skill_name": "Python",
        "old_level": 4,
        "new_level": 5,
        "time_ago": "1天前"
      }
    ],
    "skill_distribution": [
      {
        "range": "1-10",
        "count": 8
      }
    ]
  },
  "achievements": {
    "total_achievements": 50,
    "earned_count": 12,
    "completion_percentage": 24,
    "recent_achievements": [
      {
        "id": 1,
        "name": "初出茅庐",
        "icon": "star",
        "rarity": "common",
        "earned_at": "2024-01-01 10:00:00"
      }
    ],
    "next_achievements": [
      {
        "id": 2,
        "name": "任务达人",
        "icon": "tasks",
        "progress": 50
      }
    ],
    "rarity_distribution": [
      {
        "rarity": "common",
        "display": "普通",
        "total": 30,
        "earned": 10
      }
    ]
  },
  "economy": {
    "current_gold": 500,
    "total_earned": 5000,
    "total_spent": 4500,
    "recent_transactions": [
      {
        "title": "完成任务: 学习编程",
        "amount": 30,
        "type": "earn",
        "time_ago": "2小时前"
      }
    ],
    "spending_by_category": [
      {
        "category": "redeem_reward",
        "amount": 4500
      }
    ],
    "gold_trend": [
      {
        "date": "2024-01-15",
        "earned": 90,
        "spent": 0,
        "net": 90
      }
    ]
  },
  "tasks": {
    "completion_rate": 80,
    "total_tasks": 150,
    "completed_tasks": 120,
    "by_type": [
      {
        "type": "daily",
        "display": "每日任务",
        "count": 50
      }
    ],
    "by_category": [
      {
        "category": "学习",
        "icon": "book",
        "color": "#3498db",
        "count": 60
      }
    ],
    "by_difficulty": [
      {
        "difficulty": 1,
        "count": 30
      }
    ],
    "weekly_trend": [
      {
        "date": "2024-01-15",
        "count": 5
      }
    ],
    "best_day": {
      "date": "2024-01-14",
      "count": 8
    },
    "best_category": {
      "category": "学习",
      "count": 60
    }
  },
  "weekly": {
    "week_dates": ["2024-01-09", "2024-01-15"],
    "tasks_data": [5, 6, 4, 7, 8, 5, 3],
    "exp_data": [250, 300, 200, 350, 400, 250, 150],
    "gold_data": [150, 180, 120, 210, 240, 150, 90],
    "comparison_with_last_week": {
      "this_week": 38,
      "last_week": 35,
      "change": 3,
      "percentage_change": 8.57
    }
  },
  "productivity": {
    "heatmap_data": [
      {
        "date": "2024-01-15",
        "count": 5,
        "weekday": 0,
        "week": 3
      }
    ],
    "max_value": 8,
    "average": 5.2,
    "peak_hours": [
      {
        "hour": 20,
        "count": 30
      }
    ]
  }
}
```

### 7.2 获取图表数据

**端点**: `GET /dashboard/charts/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `type`: tasks/skills/gold/achievements/productivity
- `period`: day/week/month/year

**成功响应** (200 OK) - 任务图表:
```json
{
  "labels": ["01-09", "01-10", "01-11", "01-12", "01-13", "01-14", "01-15"],
  "datasets": [
    {
      "label": "完成任务数",
      "data": [5, 6, 4, 7, 8, 5, 3],
      "backgroundColor": "rgba(52, 152, 219, 0.5)",
      "borderColor": "#3498db",
      "borderWidth": 2
    }
  ]
}
```

### 7.3 获取通知

**端点**: `GET /dashboard/notifications/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "notifications": [
    {
      "id": "task_124",
      "type": "warning",
      "title": "任务即将到期",
      "message": "\"完成文档\" 还有 12 小时到期",
      "is_read": false,
      "created_at": "2024-01-15 20:30:00",
      "action_url": "/tasks/124",
      "icon": "clock"
    }
  ],
  "unread_count": 3
}
```

### 7.4 获取目标进度

**端点**: `GET /dashboard/goals/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "daily_goal": 5,
  "weekly_goal": 30,
  "monthly_goal": 120,
  "daily_progress": 3,
  "weekly_progress": 20,
  "monthly_progress": 80,
  "daily_percentage": 60,
  "weekly_percentage": 66.7,
  "monthly_percentage": 66.7
}
```

### 7.5 获取仪表盘设置

**端点**: `GET /dashboard/settings/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "theme": "light",
  "default_view": "week",
  "visible_widgets": ["overview", "skills", "achievements", "economy", "tasks", "productivity"],
  "widget_order": ["overview", "skills", "achievements", "economy", "tasks", "productivity"],
  "refresh_interval": 300
}
```

### 7.6 获取自定义布局

**端点**: `GET /dashboard/custom/`

**Headers**: `Authorization: Bearer <access_token>`

**成功响应** (200 OK):
```json
{
  "widgets": [
    {
      "id": "overview",
      "title": "概览",
      "type": "overview",
      "gridPos": {
        "x": 0,
        "y": 0,
        "w": 12,
        "h": 2
      }
    }
  ],
  "layout": {
    "columns": 12,
    "rowHeight": 100
  }
}
```

### 7.7 导出仪表盘报告

**端点**: `GET /dashboard/export/`

**Headers**: `Authorization: Bearer <access_token>`

**查询参数**:
- `format`: pdf/csv

**成功响应**:
- PDF格式: 文件下载
- CSV格式: 文件下载

---

## 错误响应格式

所有接口在发生错误时都会返回统一的错误格式：

**400 Bad Request**:
```json
{
  "field_name": ["错误信息1", "错误信息2"]
}
```

或

```json
{
  "non_field_errors": ["通用错误信息"]
}
```

**401 Unauthorized**:
```json
{
  "detail": "认证信息无效或已过期"
}
```

**403 Forbidden**:
```json
{
  "detail": "您没有权限执行此操作"
}
```

**404 Not Found**:
```json
{
  "detail": "未找到"
}
```

**500 Internal Server Error**:
```json
{
  "detail": "服务器内部错误"
}
```