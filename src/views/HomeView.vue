<template>
  <BsModal
    id="ModalPutBook"
    size="modal-lg"
    :opened="modalOpened"
    :showFooter="false"
    @onclose="modalClose"
  >
    <template v-slot:body>
      <div v-if="openModalPutBook">
        <div class="row cw-modal-information">
          <div class="mb-5">
            <div class="d-flex flex-column mb-4">
              <label for="bookName" class="mb-1">Nome do livro</label>
              <input
                type="bookName"
                placeholder="Alterar Nome do Livro"
                v-model="titulo"
              />
            </div>
            <div class="d-flex flex-column mb-4">
              <label for="nacionality" class="mb-1">Editora</label>
              <input
                type="nacionality"
                placeholder="Alterar Editora"
                v-model="editora"
              />
            </div>
            <div class="d-flex flex-column">
              <label for="page" class="mb-1">Páginas</label>
              <input
                type="page"
                placeholder="Alterar quantidade de Páginas"
                v-model="numeroPaginas"
              />
            </div>
          </div>
          <button type="submit" class="btn btn-success" @click="updateBook()">
            <div
              class="spinner-border spinner-border-sm text-light"
              role="status"
              v-if="loadingButton === true"
            >
              <span class="sr-only"></span>
            </div>
            <span v-else>Alterar</span>
          </button>
        </div>
      </div>

      <ModalPostBook v-else />
    </template>
  </BsModal>

  <div class="bs-content container d-flex flex-column mb-5">
    <!-- <div>Livraria BOOKSTORE</div> -->
    <div class="mt-5 mb-2">
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

              <button class="btn btn-warning" @click="openModalBook(livro._id)">
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
        class="btn btn-success mb-4"
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

import LivrosApi, { type Livros } from "@/api/livros";
import ModalPostBook from "./components/ModalPostBook.vue";
import LazyloadItem from "./components/LazyloadItem.vue";

const livrosApi: LivrosApi = new LivrosApi();
const livros: Ref<Livros[]> = ref([]);
const putLivros: Ref<Livros[]> = ref([]);

const getIdBook: Ref<string> = ref("");

const titulo: Ref<string> = ref("");
const editora: Ref<string> = ref("");
const numeroPaginas: Ref<number> = ref(0);
const rules = {
  titulo: titulo,
  editora: editora,
  numeroPaginas: numeroPaginas,
};

const loading: Ref<boolean> = ref(false);
const loadingButton: Ref<boolean> = ref(false);

const modalOpened: Ref<boolean> = ref(false);
const openModalPutBook: Ref<boolean> = ref(false);

const fetchLivros = async () => {
  loading.value = true;
  livros.value = await livrosApi.getBooks();
  loading.value = false;
};

onMounted(fetchLivros);

async function openModalBook(id: string) {
  openModalPutBook.value = true;
  modalOpened.value = true;

  const consultBook: Livros[] = await livrosApi.getBook(id);

  titulo.value = consultBook.titulo;
  editora.value = consultBook.editora;
  numeroPaginas.value = consultBook.numeroPaginas;

  getIdBook.value = id;
}

async function updateBook() {
  try {
    loadingButton.value = true;
    putLivros.value = await livrosApi.putBook(
      getIdBook.value,
      rules.titulo.value,
      rules.editora.value,
      rules.numeroPaginas.value
    );
    modalOpened.value = false;
    loadingButton.value = false;
    fetchLivros();
  } catch (err) {
    console.log(err);
  }
}

function modalClose() {
  modalOpened.value = false;
}
</script>

<style scoped>
.bs-content {
  height: 100vh;
}
</style>
