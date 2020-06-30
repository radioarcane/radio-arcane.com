<template>
   <div class="video">
      <iframe class="video__frame"
              :data-src="getSrc()"
              :src="getSrc()"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
      />
   </div>
</template>

<script>
   import lozad from 'lozad';

   export default {
      name: 'Video',
      props: {
         id: {
            default: '',
            type: String
         }
      },
      mounted: function() {
         const player = this.$el.querySelector('iframe');

         const observer = lozad(player, {
            rootMargin: '50px 0px',
            threshold: 0.1,
         });

         observer.observe();
      },
      methods: {
         getSrc() {
            console.log(this.$props);

            return `https://www.youtube.com/embed/${ this.$props.id }`;
         }
      }
   }
</script>

<style lang="scss">
   .video {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 */
      padding-top: 25px;
      height: 0;
      margin: 0 0 2.75rem;

      &__frame {
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         border: 0;
      }
   }
</style>
