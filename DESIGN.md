# Design

## Visual Thesis

暗蓝紫电影感 Liquid Glass 作品集：以全站固定远程视频、JS 淡入淡出循环、重新生成的冷蓝紫科技光门、雾面玻璃按钮和低位海报式拼音姓名承载“进入简历世界”的第一记忆点，后续内容以朦胧玻璃和金属渐变大标题延续 3D Creator portfolio 的空间感。

## Palette

- `--bg`: `oklch(0.12 0.025 265)`
- `--surface`: `oklch(0.985 0.01 248 / 0.58)`
- `--ink`: `oklch(0.92 0.024 238)`
- `--muted`: `oklch(0.78 0.035 238 / 0.76)`
- `--primary`: `oklch(0.76 0.14 268)`
- `--accent`: `oklch(0.82 0.16 292)`

## Typography

正文使用系统中文无衬线栈，优先保证 Windows 与移动端可读性。首页拼音姓名使用 Instrument Serif，后续章节标题使用类似 3D Creator portfolio 的金属渐变大字。

## Layout

- 背景视频为全站通用固定层，首页清晰展示，后续内容通过朦胧玻璃层让视频继续透出。
- 入口保留开门体验，门体改为适配新视频的冷蓝紫科技光门。
- 首页 Hero 使用全屏远程视频背景和中下方电影海报式拼音姓名，不展示头像，不展示“Java 后端开发工程师”。
- 工作经历用纵向轨道，企业项目用宽幅系统面板，个人项目用流程线。
- VibeCoding 采用上文案、下图片舞台的上下结构，并为每个作品提供独立导航。
- 详情弹窗通过 Portal 脱离滚动容器，避免 fixed 被 transform 影响。

## Motion

- 门入口：冷蓝紫科技光门，点击后中央光隙扩散、门框和门扇虚化消散，再通过光门进入内容。
- 内容探索：章节进入时轻微上移、透明度和模糊过渡。
- VibeCoding：项目级切换和图片级自动播放。
- 所有动效在 `prefers-reduced-motion` 下快速降级。

## Assets

- `public/assets/generated/gate-closed.svg`
- `public/assets/generated/gate-open.svg`
- `public/assets/generated/fantasy-entry.svg`
- `public/assets/generated/celestial-gate.png`
- `public/assets/generated/detail-texture.svg`
- 远程全站背景视频：`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4`
- `public/assets/showcase/*`
- `public/assets/resume/avatar.jpg`
- `public/assets/resume/yuhaojun-resume.pdf`
