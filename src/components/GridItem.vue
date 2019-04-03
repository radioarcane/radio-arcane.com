<template>
   <component :class="getClasses()" :is="tag">
      <slot />
   </component>
</template>

<script>
   export default {
      name: 'GridItem',
      props: {
         sizes: {
            type: Object,
            required: false
         },
         padTop: {
            type: Boolean,
            required: false
         },
         padBottom: {
            type: Boolean,
            required: false
         },
         tag: {
            type: String,
            default: 'div'
         }
      },
      methods: {
         getClasses () {
            let classes = ['grid__item'];

            const {
               sizes,
               padBottom,
               padTop,
            } = this;

            if (padTop) {
               classes.push('grid__item--pad-top');
            }

            if (padBottom) {
               classes.push('grid__item--pad-btm');
            }

            if (!sizes) {
               return classes;
            }

            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
               if (sizes.hasOwnProperty(size)) {
                  classes.push(size + '-' + sizes[size]);
               }
            })

            return classes;
         }
      }
   }
</script>

<style lang="scss">

   .grid__item {
      padding-left: $gutter-width;
      padding-right: $gutter-width;

      &--pad-top {
         padding-top: 2rem;
      }

      &--pad-btm {
         padding-bottom: 2rem;
      }
   }

   $num-of-columns: 12;
   $column-breakpoints: $screen-xs-min, $screen-s-min, $screen-m-min, $screen-l-min, $screen-xl-min, $screen-xxl-min;
   $column-prefixes: 'xs', 'sm', 'md', 'lg', 'xl', 'xxl';

   @mixin gridColumns($classPrefix, $numColumns: 12) {
       @for $i from 1 through $numColumns {
           .#{$classPrefix}-#{$i} {
              width: ($i / $numColumns) * 100%;
           }
       }
   }

   @for $i from 1 through length($column-prefixes) {
       $prefix: nth($column-prefixes, $i);
       $breakpoint: nth($column-breakpoints, $i);

       @if ($breakpoint) {
           @include breakpoint($breakpoint) {
               @include gridColumns($prefix, $num-of-columns);
           }
       }
   }
</style>
