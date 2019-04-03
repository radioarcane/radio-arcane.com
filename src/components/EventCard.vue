<template>
   <div class="event-card">
      <div v-if="event.image" class="event-card__img">
         <g-link :to="`/events/${event.slug}`">
            <picture v-if="event.webp">
               <source :srcset="event.webp" type="image/webp">
               <source :srcset="event.image" type="image/jpeg">
               <img :src="event.image" :alt="event.displayName">
            </picture>

            <img v-if="!event.webp"
                 :src="event.image"
                 :alt="event.displayName"
            />
         </g-link>
      </div>

      <div class="event-card__body">
         <h3 class="event-card__title" itemprop="name">
            {{ event.displayName }}
         </h3>

         <div class="event-card__subtitle">
            <SvgIcon use="clock" name="clock" />
            <time :datetime="event.date">
               {{ event.date | moment("dddd, MMMM D, YYYY") }}
            </time>
         </div>

         <div class="event-card__text">
            <p :if="event.shortDescription">
               {{ event.shortDescription }}
            </p>

            <Btn :to="`/events/${event.slug}`">
               <span>Details</span>
               <SvgIcon use="right-open" name="right-open" />
            </Btn>
         </div>
      </div>
   </div>
</template>

<script>
   import Btn from '~/components/Btn.vue';
   import SvgIcon from '~/components/SvgIcon.vue';

   export default {
      name: 'EventCard',
      props: {
         event: {
            type: Object
         }
      },
      components: {
         Btn,
         SvgIcon,
      },
   }
</script>

<style lang="scss">
   .event-card {
       border: 1px solid hex-to-rgba($white-smoke, 0.4);
       margin: 0 0 2rem;
       border-radius: 8px;
       overflow: hidden;

       &__img {
          text-align: center;
       }

       &__body {
          padding: 1rem $gutter-width;
       }

       &__title {
          @include fluid-type($screen-s-min, $screen-xxl-min, 24px, 30px);
          margin: 0;
       }

       &__subtitle {
           @include fluid-type($screen-s-min, $screen-xxl-min, 18px, 20px);
           margin: 0.25em 0 0;
           opacity: 0.6;
       }

       &__text {
          padding: 1rem 0 0;
          @include fluid-type($screen-s-min, $screen-xxl-min, 18px, 20px);
       }

       &__actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          align-items: center;
          align-content: center;
       }
   }
</style>
