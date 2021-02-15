<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="crumbs" />

         <Section :padBottom="true">
            <Title>Streaming Radio</Title>

            <Radio :showTitle="false" />
         </Section>

         <Section :padBottom="true">
            <Heading tag="h3" strike uppercase animate>
               Request A Track
            </Heading>

            <center>
               <p>
                  <small><em>* Requests are limited to one track per hour based on IP address.</em></small>
               </p>
            </Center>

            <GridContainer :center="true">
               <GridItem
                  :sizes="{
                     xs: 12,
                     md: 6
                  }"
               >
                  <input
                     type="text"
                     maxlength="80"
                     placeholder="Search Artists or Songs..."
                     @keydown="handleKeydown"
                     v-model="searchTerm"
                     id="search-track"
                  />
               </GridItem>
            </GridContainer>

            <div class="radio-search-results" id="radio-search-results">
               <GridContainer>
                  <GridItem
                     v-for="trk in results"
                     :key="trk.id"
                     :sizes="{
                        xs: 6, sm: 4, md: 3, lg: 3, xl: 2
                     }"
                  >
                     <div class="request-track">
                        <img :src="getCurrentTrackImg(trk)"
                             :alt="trk.meta"
                             :title="trk.meta"
                        />

                         <span class="request-track__artist">{{ trk.author }}</span>
                         <span class="request-track__title">{{ trk.title }}</span>

                        <Btn
                            :title="`Request song “${ trk.meta}”`"
                             @click.native="showRadioRequestModal(trk)"
                        >
                           <span>Request</span>
                        </Btn>
                     </div>
                  </GridItem>
                  <GridItem
                     v-if="searchTerm && pagination.init && pagination.total < 1"
                     :sizes="{
                        xs: 12
                     }"
                  >
                     <p>
                        Sorry, No Matching Results Found for: <u>{{ searchTerm }}</u>.
                     </p>

                     <Btn @click.native="resetSearch" variant="hollow">
                        <span>Reset</span>
                     </Btn>
                  </GridItem>
               </GridContainer>
            </div>

            <div v-if="pagination.pageCount > 1">
               <paginate
                  :page-count="pagination.pageCount"
                  :page-range="5"
                  :margin-pages="2"
                  :click-handler="pageChange"
                  :prev-text="'Prev'"
                  :next-text="'Next'"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
               >
               </paginate>
            </div>
         </Section>
      </Container>
   </Layout>
</template>

<script>
   import { breadcrumb } from '~/util/jsonLd';
   import meta from '~/util/meta.js';

   import { debounce } from 'lodash';
   import scrollToElement from 'scroll-to-element';
   import { setup as setupCache } from 'axios-cache-adapter';

   import Radio from '~/layouts/Radio.vue';

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Btn from '~/components/Btn.vue';
   import Center from '~/components/Center.vue';
   import Container from '~/components/Container.vue';
   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';
   import Heading from '~/components/Heading.vue';
   import RequestRadioTrackModal from '~/components/RequestRadioTrackModal.vue';
   import Section from '~/components/Section.vue';
   import Title from '~/components/Title.vue';

   const metaInfo = Object.assign({}, meta({
      title: 'Streaming Radio',
      description: '',
      path: '/radio'
   }), {
      script: [
         {
            type: 'application/ld+json',
            vmid: 'ldjson-schema',
            body: true,
            innerHTML: JSON.stringify(breadcrumb([{
               path: '/radio',
               name: 'Streaming Radio'
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
         Btn,
         Center,
         Container,
         GridContainer,
         GridItem,
         Heading,
         Section,
         RequestRadioTrackModal,
         Title,
         Radio,
      },
      data () {
         return {
            crumbs: [{
               name: 'Streaming Radio',
               to: '/radio'
            }],
            results: [],
            searchTerm: '',
            pagination: {
               init: false,
               isLoading: true,
               pageCount: 0,
               total: 0,
               perPage: 24,
               currentPage: 1,
            }
         };
      },
      methods: {
       pageChange (pageNum)  {
         this.pagination.currentPage = pageNum;
         this.searchTracks();
         scrollToElement('#radio-search-results');
       },
       resetSearch ()  {
         this.searchTerm = '';
         this.searchTracks();
       },
       showRadioRequestModal (track) {
          this.$modal.show(RequestRadioTrackModal, {
            track
          }, {
            name: 'request-track-modal',
            draggable: false,
            classes: 'request-radio-track-modal-box',
            height: 'auto',
            scrollable: true,
            adaptive: true,
         });
       },
        getCurrentTrackImg(trk) {
           return trk.image_medium || 'https://quincy.torontocast.com:1090/media/tracks/default_track_img.png';
        },
        getTrack(trk) {
          return trk;
        },
         handleKeydown() {
            this.startedTyping()
            this.stoppedTyping()
         },
         startedTyping() {
         },
         stoppedTyping() {
           this.searchTracks();
         },
        searchTracks () {
           const self = this;

            const params= {
               limit: self.pagination.perPage,
               offset: (self.pagination.currentPage-1) * self.pagination.perPage,
               order: 1,
               requestable: true,
               search_q: self.searchTerm.toString().replace(/ +(?= )/g,'').trim(),
               server: 1,
               with_tags_only: true
            };

            self.api.get('/music', {
               params: params
            })
            .then((resp) => {
               const data = resp.data;
               const total =parseInt(data.count);
               self.pagination.total = total;

               self.results = data.results;
               self.pagination.pageCount = Math.round(total / self.pagination.perPage);

               if (self.pagination.currentPage > self.pagination.pageCount) {
                  self.pagination.currentPage = 1;
               }
            })
            .catch((err) => {
               self.results = [];
               self.pagination.total = 0;
               self.pagination.currentPage = 1;
               self.pagination.pageCount = 0;
            })
            .then(() => {
               self.pagination.isLoading = false;
               self.pagination.init = true;
            });
        }
     },
      mounted() {
         this.searchTracks();
      },
      created() {
         this.startedTyping = debounce(this.startedTyping, 300, {
            leading: true,
            trailing: false,
         });

         this.stoppedTyping = debounce(this.stoppedTyping, 300, {
            leading: false,
            trailing: true,
         });

         this.api = setupCache({
           // `axios` options
          baseURL: 'https://quincy.torontocast.com:1090/api/v2',

           // `axios-cache-adapter` options
           cache: {
             maxAge: 5 * 60 * 1000
            // maxAge: 2000
           }
         })
      }
   }
</script>

<style lang="scss">

   .pagination {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: stretch;
      align-content: flex-start;
      font-size: 16px;
      margin: 2em 0 0;
      padding: 0;
      color: $white;

      a {
         color: $white;
         transition: all .15s ease-in-out;
         padding: 0.35em 1em 0.35em;
      }

      li {
         white-space: nowrap;
         vertical-align: middle;
         border: 1px solid $white;
         color: $white;
         background: transparent;
         margin: 0;
         opacity: 1;
         transition: all .15s ease-in-out;
         line-height: 1.5;

         &.active {
            background: $gray;

            a {
               cursor: none;
               pointer-events: none;
            }
         }

         &.disabled {
            a {
               opacity: 0.6;
               cursor: not-allowed;
               pointer-events: none;
            }
         }
      }

      .page-item {
      }
   }

   .radio-search-results {
      .grid__item {
         padding-left: 15px;
         padding-right: 15px;
      }
   }

   .request-track {
      img {
         margin: 0 auto 0.5em;
      }

      font-size: 14px;
      text-align: center;
      padding-bottom: 0.5em;

      &__artist,
      &__title {
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         display: block;
      }

      &__artist {

      }

      &__title {
         &:before {
            content: "“";
            display: inline-block;
         }

         &:after {
            content: "”";
            display: inline-block;
         }
      }

      .btn {
         font-size: 12px;
         margin-top: 0.5em;
      }
   }
</style>
