<template>
  <div class="home">
    Home
    <example-code :code="code" type="html">
      <input type="text" />
      <div>haha</div>
    </example-code>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ExampleCode from '@/components/ExampleCode.vue'
import { testCode } from '@/utils/snippet'

/* eslint-disable @typescript-eslint/no-inferrable-types */
@Component({
  components: {
    ExampleCode
  }
})
export default class Home extends Vue {
  private code: string = testCode
}
</script>
