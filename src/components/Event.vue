<template>
   <div class="event">
      <div v-if="event.image" class="event__photo">
         <g-link :to="event.path">
            <img :src="event.image" :alt="event.displayName" />
         </g-link>
      </div>

      <div class="event__content">
         <header class="event__header">
            <h3 class="event__title">{{ event.displayName }}</h3>

            <div class="event__subtitle">
               <svg class="icon icon-clock"><use xlink:href="#clock"></use></svg>
               <time :datetime="getDateTime()">
                  {{ event.date | moment("dddd, MMMM D, YYYY") }} <span v-if="event.startDatetime">
                     @ {{ event.startDatetime | moment('h A') }}
                  </span> <span v-if="event.startDatetime && event.endDatetime">
                     &ndash; {{ event.endDatetime | moment('h A') }}
                  </span>
               </time>
            </div>
         </header>

         <div class="event__text" v-html="event.description" />

         <div v-if="event.location" class="event__location">
            <svg class="icon icon-location"><use xlink:href="#location"></use></svg>

            <a v-if="event.location.venueLink"
               :href="event.location.venueLink"
               target="_blank"
               class="event__location__title"
            >
               {{ event.location.title }}
            </a>

            <span v-if="!event.location.venueLink"
                  class="event__location__title"
            >
               {{ event.location.title }}
            </span>

            <span class="event__location__address">
               {{ event.location.address }}<br />
               <span v-if="event.location.address2">
                  {{ event.location.address2 }}<br />
               </span>
               {{ event.location.city }}, {{ event.location.state }} {{ event.location.zipcode }}
            </span>

            <a
               v-if="event.location.googleMapLink"
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
                     <svg class="icon icon-facebook"><use xlink:href="#facebook"></use></svg> <span>Facebook Event</span>
                  </Btn>
               </GridItem>
               <GridItem v-if="event.ticketsLink && !event.expired">
                  <Btn v-if="event.ticketsLink" :href="event.ticketsLink" target="_blank">
                     <svg class="icon icon-ticket"><use xlink:href="#ticket"></use></svg> <span>Advanced Tickets</span>
                  </Btn>
               </GridItem>
            </GridContainer>

         </div>
      </div>
   </div>
</template>

<script>
   import Btn from '~/components/Btn.vue';
   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';

   export default {
      name: 'Event',
      components: {
         Btn,
         GridContainer,
         GridItem,
      },
      props: {
         event: {
            default: {},
            type: Object
         }
      },
      methods: {
         getDateTime () {
            if (this.event.startDatetime) {
               return this.event.startDatetime.split(' ').join('T');
            }

            return this.event.date;
         },
         getDateTimeStr () {

         }
      },
      mounted () {
         console.log(this);
         //console.log('MOUNTED...')
         //console.log(this.$props);
      }
   }
</script>

<style lang="scss">
   .event {
       display:flex;
       flex-wrap:wrap;
       align-items:flex-start;
       align-items:stretch;
       align-content:flex-start;
       margin:0 0 2em
   }

   .event__photo{
       width:100%;
       text-align:center;
       padding:0 0 1.5em;
       max-width:400px;
       margin-left:auto;
       margin-right:auto
   }

   @media screen and (min-width:768px){
    .event__photo{
        text-align:left;
        padding-right:30px;
        width:40%
    }
}
@media screen and (min-width:992px){
    .event__photo{
        width:30%
    }
}
.event__photo a{
    display:block
}
.event__content{
    width:100%
}
@media screen and (min-width:768px){
    .event__content{
        width:60%
    }
}
@media screen and (min-width:992px){
    .event__content{
        width:70%
    }
}
.event__header{
    padding:0 0 1rem
}
.event__title{
    margin:0;
    font-size:30px
}
.event__subtitle{
    font-size:20px;
    margin-top:.15em;
    color:#ccc
}
.event__location{
    text-align:left;
    padding:0 0 1rem
}
.event__location__title{
    display:inline-block;
    vertical-align:middle
}
.event__location__address{
    display:block
}
.event__location__address,.event__location__directions{
    padding-left: 25px;
}


</style>
