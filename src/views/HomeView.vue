<template>
  <div class="bs-content container mb-5">
    <div>Livraria BOOKSTORE</div>
    <div>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="livro in livros" :key="livro._id">
          <BsItemHome :livros="livro" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, type Ref } from "vue";

import BsItemHome from "./components/BsItemHome.vue";

import LivrosApi, { type Livros } from "@/api/livros";
export default defineComponent({
  name: "bs-home-view",
  components: {
    BsItemHome,
  },
  setup() {
    const livros: Ref<Livros[]> = ref([]);

    const livrosApi: LivrosApi = new LivrosApi();

    const fetchLivros = async () => {
      livros.value = await livrosApi.getBooks();
    };

    onMounted(fetchLivros);

    return {
      livros,
    };
  },
});
</script>

<style scoped>
.bs-content {
  height: 100vh;
}
</style>
