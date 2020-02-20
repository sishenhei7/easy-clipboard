<template>
  <div style="width: 500px; margin: 0 auto;">
    <div class="example">
      <slot />
    </div>
    <pre v-highlight class="snippet">
      <button class="btn">
        <img
          class="clippy"
          width="13"
          src="@/assets/clippy.svg"
          alt="Copy to clipboard"
        >
      </button>
      <code
        class="code"
        :class="[type]"
      >
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

<style lang="scss" scope>
@import '@/styles/highlight.scss';
.example {
}
.snippet {
  display: block;
  position: relative;
  margin-top: 0;
  margin-bottom: 0;
  overflow: visible;

  color: #333;
  background: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
  clear: both;
  top: -20px;
  padding: 20px 0 0;

  &:hover .btn {
    opacity: 1;
  }
}
.btn {
  position: absolute;
  display: inline-block;
  top: 22px;
  right: 2px;
  padding: 2px 6px;

  font-size: 13px;
  font-weight: 700;
  line-height: 20px;
  color: #333;
  background-color: #eee;
  background-image: linear-gradient(#fcfcfc, #eee);

  cursor: pointer;
  white-space: nowrap;
  vertical-align: middle;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  user-select: none;
}
.clippy {
  margin-top: -3px;
  position: relative;
  top: 3px;
  border: 0;
}
.code {
  margin: 0;
  border-radius: 3px;
  font-size: 14px;
  line-height: 20px;
}
</style>
