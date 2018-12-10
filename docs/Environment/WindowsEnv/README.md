# VSCode编辑器插件使用

## VSCode离线插件安装
* 参考1：[VSCode 插件离线安装](https://blog.csdn.net/wangwei703/article/details/54020712)
* 参考2：[简单的 VSCode 插件离线安装方法](https://blog.csdn.net/u012814856/article/details/80684376)
* 要下载以前版本，可以通过api链接。但是需要知道语言包的版本号。一般情况下，语言包的最终版会以.2版本号结尾。可以试一下.3有没有，再试.2。例如现在Marketplace页面上的中文语言包官方版已经是1.28.2。要下载匹配上一版的最终版本，用这个链接：https://marketplace.visualstudio.com/_apis/public/gallery/publishers/MS-CEINTL/vsextensions/vscode-language-pack-zh-hans/1.27.2/vspackage(来自[语言插件说明](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans#review-details))

## VSCode插件安装配置
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
