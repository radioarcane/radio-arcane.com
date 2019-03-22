<template>
   <svg :class="getClass()">
      <use v-if="use" :xlink:href="'/img/icons/sprite.symbol.svg#' + use" role="img" />
      <slot v-else />
   </svg>
</template>

<script>
   export default {
      name: 'SvgIcon',
      props: {
         name: {
            default: '',
            type: String,
         },
         use: {
            default: '',
            type: String,
         },
      },
      methods: {
         getClass() {
            let classes = {
               'icon': true,
            };

            if (this.$props.name) {
               classes[`icon--${ this.$props.name }`] = true;
            }

            return classes;
         },
      }
   }
</script>

<style lang="scss">
   .icon {
      fill: currentColor;
      width: 1em;
      height: 1em;
      transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1);
      display: inline-block;
      vertical-align: middle;
      margin-left: 4px;
      margin-right: 4px;
   }

   .icon-mixcloud {
      width: 1.25em;
   }
</style>
