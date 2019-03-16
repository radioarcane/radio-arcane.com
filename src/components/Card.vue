<template>
   <div class="card">
   </div>
</template>

<script>
   export default {
      name: 'Card',
      props: {
      },
      methods: {
      }
   }
</script>

<style lang="scss">
.card{
    border:1px solid hsla(0,0%,100%,.7);
    margin:0 0 2rem;
    border-radius:8px;
    overflow:hidden
}
.card__img{
    text-align:center
}
.card__body{
    padding:1rem 30px
}
.card__title{
    font-size:30px;
    margin:0
}
.card__subtitle{
    font-size:20px;
    margin:.25em 0 0;
    color:#ccc
}
.card__text{
    padding:1rem 0 0
}
.card__actions{
    display:-ms-flexbox;
    display:flex;
    -ms-flex-wrap:wrap;
    flex-wrap:wrap;
    -ms-flex-pack:space-evenly;
    justify-content:space-evenly;
    -ms-flex-align:center;
    align-items:center;
    -ms-flex-line-pack:center;
    align-content:center
}
</style>
