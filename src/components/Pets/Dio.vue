<template>
  <div class="dio"></div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: require("@/assets/dio.png")
    };
  }
};
</script>
<style lang="scss" scoped>
@keyframes run {
  0% {
    background-position: 0 0;
  }
  15% {
    background-position: -30px 0;
  }
  30% {
    background-position: -60px 0;
  }
  45% {
    background-position: -90px 0;
  }
  60% {
    background-position: -120px 0;
  }
  75% {
    background-position: -150px 0;
  }
  80% {
    background-position: -180px 0;
  }
  100% {
    background-position: -210px 0;
  }
}
.dio {
  height: 70px;
  width: 30px;
  background: url(../../assets/dio.png);
  animation: run 1s steps(1) 0s infinite both;
}
</style>
