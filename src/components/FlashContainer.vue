<template>
   <component :is="tag" class="flash-container">
      <slot />
   </component>
</template>

<script>
   export default {
      name: 'FlashContainer',
      props: {
         tag: {
            default: 'div',
            type: String
         }
      }
   }
</script>

<style lang="scss">
   .flash-container {
      padding: .3em 0 .25em;
      font-weight: 400;
      font-size: 24px;
      color: white;
      font-family: 'Bellefair', serif;
      margin: 0 0 40px;
      position: relative;
      line-height: 1.3;
      text-align: center;
      border: 20px solid $white;
      border-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='75' height='75'%3E%3Cg fill='none' stroke='%23FFFFFF' stroke-width='2'%3E%3Cpath d='M1 1h73v73H1z'/%3E%3Cpath d='M8 8h59v59H8z'/%3E%3Cpath d='M8 8h16v16H8zM51 8h16v16H51zM51 51h16v16H51zM8 51h16v16H8z'/%3E%3C/g%3E%3Cg fill='%23FFFFFF'%3E%3Ccircle cx='16' cy='16' r='2'/%3E%3Ccircle cx='59' cy='16' r='2'/%3E%3Ccircle cx='59' cy='59' r='2'/%3E%3Ccircle cx='16' cy='59' r='2'/%3E%3C/g%3E%3C/svg%3E") 25;
      border-radius: .3em;
      animation: lightbleed-box .12s both infinite;

      @include breakpoint($screen-l-min) {
         font-size: 40px;
      }

      @include breakpoint($screen-xxl-min) {
         font-size: 40px;
      }

      * {
         animation: lightbleed-text .15s infinite;
      }

      > *:last-child {
         margin-bottom: 0;
      }
   }

   @keyframes lightbleed-box {
   	0%	{ box-shadow:  0 0 6px rgba(255,255,255,.8); }
   	25% { box-shadow: 0 0 9px $light; }
   	50%{ box-shadow: 0 0 9px rgba(255,255,255,.75); }
   	75% { box-shadow: 0 0 10px $light; }
   	100%{ box-shadow: 0 0 5px rgba(250,250,250,.8); }
   }

   @keyframes lightbleed-text {
   	0% { text-shadow: 0 0 5px $light;}
   	30% { text-shadow: 0 0 6px $light; }
   	65% { text-shadow: 0 0 7px #fff; }
   	100% { text-shadow: 0 0 9px $light; }
   }
</style>
