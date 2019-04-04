<template>
   <div class="artist-links-modal">
      <Title tag="h3">{{ artist }}</Title>

      <div v-if="hasMusicLinks()">
         <span>Purchase or Stream:</span>

         <div class="artist-links-modal__icons">
            <a v-if="links.bandcamp"
               :href="links.bandcamp"
               target="_blank"
               :title="`Purchase or Stream ${ artist } @ Bandcamp`"
            >
               <SvgIcon name="bandcamp" use="bandcamp" />
            </a>

            <a v-if="links.appleMusic"
               :href="links.appleMusic"
               target="_blank"
               :title="`Purchase or Stream ${ artist } @ Apple Music`"
            >
               <SvgIcon name="apple" use="apple" />
            </a>

            <a v-if="links.googleMusic"
               :href="links.googleMusic"
               target="_blank"
               :title="`Purchase or Stream ${ artist } @ Google Music`"
            >
               <SvgIcon name="google" use="google" />
            </a>

            <a v-if="links.soundcloud"
               :href="links.soundcloud"
               target="_blank"
               :title="`Stream ${ artist } @ Soundcloud`"
            >
               <SvgIcon name="soundcloud" use="soundcloud" />
            </a>

            <a v-if="links.spotify"
               :href="links.spotify"
               target="_blank"
               :title="`Stream ${ artist } @ Spotify`"
            >
               <SvgIcon name="spotify" use="spotify" />
            </a>

            <a v-if="links.youtube"
               :href="links.youtube"
               target="_blank"
               :title="`Stream ${ artist } @ YouTube`"
            >
               <SvgIcon name="youtube" use="youtube" />
            </a>
         </div>

         <p v-if="links.bandcamp" class="artist-links-modal__note">
            <em><small>
               If you wish to purchase a song or album, we would recommend <a :href="links.bandcamp" target="_blank">Bandcamp!</a>
            </small></em>
         </p>
      </div>

      <div v-if="hasSocialLinks()">
         <span>Follow:</span>

         <div class="artist-links-modal__icons">
            <a v-if="links.facebook"
               :href="links.facebook"
               target="_blank"
               :title="`Follow ${ artist } @ Facebook`"
            >
               <SvgIcon name="facebook" use="facebook" />
            </a>

            <a v-if="links.instagram"
               :href="links.instagram"
               target="_blank"
               :title="`Follow ${ artist } @ Instagram`"
            >
               <SvgIcon name="instagram" use="instagram" />
            </a>

            <a v-if="links.twitter"
               :href="links.twitter"
               target="_blank"
               :title="`Follow ${ artist } @ Twitter`"
            >
               <SvgIcon name="twitter" use="twitter" />
            </a>

            <a v-if="links.website"
               :href="links.website"
               target="_blank"
               :title="`Visit ${ artist }'s Website`"
            >
               <SvgIcon name="home" use="home" />
            </a>
         </div>
      </div>

      <Center>
         <Btn @click.native="$emit('close')">
            Close
         </Btn>
      </Center>
   </div>
</template>

<script>
   import Btn from '~/components/Btn';
   import Center from '~/components/Center';
   import SvgIcon from '~/components/SvgIcon';
   import Title from '~/components/Title';

   export default {
      name: 'ArtistLinksModal',
      components: {
         Btn,
         Center,
         SvgIcon,
         Title,
      },
      props: {
         artist: {
            type: String,
         },
         links: {
            type: Object,
         },
      },
      methods: {
         hasMusicLinks () {
            const links = this.links;
            let musicLinks = [];

            [
               'appleMusic', 'bandcamp', 'googleMusic',
               'soundcloud', 'spotify', 'youtube'
            ].forEach(key => {
               if (links.hasOwnProperty(key) && links[key]) {
                  musicLinks.push(key);
               }
            });

            return musicLinks.length > 0;
         },
         hasSocialLinks () {
            const links = this.links;
            let socialLinks = [];

            ['facebook', 'instagram', 'twitter', 'website'].forEach(key => {
               if (links.hasOwnProperty(key) && links[key]) {
                  socialLinks.push(key);
               }
            });

            return socialLinks.length > 0;
         },
      }
   }
</script>

<style lang="scss">
   .artist-links-modal {
      background: hex-to-rgba($black, 0.95);
      padding: $padding-vertical $gutter-width;
      @include fluid-type($screen-s-min, $screen-xxl-min, $font-base-size, 20px);
      border: 2px solid hex-to-rgba($white-smoke, 0.5);
      max-width: 90vw;

      &__icons {
         display: flex;
         flex-wrap: wrap;
         font-size: 45px;

         a {
            margin: 0 0.75rem 0.75rem 0;
            color: $white-smoke;
            transition: all 150ms ease-in-out;

            &:hover,
            &:focus,
            &:active {
               color: darken($white, 30%);
            }

            &:hover,
            &:focus {
               transform: scale(1.1);
            }
         }
      }

      &__note {
         line-height: 1;
      }

      .btn {
         margin: 0.5rem 0 0;
      }
   }
</style>
