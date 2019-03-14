<template>
   <Layout>
      <div class="text-center">
          <div v-for="{ node } in $page.allTest.edges" :key="node.id">
             <p>{{ node.id }}<p>
             <h1>{{ node.title }}</h1>

             <div v-html="node.content" />

             {{ node.content }}

             <!--
             <div><h1 id="test-content"><a href="#test-content" aria-hidden="true"><span class="icon icon-link"></span></a>Test Content</h1>
<h2 id="heading-2"><a href="#heading-2" aria-hidden="true"><span class="icon icon-link"></span></a>Heading 2</h2>
<p>This is test content...</p>
</div>
             -->
         </div>
      </div>
   </Layout>
</template>

<page-query>
query Test {
   allTest (sortBy: "title") {
      edges {
         node {
            id,
            title,
            content
         }
      }
   }
}
</page-query>

<script>

   export default {
      metaInfo: {
         title: 'Tests',
         description: 'Add Meta Description...',
      },
      mounted () {
         console.log('..MOUNTED');
         console.log(this.$page.allTest.edges);
      }
   }
</script>

<style>
</style>
