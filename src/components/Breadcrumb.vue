<template>
   <ol class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">
      <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
         <g-link class="breadcrumb__link" itemprop="item" to="/">
            <span itemprop="name">Home</span>
         </g-link>

         <meta itemprop="position" content="1" />
      </li>
      <li v-for="(item, index) in crumbs"
          :key="index"
          class="breadcrumb__item"
          itemprop="itemListElement"
          itemscope
          itemtype="http://schema.org/ListItem"
      >
         <g-link class="breadcrumb__link" itemprop="item" v-bind:to="item.to">
            <span itemprop="name">{{ item.name }}</span>
         </g-link>

         <meta itemprop="position" :content="index + 2" />
      </li>
   </ol>
</template>

<script>
   export default {
      name: 'Breadcrumb',
      props: {
         crumbs: {
            default: [],
            type: Array,
         }
      },
   }
</script>

<style lang="scss">
   .breadcrumb {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem;

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
            &:after {
               content: "";
               display: none;
            }

            .breadcrumb__link {
               &,
               &:hover,
               &:focus {
                  color: $white;
               }

               text-decoration: none;
               pointer-events: none;
            }
         }
      }

      &__link {
         text-decoration: underline;
         color: $white;

         &:hover,
         &:focus {
            color: darken($white, 15%);
         }
      }
   }
</style>
