<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <article>
            <Section :padBottom="true">
               <Title>About</Title>

               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa non felis tempor rhoncus vel quis nibh. Suspendisse massa odio, pellentesque vitae pellentesque in, hendrerit ut mi. Morbi suscipit finibus mauris eget mattis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis velit felis, gravida eget nunc sit amet, malesuada dictum ex. Aenean orci libero, aliquet ut tristique eget, iaculis at ante. Vestibulum et congue mi.</p>

               <p>Suspendisse interdum neque sit amet nunc rhoncus fermentum. Mauris urna ex, gravida at iaculis id, facilisis eu ligula. Ut magna lectus, convallis in diam ac, vehicula bibendum massa. Cras purus orci, sollicitudin in libero non, consectetur pulvinar ligula. Nulla a ex nibh. In vitae ex vestibulum lacus luctus ornare. Fusce molestie varius leo quis facilisis. Phasellus ut egestas dolor. Morbi consequat ut tellus ac pretium.</p>

               <p>Fusce eu erat tristique, rutrum tortor ac, tincidunt libero. Suspendisse ut sodales mauris. Curabitur accumsan pretium ex sit amet eleifend. Vivamus sit amet dolor et felis luctus vehicula. Proin suscipit sem in rutrum varius. Suspendisse potenti. In ac dolor nisl. Curabitur mollis tincidunt semper. Quisque sit amet elementum libero. Mauris egestas elementum ligula, eget dictum lacus iaculis vitae. Cras venenatis erat nec eros mattis, quis dictum libero aliquet.</p>
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

   export default {
      metaInfo: {
         title: 'About',
         meta: [
            { description: 'Add Meta Description...' }
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
      },
   }
</script>
