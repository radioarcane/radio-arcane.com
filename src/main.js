// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';
import '~/assets/styles/main.scss';
import vueMoment from 'vue-moment';

import VModal from 'vue-js-modal/dist/ssr.index';

export default function (Vue, { router, head, isClient }) {
   // Set default layout as a global component

   head.htmlAttrs = {
      lang: 'en',
      class: 'no-js no-webp'
   };

   Vue.use(vueMoment);


   Vue.use(VModal, {
      dynamic: true,
      injectModalsContainer: true
   });


   Vue.component('Layout', DefaultLayout);
}
