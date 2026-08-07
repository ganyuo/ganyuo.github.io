---
title: mpv播放器配置教程
published: 2026-07-29
description: mpv播放器配置弹幕插件，提升看番体验
tags: [mpv, 软件配置, 日常折腾]
category: 日常折腾
author: ganyuo
pinned: false
draft: false
comment: true
---

# 先说两句

本教程面向 **Windows、macOS、Linux** 三种系统，从零开始介绍 mpv 播放器的安装、现代化界面插件 **uosc** 的配置，以及弹幕扩展插件 **uosc_danmaku** 的安装，最终实现用 mpv 看动漫时加载/开关弹幕的效果。

> 教程基于 2026 年的最新版本编写。命令、路径、参数会尽量同时给出三系统的对应写法，请按自己所用系统对号入座。

# 一、mpv 是什么？

**mpv** 是一款免费、开源、跨平台（Windows / macOS / Linux / BSD）的媒体播放器，基于 MPlayer 和 mplayer2 发展而来。它以「极简 + 可高度定制」而著称：

- **性能强**：硬件解码、插帧、优秀的渲染管线，低配置机器也能流畅播放高清/4K 视频。
- **自定义自由**：几乎万物皆可配置（快捷键、OSD、滤镜、脚本、着色器），是所有播放器中最「程序员友好」的。
- **脚本生态丰富**：mpv 支持 Lua / JavaScript 脚本，可以扩展出弹幕、字幕搜索、进度条缩略图等海量功能，这也是本教程能实现弹幕的根本原因。
- **无广告、无开屏、无捆绑**：纯粹的开源软件。

由于原生界面极其简陋（只有进度条和 OSD 文本），我们通常会安装 **uosc** 来获得一个美观、现代、接近商业播放器的图形界面。

---

# 二、mpv 的安装

## Windows

Windows 下最常用的是第三方打包的官方构建。推荐两种方式：

**官网下载**：到 [https://github.com/mpv-player/mpv/releases/latest](https://github.com/mpv-player/mpv/releases/latest) 下载最新版 `mpv-v*-x86_64-*.zip`（64 位），解压到你喜欢的位置。

> 提示：你也可以使用社区整合包 **mpv.net**（https://github.com/mpvnet-player/mpv.net），它与标准mpv 配置几乎完全兼容，并自带图形化设置。但本教程按原生 mpv 说明，配置路径同样适用于 mpv.net。

## macOS

macOS 推荐使用 [Homebrew](https://brew.sh/)（需先安装）：

```bash
brew install mpv
```

若想保持 mpv 自带脚本最新，也可以安装 tap 版本：

```bash
brew tap homebrew/cask && brew install --cask mpv
```

另一途径是下载 GUI 图形程序包 [IINA](https://iina.io/)，但它的配置体系不同。本教程以 Homebrew 安装的原生 mpv 为准。

## Linux

Linux 使用各发行版的包管理器安装即可：

- **Arch / Manjaro**（AUR）：`sudo pacman -S mpv`
- **Debian / Ubuntu**：`sudo apt install mpv`
- **Fedora**：`sudo dnf install mpv`
- **openSUSE**：`sudo zypper install mpv`

也可以下载第三方构建的appimage包，比如：[https://github.com/pkgforge-dev/mpv-AppImage/releases](https://github.com/pkgforge-dev/mpv-AppImage/releases)。

> 注意：若使用 Snap 或 Flatpak（`flatpak install mpv`）安装，注入是受限的，uosc 官方安装脚本在某些 snap 环境无法工作，本教程第四章会标注注意点。（扁平包具体路径见第四章）。

---

# 三、mpv 配置文件目录结构

mpv 的「配置文件目录」（即我们把插件和配置放的地方）在不同系统路径不同：

| 系统   | 配置目录                                 |
|--------|------------------------------------------|
| Windows | `%APPDATA%\mpv`（即 `C:\Users\你的用户名\AppData\Roaming\mpv`） |
| macOS  | `~/.config/mpv`                          |
| Linux   | `~/.config/mpv`                          |

> 附加说明：
> - Windows 下如果你在 mpv 安装目录下新建一个名为 `portable_config` 的文件夹，mpv 会优先读取它，实现「便携配置」（绿色版常用）。
> - Linux 若使用 Flatpak，路径会变成 `~/.var/app/io.mpv.Mpv/config/mpv`。
> - 如果想使用自定义配置文件目录，可以在程序启动时加上`--config-dir=自定义路径`参数。

下面所有配置均写在「配置目录」下。请先建立好顶层目录结构和几个子目录：

```
配置目录/
├── mpv.conf        # 主配置（可选）
├── input.conf      # 快捷键配置（可选）
├── fonts/          # uosc 字体
├── scripts/        # 所有 Lua 脚本/插件都放这里 ⭐
└── script-opts/    # 各脚本的配置文件 ⭐
```

现在你只需要确保 `scripts` 和 `script-opts` 存在即可，目录会在第四章自动创建，也可以手动创建。

---

# 四、安装 uosc 界面插件

**uosc** 是一个基于 mpv 的现代 ui 脚本，它提供：

- 时间轴（可配进度缩略图，需配 thumbfast）
- 控制按钮、音量/进度条显示
- 播放器窗口边框、标题栏等
- uosc_danmaku 弹幕插件的搜索/开关菜单正是依托 uosc 的菜单系统渲染的

根据 [uosc 官方文档](https://github.com/tomasklaen/uosc)，至少需要 **mpv 0.33** 以上。

## 4.1 手动安装

1. 下载并解压 [uosc.zip](https://github.com/tomasklaen/uosc/releases/latest/download/uosc.zip)，将 `scripts/uosc`、`scripts/uosc.lua`、`scripts/uosc_shared`、`fonts/uosc_icons.otf`、`fonts/uosc_textures.ttf` 放进配置目录对应的 `scripts/` 和 `fonts/` 下（或直接解压整个 zip 到配置目录，它会覆盖对应子目录）。
2. 如果 `script-opts/uosc.conf` 不存在，再下载 [uosc.conf](https://github.com/tomasklaen/uosc/releases/latest/download/uosc.conf) 放入 `script-opts/uosc.conf`。

## 4.2 验证与美化（mpv.conf 建议项）

编辑配置目录下的 `mpv.conf`，添加以下推荐的整合项（可选但推荐）：

```conf
# uosc 自带进度/音量指示，因此不需要系统自带 osd 进度条
osd-bar=no

# uosc 自己绘制窗口边框，所以可以关闭系统边框
border=no

# （可选）如果 UI 觉得卡顿，可以启用
video-sync=display-resample
```

重启 mpv，如果能看到现代、漂亮的界面，说明 uosc 安装成功。

---

# 五、安装 uosc_danmaku 弹幕插件

**[uosc_danmaku](https://github.com/Tony15246/uosc_danmaku)** 是一款在 mpv 中加载弹幕的扩展插件，基于弹弹play（DanDanPlay）API 以及第三方弹幕 API，支持 B站、巴哈姆特、爱奇艺、优酷等大量弹幕源，可在播放动漫视频时自动搜索并显示弹幕。

## 5.1 前置要求

- **mpv 0.37 以上**（若要用 mpv 内置菜单渲染甚至需要 0.39+）
- mpv 最好是基于 **LuaJIT 或 Lua 5.2** 构建的（自动哈希匹配功能需 Lua 5.2，不适用于 Lua 5.1）。各平台的官方构建默认即满足，无需额外操作。
- 建议已安装 **uosc**（uosc 5.2.0 以上、不要太老旧）。不装 uosc 也能用，只是菜单会退化为 mpv 内置的 `mp.input` 方式，需要按快捷键唤起。
- 插件在 **v2.2.0 起全面重构为纯 Lua 实现**，从而彻底支持 Windows、Linux、macOS 三个平台（早期版本仅支持 Windows/Linux）。

## 5.2 下载插件（三系统通用）

从 [Releases 页面](https://github.com/Tony15246/uosc_danmaku/releases/latest) 下载 `uosc_danmaku.zip`（建议用主分支最新版，因为早期 Release 1.x 因弹弹play 接口改版存在无法搜索的问题）。

或者用 git 克隆（需要已安装 git）：

```bash
git clone https://github.com/Tony15246/uosc_danmaku.git ~/.config/mpv/scripts/uosc_danmaku
```

## 5.3 安装到 scripts 目录

将解压出来的 **`uosc_danmaku` 文件夹**整体放入配置目录的 `scripts/` 下，结构目录为：

```
配置目录/scripts/uosc_danmaku/
├── apis/
│   ├── dandanplay.lua
│   └── extra.lua
├── LICENSE
├── main.lua
├── modules/
│   ├── ...
└── README.md
```

**Windows**：把解压后的 `uosc_danmaku` 文件夹整个拷贝到 `%APPDATA%\mpv\scripts\` 即可。
**macOS / Linux**：同上，拷贝到 `~/.config/mpv/scripts/` 即可。

> ⚠️ **注意**：文件夹名字必须叫 `uosc_danmaku`！否则无法匹配 uosc 控件（见第六章）。如果你改成了其他名字，需要另行修改控件配置。

> 💡 v2.2.0 之后的版本是纯 Lua 实现，**无需**给任何文件赋可执行权限；只有旧版本 1.x 需要在 `bin` 目录下给可执行文件赋权限（如 `chmod +x`），可忽略。

---

# 六、配置弹幕界面（uosc 控件）

要让弹幕功能在 uosc 界面上一键可用，需要在配置目录的 `script-opts/uosc.conf` 中的 `controls=` 一行里添加弹幕搜索按钮与弹幕开关按钮。

首先确定自己用的 uosc 版本：

- 如果你是**最新版 uosc**（或一直保持更新），用「6.1 新版配置方法」。
- 其余情况（不确定版本，或使用 MPV_lazy 等由第三方管理 uosc 版本的整合包），建议先参照第四章把 uosc 升级到最新版，再按 6.1 配置；这样最简单统一。

## 6.1 新版 uosc 的配置方法（推荐）

在配置目录的 `script-opts/uosc.conf` 中找到 `controls=` 配置项（一行，从页面控件列表），在合适位置（例如 `stream-quality` 之后）加入弹幕按钮和弹幕开关。示例：

```conf
controls=menu,gap,subtitles,<has_many_audio>audio,<has_many_video>video,<has_many_edition>editions,<stream>stream-quality,button:danmaku_menu,button:danmaku_source,cycle:toggle_on:show_danmaku@uosc_danmaku:on=toggle_on/off=toggle_off?弹幕开关,button:danmaku_styles,gap,space,speed,space,shuffle,loop-playlist,loop-file,gap,prev,items,next,gap,fullscreen
```

关键新增了两个字段：

- `button:danmaku_menu`: 打开多级功能复合菜单，包含了插件目前所有的图形化功能。
- `button:danmaku_source`: 从弹幕源向当前弹幕添加新弹幕内容（从网络url或本地添加弹幕）。
- `cycle:toggle_on:show_danmaku@@uosc_danmaku:on==toggle_on/off==toggle_off?弹幕开关`: 一个弹幕开关按钮。
- `button:danmaku_styles`: 实时修改弹幕样式。

> 注意：上面的控件配置只是示例，你可以选择需要的控制添加，更多其他控制可以参考项目[Redme文档](https://github.com/Tony15246/uosc_danmaku/blob/main/README.md)。若不希望动 UI，也可以直接用快捷键调用（见第七章），无需改控件。

---

> ⚠️ 如果你 `script-opts` 里还没有 `uosc.conf`，就按第四章「手动安装」中的方法下载官方默认的 `uosc.conf` 文件。

---

# 七、配置弹幕样式与快捷键

## 7.1 快捷键配置（input.conf）

在配置目录下编辑/新建 `input.conf`，添加以下绑定（示例写法，可自行改成你喜欢的按键）：

```conf
# 弹幕搜索菜单
Ctrl+d    script-message open_danmaku_search_menu

# 弹幕开关
j          script-message toggle_danmaku_display
Ctrl+j     script-message toggle_danmaku

# 弹幕样式/延迟控制菜单
o          script-message open_danmaku_style_menu
```

> 上面按键仅为示例，可自行更改。注意若其他插件占用了键位会冲突（例如 mpv 默认 `Ctrl+d` 是音画延迟调节），请按喜好换键。

## 7.2 弹幕样式配置（script-opts/uosc_danmaku.conf，可选）

在配置目录 `script-opts/` 下创建 `uosc_danmaku.conf`，即可微调弹幕默认样式、字号、延迟、字体等。常用样例：

```conf
# 自定义弹幕的透明度，0（完全透明）到 1（不透明）。默认值：0.7
opacity=0.75
# 滚动弹幕的显示时间
scrolltime=20
# 固定弹幕的显示时间
fixtime=15
# 字体(名称两边不需要使用引号""括住)
fontname=sans-serif
# 大小
fontsize=35
# 阴影
shadow=0
# 粗体
bold=no
#全部弹幕的显示范围(0.0-1.0)
displayarea=0.25
#描边 0-4
outline=1
#指定弹幕屏蔽词文件路径(black.txt)，支持绝对路径和相对路径。文件内容以换行分隔
##支持 lua 的正则表达式写法
blacklist_path=

# 中文简繁转换。0-不转换，1-转换为简体，2-转换为繁体。默认值: 0，不转换简繁字体，按照弹幕源原本字体显示
chConvert=1

# 指定合并重复弹幕的时间间隔的容差值，单位为秒。默认值: -1，表示禁用
# 当值设为 0 时会合并同一时间相同内容的弹幕，值大于 0 时会合并指定秒数误差内的相同内容的弹幕
merge_tolerance=1

# 当该值大于 0 时，脚本会在解析弹幕时丢弃部分弹幕，确保任意时刻屏幕中显示的弹幕不超过设定值。
max_screen_danmaku=60

# 自定义弹幕API
api_server=https://danmaku-api.152468.xyz

# 该功能会在为某个文件夹下的某一集番剧加载过一次弹幕后，把加载过的弹幕会自动关联到该集。
# 之后每次重新播放该文件就会自动加载对应的弹幕，同时该文件对应的文件夹下的所有其他集数的文件都会在播放时自动加载弹幕。
auto_load=yes

# 自动保存弹幕到本地文件，文件名与视频名相同
save_danmaku=yes

# 自动加载播放文件同目录下同名的 xml 格式的弹幕文件
autoload_local_danmaku=yes
```

完整选项请参照插件 [README](https://github.com/Tony15246/uosc_danmaku) 文档（含延迟、屏蔽、代理、自定义API、本地弹幕文件等）。

---

# 八、使用效果一览与常见问题

## 使用流程

1. 终端/双击打开 mpv，拖入一部动漫视频（或播放文件）。
2. 点击/唤起 **弹幕搜索**（uosc 上的搜索按钮，或按 `Ctrl+d`），输入或自动填入番剧名，选择正确的剧集条目。
3. 弹幕出现（默认 `j` 或点弹幕开关切换）。
4. 可用 弹幕样式/延迟菜单实时调整。

## 常见问题（FAQ）

| 现象 | 原因与解决 |
|------|-----------|
| 弹幕搜索总是无结果 | 弹弹play 接口改版，请更新到主分支/uosc_danmaku 最新版。 |
| 插件不加载/报错 | 检查 mpv 版本是否 ≥0.37、uosc ≥5.2；脚本文件夹是否命名为 `uosc_danmaku` 并位于 `scripts/` 下。 |
| macOS/Linux 安装失败 | 确认 config 目录正确；uosc 建议用最新版（v2.2.0+）的纯 Lua 实现；macOS 请优先用 Homebrew 安装 mpv 与 uosc。 |
| 打开弹幕但 UI 菜单失败 | 已安装 uosc 需用 `script-opts/uosc.conf` 内的 `controls` 加按钮；若不想改，可改用快捷键唤。 |
| 按键冲突 | `Ctrl+d` 默认为延迟调节，自己改 input.conf。 |
| 弹幕对不上音画 | 在弹幕延迟菜单里微调 delay。 |
| 界面对不上 | 确认读取的是你改的配置目录（便携/flatpak 路径）。 |

---

# 附：一键「懒人」方案（可选）

如果嫌麻烦，可以用社区整合了 uosc、uosc_danmaku、高清 shader（如 Anime4K）、进度条缩略图、字幕搜索等一整套开箱即用的配置包，例如：

- **akFace/mpv.config**（支持 Windows / macOS / Linux，两步即可享用，内置 uosc 主题 + 全网弹幕）：https://github.com/akFace/mpv.config

不过对于想深入理解 mpv 原理的同学，推荐仍按本篇自行配置一遍。

---

> 本文档由 mpv + uosc + uosc_danmaku 合集教程整理，遇到问题请直接查官方仓库 Issue / Discussion：
> - uosc: https://github.com/tomasklaen/uosc
> - uosc_danmaku: https://github.com/Tony15246/uosc_danmaku

*本文档最后更新时间：2026-08。插件配置项较多，如与最新版本文档有出入，请以各项目 GitHub 仓库的最新 README 为准。*
