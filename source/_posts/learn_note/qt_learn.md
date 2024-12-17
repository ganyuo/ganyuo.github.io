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

&emsp;&emsp;当一个窗口里控件很多时，使用`setGeometry()`来设置很麻烦，而且无法随着窗口的大小变化而调整。使用layout(布局)就可以很方便的解决这个问题，他们负责一组控件的几何管理。上面[输入框-QLineEdit](../../../../../downloads/qt_learn.md#输入框-QLineEdit)里的样例代码，使用的`QVBoxLayout`就是一种layout，可以将控件在垂直方向上排列，使得`name_input`输入框在`password_input`输入框上面，如果不使用layout，则两个输入框会重叠在一起。(以下内容大部分抄的大佬的这篇[博客](https://blog.csdn.net/leacock1991/article/details/118947828))

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
2. 如果任何控件设置了拉伸系数，并且其值大于零，那么它们将按其拉伸因子的比例分配空间（如下[伸展因素](../../../../../downloads/qt_learn.md#伸展因素)所述）。
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

## 对话框

## 画板

&emsp;&emsp;抄了大佬的这篇[博客](https://zhuanlan.zhihu.com/p/638570663)。

&emsp;&emsp;`QPainter`是 Qt 中用于进行绘图操作的类。它提供了各种绘制函数，可以在不同的绘图设备上进行绘制，如窗口、图像、打印机等。

以下是`QPainter`类的一些常用属性和方法：

- `begin(QPaintDevice *device)`: 在给定的绘图设备上开始绘制操作。
- `end()`: 结束绘制操作。
- `drawText(const QRectF &rectangle, const QString &text)`: 绘制指定矩形区域内的文本。
- `drawImage(const QRectF &target, const QImage &image, const QRectF &source)`: 在目标矩形区域内绘制源图像的一部分。
- `setPen(const QPen &pen)`: 设置绘制的画笔样式。
- `setBrush(const QBrush &brush)`: 设置绘制的画刷样式。
- `setFont(const QFont &font)`: 设置绘制的字体样式。
- `translate(const QPointF &offset)`: 将绘图坐标原点平移指定的偏移量。
- `scale(qreal sx, qreal sy)`: 沿着x轴和y轴方向对绘图进行缩放。
- `rotate(qreal angle)`: 以原点为中心，按照给定的角度旋转绘图。
- `save()`: 保存当前的绘图状态，包括画笔、画刷、字体等设置。
- `restore()`: 恢复上一次保存的绘图状态。

&emsp;&emsp;这些方法和属性只是`QPainter`类的一部分，还有其他许多功能可以用于绘制不同的图形和效果。可以根据需要在`QPainter`文档中进一步了解更多细节。

&emsp;&emsp;下面是一个简单的示例，演示了如何使用`QPainter`在窗口上进行绘制：

```cpp
#include <QApplication>
#include <QWidget>
#include <QPainter>
#include <QPixmap>

class my_painter : public QWidget
{
private:
    /* data */
public:
    my_painter() {};
    ~my_painter() {};

    void paintEvent(QPaintEvent *e);
};

void my_painter::paintEvent(QPaintEvent *e)
{
    QPainter painter(this);

    /* 消锯齿 */
    painter.setRenderHint(QPainter::Antialiasing);
    /* 设置画笔，线条为红色，线宽为2，使用虚线 */
    painter.setPen(QPen(Qt::red , 2, Qt::DashLine));
    /* 设置画刷，当画矩形等封闭图形时，用黄色填充 */
    painter.setBrush(Qt::yellow);
    /* 设置字体，楷体，大小为40，700加粗，斜体 */
    painter.setFont(QFont("楷体", 40, 700, true));

    /* 画直线 */
    painter.drawLine(20, 40, 200, 40);
    /* 画圆 */
    painter.drawEllipse(QPoint(100, 120), 50, 50);
    /* 写字 */
    painter.drawText(QPoint(20, 240), "hello world");

    /* 向左移动400 */
    painter.translate(400, 0);
    /* 画图片 */
    painter.drawPixmap(QPoint(0, 20), QPixmap("./image/滑稽.png"));
    // /* 画矩形 */
    painter.drawRect(QRect(0, 120, 100, 50));
    // /* 画圆角矩形 */
    painter.drawRoundedRect(QRect(0, 200, 100, 50), 15, 15, Qt::AbsoluteSize);
}

int main(int argc, char *argv[])
{
	QApplication app(argc, argv);

	my_painter widget;
	widget.show();

	return app.exec();
}
```

&emsp;&emsp;在上述示例中，我们创建了一个自定义的`QWidget`派生类`my_painter`，并重写了`paintEvent()`函数。在`paintEvent()`函数中，我们创建了一个`QPainter`对象，将其关联到窗口上，并使用一些绘制函数，在窗口的矩形区域内绘制图形。最后，我们创建了一个`my_painter`对象并显示窗口，绘制的图形将在窗口中心显示。运行的结果如下：

![](/images/learn_note/qt_learn/fig_7.png)

&emsp;&emsp;这只是一个简单的示例，你可以根据需要使用其他绘图函数和属性来绘制更复杂的图形和效果。

## 主窗口

### 菜单栏

### 工具栏

### 状态栏

## 事件

&emsp;&emsp;抄了大佬的这篇[博客](https://blog.csdn.net/qq_29912325/article/details/117767972)

### 事件定义

&emsp;&emsp;事件(event)是由系统或者 Qt 本身在不同的时刻发出的。当用户按下鼠标，敲下键盘，或者是窗口需要重新绘制的时候，都会发出一个相应的事件。一些事件是在对用户操作做出响应的时候发出，如键盘事件等；另一些事件则是由系统自动发出，如计时器事件。

### 事件与信号槽

&emsp;&emsp;一般来说，使用 Qt 编程时，我们并不会把主要精力放在事件上，因为在 Qt 中，需要我们关心的事件总会发出一个信号。比如，我们关心的是`QPushButton`的鼠标点击，但我们不需要关心这个鼠标点击事件，而是关心它的`clicked()`信号。

- **信号槽**：`signal`由具体对象发出，然后会马上交给由`connect`函数连接的`slot`进行处理。
- **事件**：Qt 使用一个事件队列对所有发出的事件进行维护，当新的事件产生时，会被追加到事件队列的尾部，前一个事件完成后，取出后面的事件进行处理。但是，必要的时候，Qt 的事件也是可以不进入事件队列，而是直接处理的。并且，事件还可以使用“事件过滤器”进行过滤。

&emsp;&emsp;总的来说，如果我们使用组件，我们关心的是信号槽；如果我们自定义组件，我们关心的是事件。因为我们可以通过事件来改变组件的默认操作。比如，如果我们要自定义一个`QPushButton`，那么我们就需要重写它的鼠标点击事件和键盘处理事件，并且在恰当的时候发出`clicked()`信号。

### 事件循环

&emsp;&emsp;我们在 main 函数里面创建了一个`QApplication`对象，然后调用了它的`exec()`函数。其实，这个函数就是开始 Qt 的事件循环。在执行`exec()`函数之后，程序将进入事件循环来监听应用程序的事件。

### 事件处理函数

&emsp;&emsp;当事件发生时，Qt 将创建一个事件对象。Qt 的所有事件都继承于`QEvent`类。在事件对象创建完毕后，Qt 将这个事件对象传递给 QObject 的`event()`函数。`event()`函数并不直接处理事件，而是按照事件对象的类型分派给特定的事件处理函数(event handler) 。

&emsp;&emsp;例如在所有组件的父类 QWidget 中，定义了很多事件处理函数 ，如`keyPressEvent()`、`keyReleaseEvent()`、`mouseDoubleClickEvent()`、`mouseMoveEvent ()`、`mousePressEvent()`、`mouseReleaseEvent()`等。这些函数都是`protected virtual`的，也就是说，我们应该在子类中重写这些函数。下面是一个重写事件处理函数的例子：

``` cpp
#include <QApplication>
#include <QWidget>
#include <QMouseEvent>
#include <QKeyEvent>
#include <QDebug>

class event_widget : public QWidget
{
protected:
    /* 事件处理主函数，主要用来截取事件 */
    bool event(QEvent *ev);

    /* 鼠标按下事件处理 */
    void mousePressEvent(QMouseEvent *ev);
    /* 鼠标释放事件处理 */
    void mouseReleaseEvent(QMouseEvent *ev);
    /* 鼠标移动事件处理 */
    void mouseMoveEvent(QMouseEvent *ev);
    /* 鼠标双击事件处理 */
    void mouseDoubleClickEvent(QMouseEvent *ev);

    /* 键盘按下事件处理 */
    void keyPressEvent(QKeyEvent *ev);
    /* 键盘释放事件处理 */
    void keyReleaseEvent(QKeyEvent *ev);

    /* 窗口隐藏事件处理 */
    void hideEvent(QHideEvent *ev);
    /* 窗口显示事件处理 */
    void showEvent(QShowEvent *ev);
    /* 重绘事件处理 */
    void paintEvent(QPaintEvent *ev);
    /* 窗口关闭事件处理 */
    void closeEvent(QCloseEvent *ev);
};

/* 事件处理主函数，主要用于事件的分发 */
bool event_widget::event(QEvent *ev)
{
    /* 默认的事件处理函数 */
    return QWidget::event(ev);
}

/* 鼠标按下事件处理 */
void event_widget::mousePressEvent(QMouseEvent *ev)
{
    qDebug() << "mouse press event";
    QWidget::mousePressEvent(ev);
}

/* 鼠标释放事件处理 */
void event_widget::mouseReleaseEvent(QMouseEvent *ev)
{
    qDebug() << "mouse release event";
    QWidget::mouseReleaseEvent(ev);
}

/* 鼠标移动事件处理 */
void event_widget::mouseMoveEvent(QMouseEvent *ev)
{
    static int i = 0;
    /* 只有鼠标按下时移动，才能触发事件 */
    qDebug() << "mouse move " << i++;
    /* 如果要在鼠标不按下时，也触发事件，需要在构造函数中运行下面的代码 */
    // this->setMouseTracking(true);
    QWidget::mouseMoveEvent(ev);
}

/* 鼠标双击事件处理 */
void event_widget::mouseDoubleClickEvent(QMouseEvent *ev)
{
    qDebug() << "mouse double click event";
    QWidget::mouseDoubleClickEvent(ev);
}

/* 键盘按下事件处理 */
void event_widget::keyPressEvent(QKeyEvent *ev)
{
    qDebug() << "key press event " << ev->key();
    QWidget::keyPressEvent(ev);
}

/* 键盘释放事件处理 */
void event_widget::keyReleaseEvent(QKeyEvent *ev)
{
    qDebug() << "key release event " << ev->key();
    QWidget::keyPressEvent(ev);
}

/* 窗口隐藏事件处理 */
void event_widget::hideEvent(QHideEvent *ev)
{
    qDebug() << "hide event";
    QWidget::hideEvent(ev);
}

/* 窗口显示事件处理 */
void event_widget::showEvent(QShowEvent *ev)
{
    qDebug() << "show event";
    QWidget::showEvent(ev);
}

/* 重绘事件处理 */
void event_widget::paintEvent(QPaintEvent *ev)
{
    qDebug() << "paint event";
    QWidget::paintEvent(ev);
}

/* 窗口关闭事件处理 */
void event_widget::closeEvent(QCloseEvent *ev)
{
    qDebug() << "close event";
    QWidget::closeEvent(ev);
}

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);

    event_widget widget;
    widget.show();

    return app.exec();
}

```

上面的例子中，我们定义了一个`QWidget`的子类`event_widget`，重写了一些事件处理函数。

### 事件接受与忽略

&emsp;&emsp;前面的例子中我们在重写事件处理函数时，都会调用父类对应的事件处理函数。这在某种程度上说，是把事件向上传递给父类去响应，也就是说，我们在子类中“忽略”了这个事件。

&emsp;&emsp;我们可以把 Qt 的事件传递看成链状：如果子类没有处理这个事件，就会继续向其他类传递。其实，Qt 的事件对象都有一个`accept()`函数和`ignore()`函数。正如它们的名字，前者用来告诉 Qt，事件处理函数“接收”了这个事件，不要再传递；后者则告诉 Qt，事件处理函数“忽略”了这个事件，需要继续传递，寻找另外的接受者。在事件处理函数中，可以使用`isAccepted()`来查询这个事件是不是已经被接收了。

&emsp;&emsp;事实上，我们很少使用`accept()`和`ignore()`函数，而是像上面的示例一样，如果希望忽略事件，只要调用父类的响应函数即可。

&emsp;&emsp;Qt 中的事件大部分是`protected`的，因此，重写的函数必定存在着其父类中的响应函数，这个方法是可行的。为什么要这么做呢？因为我们无法确认父类中的这个处理函数没有操作，如果我们在子类中直接忽略事件，Qt 不会再去寻找其他的接受者，那么父类的操作也就不能进行，这可能会有潜在的危险。

&emsp;&emsp;在一个情形下，我们必须使用`accept()`和`ignore()`函数，那就是在窗口关闭的时候。如果在窗口关闭时需要有个询问对话框，那么就需要这么去写：

```cpp
/* 窗口关闭事件处理 */
void event_widget::closeEvent(QCloseEvent * event)
{
    QMessageBox::StandardButton ret;
    ret = QMessageBox::question(this, "Quit",
        "Are you sure to quit this application",
        QMessageBox::Yes | QMessageBox::No, QMessageBox::No);
    if(ret == QMessageBox::Yes) {
        event->accept();
    } else {
        event->ignore();
    }
}
```

这样，我们经过询问之后才能正常退出程序。

### event()函数

&emsp;&emsp;事件对象创建完毕后，Qt 将这个事件对象传递给`QObject`的`event()`函数。`event()`函数并不直接处理事件，而是将这些事件对象按照它们不同的类型，分发给不同的事件处理器(event handler)。

&emsp;&emsp;`event()`函数主要用于事件的分发，所以，如果希望在事件分发之前做一些操作，那么，就需要注意这个`event()`函数了。为了达到这种目的，我们可以重写`event()`函数。

&emsp;&emsp;例如，如果希望在窗口中的 tab 键按下时将焦点移动到下一组件，而不是让具有焦点的组件处理，那么就可以继承 QWidget ，并重写它的`event()`函数，以达到这个目的：

```cpp
bool MyWidget::event(QEvent *event)
{
    if (event->type() == QEvent::KeyPress)
    {
        QKeyEvent *keyEvent = static_cast<QKeyEvent *>(event);
        if (keyEvent->key() == Qt::Key_Tab)
        {
            // 处理 Tab 键时事件
            return true;
        }
    }
    return QWidget::event(event);
}
```

&emsp;&emsp;`event()`函数接受一个 QEvent 对象，也就是需要这个函数进行转发的对象。为了进行转发，必定需要有一系列的类型判断，这就可以调用 QEvent 的`type()`函数，其返回值是`QEvent::Type`类型的枚举。

&emsp;&emsp;我们处理过自己需要的事件后，可以直接`return `回去，对于其他我们不关心的事件，需要调用父类的`event()`函数继续转发，否则这个组件就只能处理我们定义的事件了。

&emsp;&emsp;`event()`函数返回值是`bool`类型，如果传入的事件已被识别并且处理，返回`true`，否则返回`false`。如果返回值是`true`，QApplication 会认为这个事件已经处理完毕，会继续处理事件队列中的下一事件；如果返回值是`false`，QApplication 会尝试寻找这个事件的下一个处理函数。

&emsp;&emsp;`event()`函数的返回值和事件的`accept()`和`ignore()`函数不同。`accept()`和`ignore()`函数用于不同的事件处理器之间的沟通，例如判断这一事件是否处理；`event()`函数的返回值主要是通知 QApplication 的`notify()`函数是否处理下一事件。

为了更加明晰这一点，我们来看看 QWidget 的`event()`函数是如何定义的：

```cpp
bool QWidget::event(QEvent *event)
{
    switch (e->type())
    {
        case QEvent::KeyPress:
            keyPressEvent((QKeyEvent *)event);
            if (!((QKeyEvent *)event)->isAccepted())
                return false;
            break;
        case QEvent::KeyRelease:
            keyReleaseEvent((QKeyEvent *)event);
            if (!((QKeyEvent *)event)->isAccepted())
                return false;
            break;
        // more...
    }
    return true;
}
```

&emsp;&emsp;QWidget 的`event()`函数使用一个巨大的 switch 来判断 QEvent 的 type，并且分发给不同的事件处理函数。在事件处理函数之后，使用这个事件的`isAccepted()`方法，获知这个事件是不是被接受，如果没有被接受则`event()`函数立即返回`false`，否则返回`true`。

&emsp;&emsp;另外一个必须重写`event()`函数的情形是有自定义事件的时候。如果程序中有自定义事件，则必须重写`event()`函数以便将自定义事件进行分发，否则自定义事件永远也不会被调用。

### 事件过滤器

&emsp;&emsp;Qt 创建了 QEvent 事件对象之后，会调用 QObject 的`event()`函数做事件的分发。有时候，可能需要在调用event()函数之前做一些另外的操作，比如，对话框上某些组件可能并不需要响应回车按下的事件，此时，就需要重新定义组件的`event()`函数。如果组件很多，就需要重写很多次`event()`函数，这显然没有效率。为此，可以使用一个事件过滤器，来判断是否需要调用`event()`函数。

QOjbect 有一个`eventFilter()`函数，用于建立事件过滤器。这个函数的签名如下：

```cpp
virtual bool QObject::eventFilter(QObject * watched, QEvent * event)
```

如果 watched 对象安装了事件过滤器，这个函数会被调用并进行事件过滤，然后才轮到组件进行事件处理。在重写这个函数时，如果需要过滤掉某个事件，例如停止对这个事件的响应，需要返回true。

```cpp
/* 重载消息过滤器 */
bool event_filter_t::eventFilter(QObject *o, QEvent *e)
{
    if (e->type() == QEvent::MouseButtonPress ||
        e->type() == QEvent::MouseButtonRelease ||
        e->type() == QEvent::MouseButtonDblClick)
    {
		QPushButton *button = static_cast<QPushButton *>(o);
        qDebug() << button->text() << "button mouse event";
        return true;
    }
    return QObject::eventFilter(o, e);
}
```

&emsp;&emsp;上面的例子中为 event_filter_t 建立了一个事件过滤器。为了过滤某个组件上的事件，首先需要判断这个对象是哪个组件，然后判断这个事件的类型。

&emsp;&emsp;例如，我不想让 textEdit 组件处理键盘事件，于是就首先找到这个组件，如果这个事件是键盘事件，则直接返回`true`，也就是过滤掉了这个事件。对于其他组件，我们并不保证是不是还有过滤器，于是最保险的办法是调用父类的函数。

&emsp;&emsp;在创建了过滤器之后，下面要做的是安装这个过滤器。安装过滤器需要调用`installEventFilter()`函数。这个函数的签名如下：

```cpp
void QObject::installEventFilter(QObject* filterObj)
```

&emsp;&emsp;这个函数是 QObject 的一个函数，因此可以安装到任何 QObject 的子类，并不仅仅是 UI 组件。这个函数接收一个 QObject 对象，调用了这个函数安装事件过滤器的组件会调用 filterObj 定义的`eventFilter()`函数。

&emsp;&emsp;例如，`textField.installEventFilter(obj)`，则如果有事件发送到 textField 组件是，会先调用`obj->eventFilter()`函数，然后才会调用`textField.event()`。

&emsp;&emsp;当然，你也可以把事件过滤器安装到 QApplication 上面，这样就可以过滤所有的事件，已获得更大的控制权。不过，这样做的后果就是会降低事件分发的效率。

&emsp;&emsp;如果一个组件安装了多个过滤器，则最后一个安装的会最先调用，类似于堆栈的行为。

&emsp;&emsp;**注意**：如果你在事件过滤器中`delete`了某个接收组件，务必将返回值设为`true`。否则，Qt 还是会将事件分发给这个接收组件，从而导致程序崩溃。

&emsp;&emsp;事件过滤器和被安装的组件必须在同一线程，否则，过滤器不起作用。另外，如果在 install 之后，这两个组件到了不同的线程，那么，只有等到二者重新回到同一线程的时候过滤器才会有效。

&emsp;&emsp;事件的调用最终都会调用 QCoreApplication 的`notify()`函数，因此，最大的控制权实际上是重写 QCoreApplication 的`notify()`函数。由此可以看出，Qt 的事件处理实际上是分层五个层次：

1. 重定义事件处理函数
2. 重定义 event()函数
3. 为单个组件安装事件过滤器
4. 为 QApplication 安装事件过滤器
5. 重定义 QCoreApplication 的`notify()`函数

这几个层次的控制权是逐层增大的。

### 自定义事件

&emsp;&emsp;Qt 允许创建自己的事件类型，这在多线程的程序中尤其有用，当然，也可以用在单线程的程序中，作为一种对象间通讯的机制。那么，为什么需要使用事件，而不是使用信号槽呢？主要原因是，事件的分发既可以是同步的，又可以是异步的，而函数的调用或者说是槽的回调总是同步的。事件的另外一个好处是，它可以使用过滤器。

&emsp;&emsp;Qt 中的自定义事件很简单，同其他类似的库的使用很相似，都是要继承一个类进行扩展。在 Qt 中，你需要继承的类是`QEvent`。

&emsp;&emsp;继承 QEvent 类，你需要提供一个`QEvent::Type`类型的参数，作为自定义事件的类型值。这里的 QEvent::Type 类型是 QEvent 里面定义的一个 enum，因此，你是可以传递一个 int 的。重要的是，你的事件类型不能和已经存在的 type 值重复，否则会有不可预料的错误发生！因为系统会将你的事件当做系统事件进行派发和调用。

&emsp;&emsp;在 Qt 中，系统将保留`0 - 999`的值，也就是说，你的事件 type 要大于999. 具体来说，你的自定义事件的 type 要在 QEvent::User 和 QEvent::MaxUser 的范围之间。其中，QEvent::User 值是1000，QEvent::MaxUser 的值是65535。从这里知道，你最多可以定义64536个事件，相信这个数字已经足够大了！

&emsp;&emsp;但是，即便如此，也只能保证用户自定义事件不能覆盖系统事件，并不能保证自定义事件之间不会被覆盖。为了解决这个问题，Qt 提供了一个函数：`registerEventType()`，用于自定义事件的注册。该函数签名如下：

```cpp
static int QEvent::registerEventType(int hint = -1);
```

函数是 static 的，因此可以使用 QEvent 类直接调用。函数接受一个 int 值，其默认值为-1，返回值是创建的这个 Type 类型的值。如果 hint 是合法的，不会发生任何覆盖，则会返回这个值；如果hint不合法，系统会自动分配一个合法值并返回。因此，使用这个函数即可完成 type 值的指定。这个函数是线程安全的，因此不必另外添加同步。

&emsp;&emsp;你可以在 QEvent 子类中添加自己的事件所需要的数据，然后进行事件的发送。Qt 中提供了两种发送方式：

`static bool QCoreApplication::sendEvent(QObjecy receiver, QEvent event)`：事件被
QCoreApplication 的 notify()函数直接发送给 receiver 对象，返回值是事件处理函数的返回值。使用这个函数必须要在栈上创建事件对象，例如：

```cpp
QMouseEvent event(QEvent::MouseButtonPress, pos, 0, 0, 0);
QApplication::sendEvent(mainWindow, &event);
```

`static bool QCoreApplication::postEvent(QObject receiver, QEvent event)`：事件被
QCoreApplication 追加到事件列表的最后，并等待处理，该函数将事件追加后会立即返回，并且注意，该函数是线程安全的。另外一点是，使用这个函数必须要在堆上创建对象，例如：

```cpp
QApplication::postEvent(object, new MyEvent(QEvent::registerEventType(2048))); 
```

&emsp;&emsp;这个对象不需要手动 delete，Qt 会自动 delete 掉！因此，如果在 post 事件之后调用 delete，程序可能会崩溃。另外，postEvent()函数还有一个重载的版本，增加一个优先级参数，具体请参见API。通过调用 sendPostedEvent()函数可以让已提交的事件立即得到处理。

&emsp;&emsp;如果要处理自定义事件，可以重写 QObject 的`customEvent()`函数，该函数接收一个 QEvent 对象作为参数，也可以像前面介绍的重写`event()`函数的方法去重写这个函数，这两种办法都是可行的。下面是一个使用自定义信号的例子：

```cpp
#include <QApplication>
#include <QWidget>
#include <QPushButton>
#include <QEvent>
#include <QDebug>

/* 初始化自定义的事件类型值 */
static const int CUSTOM_EVENT_TYPE = QEvent::registerEventType();

/* 自定义事件类 */
class custom_event_t : public QEvent
{
public:
	custom_event_t() : QEvent((QEvent::Type)CUSTOM_EVENT_TYPE) {};
};

class main_widgt_t : public QWidget
{
public:
    main_widgt_t() : QWidget() {};

    bool event(QEvent *e);
    void customEvent(QEvent *e);
};

/* 重载事件处理函数 */
bool main_widgt_t::event(QEvent *e)
{
    if(e->type() == CUSTOM_EVENT_TYPE)
    {
        qDebug() << "event() get custom event\n";
    }
    return QObject::event(e);
}

/* 重载自定义事件处理函数 */
void main_widgt_t::customEvent(QEvent *e)
{
    if(e->type() == CUSTOM_EVENT_TYPE)
    {
        qDebug() << "customEvent() get custom event\n";
    }
}

int main(int argc, char *argv[])
{
	QApplication app(argc, argv);
	main_widgt_t main_w;

    qDebug() << "CUSTOM_EVENT_TYPE: " << CUSTOM_EVENT_TYPE;

	QPushButton button("send custom event");
	button.setParent(&main_w);

    /* 使用lambda表达式连接button的点击事件 */
	QObject::connect(&button, &QPushButton::clicked, [&main_w]()
	{
        custom_event_t custom_event;
        /* 给main_w发送自定义事件 */
        QApplication::sendEvent(&main_w, &custom_event);
	});

	main_w.show();
	return app.exec();
}
```

## 信号和槽

&emsp;&emsp;抄了大佬的这篇[博客](https://zhuanlan.zhihu.com/p/648165514)。

### 简介

&emsp;&emsp;信号槽是QT中用于对象间通信的一种机制，也是QT的核心机制。在GUI编程中，我们经常需要在改变一个组件的同时，通知另一个组件做出响应。

&emsp;&emsp;早期，对象间的通信采用回调来实现。回调实际上是利用函数指针来实现，当我们希望某件事发生时处理函数能够获得通知，就需要将回调函数的指针传递给处理函数，这样处理函数就会在合适的时候调用回调函数。回调有两个明显的缺点：

- 它们不是类型安全的，我们无法保证处理函数传递给回调函数的参数都是正确的。
- 回调函数和处理函数紧密耦合，源于处理函数必须知道哪一个函数被回调。

&emsp;&emsp;在QT中，我们有回调技术之外的选择，也即是信号槽机制。所谓的信号与槽，其实都是函数。当特定事件被触发时将发送一个信号，而与该信号建立的连接槽，则可以接收到该信号并做出反应。

&emsp;&emsp;QT组件预定义了很多信号和槽，而在GUI编程中，我们习惯于继承那些组件，继承后添加我们自己的槽，以便以我们的方式来处理信号。槽和普通的C++成员函数几乎是一样的，它可以是虚函数，可以被重载，可以是共有、私有或是保护的，也同样可以被其他成员函数调用。它的函数参数也可以是任意类型的。唯一不同的是：槽还可以和信号连接在一起。

&emsp;&emsp;与回调不同，信号槽机制是类型安全的。这体现在信号的函数签名与槽的函数签名必须匹配上，才能够发生信号的传递。实际上，槽的参数个数可以比信号的参数个数少，因为槽能够忽略信号形参中多出来的参数。信号和槽是松耦合的：发出信号的类不关心哪些类将接收它的信号。QT的槽能够接收到信号的参数并调用，信号和槽都可以有任意个数的参数，它们都是类型安全的。

### 样例分析

&emsp;&emsp;首先我们要知道的是，所有继承自`QObject`或者它的子类（如`QWidget`）都可以包含信号槽。我们写的类也要继承自`QObject`（或其子类）。所有包含了信号和槽的类都必须在声明的上部含有`Q_OBJECT`宏。

下面是一个样例，一个定义了信号的类和一个定义了槽函数的类：

```cpp
#ifndef __MY_SIGHNAL_H__
#define __MY_SIGHNAL_H__

#include <QObject>

/* 一个定义了信号的类 */
class my_signal : public QObject
{
    Q_OBJECT

private:
    int _id = 0;

public:
    my_signal(int id_) : QObject(), _id(id_) {};

    int get_id()
    {
        return _id;
    }

signals:
    /* 信号 */
    void signal_fun(const char *str, int num = 0);
};

#endif /* __MY_SIGHNAL_H__ */
```

```cpp
#ifndef __MY_SLOT_H__
#define __MY_SLOT_H__

#include <QObject>
#include <QDebug>

#include "my_signal.h"

/* 一个定义了槽函数的类 */
class my_slot : public QObject
{
    Q_OBJECT

private:
    int _id = 0;

public:
    my_slot(int id_) : QObject(), _id(id_) {};

    int get_id()
    {
        return _id;
    }

public slots:
    /* 槽函数 */
    virtual void slot_fun(const char *str)
    {
		my_signal *sign = static_cast<my_signal *>(sender());
        qDebug() << "my_slot: " << get_id()
                 << " get my_sign: " << sign->get_id()
                 << " str: " << str;
    }
};

#endif /* __MY_SLOT_H__ */
```

&emsp;&emsp;在这个信号类中，我们使用Qt的`signals`保留字定义了一个信号函数`signal_fun()`，`signal_fun()`的代码会由 Qt 的 moc 工具自动生成，开发人员一定不能在自己的C++代码中实现它。反之，槽应该由开发人员来实现，在槽函数里可以使用`sender()`来获取信号的发送方。需要注意的是，必须在 pro 工程文件里，使用`HEADERS`添加定义了信号或槽函数类的头文件，如果只是使用`INCLUDEPATH`添加头文件的路径，Qt 不会调用 moc 生成代码。

&emsp;&emsp;可以使用`QObject::connect()`函数连接信号和槽，该函数指定了信号发送方、信号函数、信号接收方、槽函数等信息，函数的格式如下：

```cpp
QObject::connect(
    QObject* sender,      /* 信号发送方 */
    SIGNAL(signal_fun()), /* 信号函数 */
    QObject* receiver,    /* 信号接收方 */
    SLOT(slot_fun()));    /* 槽函数 */
```

&emsp;&emsp;最后，我们可以使用 Qt 的`emit`关键字发送信号，下面是一个使用`connect()`和`emit`的简单样例：

```cpp
#include <QCoreApplication>

#include "my_signal.h" /* 定义了信号的类 */
#include "my_slot.h"   /* 定义了槽函数的类 */

int main(int argc, char *argv[])
{
	QCoreApplication app(argc, argv);


    my_signal sign(1); /* 信号发送方 */
    my_slot slot(1);   /* 信号接收方 */

    /* 连接信号和槽 */
    QObject::connect(&sign, SIGNAL(signal_fun(const char *, int)),
                     &slot, SLOT(slot_fun(const char *)));

    /* 发送信号 */
    emit sign.signal_fun("hello word 1", 1);

	return app.exec();
}
```

&emsp;&emsp;上面的例子中，信号函数有两个参数，而槽函数只有一个参数，信息函数的第二个参数会被槽函数忽略。这个例子展示了对象之间通信的一种方式。对象间可以一起工作，而不需要知道彼此的任何信息。为了达到通信的目的，只需要将它们连接起来，而这只需要通过调用`QObject::connect()`函数指定一些简单信息就好。

### 连接

要把信号成功连接到槽，它们的参数必须具有相同的顺序和相同的类型，或者允许信号的参数比槽多，槽会自动忽略掉多出来的参数而进行调用。

#### 一个信号可以连接多个槽

&emsp;&emsp;使用`QObject::connect`可以把一个信号连接到多个槽，而当信号发射时，将按声明联系时的顺序依次调用槽。

```cpp
    my_signal sign;
    my_slot slot_1, slot_2;

    /* 信号连接到两个槽 */
    QObject::connect(&sign, SIGNAL(signal_fun(const char *, int)), 
                     &slot_1, SLOT(slot_fun(const char *)));
    QObject::connect(&sign, SIGNAL(signal_fun(const char *, int)),
                     &slot_2, SLOT(slot_fun(const char *)));

    /* 发送信号 */
    emit sign.signal_fun("hello word", 1);
    /* 依次调用 slot_1.slot_fun()、slot_2.slot_fun() */
```

#### 多个信号可以连接同一个槽

&emsp;&emsp;同样的，可以让多个信号连接到同一个槽上，而且其中的任意一个信号的发送，都会调用了那个槽。

```cpp
    my_signal sign_1, sign_2;
    my_slot slot;

    /* 两个信号连接到同一个槽上 */
    QObject::connect(&sign_1, SIGNAL(signal_fun(const char *, int)),
                     &slot, SLOT(slot_fun(const char *)));
    QObject::connect(&sign_2, SIGNAL(signal_fun(const char *, int)),
                     &slot, SLOT(slot_fun(const char *)));

    /* 发送信号，两个信号都会触发槽函数slot.slot_fun()的调用 */
    emit sign_1.signal_fun("hello word 1", 1);
    emit sign_2.signal_fun("hello word 2", 1);
```

#### 一个信号可以和另外一个信号相连接

&emsp;&emsp;当发送第一个信号的时候，也会把第二个信号发送出去。

```cpp
    my_signal sign_1, sign_2;
    my_slot slot;

    /* 两个信息号相连 */
    QObject::connect(&sign_1, SIGNAL(signal_fun(const char *, int)),
                     &sign_2, SIGNAL(signal_fun(const char *, int)));
    /* 两个信号连接到同一个槽上 */
    QObject::connect(&sign_1, SIGNAL(signal_fun(const char *, int)),
                     &slot, SLOT(slot_fun(const char *)));
    QObject::connect(&sign_2, SIGNAL(signal_fun(const char *, int)),
                     &slot, SLOT(slot_fun(const char *)));

    /* 发送信号1，信号2也会发送出去 */
    emit sign_1.signal_fun("hello word 1", 1);
    /* 发送信号2，信号1不会被发送出去 */
    emit sign_2.signal_fun("hello word 2", 1);
```

#### 连接可以被移除

```cpp
/* 移除sign.signal_fun()与slot.slot_fun()之间的连接 */
QObject::disconnect(&sign, SIGNAL(signal_fun(const char *, int)),
                    &slot, SLOT(slot_fun(const char *)));
```

&emsp;&emsp;实际上当对象被delete时，其关联的所有连接都会失效，QT会自动移除和这个对象的所有连接。
