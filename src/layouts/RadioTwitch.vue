<template>
   <div>
      <div id="top-row">
         <picture>
            <source srcset="/img/logo--radio-arcane.webp" type="image/webp">
            <source srcset="/img/logo--radio-arcane.png" type="image/png">
            <img src="/img/logo--radio-arcane.png" alt="Radio Arcane">
         </picture>
      </div>
      <div class="content-wrapper">
         <main class="main-content" role="main">
            <slot />
         </main>
      </div>
   </div>
</template>

<style lang="scss">
   #top-row {
      background: #000;
      padding: 5px 30px;
      text-align: center;
      display: none;

      img {
         max-width: 400px;
      }
   }

   .content-wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      align-content: flex-start;
      justify-content: flex-start;
      width: 100%;
      /*
      background: linear-gradient(to right, rgba(36,31,31,1) 0%, rgba(36,31,31,1) 32%, rgba(74,71,70,1) 100%);
      padding: 2rem 0;
      box-shadow: inset 0 0 150px $black;
      */
      padding: 0;
      background: black;
      position: relative;
      justify-content: center;
   }

   .main-content {
      position: relative;
      min-height: 60vh;
      width: 100%;

      /*
      @include breakpoint($screen-l-min) {
         width: 75%;
      }

      @include breakpoint($screen-l-min) {
         width: 80%;
      }
      */
   }
</style>
