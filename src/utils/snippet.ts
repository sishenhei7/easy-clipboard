// hack: 代码里面不能有换行
// prettier-ignore
export const copyDirectlyCode =
`// js
import clipboard from 'easy-clipboard'
clipboard.copy('This is some text.')
`

// prettier-ignore
export const copyNodeCode =
`// html
<input id="js-copy-by-node" class="input" type="text" value="Copy by some Node." />

// js
import clipboard from 'easy-clipboard'
const node = document.querySelector('#js-copy-by-node')
clipboard.copy(node)
`

// prettier-ignore
export const copyCallbackCode =
`// html
<input id="js-copy-by-callback" class="input" type="text" value="Copy by some callback." />

// js
import clipboard from 'easy-clipboard'
clipboard.copy(() => document.querySelector('#js-copy-by-callback'))
`

// prettier-ignore
export const copyTableCode =
`// html
<table id="js-copy-table" class="table">
  <thead>
    <tr>
      <th>yesterday</th>
      <th>today</th>
      <th>tomorrow</th>
    </tr>
  </thead>
  <tr>
    <td>1</td>
    <td>2</td>
    <td>3</td>
  </tr>
  <tr>
    <td>4</td>
    <td>5</td>
    <td>6</td>
  </tr>
</table>

// js
import clipboard from 'easy-clipboard'
clipboard.copy(() => document.querySelector('#js-copy-table'))
`
