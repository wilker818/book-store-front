<template>
  <div class="bs-content container mb-5">
    <div>AUTORES</div>
    <div>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="autor in autores" :key="autor._id">
          <div class="card w-100" style="width: 18rem">
            <img
              src="https://dummyimage.com/600x400/000/fff"
              class="card-img-top"
              alt="{{ autor.nome }}"
            />
            <div class="card-body">
              <h5 class="card-title">Autor: {{ autor.nome }}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                Nacionalidade: {{ autor.nacionalidade }}
              </li>
            </ul>
            <div class="card-body">
              <a href="/" class="card-link">ALTERAR AUTOR</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-success">Adicionar Autor</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, type Ref } from "vue";

import AutoresApi, { type Autor } from "@/api/autores";
export default defineComponent({
  name: "bs-home-view",

  setup() {
    const autores: Ref<Autor[]> = ref([]);

    const livrosApi: AutoresApi = new AutoresApi();

    const fetchLivros = async () => {
      autores.value = await livrosApi.get();
    };

    onMounted(fetchLivros);

    return {
      autores,
    };
  },
});
</script>

<style scoped>
.bs-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
