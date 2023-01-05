<script setup lang="ts">
import { RouterView } from "vue-router";

import BsHeaderVue from "@/components/BsHeader.vue";
import BsFooter from "./views/components/BsFooter.vue";
</script>

<template>
  <header>
    <BsHeaderVue />
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <BsFooter />
  </footer>
</template>

<style scoped>
template {
  display: flex;
  flex-direction: column;
}
</style>
