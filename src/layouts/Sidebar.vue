<template>
   <aside class="side-bar">
      <h5 class="text-center">Radio Arcane on Discord</h5>

      <iframe id="discord-widget" src="https://discord.com/widget?id=816408050268766218&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
   </aside>
</template>

<script>
</script>

<style lang="scss">
   .side-bar {
      padding: 2rem 0;
      margin-top: 2rem;
      border-top: 1px solid hex-to-rgba($white-smoke, 0.4);
      width: 100%;

      @include breakpoint($screen-l-min) {
         width: 25%;
         padding-right: 30px;
         border-top: 0;
         margin-top: 0;
         padding-top: 0;
      }

      @include breakpoint($screen-l-min) {
         width: 20%;
      }
   }

   #discord-widget {
      margin: 0 auto;
      max-width: 300px;
   }
</style>
