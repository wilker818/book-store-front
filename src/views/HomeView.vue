<template>
  <BsModal
    id="ModalPutAuthor"
    size="modal-lg"
    :opened="modalOpened"
    :showFooter="false"
    @onclose="modalClose"
  >
    <template v-slot:body>
      <ModalPutBook />
    </template>
  </BsModal>
  <div class="bs-content container d-flex flex-column mb-5">
    <div>Livraria BOOKSTORE</div>
    <div>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="livro in livros" :key="livro._id">
          <div class="card w-100" style="width: 18rem">
            <img
              src="https://dummyimage.com/600x400/000/fff"
              class="card-img-top"
              alt="{{ livro.titulo }}"
            />
            <div class="card-body">
              <h5 class="card-title">Titulo: {{ livro.titulo }}</h5>
              <p class="card-text">DESCRIÇÃO DO LIVRO</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <RouterLink to="/autores"
                  >Autor(a): {{ livro.autor.nome }}</RouterLink
                >
              </li>
              <li class="list-group-item">Editora: {{ livro.editora }}</li>
              <li class="list-group-item">
                Número de páginas: {{ livro.numeroPaginas }}
              </li>
            </ul>
            <div class="card-body">
              <RouterLink
                :to="{ name: 'livros', params: { id: livro._id } }"
                class="card-link"
              >
                VER LIVRO
              </RouterLink>

              <button class="card-link" @click="modalOpened = true">ALTERAR LIVRO</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button type="button" class="btn btn-success">Adicionar Livro</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";

import BsModal from "@/components/BsModal.vue";
import ModalPutBook from "./components/ModalPutBook.vue";


import LivrosApi, { type Livros } from "@/api/livros";

const livros: Ref<Livros[]> = ref([]);
const modalOpened = ref(false);

const livrosApi: LivrosApi = new LivrosApi();

const fetchLivros = async () => {
  livros.value = await livrosApi.getBooks();
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
