<template>
  <div class="bs-content container mb-5">
    <div>
      <div class="row">
        {{ getLivro }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, type Ref } from "vue";
import { useRoute } from "vue-router";

import LivrosApi, { type Livros } from "@/api/livros";

export default defineComponent({
  name: "bs-home-view",
  components: {},
  setup() {
    const route = useRoute();
    const getParamsId: string = route.params.id as string;

    const getLivro: Ref<Livros[]> = ref([]);

    const livrosApi: LivrosApi = new LivrosApi();

    const fetchLivro = async () => {
      getLivro.value = await livrosApi.getBook(getParamsId);
    };

    onMounted(fetchLivro);

    return {
      getLivro,
    };
  },
});
</script>

<style scoped>
.bs-content {
  height: 100vh;
}
</style>
