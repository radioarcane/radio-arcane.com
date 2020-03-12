<template>
   <div class="event">
      <div v-if="event.image" class="event__photo">
         <router-link :to="event.path" v-if="includeLink">
            <picture v-if="event.webp">
               <source :srcset="event.webp" type="image/webp">
               <source :srcset="event.image" type="image/jpeg">
               <img :src="event.image" :alt="event.displayName">
            </picture>

            <img v-if="!event.webp"
                 :src="event.image"
                 :alt="event.displayName"
            />
         </router-link>

         <div v-if="!includeLink">
            <picture v-if="event.webp">
               <source :srcset="event.webp" type="image/webp">
               <source :srcset="event.image" type="image/jpeg">
               <img :src="event.image" :alt="event.displayName">
            </picture>

            <img v-if="!event.webp"
                 :src="event.image"
                 :alt="event.displayName"
            />
         </div>
      </div>

      <div class="event__content">
         <header class="event__header">
            <h3 class="event__title" v-if="showTitle">
               {{ event.displayName }}
            </h3>

            <div class="event__subtitle">
               <SvgIcon name="clock" use="clock" />
               <time :datetime="getDateTime()" class="event__time">
                  {{ event.date | moment("dddd MMMM D, YYYY") }} <span v-if="event.startDatetime">
                     @ {{ event.startDatetime | moment('h A') }}
                  </span> <span v-if="event.startDatetime && event.endDatetime">
                     &ndash; {{ event.endDatetime | moment('h A') }}
                  </span>
               </time>
            </div>
         </header>

         <div v-if="event.cancelled" class="event__text">
            <p>Sorry, but this event has been cancelled.</p>
         </div>
         <div v-else class="event__text" v-html="event.description" />

         <div v-if="event.location" class="event__location">
            <SvgIcon name="location" use="location" />

            <a v-if="event.location.venueLink"
               :href="event.location.venueLink"
               target="_blank"
               class="event__location__title"
            >
               {{ event.location.title }}
            </a>

            <span v-if="!event.location.venueLink" class="event__location__title">
               {{ event.location.title }}
            </span>

            <span class="event__location__address">
               {{ event.location.address }}<br />
               <span v-if="event.location.address2">
                  {{ event.location.address2 }}<br />
               </span>
               {{ event.location.city }}, {{ event.location.state }} {{ event.location.zipcode }}
            </span>

            <a v-if="event.location.googleMapLink"
               :href="event.location.googleMapLink"
               class="event__location__directions"
               target="_blank"
            >
               View Map
            </a>
         </div>

         <div class="event__actions">
            <GridContainer>
               <GridItem v-if="event.facebookEventLink">
                  <Btn :href="event.facebookEventLink" variant="facebook" target="_blank">
                     <SvgIcon use="facebook" name="facebook" /> <span>Facebook Event</span>
                  </Btn>
               </GridItem>
               <GridItem v-if="event.ticketsLink && !event.expired">
                  <Btn
                     v-if="event.ticketsLink"
                     :href="event.ticketsLink"
                     target="_blank"
                     variant="secondary"
                  >
                     <SvgIcon use="ticket" name="ticket" /> <span>Advanced Tickets</span>
                  </Btn>
               </GridItem>
            </GridContainer>
         </div>
      </div>
   </div>
</template>

<script>
   import Btn from './Btn.vue';
   import GridContainer from './GridContainer.vue';
   import GridItem from './GridItem.vue';
   import SvgIcon from './SvgIcon.vue';

   export default {
      name: 'Event',
      components: {
         Btn,
         GridContainer,
         GridItem,
         SvgIcon,
      },
      props: {
         event: {
            default: {},
            type: Object
         },
         showTitle: {
            default: true,
            type: Boolean,
         },
         includeLink: {
            default: true,
            type: Boolean
         }
      },
      methods: {
         getDateTime () {
            if (this.event.startDatetime) {
               return this.event.startDatetime.split(' ').join('T');
            }

            return this.event.date;
         }
      }
   }
</script>

<style lang="scss">
   .event {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      align-items: stretch;
      align-content: flex-start;
      margin:0 0 2em;

      &__photo {
         width: 100%;
         text-align: center;
         padding: 0 0 1.5em;
         max-width: 400px;
         margin-left: auto;
         margin-right: auto;

         @include breakpoint($screen-m-min) {
            text-align: left;
            padding-right: $gutter-width;
            width: 40%;
         }

         @include breakpoint($screen-l-min) {
            width: 30%;
         }

         a {
            display: block;
         }
      }

      &__content {
         width: 100%;

         @include breakpoint($screen-m-min) {
            width: 60%;
         }

         @include breakpoint($screen-l-min) {
            width: 70%;
         }
      }

      &__header {
         padding: 0 0 1rem;
      }

      &__title {
         margin: 0;
      }

      &__subtitle {
         font-size: 20px;
         margin-top: .15em;
         color: #ccc;
      }

      &__time {
         display: inline-block;
         vertical-align: middle;
      }

      &__location {
         text-align: left;
         padding: 0 0 1rem;

         &__title {
            display: inline-block;
            vertical-align: middle;
         }

         &__address {
            display: block;
         }

         &__address,
         &__directions {
            padding-left: 25px;
         }
      }
   }
</style>
