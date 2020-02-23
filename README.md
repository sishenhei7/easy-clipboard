# easy-clipboard
[![Codecov](https://img.shields.io/codecov/c/github/sishenhei7/easy-clipboard/master.svg)](https://codecov.io/github/sishenhei7/easy-clipboard?branch=master)[![NPM version](https://img.shields.io/npm/v/easy-clipboard.svg?style=flat)](https://npmjs.com/package/easy-clipboard) [![NPM downloads](https://img.shields.io/npm/dm/easy-clipboard.svg?style=flat)](https://npmjs.com/package/easy-clipboard)

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
const node = document.querySelector(selector)
clipboard.copy(node);

// copy whatever dom you return
clipboard.copy(() => document.querySelector('.haha'));
```

## TODO

- [x] 精简clipboard.js
- [x] 用 ts 重写
- [x] 用 rollup 打包
- [x] 添加 demo
- [ ] 用 jest 测试
