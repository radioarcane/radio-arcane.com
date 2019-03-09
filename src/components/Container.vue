<template>
   <div class="container" v-bind:class="getClass()" >
      <slot />
   </div>
</template>

<script>
   export default {
      name: 'Container',
      props: {
         className: {
            default: '',
            type: String,
         }
      },
      methods: {
         getClass() {
            let classes = {};

            if (this.$props.className) {
               classes[this.$props.className] = true;
            }

            return classes;
         },
      }
   }
</script>

<style lang="scss">
   .container {
      width: 100%;
      max-width: $max-container-width;
      padding-left: $gutter-width;
      padding-right: $gutter-width;
      margin-left: auto;
      margin-right: auto;
   }
</style>
