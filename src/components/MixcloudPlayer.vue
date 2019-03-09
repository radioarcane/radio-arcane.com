<template>
   <iframe class="mixcloud-player" width="100%" height="120" v-bind:src="getSrc()"  frameborder="0" />
</template>

<script>
   export default {
      name: 'MixcloudPlayer',
      props: {
         name: {
            default: '',
            type: String,
         },
      },
      methods: {
         getSrc() {
            const src = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2FRadio-Arcane%2F${ this.$props.name }%2F`;

            return src;
         },
      }
   }
</script>

<style lang="scss">
   .mixcloud-player {
   }
</style>
