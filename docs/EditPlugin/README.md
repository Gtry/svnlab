# VSCode编辑器插件使用

## VSCode离线插件安装
* 参考1：[VSCode 插件离线安装](https://blog.csdn.net/wangwei703/article/details/54020712)
* 参考2：[简单的 VSCode 插件离线安装方法](https://blog.csdn.net/u012814856/article/details/80684376)

## 插件安装
### JavaScript

1.安装vetur，参考[如何优雅地使用 VSCode 来编辑 vue 文件](https://www.clarencep.com/2017/03/18/edit-vue-file-via-vscode)
npm install -g eslint
npm install -g eslint-plugin-html

2.环境变量设置

3.配置
{
    // 支持vue文件的基本语法高亮
    "emmet.syntaxProfiles": {
        "vue-html": "html",
        "vue": "html"
    },
    // 配置ESLint
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        "vue"
    ],
    "eslint.options": {
        "plugins": ["html"]
    },
}

### Python
1.安装
python -m pip install -U pylint --user

2.环境变量设置
C:\Users\Administrator\AppData\Roaming\Python\Python37\Scripts
