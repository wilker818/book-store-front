<template>
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
        <RouterLink to="/autores">Autor(a): {{ livro.autor.nome }}</RouterLink>
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
        >VER LIVRO</RouterLink
      >

      <a href="#" class="card-link">ALTERAR LIVRO</a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  livros: Object,
});

const livro: any = ref(props.livros);
</script>

<style scoped></style>
