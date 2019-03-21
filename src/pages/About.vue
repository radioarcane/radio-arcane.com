<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <article>
            <Title>About</Title>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at massa non felis tempor rhoncus vel quis nibh. Suspendisse massa odio, pellentesque vitae pellentesque in, hendrerit ut mi. Morbi suscipit finibus mauris eget mattis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis velit felis, gravida eget nunc sit amet, malesuada dictum ex. Aenean orci libero, aliquet ut tristique eget, iaculis at ante. Vestibulum et congue mi.</p>

            <p>Suspendisse interdum neque sit amet nunc rhoncus fermentum. Mauris urna ex, gravida at iaculis id, facilisis eu ligula. Ut magna lectus, convallis in diam ac, vehicula bibendum massa. Cras purus orci, sollicitudin in libero non, consectetur pulvinar ligula. Nulla a ex nibh. In vitae ex vestibulum lacus luctus ornare. Fusce molestie varius leo quis facilisis. Phasellus ut egestas dolor. Morbi consequat ut tellus ac pretium.</p>

            <p>Fusce eu erat tristique, rutrum tortor ac, tincidunt libero. Suspendisse ut sodales mauris. Curabitur accumsan pretium ex sit amet eleifend. Vivamus sit amet dolor et felis luctus vehicula. Proin suscipit sem in rutrum varius. Suspendisse potenti. In ac dolor nisl. Curabitur mollis tincidunt semper. Quisque sit amet elementum libero. Mauris egestas elementum ligula, eget dictum lacus iaculis vitae. Cras venenatis erat nec eros mattis, quis dictum libero aliquet.</p>
         </article>
      </Container>
   </Layout>
</template>

<script>
   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Container from '~/components/Container.vue';
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
         Title,
      },
      data () {
         return {
            crumbs: [{
               name: 'About',
               to: '/about'
            }],
         };
      },
   }
</script>
