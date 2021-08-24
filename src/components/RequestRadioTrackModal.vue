<template>
   <div class="request-track-modal">
      <Title tag="h3">Track Request</Title>

      <p>
         Artist: {{ track.author }}<br />
         Song: “{{ track.title }}”<br />
         <!--
            <small><em>* Requests are limited to one track per hour based on IP address.</em></small>
         -->
      </p>

      <div v-if="errorMsg" class="request-track-modal__error">
         Error:<br />
         {{ errorMsg }}
      </div>

      <div v-if="!submitted">
         <label for="request-track-name">
            Your Name:
         </label>

         <input type="text" id="request-track-name" name="name" maxlength="50" value="" v-model="username" />

         <label for="request-track-message">
            Shoutout: <small><em>(optional message)</em></small>
         </label>

         <textarea id="request-track-message" name="message" maxlength="300" v-model="message"></textarea>

         <Center>
            <Btn @click.native="submitRequest">
               Submit
            </Btn>

            <Btn @click.native="$emit('close')">
               Cancel
            </Btn>
         </Center>
      </div>
      <div v-else>
         <hr />

         <Center>
            <p>
               We have received your request!
            </p>

            <Btn @click.native="$emit('close')">
               Close
            </Btn>
         </Center>
      </div>
   </div>
</template>

<script>
   import Btn from './Btn.vue';
   import Center from './Center.vue';
   import Title from './Title.vue';

   export default {
      name: 'RequestRadioTrackModal',
      components: {
         Btn,
         Center,
         Title,
      },
      props: {
         track: {
            type: Object,
         },
      },
      data () {
         return {
            loading: false,
            submitted: false,
            ipBanMins: 15,
            username: '',
            message: '',
            errorMsg: '',
         };
      },
      methods: {
         submitRequest() {
            const self = this;

            if (self.loading) {
               return false;
            }

            self.loading = true;

            const xhr = new XMLHttpRequest();

            xhr.open('POST', "https://quincy.torontocast.com:1090/api/v2/track_requests/");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            const userName = this.username.toString().replace(/ +(?= )/g,'').trim().slice(0, 80);
            const message = this.message.toString().replace(/ +(?= )/g,'').trim().slice(0, 300);

            /* mins */
            const ipTimeout = self.ipBanMins * 60 * 1000;

            let requestData = {
               server_id: "1",
               person: userName ? userName : 'Anonymous',
               message: message,
               music_id: self.track.id,
               //ip_timeout: "0",
               ip_timeout: ipTimeout,
               track_timeout: "720000"
               //track_timeout: "0"
            };

            if (userName.toString().toLowerCase() === 'vip') {
                requestData.person = 'Radio:Arcane';
                requestData.ip_timeout = "0";
            }

            xhr.onload = () => {
              let response = {};

              self.loading = false;

              if (xhr.status >= 200 && xhr.status < 300) {
                  response = JSON.parse(xhr.responseText);
                  self.submitted = true;
                  return;
              }

              try {
                 response = JSON.parse(xhr.responseText);
              }
              catch(e) {
                 response = {};
              }

              if (response.hasOwnProperty('all_music')) {
                 self.errorMsg = response.all_music[0];
              }

              if (response.ip_blocked) {
                 self.errorMsg = `Please wait ${ self.ipBanMins } minutes to request again.`;
              }

              if (!self.errorMsg) {
                 self.errorMsg = 'Sorry, an error occurred.';
              }

              self.submitted = false;
            };

            xhr.onerror = (err) => {
                self.errorMsg = 'Sorry, an error occurred.';
                self.loading = false;
                self.submitted = false;
            };

            xhr.send(JSON.stringify(requestData));
         }
      }
   }
</script>

<style lang="scss">
   .request-track-modal {
      background: hex-to-rgba($black, 0.95);
      padding: $padding-vertical $gutter-width;
      @include fluid-type($screen-s-min, $screen-xxl-min, $font-base-size, 20px);
      border: 2px solid hex-to-rgba($white-smoke, 0.5);
      max-width: 90vw;

      &__error {
         border: 1px solid $white;
         padding: 1em;
         margin: 0 0 1.5em;
         color: red;
      }

      .btn {
         margin-left: 1em;
         margin-right: 1em;
         z-index: 5000;
      }
   }
</style>
