# Design

## Visual Thesis

清晨冰蓝色的幻想科技入口：全画布图像承载“进入简历世界”的第一记忆点，蓝白光门表达 AI 与工程化，真实项目截图和分组详情承担证据感。

## Palette

- `--bg`: `oklch(1 0 0)`
- `--surface`: `oklch(0.972 0.012 248)`
- `--ink`: `oklch(0.18 0.055 255)`
- `--muted`: `oklch(0.43 0.045 250)`
- `--primary`: `oklch(0.58 0.19 252)`
- `--accent`: `oklch(0.82 0.12 215)`

## Typography

使用系统中文无衬线栈，优先保证 Windows 与移动端可读性。标题使用大字号、紧凑行高和不超过 `-0.035em` 的字距，避免挤压。

## Layout

- 首屏全画布图像门，不放传统 hero 卡片。
- 工作经历用纵向轨道，企业项目用宽幅系统面板，个人项目用流程线。
- VibeCoding 采用上文案、下图片舞台的上下结构，并为每个作品提供独立导航。
- 详情弹窗通过 Portal 脱离滚动容器，避免 fixed 被 transform 影响。

## Motion

- 门入口：图像资产驱动的幻想登录页，点击后通过光门扩散、镜头推进和粒子渐隐进入内容。
- 内容探索：章节进入时轻微上移、透明度和模糊过渡。
- VibeCoding：项目级切换和图片级自动播放。
- 所有动效在 `prefers-reduced-motion` 下快速降级。

## Assets

- `public/assets/generated/gate-closed.svg`
- `public/assets/generated/gate-open.svg`
- `public/assets/generated/fantasy-entry.svg`
- `public/assets/generated/detail-texture.svg`
- `public/assets/showcase/*`
- `public/assets/resume/avatar.jpg`
- `public/assets/resume/yuhaojun-resume.pdf`
