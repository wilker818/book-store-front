<template>
  <div class="bs-content container mb-5">
    <div>
      <div class="row">
        {{ getLivro }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import { useRoute } from "vue-router";

import LivrosApi, { type Livros } from "@/api/livros";

const route = useRoute();
const getParamsId: string = route.params.id as string;

const getLivro: Ref<Livros[]> = ref([]);

const livrosApi: LivrosApi = new LivrosApi();

const fetchLivro = async () => {
  getLivro.value = await livrosApi.getBook(getParamsId);
};

console.log(getLivro.value);

onMounted(fetchLivro);
</script>

<style scoped>
.bs-content {
  height: 100vh;
}
</style>
