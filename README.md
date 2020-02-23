# easy-clipboard
[![Codecov](https://img.shields.io/codecov/c/github/sishenhei7/easy-clipboard/master.svg?style=flat)](https://codecov.io/github/sishenhei7/easy-clipboard?branch=master) [![NPM version](https://img.shields.io/npm/v/easy-clipboard.svg?style=flat)](https://npmjs.com/package/easy-clipboard) [![NPM downloads](https://img.shields.io/npm/dm/easy-clipboard.svg?style=flat)](https://npmjs.com/package/easy-clipboard) [![NPM license](https://img.shields.io/npm/l/easy-clipboard.svg?style=flat)](https://npmjs.com/package/easy-clipboard)

> clipboard.js 的简化版，去掉了点击事件，提升了易用性

[clipboard.js](https://github.com/zenorocha/clipboard.js) 是一个非常好用的剪切板插件，但是随着前端框架的演变，用户与网页交互的方式越来越多，不仅限于点击事件了，并且在很多情况下，我们可能不需要它强制性自带的点击事件，所以我打算把 [clipboard.js](https://github.com/zenorocha/clipboard.js) 精简一下，把点击事件删掉，这就是本插件的初衷。

[demo](https://sishenhei7.github.io/easy-clipboard/)

## Getting Started

### install

To begin with, just install easy-clipboard:

```
npm i easy-clipboard -s
```

Then，you can use it like this:

```
import clipboard from 'easy-clipboard';

// copy some text directly
clipboard.copy('some text');

// copy the whole dom by some node
const node = document.querySelector('#selector')
clipboard.copy(node);

// copy whatever dom you return
clipboard.copy(() => document.querySelector('#selector'));
```

## TODO

- [x] 精简clipboard.js
- [x] 用 ts 重写
- [x] 用 rollup 打包
- [x] 添加 demo
- [x] 用 jest 测试

## At last

这是我第一个完整结合 ts + rollup + demo + jest 写的一个库，途中遇到了很多困难，主要有下面几点：

1.semantic error TS2531: Object is possibly 'null'.

在打包的时候，ts报了上面的错误，报错代码是：

```
window.getSelection().removeAllRanges()
```

我查了很久解决方法，在百度、google 里面查过，在 typescript 文档里面查过，在 stackoverflow 里面查过，都没有成功（网上有很多解决方案是很老的，现在的 ts 已经不用那种写法了），后来在一个偶然的机会下，我看到了感叹号的写法，然后通过冷静分析报错内容，并在 node_modules 的 @types 里面查找 window 的定义，通过理智分析，才发现应该是由于 ```window.getSelection()``` 的值可能是 null 造成的。最后在它的后面加了一个感叹号解决了（这是 ts 的新语法）。

2.document.createRange() is undefined

在用 jest 进行测试的时候，我遇到了上面的报错。通过定位，我发现是在一个依赖包 select 包里面发生了上面的报错。我本来以为通过 jest 设置屏蔽 node_modules 里面的依赖就可以解决，但是通过查阅文档，我发现 vue-cli 的默认 jest 设置已经帮我屏蔽了 node_modules 里面的包。最后我通过打印 document.createRange 的内容才发现，这个报错的原因是因为 jest 所以来的 JSDOM 里面的 document 没有 createRange 这个方法，所以最后我 mock 了这个方法解决了。这里我才知道，在使用 jest 的时候，并不是完全像在浏览器里面一样，有些方法还是要自己 mock

3.Please provide the repository token to upload reports via `-t :repository-token`

在使用 codecov 上传覆盖率结果的时候，我遇到了上面的报错。通过查阅官网，我明白了通过 circleci 工具可以不需要这个 token 的，但是 circleci 只能免费使用一个 repo，而我在另一个 repo 里面使用了 circleci，所以我并不打算在这里使用 circleci。只能继续查阅资料了，最后我通过查阅 codecov 这个包的文档时发现，它支持下面这种写法，问题解决。

```
export CODECOV_TOKEN=":uuid-repo-token"
# or
./node_modules/.bin/codecov --token=:token
```


