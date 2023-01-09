<template>
  <BsModal
    id="ModalBook"
    size="modal-lg"
    :opened="modalOpened"
    :showFooter="false"
    @onclose="modalClose"
  >
    <template v-slot:body>
      <div v-if="openModalPutBook">
        <div
          class="d-flex align-items-center justify-content-center"
          v-if="loadModal === true"
        >
          <img
            src="@/assets/loading/three-dots-dark.svg"
            class="w-25"
            alt="Loading..."
          />
        </div>
        <div v-else class="cw-modal-information">
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
                v-model="pagesNumber"
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

      <div v-else>
        <div class="row cw-modal-information">
          <div class="mb-5">
            <div class="d-flex flex-column mb-4">
              <label for="bookName" class="mb-1">Nome do livro</label>
              <input
                type="bookName"
                placeholder="Nome do Livro"
                v-model="titulo"
              />
            </div>
            <div class="d-flex flex-column mb-4">
              <label for="author" class="mb-1">Autores</label>
              <select
                class="form-select"
                aria-label="Selecione um Autor"
                v-model="selectedAuthor"
              >
                <option selected>Selecione um autor</option>
                <option
                  :value="author._id"
                  v-for="author in authors"
                  :key="author._id"
                >
                  {{ author.nome }}
                </option>
              </select>
            </div>
            <div class="d-flex flex-column mb-4">
              <label for="nacionality" class="mb-1">Editora</label>
              <input
                type="nacionality"
                placeholder="Editora"
                v-model="editora"
              />
            </div>
            <div class="d-flex flex-column">
              <label for="page" class="mb-1">Páginas</label>
              <input
                type="number"
                placeholder="Quantidade de Páginas"
                v-model="pagesNumber"
              />
            </div>
          </div>
          <button type="button" class="btn btn-success" @click="addNewBook()">
            <div
              class="spinner-border spinner-border-sm text-light"
              role="status"
              v-if="loadingButton === true"
            >
              <span class="sr-only"></span>
            </div>
            <span> Adicionar </span>
          </button>
        </div>
      </div>
    </template>
  </BsModal>

  <div class="bs-content container d-flex flex-column mb-5">
    <div>
      <img
        src="@/assets/images/banner.png"
        alt="banner"
        class="img-fluid w-100"
      />
    </div>
    <div class="mt-5 mb-2">
      <div class="row" v-if="loading === true">
        <LazyloadItem v-for="item in 6" :key="item" />
      </div>
      <div class="row" v-else>
        <div class="col-md-4 mb-4" v-for="book in books" :key="book._id">
          <div class="card w-100" style="width: 18rem">
            <img
              src="https://dummyimage.com/600x400/000/fff"
              class="card-img-top"
              alt="{{ book.titulo }}"
            />
            <div class="card-body">
              <h5 class="card-title">{{ book.titulo }}</h5>
              <p class="card-text">DESCRIÇÃO DO LIVRO</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <RouterLink to="/Authors">
                  Autor(a): {{ book.autor.nome }}
                </RouterLink>
              </li>
              <li class="list-group-item">Editora: {{ book.editora }}</li>
              <li class="list-group-item">
                Número de páginas: {{ book.pagesNumber }}
              </li>
            </ul>
            <div class="card-body d-flex justify-content-between">
              <RouterLink
                :to="{ name: 'livros', params: { id: book._id } }"
                class="btn btn-success"
              >
                VER LIVRO
              </RouterLink>

              <button class="btn btn-warning" @click="openModalBook(book._id)">
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
        @click="openModalPostBook()"
      >
        Adicionar Livro
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";

import BsModal from "@/components/BsModal.vue";

import BooksApi, { type Books } from "@/api/books";
import AuthorsApi, { type Author } from "@/api/authors";

import LazyloadItem from "./components/LazyloadItem.vue";

const booksApi: BooksApi = new BooksApi();
const authorsApi: AuthorsApi = new AuthorsApi();

const books: Ref<Books[]> = ref([]);
const authors: Ref<Author[]> = ref([]);
const putBooks: Ref<Books[]> = ref([]);
const consultBook: Ref<Books[]> = ref([]);

const getIdBook: Ref<string> = ref("");

const titulo: Ref<string> = ref("");
const editora: Ref<string> = ref("");
const selectedAuthor: Ref<string> = ref("");
const pagesNumber: Ref<number> = ref(0);

const rules = {
  titulo: titulo,
  editora: editora,
  pagesNumber: pagesNumber,
};

const loading: Ref<boolean> = ref(false);
const loadModal: Ref<boolean> = ref(false);
const loadingButton: Ref<boolean> = ref(false);

const modalOpened: Ref<boolean> = ref(false);
const openModalPutBook: Ref<boolean> = ref(false);

onMounted(() => {
  fetchBooks();
});

async function fetchBooks(): Promise<void> {
  try {
    loading.value = true;
    books.value = await booksApi.getBooks();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
}

async function openModalBook(id: string): Promise<void> {
  loadModal.value = true;
  openModalPutBook.value = true;
  modalOpened.value = true;
  getIdBook.value = id;

  const consultBook: Books[] = await booksApi.getBook(getIdBook.value);

  titulo.value = consultBook.titulo;
  editora.value = consultBook.editora;
  pagesNumber.value = consultBook.pagesNumber;

  loadModal.value = false;
}
async function openModalPostBook(): Promise<void> {
  openModalPutBook.value = false;
  modalOpened.value = true;

  titulo.value = "";
  editora.value = "";
  pagesNumber.value = 0;

  authors.value = await authorsApi.get();
}

async function updateBook(): Promise<void> {
  try {
    loadingButton.value = true;
    putBooks.value = await booksApi.putBook(
      getIdBook.value,
      rules.titulo.value,
      rules.editora.value,
      rules.pagesNumber.value
    );
    modalOpened.value = false;
    loadingButton.value = false;
    fetchBooks();
  } catch (err) {
    loadModal.value = false;
    modalOpened.value = false;
    console.log(err);
  }
}

async function addNewBook(): Promise<void> {
  try {
    loadingButton.value = true;

    openModalPutBook.value = true;
    modalOpened.value = true;

    consultBook.value = await booksApi.postBook(
      rules.titulo.value,
      rules.editora.value,
      selectedAuthor.value,
      rules.pagesNumber.value
    );

    fetchBooks();
    loadingButton.value = false;
  } catch (err) {
    modalOpened.value = false;
    console.log(err);
  }
}

function modalClose() {
  modalOpened.value = false;
}
</script>

<style scoped></style>
