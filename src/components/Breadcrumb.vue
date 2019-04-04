<template>
   <ol class="breadcrumb">
      <li class="breadcrumb__item">
         <router-link class="breadcrumb__link" to="/">Home</router-link>
      </li>
      <li v-for="(item, index) in crumbs"
          :key="index"
          class="breadcrumb__item"
      >
         <router-link class="breadcrumb__link" :to="item.to">{{ item.name }}</router-link>
      </li>
   </ol>
</template>

<script>
   export default {
      name: 'Breadcrumb',
      props: {
         crumbs: {
            type: Array,
         }
      },
   }
</script>

<style lang="scss">
   .breadcrumb {
      list-style: none;
      padding: 0;
      margin: 0 0 1.25rem;
      @include fluid-type($screen-s-min, $screen-xxl-min, $font-base-size, 18px);

      &__item {
         display: inline-block;
         vertical-align: middle;

         &:after {
            content: ">";
            display: inline-block;
            vertical-align: middle;
            padding: 0 0.5em;
         }

         &:last-child {
            opacity: 0.75;

            &:after {
               content: "";
               display: none;
            }

            .breadcrumb__link {
               &,
               &:hover,
               &:focus {
                  color: $white-smoke;
               }

               text-decoration: none;
               pointer-events: none;
            }
         }
      }

      &__link {
         text-decoration: underline;
         color: $white-smoke;

         &:hover,
         &:focus {
            color: darken($white-smoke, 15%);
         }
      }
   }
</style>
