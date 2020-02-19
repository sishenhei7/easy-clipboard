import path from 'path'
// 支持字符串替换, 比如动态读取package.json的version到代码
import replace from '@rollup/plugin-replace'
// 支持加载json文件
import json from '@rollup/plugin-json'
// ts转js的编译器
import ts from 'rollup-plugin-typescript2'
// CommonJS转es6的编译器
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

const { version, name } = pkg

const resolve = p => path.resolve(__dirname, p)

// 代码头
const banner = `/*!
 * easy-clipboard.js v${version}
 * (c) 2019-${new Date().getFullYear()} Yangzhou
 * https: //github.com/sishenhei7/easy-clipboard
 * Released under the MIT License.
 */`

export default {
  input: './lib/index.ts',
  plugins: [
    json(),
    commonjs(),

    replace({
      __VERSION__: version
    }),

    ts({
      exclude: ['node_modules/**', '**/__tests__'],
      tsconfig: resolve('tsconfig.json')
    })
  ],
  output: [
    {
      file: resolve(`dist/${name}.cjs.js`),
      format: 'cjs',
      banner,
      minify: true
    },
    {
      file: resolve(`dist/${name}.global.js`),
      format: 'iife',
      banner,
      minify: true
    },
    {
      file: resolve(`dist/${name}.esm.js`),
      format: 'es',
      banner,
      minify: true
    }
  ]
}
