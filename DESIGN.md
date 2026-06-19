# Design

## Visual Thesis

暖金云海电影感 Liquid Glass 作品集：以全站固定远程视频作为真实主场景，入口使用 `image2` 生成的梦幻科技大门图像资产，后续内容用浅色雾面玻璃、深海蓝文字与暖金高光承载项目细节，让简历像从云层视频里逐步展开的技术作品集。

## Palette

- `--bg`: `oklch(0.94 0.028 235)`
- `--surface`: `oklch(1 0 0 / 0.54)`
- `--ink`: `oklch(0.23 0.055 252)`
- `--muted`: `oklch(0.39 0.045 248 / 0.82)`
- `--primary`: `oklch(0.68 0.145 78)`
- `--accent`: `oklch(0.68 0.16 232)`

## Typography

正文使用系统中文无衬线栈，保证 Windows 与移动端可读性。首页拼音姓名保留 Instrument Serif 的电影海报感，后续章节标题改为深海蓝实色大字，避免灰黑渐变破坏视频的暖金云层主题。

## Layout

- 背景视频为全站通用固定层，首页清晰展示，后续内容通过浅色朦胧玻璃让视频继续透出。
- 入口保留开门体验，主视觉直接使用 `public/assets/generated/celestial-gate.png`，不再用纯 CSS 拼门。
- 首页 Hero 使用全屏远程视频背景和中下方电影海报式拼音姓名，不展示头像，不展示“Java 后端开发工程师”。
- 工作经历用纵向轨道，企业项目用宽幅系统面板，个人项目用流程线和时序图。
- VibeCoding 采用上文案、下图片舞台结构，由用户手动切换项目和图片，展示真实 README 截图与仓库链接。
- 详情弹窗通过 Portal 脱离滚动容器，避免 fixed 被 transform 影响。

## Motion

- 门入口：生成图大门进入，点击后中央光隙扩散、门体和背景轻微虚化放大，再进入内容。
- 内容探索：章节进入时轻微上移、透明度和模糊过渡。
- VibeCoding：项目与图片由用户手动切换，按钮反馈保持轻量。
- 所有动效在 `prefers-reduced-motion` 下快速降级。

## Assets

- `public/assets/generated/celestial-gate.png`
- `public/assets/generated/detail-texture.svg`
- 远程全站背景视频：`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4`
- `public/assets/showcase/*`
- `public/assets/resume/avatar.jpg`
- `public/assets/resume/yuhaojun-resume.pdf`
