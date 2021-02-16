<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <Section :padBottom="true">
            <Title>Contact Radio Arcane</Title>

               <form v-on:submit="handleFormSubmit" name="contact" method="POST" data-netlify="true">
                  <label for="name">Name:<sup>*</sup></label>
                  <input type="text" id="name" name="name" maxlength="150" required />

                  <label for="email">Email Address:<sup>*</sup></label>
                  <input type="email" id="email" name="email" maxlength="150" required />

                  <label for="message">Message:<sup>*</sup></label>
                  <textarea id="message" name="message" required></textarea>

                  <Center>
                     <button class="btn" type="submit">Submit</button>
                  </Center>
               </form>
         </Section>
      </Container>
   </Layout>
</template>

<script>
   import { breadcrumb } from '~/util/jsonLd';
   import meta from '~/util/meta.js';

   import axios from "axios";

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Center from '~/components/Center.vue';
   import Container from '~/components/Container.vue';
   import Section from '~/components/Section.vue';
   import Title from '~/components/Title.vue';

   const metaInfo = Object.assign({}, meta({
      title: 'Contact',
      description: 'Contact Radio Arcane',
      path: '/contact'
   }), {
      script: [
         {
            type: 'application/ld+json',
            vmid: 'ldjson-schema',
            body: true,
            innerHTML: JSON.stringify(breadcrumb([{
               path: '/contact',
               name: 'Cotact'
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
         Section,
         Title,
      },
      data () {
         return {
            crumbs: [{
               name: 'Contact',
               to: '/contact'
            }]
         };
      },
      methods: {
       handleFormSubmit (ev)  {
          ev.preventDefault();

          const form = ev.target;

          const data = {
            "form-name": "contact",
            subject: "Radio Arcane Contact Form Message",
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            message: form.querySelector('#message').value,
          };

          const encodedData = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key].toString().replace(/ +(?= )/g,'').trim())}`).join("&");

         const axiosConfig = {
            header: { "Content-Type": "application/x-www-form-urlencoded" }
         };

         axios.post("/contact", encodedData, axiosConfig)
         .then((resp) => {
            console.log(resp);
            console.log('success');
            self.formSuccess = true;

            form.innerHTML = `<p>Thanks, we received your message!</p>`
         })
         .catch((err) => {
            console.log(err);
            console.log('fail');
            alert('Sorry, but an error occurred.');
         });
       },
      }
   }
</script>

<style lang="scss">
   form[name=contact] {
      border: 1px solid hex-to-rgba($white-smoke, 0.4);
      padding: 30px 30px 15px;

      textarea {
         min-height: 300px;
      }
   }
</style>
