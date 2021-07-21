// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from './layouts/Default.vue';
import RadioTwitchLayout from './layouts/RadioTwitch.vue';
import vueMoment from 'vue-moment';
import VModal from 'vue-js-modal/dist/ssr.index';
import elementClosest from 'element-closest';
import svg4everybody from 'svg4everybody';
import VueAnalytics from 'vue-analytics';
import Paginate from 'vuejs-paginate/src/components/Paginate';
import VueLazyload from 'vue-lazyload';

import './assets/styles/main.scss';

export default function (Vue, { router, head, isClient, isServer }) {
   if (isClient) {
      require('intersection-observer');
      elementClosest(window);
      svg4everybody();
   }

   head.htmlAttrs = {
      lang: 'en',
   };

   Vue.use(vueMoment);

   Vue.use(VModal, {
      dynamic: true,
      injectModalsContainer: true
   });

   Vue.component('Layout', DefaultLayout);
   Vue.component('RadioTwitchLayout', RadioTwitchLayout);

   Vue.component('paginate', Paginate);

   Vue.use(VueAnalytics, {
      id: 'UA-138534141-1',
      disabled: isServer,
      debug: {
         sendHitTask: process.env.NODE_ENV === 'production'
      },
      router
   });

   Vue.use(VueLazyload);
}
