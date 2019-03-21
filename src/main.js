// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

//import 'intersection-observer';

import DefaultLayout from '~/layouts/Default.vue';
import vueMoment from 'vue-moment';
//import VueLazyload from 'vue-lazyload';
import VModal from 'vue-js-modal/dist/ssr.index';

import '~/assets/styles/main.scss';

export default function (Vue, { router, head, isClient }) {
   // Set default layout as a global component

   //if (isClient) {
      //require('intersection-observer');
   //}

   head.htmlAttrs = {
      lang: 'en',
   };

   Vue.use(vueMoment);

   Vue.use(VModal, {
      dynamic: true,
      injectModalsContainer: true
   });

   /*
   Vue.use(VueLazyload, {
      lazyComponent: true,
      observer: true,
      observerOptions: {
         rootMargin: '0px',
         threshold: 0.1,
      },
   });
   */

   Vue.component('Layout', DefaultLayout);
}
