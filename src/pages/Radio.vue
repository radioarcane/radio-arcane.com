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
                     id="search-track"
                  />
               </GridItem>
            </GridContainer>

            <div class="radio-search-results">
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
               perPage: 12,
               currentPage: 1,
            }
         };
      },
      methods: {
       pageChange (pageNum)  {
         this.pagination.currentPage = pageNum;
         this.searchTracks();
       },
       showRadioRequestModal (track) {
          this.$modal.show(RequestRadioTrackModal, {
            track
          }, {
            draggable: true,
            classes: 'request-radio-track-modal-box',
            height: 'auto',
            scrollable: true,
         });
       },
        getCurrentTrackImg(trk) {
           return trk.image_medium || 'https://quincy.torontocast.com:1140/media/tracks/default_track_img.png';
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
            const input = document.getElementById('search-track');

            if (input) {
                this.searchTerm = input.value.toString().replace(/ +(?= )/g,'').trim();
                this.searchTracks();
            }
         },
        searchHandler(ev) {
          const term = ev.target.value.toString().replace(/ +(?= )/g,'').trim();
          this.searchTerm = term;
          this.searchTracks();
        },
        searchTracks () {
           const self = this;
           const url = "https://quincy.torontocast.com:1140/api/v2/music/?";

           const params = [{
             prop: 'limit',
             value: self.pagination.perPage
          }, {
             prop: 'offset',
             value: (self.pagination.currentPage-1) * self.pagination.perPage
          }, {
             prop: 'order',
             value: 1
          }, {
             prop: 'requestable',
             value: 'true'
          }, {
             prop: 'search_q',
             value: self.searchTerm
          }, {
             prop: 'server',
             value: 1
          }, {
             prop: 'with_tags_only',
             value: 'true'
          }]
          .map(o => {
             return `${ o.prop }=${ o.value }`;
          })
          .join('&');

          /*
             load up search results
             https://hazel.torontocast.com:1415/api/v2/music/?limit=12&offset=12&order=3&requestable=true&search_q=&server=1&with_tags_only=true
          */

          const xhr = new XMLHttpRequest();

           xhr.open('GET', `${ url }${ params }`);

           xhr.onload = () => {
             if (xhr.status >= 200 && xhr.status < 300) {
                 const response = JSON.parse(xhr.responseText);
                 let results = [];
                 const total = response.hasOwnProperty('count') ? parseInt(response.count) : 0;
                 self.pagination.total = total;

                 if (response && response.hasOwnProperty('results')) {
                    self.results = response.results;
                    self.pagination.pageCount = Math.round(total / self.pagination.perPage);

                    if (self.pagination.currentPage > self.pagination.pageCount) {
                       self.pagination.currentPage = 1;
                    }
                 }
                 else {
                    self.results = [];
                    self.pagination.total = 0;
                    self.pagination.currentPage = 1;
                    self.pagination.pageCount = 0;
                 }
             }

             self.pagination.isLoading = false;
             self.pagination.init = true;
           };

           xhr.onerror = () => {
             self.pagination.isLoading = false;
           };

           xhr.send();
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
