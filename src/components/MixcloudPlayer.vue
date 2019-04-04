<template>
   <div class="mixcloud-player">
      <iframe width="100%"
              height="120"
              :data-src="getSrc()"
              frameborder="0"
      />
   </div>
</template>

<script>
   import lozad from 'lozad';

   export default {
      name: 'MixcloudPlayer',
      props: {
         url: {
            default: '',
            type: String,
         },
      },
      mounted: function() {
         const player = this.$el.querySelector('iframe');

         const observer = lozad(player, {
            rootMargin: '10px 0px',
            threshold: 0.1,
         });

         observer.observe();
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
         }
      }
   }
</script>

<style lang="scss">
   .mixcloud-player {
      margin: 0 0 1.5rem;
   }
</style>
