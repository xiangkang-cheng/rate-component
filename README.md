# 评分组件使用指南

### 1. 启动项目:

1.1 git clone

1.2  npm install

1.3 npm run dev

1.4 浏览器打开 http://localhost:8081/

### 2. 组件参数简介:

2.1 props

|     参数      |          说明           |  类型   |                  默认值                  |
| :-----------: | :---------------------: | :-----: | :--------------------------------------: |
|     value     |         分数值          | Number  |                    0                     |
|      max      |        最大分值         | Number  |                    5                     |
|  activeClass  |     有效分值的类名      | String  |               icon-star-on               |
| disabledClass |     无效分值的类名      | String  |              icon-star-off               |
|   readOnly    | 是否只读,只读时允许小数 | Boolean |                  false                   |
|   showText    |      是否显示文案       | Boolean |                  false                   |
|   showScore   |      是否显示分值       | Boolean |                  false                   |
|     texts     |     分值对应的文案      |  Array  | ['极差', '失望', '一般', '满意', '惊喜'] |
|   textClass   |        文案类名         | String  |                rate-text                 |

2.2 事件

| 事件名 |       说明       |   回调参数   |
| :----: | :--------------: | :----------: |
| change | 分值改变时的回调 | 改变后的分值 |

### 3. 使用示例

3.1 基本使用

```vue
<my-rate :value='4' show-score></my-rate>
```

3.2 展示分数(只读)

```vue
<my-rate :value='3.5' show-score read-only></my-rate>
```

3.3 展示文案

```vue
<my-rate :value='3' show-text></my-rate>
```

