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
.card{
    border:1px solid hsla(0,0%,100%,.7);
    margin:0 0 2rem;
    border-radius:8px;
    overflow:hidden
}
.card__img{
    text-align:center
}
.card__body{
    padding:1rem 30px
}
.card__title{
    font-size:30px;
    margin:0
}
.card__subtitle{
    font-size:20px;
    margin:.25em 0 0;
    color:#ccc
}
.card__text{
    padding:1rem 0 0
}
.card__actions{
    display:-ms-flexbox;
    display:flex;
    -ms-flex-wrap:wrap;
    flex-wrap:wrap;
    -ms-flex-pack:space-evenly;
    justify-content:space-evenly;
    -ms-flex-align:center;
    align-items:center;
    -ms-flex-line-pack:center;
    align-content:center
}
</style>
