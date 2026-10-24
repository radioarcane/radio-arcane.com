import postcssGlobalData from '@csstools/postcss-global-data';
import postCssCustomMedia from 'postcss-custom-media';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
   plugins: [
      postcssGlobalData({
         files: ['./src/css/variables.css'],
      }),
      postCssCustomMedia,
      autoprefixer,
      cssnano,
   ],
};
