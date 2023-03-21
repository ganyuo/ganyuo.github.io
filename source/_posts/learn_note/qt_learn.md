---
title: 'Qt 学习笔记'
date: 2023-03-11
categories: 学习笔记
tags: [Qt, C++]
mathjax: false
---

# 先说两句

&emsp;&emsp;最近偷懒了很久没有学习，对于自己的懒惰实在是看不下了，所以决定随便学点什么。但是最近没什么学习的方向，想起之前学过一点点Qt，但是没有学完，所有打算先把Qt学完，说不定以后能用上，随便记录一下学习笔记。我自己是一个自制力比较差的人，但是有点强迫症，如果了笔记没写完，会非常不舒服，所有以后以后把学的东西都记一下笔记，能一定程度上约束一下自己。突然想起之前写的shell脚本笔记还有`sed`命令还没学完，emmm...下次再补。

# Qt简介

&emsp;&emsp;Qt是一个跨平台的C++开发库，主要用来开发图形用户界面程序。Qt还存在Python、Ruby、Perl等脚本语言的绑定，也就是说可以使用脚本语言开发基于 Qt 的程序。开源社区就是这样，好东西就会被派生扩展，到处使用，越来越壮大。

&emsp;&emsp;Qt支持的操作系统有很多，例如通用操作系统Windows、Linux、Unix，智能手机系统Android、iOS、WinPhone，嵌入式系统QNX、VxWorks等等。

&emsp;&emsp;上面是从[C语言中文网](http://c.biancheng.net/view/1792.html)上抄的Qt简介，附上[Qt的官网](https://www.qt.io)，感兴趣的小伙伴可以去看看。

# 环境搭建

&emsp;&emsp;我自己是在linuxmint系统下用VScode搭建的，具体参考这篇[博客](/learn_note/linux_qt_config/)，其他系统下搭建环境的小伙伴也可以参考一下。

# pro文件配置

# GUI

&emsp;&emsp;Qt的很多GUI控件都是继承自QWidget，所以使用Qt的GUI一般都需要加上`widgets`和`gui`这两个库，pro项目文件样例如下：

``` conf
# 添加widgets和gui库
QT += widgets gui

# 把main.cpp加到项目的代码列表里
SOURCES += \
	main.cpp
```

## QWidget

&emsp;&emsp;QWidget是Qt的窗口类，下面是一段样例代码：

``` cpp
#include <QApplication> /* 应用程序抽象类 */
#include <QWidget>  /* 窗口类 */

int main(int argc, char *argv[])
{
	QApplication app(argc, argv); /* 创建一个Qt应用 */

	QWidget widget; /* 构造一个窗口 */
	widget.setWindowTitle("Hello World"); /* 设置窗口标题 */
	widget.show(); /* 显示窗口 */

	return app.exec(); /* exec():进入消息循环 */
}
```

&emsp;&emsp;上面的代码中，创建了一个标题是`Hello World`的窗口。执行`app.exec();`后，会进入一个处理消息的死循环，`app`会捕获系统消息，并传递给`widget`窗口。这就是鼠标点击后能拖动窗口的原因，`app`将鼠标的点击、移动等消息传递给了`widget`，`widget`作出了对应的响应，窗口移动了位置。

## 控件

&emsp;&emsp;Qt里有很多控件，大部分都是继承自`Qwidget`，所以控件也可以看作是一个窗口，这里列举一些常用的控件：

| 控件 | 类名 |
| --- | --- |
| 按钮 | QPushButton |
| 输入框 | QLineEdit |

### 按钮-QPushButton

&emsp;&emsp;下面是一个在窗口中添加一个按钮的样例：

``` cpp
#include <QApplication> /* 应用程序抽象类 */
#include <QWidget>  /* 窗口类 */
#include <QPushButton> /* 按钮类 */

int main(int argc, char *argv[])
{
	QApplication app(argc, argv);

	QWidget widget; /* 构造一个窗口 */
	widget.setWindowTitle("Hello World");
	widget.show(); /* 显示窗口 */

	QPushButton button; /* 创建一个按钮对象 */
	button.setText("Button"); /* 设置按钮显示的文本 */
	button.setParent(&widget); /* 设置按钮的父窗口 */
	button.show(); /* 显示按钮 */

	return app.exec(); /* exec():进入消息循环 */
}
```

&emsp;&emsp;上面的代码会创建一个窗口，窗口中包含一个按钮。在Qt中，`QPushButton`是`QWidget`的子类，所以按钮也可以看作是一个窗口。

&emsp;&emsp;Qt里的窗口可以存在父子关系，上面的代码中，`button.setParent(&widget);`的作用是将`button`按钮的父窗口设置成`widget`，设置后`button`按钮才会显示在`widget`窗口里面；如果不设置，`button`按钮会显示成一个独立的窗口，与`widget`窗口同级。

&emsp;&emsp;一个窗口在执行`show()`成员函数时，会将已经添加的子窗口也一起显示，如果是子窗口是在父窗口执行`show()`之后添加的，则子窗口不会显示，子窗口也需要执行`show()`才能显示出来。比如，去掉上面代码中的`button.show()`之后，虽然之后将`button`按钮添加到了父窗口`widget`里，但是`widget`窗口里的`button`按钮不显示。如果在`widget`窗口执行`show()`之前，将`button`按钮添加到了父窗口`widget`里，也就是在`widget.show()`之前执行`button.setParent(&widget)`，则即使`button`按钮不执行`show()`，也会在父窗口`widget`执行`show()`的时候一起显示出来。

## 坐标体系

## layout
