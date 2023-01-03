<template>
  <div class="col-md-4 mb-4">
    <div class="card w-100" style="width: 18rem">
      <div class="cw-gradient__load bs-img-lazyload"></div>
      <div class="bs-content-lazyload">
        <div class="cw-gradient__load bs-title-lazyload"></div>
        <div class="cw-gradient__load bs-author-lazyload"></div>
        <div class="cw-gradient__load bs-editora-lazyload"></div>
        <div class="cw-gradient__load bs-pages-lazyload"></div>
        <div class="cw-gradient__load bs-links-lazyload"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bs-img-lazyload {
  height: 280px;
  border: 1px solid var(--bs-lazyload-primary-color);
}
.bs-title-lazyload {
  height: 84px;
  border: 1px solid var(--bs-lazyload-primary-color);
}
.bs-author-lazyload {
  height: 40px;
  border: 1px solid var(--bs-lazyload-primary-color);
}
.bs-editora-lazyload {
  height: 40px;
  border: 1px solid var(--bs-lazyload-primary-color);
}
.bs-pages-lazyload {
  height: 40px;
  border: 1px solid var(--bs-lazyload-primary-color);
}
.bs-links-lazyload {
  height: 66px;
  border: 1px solid var(--bs-lazyload-primary-color);
}

.cw-gradient__load {
  animation-duration: 1.4s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: LazyloadItem;
  animation-timing-function: linear;
  background: linear-gradient(
    90deg,
    var(--bs-lazyload-primary-color) -24.18%,
    var(--bs-lazyload-secondary-color) 50.26%,
    var(--bs-lazyload-primary-color) 114.84%
  );
  background-size: 1000px 640px;

  position: relative;
}

@keyframes LazyloadItem {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}
</style>
