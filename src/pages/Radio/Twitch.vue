<template>
   <RadioTwitchLayout>
      <Container>
         <GridContainer center>
            <GridItem>
               <Center>
                  <Heading tag="h4">
                     {{ currentTrack.author }} – “{{ getCurrentTrackInfo(currentTrack, false) }}”

                     <small v-if="currentTrackRequestName">
                        <br />
                        <span class="faint">Requested by: </span> {{ currentTrackRequestName }}
                     </small>
                  </Heading>

                  <div class="cover-wrapper">
                     <img :src="getCurrentTrackImg(currentTrack)" v-bind:alt="currentTrack.metadata" />
                  </div>

                  <Heading tag="h5">
                     <span class="faint">Now Playing:</span>
                     <span style="display: block; margin-top: 8px;">{{ currentTrack.author }} – “{{ getCurrentTrackInfo(currentTrack) }}”</span>
                  </Heading>

                  <p v-if="currentTrackRequestName">
                     <span>
                        <span class="faint">Requested by: </span> {{ currentTrackRequestName }}
                     </span>

                     <div v-if="currentTrackRequestMsg">
                        <small><em>“{{ currentTrackRequestMsg }}”</em></small>
                     </div>
                  </p>
               </Center>
            </GridItem>
         </GridContainer>
      </Container>
   </RadioTwitchLayout>
</template>


<script>
   import meta from '~/util/meta.js';

   import ArtistLinksModal from '~/components/ArtistLinksModal.vue';
   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Container from '~/components/Container.vue';
   import Title from '~/components/Title.vue';
   import Center from '~/components/Center.vue';
   import Radio from '~/layouts/Radio.vue';
   import Heading from '~/components/Heading.vue';

   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';

   import { setup as setupCache } from 'axios-cache-adapter';

   export default {
      components: {
         ArtistLinksModal,
         Breadcrumb,
         Container,
         Center,
         Radio,
         Title,
         GridContainer,
         GridItem,
         Heading
      },
      data () {
         return {
            currentTrack: '',
            pastTracks: [],
         };
      },
      methods: {
         getCurrentTrackImg(trk) {
            return trk.img_medium_url || 'https://quincy.torontocast.com:1090/media/tracks/default_track_img.png';
         },
         getCurrentTrackInfo(trk, includeRequest = false) {
            if (!trk) {
               return '';
            }

            let allTitle = trk.title.toString().replace(/ +(?= )/g,'').trim();
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
                  return includeRequest ? allTitle : title;
               }

               const requestPts = requestStr.split(': ');

               try {
                  requestName = requestPts[0];
               }
               catch(e) {
                  this.currentTrackRequestName = null;
                  this.currentTrackRequestMsg = null;
                  return includeRequest ? allTitle : title;
               }

               try {
                  requestMsg = requestPts[1].slice(0, -1);
               }
               catch(e) {
                  this.currentTrackRequestName = null;
                  this.currentTrackRequestMsg = null;
                  return includeRequest ? allTitle : title;
               }
            }

            this.currentTrackRequestName = includeRequest && requestName ? requestName : null;
            this.currentTrackRequestMsg = includeRequest && requestMsg ? requestMsg : null;

            if (requestName === 'Radio:Arcane') {
               this.currentTrackRequestName = null;
               this.currentTrackRequestMsg = null;
            }

            return includeRequest ? allTitle : title;
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
         let timer = 20000;

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
             maxAge: 5000
           }
         })
      }
   }
</script>

<style lang="scss">
   .faint {
      opacity: 0.6;
   }

   .cover-wrapper {
      width: 300px;
      height: 300px;
      margin: 0 auto 30px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
   }
</style>
