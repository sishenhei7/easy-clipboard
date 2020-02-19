<template>
  <div class="home">
    Home
    <example-code :code="code" type="html" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ExampleCode from '@/components/ExampleCode.vue'

/* eslint-disable @typescript-eslint/no-inferrable-types */
@Component({
  components: {
    ExampleCode
  }
})
export default class Home extends Vue {
  private code: string = `
    <!-- Target -->
    <input id="foo" value="https://github.com/zenorocha/clipboard.js.git">

    <!-- Trigger -->
    <button class="btn" data-clipboard-target="#foo">
        <img src="assets/clippy.svg" alt="Copy to clipboard">
    </button>`
}
</script>
