<template>
   <component
      :is="type"
      :to="to"
      :href="href"
      :class="classNames"
   >
      <slot />
   </component>
</template>

<script>
   export default {
      name: 'Btn',
      props: {
         variant: {
            type: String,
            required: false
         },
         to: {
            type: String,
            required: false
         },
         href: {
            type: String,
            required: false
         }
      },
      data () {
         let classNames = ['btn'];

         if (this.variant) {
            classNames.push('btn--' + this.variant);
         }

         return {
            classNames,
         }
      },
      computed: {
         type () {
            if (this.to) {
               return 'g-link';
            }

            if (this.href) {
               return 'a';
            }

            return 'button';
         }
      },
   }
</script>

<style lang="scss">
   .btn {
      display: inline-block;
      font-weight: 400;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      font-size: 1rem;
      @include fluid-type($screen-s-min, $screen-xxl-min, $font-base-size, 22px);
      padding: 0.35em 1em 0.35em;
      line-height: 1.5;
      transition: all .15s ease-in-out;
      border: 1px solid $link-color;
      background: $link-color;
      color: $white;
      box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12);
      letter-spacing: 0.02857em;
      text-decoration: none;
      text-transform: uppercase;
      margin: 0 0 1rem;
      opacity: 1;
      cursor: pointer;

      &:hover,
      &:focus,
      &:active {
         background: $link-hover-color;
         color: $white;
      }

      * {
         display: inline-block;
         vertical-align: middle;
      }

      &--primary {
         border-color: $primary-color;
         background: $primary-color;

         &:hover,
         &:focus,
         &:active {
            background: darken($primary-color, 5%);
         }
      }

      &--secondary {
         border-color: $secondary-color;
         background: $secondary-color;

         &:hover,
         &:focus,
         &:active {
            background: darken($secondary-color, 5%);
         }
      }

      &--hollow {
         border-color: $white;
         background: transparent;

         &:hover,
         &:focus,
         &:active {
            border-color: darken($white, 20%);
            color: darken($white, 20%);
            background: transparent;
         }
      }

      &--facebook {
         border-color: #3b5998;
         background: #3b5998;
         color: $white;

         &:hover,
         &:focus,
         &:active {
            border-color: #3b5998;
            background: lighten(#3b5998, 10%);
            color: $white;
         }
      }
   }
</style>
