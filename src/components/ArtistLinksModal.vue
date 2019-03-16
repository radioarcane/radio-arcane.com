<template>
   <div class="artist-links-modal">
      <h4>{{ artist }}</h4>

      <div v-if="hasMusicLinks()">
         <p>Purchase or Stream:</p>

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
            <GoogleIcon class="icon icon-google" />
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

         <p v-if="links.bandcamp">
            <em>If you wish to purchase a song or album, we would recommend Bandcamp!</em>
         </p>
      </div>

      <div v-if="hasSocialLinks()">
         <p>Follow:</p>

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
      </div>

      <div v-if="links.website">
         <a v-if="links.website"
            :href="links.website"
            target="_blank"
            :title="`Visit ${ artist }'s Website`"
         >
            <SvgIcon name="home" use="home" />
         </a>
      </div>

      <Center>
         <Btn @click.native="$emit('close')" variant="hollow">
            Close
         </Btn>
      </Center>
   </div>
</template>


<script>
   import GoogleIcon from '~/assets/svg/google.svg';

   import Btn from '~/components/Btn';
   import Center from '~/components/Center';
   import SvgIcon from '~/components/SvgIcon';

   export default {
      name: 'ArtistLinksModal',
      components: {
         Btn,
         Center,
         GoogleIcon,
         SvgIcon
      },
      mounted() {
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

            ['facebook', 'instagram', 'twitter'].forEach(key => {
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
      background: $black;
   }
</style>
