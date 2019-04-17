<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <article>
            <Section :padBottom="true">
               <Title>About</Title>

               <p>Radio Arcane is a collective of Louisville dj's that utilize an art space to host entertainment events with a heavy interest dark eclectic music. A podcast featuring music and discussion is also available on Mixcloud and SoundCloud.</p>
            </Section>
         </article>

         <Section :padBottom="true">
            <Heading strike animate>
               Dark Music Specialists
            </Heading>

            <div class="profiles">
               <div class="profile"
                  v-for="(dj, index) in djs"
                  :key="index"
               >
                  <ProfileCard
                     :profile="{
                        title: dj.name,
                        img: dj.img,
                        webp: dj.img,
                        credit: 'Tarik Dozier',
                        creditUrl: 'http://www.oqlus.com'
                     }"
                  />
               </div>
            </div>
         </Section>

         <Section>
            <Heading strike animate>
               Creative Help & Direction
            </Heading>

            <div class="profiles">
               <div class="profile"
                  v-for="(dj, index) in others"
                  :key="index"
               >
                  <ProfileCard
                     :profile="{
                        title: dj.name,
                        img: dj.img,
                        webp: dj.img,
                        credit: 'Tarik Dozier',
                        creditUrl: 'http://www.oqlus.com'
                     }"
                  />
               </div>
            </div>
         </Section>
      </Container>
   </Layout>
</template>

<style lang="scss">
   .profiles {
       display: flex;
       flex-wrap: wrap;
       align-items: stretch;
       align-content: flex-start;
       justify-content: flex-start;
       margin: 0 -15px;
   }

   .profile {
      width: 100%;
      padding: 0 15px;

      @include breakpoint ($screen-s-min) {
        width: 50%;
      }

      @include breakpoint ($screen-m-min) {
        width: 33.333%;
     }

      @include breakpoint ($screen-xl-min) {
        width: 25%;
      }
   }
</style>

<script>
   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Container from '~/components/Container.vue';
   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';
   import Heading from '~/components/Heading.vue';
   import ProfileCard from '~/components/ProfileCard.vue';
   import Section from '~/components/Section.vue';
   import Title from '~/components/Title.vue';

   const metaTitle = 'About | Radio Arcane';
   const metaDescription = 'Radio Arcane is a collective of Louisville dj\'s that utilize an art space to host entertainment events with a heavy interest dark eclectic music. A podcast featuring music and discussion is also available on Mixcloud and SoundCloud.';
   const metaImg = 'https://www.radio-arcane.com/img/logo--radio-arcane.png';

   export default {
      metaInfo: {
         title: 'Events',
         meta: [
            { description: metaDescription },
            { property: 'og:title', content: metaTitle },
            { property: 'og:site_name', content: 'Radio Arcane' },
            { property: 'og:url', content: 'https://www.radio-arcane.com/about' },
            { property: 'og:image', content: metaImg },
            { property: 'og:description', content: metaDescription },

            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: 'https://www.radio-arcane.com/about' },
            { name: 'twitter:title', content: metaTitle },
            { name: 'twitter:description', content: metaDescription },
            { name: 'twitter:creator', content: '@Radio_Arcane' },
            { name: 'twitter:image:src', content: metaImg },

            { itemprop: 'name', content: metaTitle },
            { itemprop: 'description', content: metaDescription },
            { itemprop: 'image', content: metaImg },
         ],
         links: [
            { rel: 'canonical', href: 'https://www.radio-arcane.com/about' }
        ]
      },
      components: {
         Breadcrumb,
         Container,
         GridContainer,
         GridItem,
         Heading,
         ProfileCard,
         Section,
         Title,
      },
      data () {
         return {
            crumbs: [{
               name: 'About',
               to: '/about'
            }],
            others: [{
               img: 'gothic-bastard',
               webp: 'gothic-bastard.jpg',
               name: 'Gothic Bastard'
            }, {
               img: 'lisa-frye',
               webp: 'lisa-frye',
               name: 'Lisa Frye'
            }, {
               img: 'robert-major',
               webp: 'robert-major',
               name: 'Robert Major'
            }],
            djs: [{
               img: 'androspore',
               name: 'AndrOspore',
               webp: 'androspore',
            }, {
               img: 'brian-drabant',
               name: 'Brian Drabant'
            }, {
               img: 'kaleidoscope',
               name: 'Kaleidoscope'
            }, {
               img: 'motuvius-rex',
               name: 'Motuvius Rex'
            }, {
               img: 'osiris-ani',
               name: 'Osiris Ani'
            }, {
               img: 'sorrow-vomit',
               name: 'Sorrow-Vomit'
            }, {
               img: 'talamasca',
               name: 'Talamasca'
            }, {
               img: 'thulsa-goon',
               name: 'Thulsa Goon'
            }]
         };
      }
   }
</script>
