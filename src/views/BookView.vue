<template>
  <div class="bs-content container my-5">
    <div class="row position-relative">
      <div class="col-md-6">
        <img src="https://dummyimage.com/600x600/000/fff" alt="Image Book" />
      </div>

      <div
        class="col-md-6 bs-loadingDescription"
        v-if="loadingDescription === true"
      >
        <img src="@/assets/loading/three-dots-dark.svg" alt="Loading..." />
      </div>

      <div class="col-md-6" v-else>
        <div class="mb-4">Ref: {{ getLivro._id }}</div>
        <div class="bs-conteudo">
          <div>
            <h2>{{ getLivro.titulo }}</h2>

            <div class="mt-4 mb-3">
              <strong>Editora:</strong>
              <span>{{ getLivro.editora }}</span>
            </div>

            <div class="mb-3">
              <strong>Total de Páginas:</strong>
              <span>{{ getLivro.numeroPaginas }}</span>
            </div>

            <div>
              <button disabled class="btn w-100">
                Livro indisponível para leitura
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="position-relative mt-5">
      <div>
        <h2><strong> Descrição </strong></h2>
        <br />
        <span>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
          <br /><br />
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced
          below for those interested. Sections 1.10.32 and 1.10.33 from "de
          Finibus Bonorum et Malorum" by Cicero are also reproduced in their
          exact original form, accompanied by English versions from the 1914
          translation by H. Rackham.
          <br /><br />
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum which
          looks reasonable. The generated Lorem Ipsum is therefore always free
          from repetition, injected humour, or non-characteristic words etc.
          <br /><br />
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </span>
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
const livrosApi: LivrosApi = new LivrosApi();

const getLivro: Ref<Livros[]> = ref([]);
const loadingDescription: Ref<boolean> = ref(false);

onMounted(() => {
  fetchLivro();
});

async function fetchLivro(): Promise<void> {
  try {
    loadingDescription.value = true;

    getLivro.value = await livrosApi.getBook(getParamsId);

    loadingDescription.value = false;
  } catch (error) {
    loadingDescription.value = false;
    console.log(error);
  }
}
</script>

<style scoped>
.bs-content {
  color: #000;
}
.bs-loadingDescription {
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #000;
}
.bs-conteudo {
  width: 100%;
  position: sticky;
  position: -webkit-sticky;
  top: 10px;
}
</style>
