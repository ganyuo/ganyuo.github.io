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

&emsp;&emsp;Qt包含很多C++的类，但是头文件代码里的注释基本没有，2333...，所以只能去看Qt官网上的文档：<https://doc.qt.io/qt-5/classes.html>，里面有所有类的说明。因为类太多了，所以后面关于类的成员函数就不解析了，小伙伴们有不清楚的地方可以去官网上查。

# 环境搭建

&emsp;&emsp;我自己是在linuxmint系统下用VScode搭建的，具体参考这篇[博客](/learn_note/linux_qt_config/)，其他系统下搭建环境的小伙伴也可以参考一下。

# pro文件配置

&emsp;&emsp;pro文件只要用于配置Qt项目的编译，具体配置方式~~抄~~参考了一下大佬的这篇[文章](https://zhuanlan.zhihu.com/p/110782759)

## 常用配置项

1. 注释 : 注释是从一行的`#`开始，到这一行的结束。
2. `QT += ` : 这个是添加QT项目需要的模块的，若项目中要排除某个模块，也可用`QT -= `配置项。
3. `TEMPLATE = ` : 这个配置项确定`qmake`为这个应用程序生成哪种`makefile` 。有下面五种形式可供选择：

	- `app` : 建立一个应用程序的makefile，这个是默认值，若模块项未指定，将默认使用此项；
	- `lib` : 建立一个库的makefile；
	- `vcapp` : 建立一个应用程序的VisualStudio项目文件；
	- `vclib` : 建立一个库的VisualStudio项目文件；
	- `subdirs` : 这是一个特殊的模板，可以创建一个可进入特定目录并为一个项目文件生成makefile，此makfile可以调用make；

4. `TARGET = `: 这个配置项用来指定最后生成的目标应用程序的名称。

5. `CONFIG += ` : 用来告诉qmake关于应用程序的配置信息，使用+=表示在现有的配置上添加，这样会更安全。比如，`CONFIG += qt warn_on release` 其具体的意义为：

	- `qt` : 告诉qmake此程序是使用qt来连编的。即qmake在连接、为编译添加所需包含路径时会考虑qt的库；
	- `warn_on` : 告诉qmake要将编译器设置为输出警告信息形式；
	- `release` : 告诉qmake应用程序必须被连编为一个可发布的应用程序。开发过程中，也可以使用`debug`；

6. `UIC_DIR += ` : 用来指定`uic`命令，将`.ui`文件转化为`ui_*.h`文件存放的目录。

7. `RCC_DIR += ` : 用来指定`rcc`命令，将`.qrc`文件转换成`qrc_*.h`文件存放的目录。

8. `MOC_DIR += ` : 用来指定`moc`命令，将含有`Q_OBJECT`的头文件转换成标准`.h`文件存放的目录。

9. `OBJECTS_DIR += ` : 用来指定目标文件`obj`的存放目录。

10. `DEPENDPATH += ` : 用来指定工程的依赖路径。

11. `INCLUDEPATH += ` : 用来指定工程所需要的头文件。

12. `CODECFORSRC += ` : 用来指定源文件的编码格式。

13. `FORMS += ` : 用来指定工程中的`ui`文件。

14. `HEADERS += ` : 用来指定工程中所包含的头文件。

15. `SOURCES += ` : 用来指定工程中包含的源文件。

16. `RESOURCES += ` : 用来指定工程中所包含的资源文件。

17. `LIBS += ` : 用来指定引入的`lib`文件的路径，一般会在前面加下参数`-L`，根据不同的版本可以分为两种形式：

	``` conf
	Release: LIBS += -L folder_Path # release版本引入的lib文件
	Debug: LIBS += -L folder_Path   # debug版本引入的lib文件
	```

18. `DEFINES += ` : 用来定义编译选项。

19. `DESTDIR += ` : 用来指定目标的生成路径。

20. 跨平台处理信息也要写在pro文件中。 其示例如下：

	``` conf
	win32
	{
		....
	}

	unix
	{
		...
	}
	```

## pro文件样例

下面是大佬给的一个pro文件样例：

``` conf
# 添加QT依赖的库
QT += gui
QT += core xml network multimedia serialport
greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

# 添加c11配置支持
CONFIG += c++11
# 输出文件的名称
TARGET = YouAppName
# 配置控制台输出
CONFIG += console
# 输出类型application
TEMPLATE = app

# 源文件
SOURCES += main.cpp \
    appconfig.cpp \
    opendoorthread.cpp \
    TestProject/testform.cpp \
    TestProject/common.pb.cpp \
    TestProject/goods_req.pb.cpp \
    TestProject/goods_resp.pb.cpp

# 头文件
HEADERS += \
    appconfig.h \
    opendoorthread.h \
    TestProject/testform.h \
    TestProject/common.pb.h \
    TestProject/goods_req.pb.h \
    TestProject/goods_resp.pb.h

# 配置debug和release
CONFIG +=debug_and_release
CONFIG(debug,debug|release){
DESTDIR += $$PWD/debug
LIBS += -L$$PWD/debug/ -lThorModel
LIBS += -L$$PWD/debug/ -lThorUtil
LIBS += -L$$PWD/debug/ -lThorBLL
LIBS += -L$$PWD/debug/ -lThorHardwareUtil
LIBS += -L$$PWD/debug/ -lprotobufd
LIBS += -L$$PWD/debug/ -lprotobuf-lited
LIBS += -L$$PWD/debug/ -lopencv_core2410d
LIBS += -L$$PWD/debug/ -lopencv_highgui2410d
LIBS += -L$$PWD/debug/ -lopencv_imgproc2410d
LIBS += -L$$PWD/debug/ -lQtActionDetectd
}else{
}

# 需要的头文件
INCLUDEPATH += $$PWD/AllDLL/include
INCLUDEPATH += $$PWD/debug/3rdparty/opencv-2.4.10/include \
            $$PWD/debug/3rdparty/opencv-2.4.10/include/opencv \
            $$PWD/debug/3rdparty/opencv-2.4.10/include/opencv2
# ui
FORMS += \
    TestProject/testform.ui
```

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

&emsp;&emsp;Qt里有很多控件，大部分都是继承自`Qwidget`，所以控件也可以看作是一个窗口，这里列举一些常用的控件(抄大佬的这篇[博客](https://zhuanlan.zhihu.com/p/612560027))：

| 控件 | 类名 | 描述 |
| --- | --- | --- |
| 标签 | QLabel | 显示一个文本或图像。 |
| 按钮 | QPushButton | 用户可以点击的一个按钮，用来触发某个操作。 |
| 输入框 | QLineEdit | 用户可以在其中输入文本的一个输入框。 |
| 复选框 | QCheckBox | 用户可以勾选或取消的一个复选框。 |
| 单选按钮 | QRadioButton | 用户可以选择其中一个选项的一组单选按钮。 |
| 数字微调框 | QSpinBox | 用于选择一个数值的微调框。 |
| 滑动条 | QSlider | 用户可以通过滑动来选择数值的一个滑动条。 |
| 列表框 | QListWidget | 用于显示一组列表项的一个列表框。 |
| 组合框 | QComboBox | 类似于下拉菜单的一个组合框，用户可以选择其中一个选项。 |
| 多行文本框 | QTextEdit | 用户可以在其中编辑多行文本的一个文本编辑框。 |
| 日期和时间编辑框 | QDateTimeEdit | 用于选择日期和时间的一个日期和时间编辑框。 |

&emsp;&emsp;由于控件种类太多了，这里只介绍一下按钮`QPushButton`和输入框`QLineEdit`这两种控件，其他控件的很多性质和接口都比较相似，小伙伴们可以自己尝试，~~我就偷懒不写了~~。

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

### 输入框-QLineEdit

&emsp;&emsp;下面是一个输入框的样例代码：

``` cpp
#include <QApplication> /* 应用程序抽象类 */
#include <QWidget>      /* 窗口类 */
#include <QLineEdit>    /* 输入框 */
#include <QVBoxLayout>
#include <QCompleter>

int main(int argc, char *argv[])
{
	QApplication app(argc, argv);
	QWidget widget; /* 构造一个窗口 */

	/* 添加两个输入框 */
	QLineEdit name_input, password_input;
	QVBoxLayout layout(&widget);
	layout.addWidget(&name_input);
	layout.addWidget(&password_input);

	QCompleter completer(QStringList() << "abc" << "aaa" << "123");
	completer.setFilterMode(Qt::MatchContains);
	name_input.setCompleter(&completer); /* 设置输入匹配提示 */
	name_input.setPlaceholderText("请用户名"); /* 设置输入提示 */

	password_input.setEchoMode(QLineEdit::Password); /* 设置回显模式为密码模式 */
	password_input.setPlaceholderText("请输入密码"); /* 设置输入提示 */

	widget.show(); /* 显示窗口 */
	return app.exec(); /* exec():进入消息循环 */
}
```

&emsp;&emsp;上面的代码向窗口中添加了两个输入框，一个用来输入用户名，一个用来输入密码。用户名输入框设置了一个`completer`，可以将输入的字符串与`completer`的字符串列表进行匹配，显示匹配成功的字符串。密码输入框设置了设置回显模式为密码模式，可以将输入的字符显示为`●`。

## 坐标体系

&emsp;&emsp;Qt里的`Qwidget`可以使用`setGeometry()`来设置控件的位置坐标，位置坐标是相对与父窗口的左上角计算的，下面是一个例子：

``` cpp
	QWidget widget;
	QPushButton button;
	button.setText("Button");
	button.setParent(&widget);
	/* 设置button相对父窗口的坐标ax,ay，以及button的宽度aw和高度ah */
	button.setGeometry(30, 30, 200, 100);
```

&emsp;&emsp;上面的例子中，`setGeometry()`有4个参数，前两个参数是`button`相对父窗口的坐标ax，ay，后面两个是`button`的宽度和高度aw，ah。

## layout

&emsp;&emsp;当一个窗口里控件很多时，使用`setGeometry()`来设置很麻烦，而且无法随着窗口的大小变化而调整。使用layout(布局)就可以很方便的解决这个问题，他们负责一组控件的几何管理。上面[输入框-QLineEdit](#输入框-QLineEdit)里的样例代码，使用的`QVBoxLayout`就是一种layout，可以将控件在垂直方向上排列，使得`name_input`输入框在`password_input`输入框上面，如果不使用layout，则两个输入框会重叠在一起。(以下内容大部分抄的大佬的这篇[博客](https://blog.csdn.net/leacock1991/article/details/118947828))

### 简述

&emsp;&emsp;Qt布局系统提供了一种简单而强大的方法，可以在控件内自动排列子控件，以确保它们充分利用可用空间。Qt包含一组布局管理类，用于描述控件在应用程序用户界面中的布局方式。当控件的可用空间发生变化时，这些layout会自动定位和调整控件的大小，确保它们的排列一致并且用户界面作为一个整体仍然可用。

&emsp;&emsp;所有`QWidget`子类都可以使用layout来管理它们的子类。`QWidget::setLayout()`函数可以为一个控件设置layout。 当以这种方式在窗口上设置layout时，它负责以下任务：

- 布置子控件。
- 最高层窗口可感知的默认大小。
- 最高层窗口可感知的最小大小。
- 调整大小的处理。
- 当内容改变的时候自动更新：
	- 字体大小、文本或者子控件的其它内容。
	- 隐藏或者显示子控件。
	- 移除一些子控件。

### 常用layout

&emsp;&emsp;为控件提供良好布局的最简单方法是使用Qt内置的布局管理器：`QHBoxLayout`、`QVBoxLayout`、`QGridLayout`和`QFormLayout`。这些类从`QLayout`继承，而`QLayout`又从`QObject`（而不是`QWidget`）派生。他们负责一组控件的几何管理。要创建更复杂的布局，可以将布局管理器相互嵌套。

- `QHBoxLayout`：从左到右在水平行中布置控件。

	![](/images/learn_note/qt_learn/fig_1.png)

- `QVBoxLayout`：在垂直列中从上到下布置控件。

	![](/images/learn_note/qt_learn/fig_2.png)

- `QGridLayout`：在二维网格中布置控件，控件可以占用多个单元格。

	![](/images/learn_note/qt_learn/fig_3.png)

- `QFormLayout`：把控件按照标签-输入框的形式排列在两列。

	![](/images/learn_note/qt_learn/fig_4.png)

### 为layout添加控件

&emsp;&emsp;将控件添加到一个layout时，布局过程如下：

1. 所有控件最初将根据它们的`QWidget::sizePolicy()`和`QWidget::sizeHint()`分配一定数量的空间。
2. 如果任何控件设置了拉伸系数，并且其值大于零，那么它们将按其拉伸因子的比例分配空间（如下[伸展因素](#伸展因素)所述）。
3. 如果任何控件的拉伸系数设置为零，它们只会在没有其他控件需要空间的情况下获得更多空间。其中，空间首先分配给具有扩展大小策略的控件。
4. 任何控件被分配的空间的大小如果小于它们的最小大小（如果未指定最小尺寸，则为最小尺寸提示），它们就会被按它们所需要的最小大小分配空间。（如果控件的伸展因素是它们的决定因素，它们不必有最小大小或者最小大小的提示。）
5. 任何控件被分配的空间的大小如果大于它们的最大大小，它们就会被按它们所需要的最大大小分配空间。（如果控件的伸展因素是它们的决定因素，它们不必有最大大小。）

### 伸展因素

&emsp;&emsp;控件通常是在没有伸展因素设置的情况下被生成的。当它们被布置到一个layout中时，控件会被根据它们的`QWidget::sizePolicy()`或者它们的最小大小的提示中大的那一个分配给整个空间的一部分。伸展因素是用来根据控件互相的比例来改变它们所被分配的空间。

&emsp;&emsp;如果使用一个`QHBoxLayout`来布置没有伸展参数设置的三个控件，则我们就会得到像下面这样的布局：

![](/images/learn_note/qt_learn/fig_5.png)

&emsp;&emsp;如果我们给每个控件设置一个伸展因素，它们就会被按比例布置（但是不能小于最小大小的提示），以下是按1:3:2设置的：

![](/images/learn_note/qt_learn/fig_6.png)

### 简单的demo

&emsp;&emsp;布局中常用的方法有`addWidget()`和`addLayout()`，`addWidget()`方法用于向layout中加入需要布局的控件，`addLayout()`方法用于向layout中加入子布局。

``` cpp
void addWidget(
	QWidget *widget, // 需要插入的控件对象
	int fromRow,     // 插入的行
	int fromColumn,  // 插入的列
	int rowSpan,     // 占用的行
	int columnSpan,  // 占用的列数
	Qt::Alignment alignment = Qt::Alignment // 各个控件的对齐方式
);

void addLayout(
	QLayout *layout, // 需要插入的子布局对象
	int row,         // 插入的起始行
	int column,      // 插入的起始列
	int rowSpan,     // 占用的行数
	int columnSpan,  // 占用的列数
	Qt::Alignment alignment = Qt::Alignment // 指定的对齐方式
);
```

&emsp;&emsp;下面是一个样例：

``` cpp
#include <QApplication>
#include <QWidget>
#include <QPushButton>
#include <QLineEdit>
#include <QLabel>

#include <QVBoxLayout> /* 垂直布局 */
#include <QHBoxLayout> /* 水平布局 */
#include <QGridLayout> /* 格子布局 */

int main(int argc, char *argv[])
{
	QApplication app(argc, argv);
	QWidget widget;

	QGridLayout layout;            // 创建格子布局
	layout.setRowStretch(0, 1);    // 设置第0行的拉伸系数
	layout.setColumnStretch(0, 1); // 设置第0列的拉伸系数

	/* 向layout中添加控件 */
	layout.addWidget(new QLabel("用户名："), 1, 1);
	layout.addWidget(new QLineEdit(), 1, 2); 
	layout.addWidget(new QLabel("密码："), 2, 1);
	layout.addWidget(new QLineEdit(), 2, 2);

	/* 向layout中添加子布局 */
	QHBoxLayout hbox;
	hbox.addStretch(1);  // 添加伸缩量
	hbox.addWidget(new QPushButton("登录"));
	layout.addLayout(&hbox, 3, 1, 1, 2);

	layout.setRowStretch(4, 1);    // 设置最后一行的拉伸系数
	layout.setColumnStretch(3, 1); // 设置最后一列的拉伸系数

	widget.setLayout(&layout); // 给窗口设置layout
	widget.show();
	return app.exec();
}
```

## 信号和事件

## 画板
