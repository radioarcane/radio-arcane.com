<template>
   <Layout>
      <Container>
         <Breadcrumb :crumbs="getCrumbs()" />

         <article>
            <Title>{{ $page.podcast.title }}</Title>

            <div v-if="$page.podcast.date" class="published-date">
               <p>
                  Published: <time :datetime="$page.podcast.date">
                     {{ $page.podcast.date | moment("MMM. D, YYYY") }}
                  </time>
               </p>
            </div>

            <GridContainer collapse>
               <GridItem
                  v-if="$page.podcast.image"
                  :sizes="{
                     xs: 12,
                     md: 4,
                     lg: 3
                  }"
                >
                  <Center>
                     <figure>
                        <picture v-if="$page.podcast.webp">
                           <source :srcset="$page.podcast.webp" type="image/webp">
                           <source :srcset="$page.podcast.image" type="image/jpeg">
                           <img :src="$page.podcast.image" :alt="$page.podcast.displayName">
                        </picture>

                        <img v-if="!$page.podcast.webp"
                             :src="$page.podcast.image"
                             :alt="$page.podcast.displayName"
                        />
                     </figure>
                  </Center>
               </GridItem>
               <GridItem :sizes="{
                  xs: 12,
                  md: $page.podcast.image ? 8 : 12,
                  lg: $page.podcast.image ? 9 : 12
               }">
                  <div v-html="$page.podcast.description" />

                  <div class="podcast-formats">
                     <h4>Listen on:</h4>

                     <a v-if="$page.podcast.youtubeLink"
                        :href="$page.podcast.youtubeLink"
                        target="_blank"
                        title="Watch on YouTube"
                     >
                        <SvgIcon name="youtube" use="youtube" />
                     </a>

                     <a v-if="$page.podcast.mixcloudLink"
                        :href="$page.podcast.mixcloudLink"
                        target="_blank"
                        title="Listen on Mixcloud"
                     >
                        <SvgIcon name="mixcloud" use="mixcloud" />
                     </a>

                     <a v-if="$page.podcast.spotifyLink"
                        :href="$page.podcast.spotifyLink"
                        target="_blank"
                        title="Listen on Spotify"
                     >
                        <SvgIcon name="spotify" use="spotify" />
                     </a>

                     <a v-if="$page.podcast.soundcloudLink"
                        :href="$page.podcast.soundcloudLink"
                        target="_blank"
                        title="Listen on SoundCloud"
                     >
                        <SvgIcon name="soundcloud" use="soundcloud" />
                     </a>

                     <a v-if="$page.podcast.podbeanLink"
                        :href="$page.podcast.podbeanLink"
                        target="_blank"
                        title="Listen on Podbean"
                     >
                        <img src="/img/logos/podbean.png"
                             alt="Available on Podbean"
                             class="podbean-img"
                        />
                     </a>
                  </div>
               </GridItem>
               <GridItem padTop :sizes="{
                  xs: 12
               }">
                  <MixcloudPlayer :url="$page.podcast.mixcloudLink" />
               </GridItem>
            </GridContainer>
         </article>

         <hr />

         <Section v-if="$page.podcast.playlist" :padTop="true">
            <h2>Podcast Playlist</h2>

            <Playlist
               :playlist="$page.podcast.playlist"
               :showHeader="false"
            />
         </Section>
      </Container>
   </Layout>
</template>

<page-query>
   query Podcast ($path: String!) {
     podcast (path: $path) {
        id,
        path,
        slug,
        title,
        date,
        description,
        shortDescription,
        image,
        webp,
        mixcloudLink,
        soundcloudLink,
        podbeanLink,
        spotifyLink,
        youtubeLink,
        playlist {
           sets {
              tracks {
                 artist,
                 song,
                 artistLinks {
                    appleMusic,
                    bandcamp,
                    discogs,
                    facebook,
                    instagram,
                    soundcloud,
                    spotify,
                    twitter,
                    website,
                    youtube
                 }
              }
           }
        }
     }
   }
</page-query>

<script>
   import meta from '~/util/meta.js';
   import { breadcrumb, musicPlaylist, podcastEpisode } from '~/util/jsonLd';

   import Breadcrumb from '~/components/Breadcrumb.vue';
   import Btn from '~/components/Btn.vue';
   import Center from '~/components/Center.vue';
   import Container from '~/components/Container.vue';
   import GridContainer from '~/components/GridContainer.vue';
   import GridItem from '~/components/GridItem.vue';
   import MixcloudPlayer from '~/components/MixcloudPlayer.vue';
   import Playlist from '~/components/Playlist.vue';
   import Section from '~/components/Section.vue';
   import SvgIcon from '~/components/SvgIcon.vue';
   import Title from '~/components/Title.vue';

   export default {
      components: {
         Breadcrumb,
         Btn,
         Center,
         Container,
         GridContainer,
         GridItem,
         MixcloudPlayer,
         Playlist,
         Section,
         SvgIcon,
         Title,
      },
      metaInfo() {
         const breadcrumbSchema = breadcrumb([{
            path: '/podcasts',
            name: 'Podcasts'
         }, {
            path: this.$page.podcast.path,
            name:  this.$page.podcast.title
         }]);

         const podcastSchema = podcastEpisode(this.$page.podcast);

         const playlistSchema = this.$page.podcast.playlist ? musicPlaylist(this.$page.podcast.playlist) : null;

         const metaDescription = (() => {
            let desc = '';

            if (this.$page.podcast.shortDescription) {
               desc = this.$page.podcast.shortDescription;
            }
            else if (this.$page.podcast.description) {
               desc = this.$page.podcast.description
                  .replace(/<[^>]+>/g, ' ')
                  .replace(/\s{2,}/g, ' ')
                  .trim();

               if (desc.length > 255) {
                  desc = desc.substr(0, 252) + '...';
               }
            }

            return desc;
         })();

         return meta({
            title: this.$page.podcast.title,
            description: metaDescription,
            image: this.$page.podcast.image,
            path: this.$page.podcast.path,
            jsonLdSchema: [
               breadcrumbSchema,
               podcastSchema,
               playlistSchema ? playlistSchema : null
            ].filter(item => item !== null)
         });
      },
      methods: {
         getCrumbs() {
            return [{
               to: '/podcasts',
               name: "Podcasts"
            }, {
               name: this.$page.podcast.title,
               to: this.$page.podcast.path,
            }];
         }
      }
   }
</script>

<style lang="scss">
   .published-date {
      text-align: right;
      font-size: 80%;
      opacity: 0.8;
   }

   .podcast-formats {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      padding-bottom: 1.5rem;
      @include fluid-type($screen-s-min, $screen-xxl-min, 30px, 50px);

      h4 {
         opacity: 0.8;
         margin-bottom: 0;
      }

      a {
         margin-left: 0.25em;
         @include fluid-type($screen-s-min, $screen-xxl-min, 30px, 50px);
         color: $white;
         transition: all 200ms ease-in-out;

         &:hover,
         &:focus,
         &:active {
            color: darken($white, 40%);
         }
      }
   }

   .podbean-img {
      width: 150px;
   }
</style>
