<template>
   <div class="profile-card" itemscope itemtype="http://schema.org/Person">
      <meta itemprop="jobTitle" :content="Disk Jockey" />
      <meta itemprop="name" :content="name" />

      <figure class="profile-card__img" itemscope itemtype="https://schema.org/ImageObject">
         <picture>
            <source :srcset="`/img/webp/${ webp }.webp`" type="image/webp">
            <source :srcset="`/img/uploads/${ img }.jpg`" type="image/jpeg">
            <img :src="`/img/uploads/${ img }.jpg`" :alt="dj.name" itemprop="image">
         </picture>

         <figcaption class="profile-card__caption">
            <span itemprop="caption" class="profile-card__title">
               {{ name }}
            </span>

            <span class="profile-card__credit">
               Photo by <a href="http://www.oqlus.com" target"_blank">Tarik Dozier</a>
            </span>
         </figcaption>
      </figure>
   </div>
</template>

<script>

/*

https://search.google.com/structured-data/testing-tool

<div class="profile-card" itemscope itemtype="http://schema.org/Person">
  <meta itemprop="jobTitle" content="Disk Jockey" />
  <meta itemprop="name" content="Sorrow-Vomit" />
  <meta itemprop="image" content="/img/uploads/sorrow-vmit.jpg" />

  <figure class="profile-card__img" itemscope itemtype="https://schema.org/ImageObject">
	 <picture>
		<img :src="/img/uploads/sorrow-vmit.jpg" alt="Sorrow-Vomit" itemprop="image">
	 </picture>
	 <figcaption class="profile-card__caption">
		<span itemprop="caption" class="profile-card__title">
		   Sorrow-Vomit
		</span>
		<span class="profile-card__credit" itemprop="creator">
			<span itemtype="http://schema.org/Person">Tarik Dozier</span>
		</span>
	 </figcaption>
  </figure>
</div>


<div itemscope itemtype="http://schema.org/Person">
  <meta itemprop="jobTitle" content="Disk Jockey" />
  <meta itemprop="name" content="Sorrow-Vomit" />
  <meta itemprop="image" content="/img/uploads/sorrow-vmit.jpg" />

  <div itemscope itemtype="https://schema.org/Photograph">
	<meta itemprop="image" content="/img/uploads/sorrow-vmit.jpg" />
	<meta itemprop="name" content="Sorrow-Vomit" />

	<div itemprop="creator" content="Tarik">
	</div>

  </div>


</div>

*/

   export default {
      name: 'ProfileCard',
      props: {
         img: {
            type: String,
            required: false
         },
         webp: {
            type: String,
            required: false
         },
         title: {
            type: String,
            required: false
         },
         credits: {
            type: String,
            required: false
         }
      }
   }
</script>

<style lang="scss">
   .profile-card {
       border: 1px solid hex-to-rgba($white-smoke, 0.4);
       margin: 0 0 2rem;
       border-radius: 8px;
       overflow: hidden;

       &__img {
          text-align: center;
       }

       &__body {
          padding: 1rem $gutter-width;
       }

       &__title {
          @include fluid-type($screen-s-min, $screen-xxl-min, 24px, 30px);
          margin: 0;
       }

   }
</style>
