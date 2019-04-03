<template>
   <div class="profile-card">
      <figure class="profile-card__img" v-if="profile.img">

         <picture v-if="profile.webp && profile.img">
            <source :srcset="`/img/webp/${ profile.webp }.webp`" type="image/webp" />
            <source :srcset="`/img/uploads/${ profile.img }.jpg`" type="image/jpeg" />
            <img :src="`/img/uploads/${ profile.img }.jpg`" :alt="profile.title" />
         </picture>

         <img
            v-if="profile.img && !profile.webp"
            :src="`/img/uploads/${ profile.img }.jpg`"
            :alt="profile.title"
         />

         <figcaption class="profile-card__caption">
            <span class="profile-card__title">
               {{ profile.title }}
            </span>

            <span v-if="profile.credit && profile.creditUrl"  class="profile-card__credit">
               Photo by <a :href="profile.creditUrl" target="_blank">{{ profile.credit}}</a>
            </span>

            <span v-if="profile.credit && !profile.creditUrl"  class="profile-card__credit">
               {{ profile.credit}}
            </span>
         </figcaption>
      </figure>
   </div>
</template>

<script>
   export default {
      name: 'ProfileCard',
      props: {
         profile: {
            type: Object,
            default: {
               img: null,
               webp: null,
               title: null,
               credit: null,
               creditUrl: null,
            }
         }
      }
   }
</script>

<style lang="scss">

   .profile-card {
       border: 1px solid hex-to-rgba($white-smoke, 0.4);
       margin: 0 0 2.5rem;
       border-radius: 8px;
       overflow: hidden;
       position: relative;

       &__img {
          text-align: center;
          margin: 0;
       }

       &__caption {
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
          padding: 8px;
          background: hex-to-rgba($black, 0.5);
       }

       &__title {
          @include fluid-type($screen-s-min, $screen-xxl-min, 20px, 22px);
          margin: 0;
          display: block;
          text-align: center;
          line-height: 1;
          opacity: 0.9;
       }

       &__credit {
          font-size: 14px;
          opacity: 0.75;
       }
   }
</style>
