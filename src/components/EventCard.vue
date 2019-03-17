<template>
   <div class="card">
      <div v-if="event.image" class="card__img">
         <g-link :to="`/events/${event.slug}`">
            <g-image :src="event.image" :alt="event.displayName" width="500" />
         </g-link>
      </div>
      <div class="card__body">
         <h3 class="card__title">{{ event.displayName }}</h3>

         <div class="card__subtitle">
            <svg class="icon icon-clock"><use xlink:href="#clock"></use></svg> <time :datetime="event.date">{{ event.date | moment("dddd, MMMM D, YYYY") }}</time>
         </div>

         <div class="card__text">
            <p :if="event.shortDescription">
               {{ event.shortDescription }}
            </p>

            <Btn :to="`/events/${event.slug}`" variant="hollow">
               <span>More Info</span> <svg class="icon icon-right-open"><use xlink:href="#right-open"></use></svg>
            </Btn>
         </div>
      </div>
   </div>
</template>

<script>
   import Btn from '~/components/Btn';

   export default {
      name: 'EventCard',
      props: {
         event: {
            type: Object
         }
      },
      methods: {
      },
      components: {
         Btn,
      },
   }
</script>

<style lang="scss">
   .card {
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
