<template>
   <div class="radio-info">
      <Center v-if="showTitle">
         <Title>Radio Arcane Streaming Radio</Title>
      </Center>

      <div v-if="currentTrack" class="radio-info__content">
         <div class="radio-info__now-playing-container">
            <span class="radio-info__playing-label">Now Playing:</span>
            <span class="radio-info__playing-track">
               <span class="radio-info__playing-track__artist">{{ currentTrack.author }}</span>
               <span class="radio-info__playing-track__song">{{ getCurrentTrackInfo(currentTrack) }}</span>
            </span>

            <div v-if="currentTrackRequestName">
               <span>
                  <span class="radio-info__request-label">Requested by: </span> <u>{{ currentTrackRequestName }}</u>
               </span>

               <div v-if="currentTrackRequestMsg">
                  <small><em>“{{ currentTrackRequestMsg }}”</em></small>
               </div>
            </div>
         </div>

         <div class="radio-info__cover-container">
            <a href="https://radioarcane.torontocast.stream" target="_blank">
               <img :src="getCurrentTrackImg(currentTrack)" v-bind:alt="currentTrack.metadata" class="radio-info__cover" />
            </a>

            <br /><br />

            <Btn href="https://radioarcane.torontocast.stream" target="_blank">
               <span>Listen Now</span>
               <SvgIcon name="right-open" use="right-open" />
            </Btn>
         </div>

         <div class="radio-info__history-container" :class="showMobileHistory ? '' : 'hide-on-mobile'">
            <div class="radio-info__history">
               <p>Recently Played:</p>

               <ul class="radio-info__tracks">
                  <li v-for="trk in pastTracks"
                       class="radio-info__tracks__track"
                  >
                     {{ getHistoryTrackInfo(trk) }}
                  </li>
               </ul>
            </div>
         </div>
      </div>
      <div v-else>
         <Center>
            <Btn href="https://radioarcane.torontocast.stream" target="_blank">
               <span>Listen Now</span>
               <SvgIcon name="right-open" use="right-open" />
            </Btn>
         </Center>
      </div>

      <br />

      <GridContainer center>
         <GridItem>
            <Btn id="ko-fi-btn" href="https://ko-fi.com/radioarcane" target="_blank">
               <span>Help Support Us on Ko-fi</span>
            </Btn>
         </GridItem>
         <GridItem>
            <form action="https://www.paypal.com/donate" method="post" target="_blank">
               <input type="hidden" name="hosted_button_id" value="DYUY5ZPR4EKHG">
               <input type="hidden" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" name="submit">
               <!--
               <img loading="lazy" alt="" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" border="0">\
               -->

               <Btn id="paypal-btn" type="submit">
                  <span>Donate with PayPal</span>
               </Btn>
            </form>
         </GridItem>
      </GridContainer>

      <!--
      <Center>
         <Btn id="ko-fi-btn" href="https://ko-fi.com/radioarcane" target="_blank">
            <span>Help Support Us on Ko-fi</span>
         </Btn>
      </Center>
   -->
   </div>
</template>


<script>
   import { setup as setupCache } from 'axios-cache-adapter';

   import Btn from '~/components/Btn.vue';
   import Container from '~/components/Container.vue';
   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';
   import SvgIcon from '~/components/SvgIcon.vue';
   import Title from '~/components/Title.vue';

   export default {
      name: 'Radio',
      props: {
         showTitle: {
            default: true,
            type: Boolean,
         },
         showMobileHistory: {
            default: true,
            type: Boolean,
         },
      },
      components: {
         Btn,
         Container,
         GridContainer,
         GridItem,
         SvgIcon,
         Title
      },
      data () {
         return {
            currentTrack: null,
            currentTrackRequestName: null,
            currentTrackRequestMsg: null,
            pastTracks: [],
         };
      },
      methods: {
         getCurrentTrackImg(trk) {
            return trk.img_medium_url || 'https://quincy.torontocast.com:1090/media/tracks/default_track_img.png';
         },
         getCurrentTrackInfo(trk) {
            let title = trk.title.toString().replace(/ +(?= )/g,'').trim();
            let requestName = '';
            let requestMsg = '';

            if (title.includes(" [Requested by ")) {
               const strParts = title.split(' [Requested by ');
               let requestStr = '';

               try {
                  requestStr = strParts[strParts.length-1];
                  title = strParts[0];
               }
               catch(e) {
                  this.currentTrackRequestName = null;
                  this.currentTrackRequestMsg = null;
                  return title;
               }

               const requestPts = requestStr.split(': ');

               try {
                  requestName = requestPts[0];
               }
               catch(e) {
                  this.currentTrackRequestName = null;
                  this.currentTrackRequestMsg = null;
                  return title;
               }

               try {
                  requestMsg = requestPts[1].slice(0, -1);
               }
               catch(e) {
                  this.currentTrackRequestName = null;
                  this.currentTrackRequestMsg = null;
                  return title;
               }
            }

            this.currentTrackRequestName = requestName ? requestName : null;
            this.currentTrackRequestMsg = requestMsg ? requestMsg : null;

            return title;
         },
         getHistoryTrackInfo(trk) {
            let artist = trk.author.toString().replace(/ +(?= )/g,'').trim();
            let title = trk.title.toString().replace(/ +(?= )/g,'').trim();
            let requestName = '';

            if (title.includes(" [Requested by ")) {
               const strParts = title.split(' [Requested by ');
               let requestStr = '';

               try {
                  requestStr = strParts[strParts.length-1];
                  title = strParts[0];
               }
               catch(e) {
               }

               const requestPts = requestStr.split(': ');

               try {
                  requestName = requestPts[0];
               }
               catch(e) {
               }
            }

            if (artist === '') {
               artist = 'N/A';
            }

            if (title === '') {
               title = 'N/A';
            }

            let fullTitle = `${ artist } – “${ title }”`;

            if (requestName) {
               fullTitle += ` ~ [Requested by ${ requestName }]`;
            }

            return fullTitle;
         }
      },
      mounted() {
         const self = this;
         let timer = 30000;

         const fetchTracks = () => {
            const params= {
               limit: 15,
               offset: 0,
               server: 1
            };

            self.api.get('/history', {
               params: params
            })
            .then((resp) => {
               const data = resp.data;

               let results = data.results.filter((trk, i) => {
                  return trk.length > 40000;
               });

               if (results.length) {
                  self.currentTrack = results[0];
                  results.shift();
                  self.pastTracks = results.slice(0, 10);
               }
            })
            .catch((err) => {
            });
         };

         fetchTracks();

         self.fetchTracks = setInterval(fetchTracks, timer);
      },
      created() {
         this.api = setupCache({
           // `axios` options
          baseURL: 'https://quincy.torontocast.com:1090/api/v2',

           // `axios-cache-adapter` options
           cache: {
             maxAge: 25000
           }
         })
      }
   }
</script>


<style lang="scss">
   .radio-info {
      &__content {
         display: flex;
         flex-wrap: wrap;
         justify-content: flex-start;
         align-content: flex-start;
         align-content: flex-start;
      }

      &__now-playing-container {
         width: 100%;
         padding-bottom: 1.25em;
      }

      &__cover-container {
         width: 100%;
         text-align: center;

         @include breakpoint($screen-m-min) {
            width: 300px;
         }
      }

      &__history-container {
         width: 100%;

         @include breakpoint($screen-m-min) {
            width: calc(100% - 300px);
            padding-left: 30px;
         }

         &.hide-on-mobile {
            display: none;

            @include breakpoint($screen-m-min) {
               display: block;
            }
         }
      }

      &__playing-label {
         opacity: 0.6;
         display: block;

         @include breakpoint($screen-m-min) {
            display: inline-block;
            vertical-align: text-top;
            margin-right: 0.5em;
         }
      }

      &__playing-track__artist {
         display: inline-block;
         vertical-align: text-top;

         &:after {
            content: "–";
            display: inline-block;
            vertical-align: text-top;
            margin: 0 0.25em;
         }
      }

      &__playing-track__song {
         display: inline-block;
         vertical-align: text-top;

         &:before {
            content: "“";
            display: inline-block;
         }

         &:after {
            content: "”";
            display: inline-block;
         }
      }

      &__request-label {
         opacity: 0.6;
      }

      &__cover {
         max-width: 300px;
      }

      &__history {
         font-size: 16px;

         > p:first-child {
            margin-bottom: 0.5em;
            opacity: 0.6;
         }
      }

      &__tracks {
         list-style: none;
         padding-left: 0;
         margin-left: 0;
         background: hex-to-rgba($white, 0.1);

         &__track {
            border: 1px solid hex-to-rgba($white, 0.5);
            margin-top: -1px;
            padding: 4px 8px;
            background: transparent;

            &:nth-of-type(even) {
               background: hex-to-rgba($black, 0.3);
            }
         }
      }
   }

   #paypal-btn {
      color: #000;
      background: #ffbd5d;
      border: 0;
      border-radius: 1em;
      opacity: 1;

      &:hover,
      &:active {
         opacity: 0.8;
      }
   }

   #ko-fi-btn {
      color: #000;
      background: #bf016a;
      border: 0;
      border-radius: 1em;
      opacity: 1;

      &:hover,
      &:active {
         opacity: 0.8;
      }
   }
</style>
