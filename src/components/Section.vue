<template>
   <component :is="tag" :class="classNames">
      <slot />
   </component>
</template>

<script>
   export default {
      name: 'Section',
      props: {
         tag: {
            type: String,
            default: 'section'
         },
         pad: {
            type: Boolean,
            default: false
         },
         padTop: {
            type: Boolean,
            default: false
         },
         padBottom: {
            type: Boolean,
            default: false
         },
      },
      data () {
         let classNames = ['section'];

         if (this.pad || this.padTop) {
            classNames.push('section--pad-top');
         }

         if (this.pad || this.padBottom) {
            classNames.push('section--pad-btm');
         }

         return {
            classNames,
         }
      },
   }
</script>

<style lang="scss">
   .section {
      &--pad-top {
         padding-top: 2rem;
      }

      &--pad-btm {
         padding-bottom: 2rem;
      }
   }
</style>
