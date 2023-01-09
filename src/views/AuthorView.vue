<template>
  <div class="bs-content container mb-5">
    <BsModal
      id="ModalAuthor"
      size="modal-lg"
      :opened="modalOpened"
      :showFooter="false"
      @onclose="modalClose"
    >
      <template v-slot:body>
        <div v-if="modalPutAuthor">
          <div
            class="d-flex align-items-center justify-content-center"
            v-if="loadingModalPutAuthor"
          >
            <img
              src="@/assets/loading/three-dots-dark.svg"
              class="w-25"
              alt="Loading..."
            />
          </div>
          <div v-else class="row cw-modal-information">
            <div class="mb-5">
              <div class="d-flex flex-column mb-4">
                <label for="name" class="mb-1">Nome</label>
                <input type="name" placeholder="Alterar Nome" v-model="nome" />
              </div>
              <div class="d-flex flex-column">
                <label for="nacionality" class="mb-1">Nacionalidade</label>
                <input
                  type="nacionality"
                  placeholder="Alterar Nacionalidade"
                  v-model="nacionalidade"
                />
              </div>
            </div>
            <button
              type="button"
              class="btn btn-success"
              @click="updateAuthor()"
            >
              <div
                class="spinner-border spinner-border-sm text-light"
                role="status"
                v-if="loadingButton"
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
                <label for="name" class="mb-1">Nome</label>
                <input type="name" placeholder="Alterar Nome" v-model="nome" />
              </div>
              <div class="d-flex flex-column">
                <label for="nacionality" class="mb-1">Nacionalidade</label>
                <input
                  type="nacionality"
                  placeholder="Alterar Nacionalidade"
                  v-model="nacionalidade"
                />
              </div>
            </div>
            <button
              type="button"
              class="btn btn-success"
              @click="addNewAuthor()"
            >
              <div
                class="spinner-border spinner-border-sm text-light"
                role="status"
                v-if="loadingButton"
              >
                <span class="sr-only"></span>
              </div>
              <span>Adicionar</span>
            </button>
          </div>
        </div>
      </template>
    </BsModal>

    <div>AUTORES</div>
    <div>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="author in authors" :key="author._id">
          <div class="card w-100" style="width: 18rem">
            <img
              src="https://dummyimage.com/600x400/000/fff"
              class="card-img-top"
              alt="{{ author.nome }}"
            />
            <div class="card-body">
              <h5 class="card-title">Autor: {{ author.nome }}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                Nacionalidade: {{ author.nacionalidade }}
              </li>
            </ul>
            <div class="card-body">
              <button
                type="button"
                class="btn btn-warning"
                @click="openModalPutAuthor(author._id)"
              >
                ALTERAR AUTOR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-success" @click="openModalPostAuthor()">
        Adicionar Autor
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";

import AuthorsApi, { type Author } from "@/api/authors";

import BsModal from "@/components/BsModal.vue";

const authorsApi: AuthorsApi = new AuthorsApi();

const authors: Ref<Author[]> = ref([]);
const putAuthors: Ref<Author[]> = ref([]);
const consultAuthor: Ref<Author[]> = ref([]);

const getIdAuthor: Ref<string> = ref("");

const nome: Ref<string> = ref("");
const nacionalidade: Ref<string> = ref("");

const loading: Ref<boolean> = ref(false);
const loadingModalPutAuthor: Ref<boolean> = ref(false);
const loadingButton: Ref<boolean> = ref(false);

const modalOpened: Ref<boolean> = ref(false);
const modalPutAuthor: Ref<boolean> = ref(false);

const rules = {
  nome: nome,
  nacionalidade: nacionalidade,
};

async function fetchAuthors(): Promise<void> {
  try {
    loading.value = true;
    authors.value = await authorsApi.get();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
}

onMounted(() => {
  fetchAuthors();
});

async function openModalPutAuthor(id: string): Promise<void> {
  loadingModalPutAuthor.value = true;
  modalPutAuthor.value = true;
  modalOpened.value = true;
  getIdAuthor.value = id;

  const consultAuthor: Author[] = await authorsApi.getAuthor(getIdAuthor.value);

  nome.value = consultAuthor.nome;
  nacionalidade.value = consultAuthor.nacionalidade;

  loadingModalPutAuthor.value = false;
}
async function openModalPostAuthor(): Promise<void> {
  modalPutAuthor.value = false;
  modalOpened.value = true;

  nome.value = "";
  nacionalidade.value = "";

  authors.value = await authorsApi.get();
}

async function updateAuthor(): Promise<void> {
  try {
    loadingButton.value = true;

    putAuthors.value = await authorsApi.putAuthor(
      getIdAuthor.value,
      rules.nome.value,
      rules.nacionalidade.value
    );

    loadingButton.value = false;
    modalOpened.value = false;

    fetchAuthors();
  } catch (err) {
    modalOpened.value = false;
    modalPutAuthor.value = false;
    console.log(err);
  }
}
async function addNewAuthor(): Promise<void> {
  try {
    modalOpened.value = true;
    loadingButton.value = true;

    consultAuthor.value = await authorsApi.postAuthor(
      rules.nome.value,
      rules.nacionalidade.value
    );

    loadingButton.value = false;
    modalOpened.value = false;

    fetchAuthors();
  } catch (err) {
    modalOpened.value = false;
    console.log(err);
  }
}

function modalClose() {
  modalOpened.value = false;
}
</script>

<style scoped>
.bs-content {
  display: flex;
  flex-direction: column;
}
</style>
