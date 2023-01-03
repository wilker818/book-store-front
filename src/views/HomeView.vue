<template>
  <BsModal
    id="ModalPutBook"
    size="modal-lg"
    :opened="modalOpened"
    :showFooter="false"
    @onclose="modalClose"
  >
    <template v-slot:body>
      <ModalPutBook v-if="openModalPutBook" />
      <ModalPostBook v-else />
    </template>
  </BsModal>

  <div class="bs-content container d-flex flex-column mb-5">
    <!-- <div>Livraria BOOKSTORE</div> -->
    <div class="my-5">
      <div class="row" v-if="loading === true">
        <LazyloadItem v-for="item in 6" :key="item" />
      </div>
      <div class="row" v-else>
        <div class="col-md-4 mb-4" v-for="livro in livros" :key="livro._id">
          <div class="card w-100" style="width: 18rem">
            <img
              src="https://dummyimage.com/600x400/000/fff"
              class="card-img-top"
              alt="{{ livro.titulo }}"
            />
            <div class="card-body">
              <h5 class="card-title">{{ livro.titulo }}</h5>
              <p class="card-text">DESCRIÇÃO DO LIVRO</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <RouterLink to="/autores">
                  Autor(a): {{ livro.autor.nome }}
                </RouterLink>
              </li>
              <li class="list-group-item">Editora: {{ livro.editora }}</li>
              <li class="list-group-item">
                Número de páginas: {{ livro.numeroPaginas }}
              </li>
            </ul>
            <div class="card-body d-flex justify-content-between">
              <RouterLink
                :to="{ name: 'livros', params: { id: livro._id } }"
                class="btn btn-success"
              >
                VER LIVRO
              </RouterLink>

              <button
                class="btn btn-warning"
                @click="(modalOpened = true), (openModalPutBook = true)"
              >
                ALTERAR LIVRO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button
        type="button"
        class="btn btn-success"
        @click="(modalOpened = true), (openModalPutBook = false)"
      >
        Adicionar Livro
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";

import BsModal from "@/components/BsModal.vue";
import ModalPutBook from "./components/ModalPutBook.vue";

import LivrosApi, { type Livros } from "@/api/livros";
import ModalPostBook from "./components/ModalPostBook.vue";
import LazyloadItem from "./components/LazyloadItem.vue";

const livros: Ref<Livros[]> = ref([]);

const loading: Ref<boolean> = ref(false);
const modalOpened: Ref<boolean> = ref(false);
const openModalPutBook: Ref<boolean> = ref(false);

const livrosApi: LivrosApi = new LivrosApi();

const fetchLivros = async () => {
  loading.value = true;
  livros.value = await livrosApi.getBooks();
  loading.value = false;
};

onMounted(fetchLivros);

function modalClose() {
  modalOpened.value = false;
}
</script>

<style scoped>
.bs-content {
  height: 100vh;
}
</style>
