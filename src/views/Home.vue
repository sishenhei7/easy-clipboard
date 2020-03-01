<template>
  <div class="home">
    <h1>easy-clipboard.js</h1>
    <h2>Usage</h2>
    <h3>Copy string directly</h3>
    <example-code :code="code1" type="javascript">
      <div class="flex justify-between lh-34">
        <span>Copy string directly.</span>
        <button class="button" @click="handleCopyDirectly('This is some text.')">
          Copy to clipboard
        </button>
      </div>
    </example-code>
    <h3>Copy by some Node</h3>
    <example-code :code="code2" type="javascript">
      <div class="flex justify-between lh-34">
        <input id="js-copy-by-node" class="input" type="text" value="Copy by some Node." />
        <button class="button" @click="handleCopyByNode('#js-copy-by-node')">
          Copy to clipboard
        </button>
      </div>
    </example-code>
    <h3>Copy by some callback</h3>
    <example-code :code="code3" type="javascript">
      <div class="flex justify-between lh-34">
        <input id="js-copy-by-callback" class="input" type="text" value="Copy by some callback." />
        <button class="button" @click="handleCopyByNode('#js-copy-by-callback')">
          Copy to clipboard
        </button>
      </div>
    </example-code>
    <h3>Copy a whole table(to a excel)</h3>
    <example-code :code="code4" type="javascript">
      <div class="flex justify-between">
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

        <div>
          <button class="button" @click="handleCopyByNode('#js-copy-table')">
            Copy to clipboard
          </button>
        </div>
      </div>
    </example-code>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import clipboard from 'easy-clipboard'
import ExampleCode from '@/components/ExampleCode.vue'
import { copyDirectlyCode, copyNodeCode, copyCallbackCode, copyTableCode } from '@/utils/snippet'
// import clipboard from '../../lib'

/* eslint-disable @typescript-eslint/no-inferrable-types */
@Component({
  components: {
    ExampleCode
  }
})
export default class Home extends Vue {
  private code1: string = copyDirectlyCode
  private code2: string = copyNodeCode
  private code3: string = copyCallbackCode
  private code4: string = copyTableCode

  handleCopyDirectly(str: string) {
    clipboard.copy(str)
  }

  handleCopyByNode(selector: string) {
    const node = document.querySelector(selector)
    clipboard.copy(node)
  }

  handleCopyByCallback(selector: string) {
    clipboard.copy(() => document.querySelector(selector))
  }
}
</script>
