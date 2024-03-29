<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <article>
            <Section :padBottom="true">
               <Title>About</Title>

               <p>Radio Arcane is a collective of Dark Music Specialists headquartered in Louisville, KY that host events, live music and a curated, nighttime oddities and art market called The Dark Market.</p>

               <!--
               <p>
                  A podcast featuring music, interviews and discussion is also available on various streaming services through links available on this site.
               </p>
               -->

               <p>
                  More recently, we have branched out with our own streaming radio service and are working with affiliates abroad.<br />
                  Our primary focus being a love of what we describe as “Dark Eclectic Music” involves a variety of sounds, to include Gothic, Darkwave, Post-Punk, Industrial,  EBM, Coldwave, Synthwave, Synthpop, New Wave, Minimal, New Romantic and other related genres.
               </p>

               <p>
                  Please follow us or subscribe to our social media and streaming sites for continuous content and updates on happenings, performances and events.
               </p>

               <Center>
                  <picture>
                     <source
                        srcset="/img/webp/radio-arcane-group.webp" type="image/webp"
                     />
                     <source
                        srcset="/img/uploads/radio-arcane-group.jpg" type="image/jpeg"
                     />

                     <img
                        src="/img/uploads/radio-arcane-group.jpg" alt="Radio Arcane Family Photo"
                        class="family-photo"
                     />
                  </picture>
               </Center>
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

<script>
   import { breadcrumb } from '~/util/jsonLd';
   import meta from '~/util/meta.js';

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Center from '~/components/Center.vue';
   import Container from '~/components/Container.vue';
   import Heading from '~/components/Heading.vue';
   import ProfileCard from '~/components/ProfileCard.vue';
   import Section from '~/components/Section.vue';
   import Title from '~/components/Title.vue';

   const metaInfo = Object.assign({}, meta({
      title: 'About',
      description: 'Radio Arcane is a collective of Louisville dj\'s that utilize an art space to host entertainment events with a heavy interest dark eclectic music.',
      path: '/about'
   }), {
      script: [
         {
            type: 'application/ld+json',
            vmid: 'ldjson-schema',
            body: true,
            innerHTML: JSON.stringify(breadcrumb([{
               path: '/about',
               name: 'About'
            }]))
         },
      ],
      __dangerouslyDisableSanitizersByTagID: {
         'ldjson-schema': ['innerHTML']
      }
   });

   export default {
      metaInfo: metaInfo,
      components: {
         Breadcrumb,
         Center,
         Container,
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
               img: 'sorrow-vomit-2',
               name: 'Sorrow-Vomit'
            }, {
               img: 'talamasca',
               name: 'Talamasca'
            }, {
               img: 'thulsa-goon',
               name: 'Thulsa Goon'
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
         };
      }
   }
</script>

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

   .family-photo {
      border: 1px solid hex-to-rgba($white-smoke, 0.4);
      margin-bottom: 1.25rem;
   }
</style>
