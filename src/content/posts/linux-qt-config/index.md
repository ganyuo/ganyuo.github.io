---
title: 'linuxmint搭建Qt开发环境'
published: 2021-04-13
category: 学习笔记
tags: [Qt, C++]
author: ganyuo
pinned: false
draft: true
comment: true
---

&emsp;&emsp;最近想学一种桌面应用开发技术，之前大学的时候因为课程原因，学了下`javafx`，但是个人不喜欢java，后面就没深入去学，现在基本上忘了。后来毕业前准备找工作的时候学了两天`Qt`，当时只学了一些简单的GUI设计，结果面试没过😭，也没深入去学。再然后玩博客的时候，接触了一些前端的技术，发现有很多桌面应用是基于`Electron`开发的，这东西感觉挺不错的，跨平台，而且开发出来的界面很好看，不过貌似比较占用资源。

&emsp;&emsp;最后还是打算学Qt，Qt有C++和python接口，而且跨平台，能在windows、linux和mac上跑，因为之前学过一点点，所以上手会快一点吧。

# 安装

&emsp;&emsp;Anaconda里包含Qt的库和相关的工具，所以安装好Anaconda，把Anaconda加到PATH环境变量就能用Qt了。

&emsp;&emsp;如果没装Anaconda的话，也可以用apt命令安装Qt：

```
sudo apt-get install qt5-default
```

# hello world

&emsp;&emsp;这里我打算用C++来写Qt，听说用python来写会简单一点，习惯python的小伙伴可以尝试一下，接口很相似的。Qt有个官方的IDE，叫Qt Creator，实际上不用这个IDE也可以很方便地写Qt代码，有`qmake`和`make`就够了，先试试编译一个“hello world”程序吧。

1. 首先创建一个文件夹，在里面新建一个`main.cpp`文件，往里面写代码，代码内容如下：

	```cpp
	#include <QApplication> /* 应用程序抽象类 */
	#include <QWidget>  /* 窗口类 */

	int main(int argc, char *argv[])
	{
		QApplication app(argc, argv);

		QWidget widget; /* 构造一个窗口 */
		widget.setWindowTitle("Hello World"); /* 设置窗口标题 */
		widget.show(); /* 显示窗口 */

		return app.exec(); /* exec():进入消息循环 */
	}
	```

	代码的功能是用Qt创建一个标题是“Hello World”的窗口，然后显示出来。

2. 然后再新建一个`hello_world.pro`文件，作为Qt的项目文件，把刚刚的`main.cpp`加到项目里去：

	```
	# 因为用了QWidget，所以要加上这个
	QT += widgets gui

	# 把main.cpp加到项目的代码列表里
	SOURCES += \
		main.cpp
	```

3. 最后在文件夹下打开终端，用`qmake`和`make`编译，编译好后运行生成的`hello_world`程序。

	```shell
	$ mkdir build
	$ cd build/
	$ qmake ../hello_world.pro
	$ make
	$ ./hello_world
	```

一切顺利的话，可以看到一个标题是“Hello World”的窗口。

# vscodium搭建Qt开发环境

&emsp;&emsp;主要是`.vscode`目录下的三个json文件，一个是`tasks.json`，这个是用来配置vscodium编译Qt项目的，其实就是让vscodium运行`qmake`和`make`命令，可以参考一下我的配置。

```json
{
    "tasks": [
        {
            "type": "shell",
            "label": "qt_build_debug",
            "command": "rm",
            "args": [
				"-rf", "./*",
                "&&", "qmake", "${file}", "CONFIG+=debug", "CONFIG+=qml_debug", 
                "&&", "make"
            ],
            "options": {
                "cwd": "${workspaceRoot}/build"
            }
        }
    ],
    "version": "2.0.0"
}
```

&emsp;&emsp;然后是`launch.json`，用来配置运行或调试编译好的Qt程序。

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": "qt_launch",
			"type": "cppdbg",
			"request": "launch",
			"program": "${workspaceRoot}/build/${fileBasenameNoExtension}",
			"args": [],
			"stopAtEntry": false,
			"cwd": "${workspaceFolder}",
			"environment": [],
			"externalConsole": false,
			"MIMode": "gdb",
			"setupCommands": [
				{
					"description": "为 gdb 启用整齐打印",
					"text": "-enable-pretty-printing",
					"ignoreFailures": true
				}
			],
			"preLaunchTask": "qt_build_debug",
			"miDebuggerPath": "/usr/bin/gdb"
		}
	]
}
```

&emsp;&emsp;最后一个是`c_cpp_properties.json`，这个用来配置vscodium的语法补全，这个要装C++的插件才行。

```json
{
    "configurations": [
        {
            "name": "Linux",
            "includePath": [
                "${workspaceFolder}/**",
                "/home/ganyuo/program/anaconda3/include/qt/**" /* 这里需要根据anaconda的安装路径改 */
            ],
            "defines": [],
            "compilerPath": "/usr/bin/g++",
            "cStandard": "gnu17",
            "cppStandard": "gnu++14",
            "intelliSenseMode": "gcc-x64"
        }
    ],
    "version": 4
}
```

&emsp;&emsp;配置好以后，打开一个Qt的`.pro`项目文件，按`F5`编译运行。
