<template>
  <div>
    example code
    <pre>
      <code :class="[type]">
        {{ code }}
      </code>
    </pre>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  @Prop({ required: true, default: 'javascript' }) readonly type: string
  @Prop() readonly code: string
}
</script>

<style lang="scss">
@import '@/styles/highlight.scss';
</style>
