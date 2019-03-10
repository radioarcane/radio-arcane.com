<template>
   <div class="mixcloud-player">
      <iframe width="100%" height="120" v-bind:src="getSrc()" frameborder="0" />

      <noscript>
         <iframe width="100%" height="120" v-bind:src="getSrc()" frameborder="0" />
      </noscript>
   </div>
</template>

<script>
   export default {
      name: 'MixcloudPlayer',
      props: {
         url: {
            default: '',
            type: String,
         },
      },
      methods: {
         getSrc() {

            const urlParts = this.$props.url.toString()
                             .split('/')
                             .filter(str => str !== '')
                             .reverse();

            if (urlParts.length < 4) {
               return this.$props.url;
            }

            return `https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2F${ urlParts[1] }%2F${  urlParts[0] }%2F`;
         },
      }
   }
</script>

<style lang="scss">
   .mixcloud-player {
      margin: 0 0 1.5rem;
   }
</style>
