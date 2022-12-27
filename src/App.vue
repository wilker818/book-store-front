<script setup lang="ts">
import { RouterView } from "vue-router";

import BsHeaderVue from "@/components/BsHeader.vue";
</script>

<template>
  <BsHeaderVue />
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
