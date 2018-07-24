/**
 * 组件 导航
 */

const componentsNav = [
  {
    "en": "base",
    "zh": "基础组件",
    "icon": "appstore",
    "components": [
      {
        "name": "Icon",
        "zh": "图标"
      },
      {
        "name": "Card",
        "zh": "卡片"
      }
    ]
  },
  {
    "en": "charts",
    "zh": "可视化图表",
    "icon": "pie-chart",
    "components": [
      {
        "name": "Recharts",
        "zh": "基础图表库",
        "type": "sub",
        "components": [
          {
            "name": "Recharts",
            "zh": "概览"
          },
          {
            "name": "EBar",
            "zh": "柱状图"
          },
          {
            "name": "ELine",
            "zh": "线性图"
          },
          {
            "name": "EPie",
            "zh": "饼图"
          },
          {
            "name": "EMap",
            "zh": "地图"
          }
        ]
      },
      {
        "name": "D3",
        "zh": "关系图表库",
        "type": "sub",
        "components": [
          {
            "name": "Graph",
            "zh": "企业图谱"
          },
          {
            "name": "ForceBubble",
            "zh": "气泡图"
          },
          {
            "name": "IDPullThrough",
            "zh": "ID拉通图"
          }
        ]
      }
    ]
  },
  {
    "en": "business",
    "zh": "业务定制",
    "icon": "rocket",
    "components": [
      {
        "name": "NotDev",
        "zh": "未开发",
      },
      {
        "name": "PreCode",
        "zh": "代码高亮",
      },
      {
        "name": "SplitPanel",
        "zh": "区域分栏",
      }
    ]
  },
  {
    "en": "tools",
    "zh": "工具模块",
    "icon": "tool",
    "components": [
      {
        "name": "xhr",
        "zh": "ajax请求",
      }
    ]
  },
];

export default componentsNav;