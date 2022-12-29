<template>
  <div class="bs-content container mb-5">
    <BsModal
      id="warriorDetail"
      size="modal-lg"
      :opened="modalOpened"
      :showFooter="false"
      @onclose="modalClose"
    >
      <template v-slot:body>
        <ModalPutAuthor />
      </template>
    </BsModal>

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
      <button class="btn btn-success" @click="modalOpened = true">
        Adicionar Autor
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import BsModal from "@/components/BsModal.vue";

import AutoresApi, { type Autor } from "@/api/autores";
import ModalPutAuthor from "./components/ModalPutAuthor.vue";

const autores: Ref<Autor[]> = ref([]);
const modalOpened = ref(false);

const livrosApi: AutoresApi = new AutoresApi();

const fetchLivros = async () => {
  autores.value = await livrosApi.get();
};

onMounted(fetchLivros);

function modalClose() {
  modalOpened.value = false;
}
</script>

<style scoped>
.bs-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
