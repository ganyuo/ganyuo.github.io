---
title: 'Qt 学习笔记'
date: 2023-03-11
categories: 学习笔记
tags: [Qt, C++]
mathjax: false
---

# 先说两句

&emsp;&emsp;最近偷懒了很久没有学习，对于自己的懒惰实在是看不下了，所以决定随便学点什么。但是最近没什么学习的方向，想起之前学过一点点Qt，但是没有学完，所有打算先把Qt学完，说不定以后能用上，随便记录一下学习笔记。我自己是一个自制力比较差的人，但是有点强迫症，如果了笔记没写完，会非常不舒服，所有以后以后把学的东西都记一下笔记，能一定程度上约束一下自己。突然想起之前写的shell脚本笔记还有`sed`命令还没学完，NO!

# Qt简介

&emsp;&emsp;Qt是一个跨平台的C++开发库，主要用来开发图形用户界面程序。Qt还存在Python、Ruby、Perl等脚本语言的绑定，也就是说可以使用脚本语言开发基于 Qt 的程序。开源社区就是这样，好东西就会被派生扩展，到处使用，越来越壮大。

&emsp;&emsp;Qt支持的操作系统有很多，例如通用操作系统Windows、Linux、Unix，智能手机系统Android、iOS、WinPhone，嵌入式系统QNX、VxWorks等等。

&emsp;&emsp;上面是从[C语言中文网](http://c.biancheng.net/view/1792.html)上抄的Qt简介，附上[Qt的官网](https://www.qt.io)，感兴趣的小伙伴可以去看看。

# 环境搭建

&emsp;&emsp;我自己是在linuxmint系统下用VScode搭建的，具体参考这篇[博客](/learn_note/linux_qt_config/)，其他系统下搭建环境的小伙伴也可以参考一下。

# GUI

