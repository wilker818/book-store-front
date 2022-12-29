<template>
  <div class="row cw-modal-information">
    <div class="mb-5">
      <div class="d-flex flex-column mb-4">
        <label for="bookName" class="mb-1">Nome do livro</label>
        <input type="bookName" placeholder="Alterar Nome do Livro" />
      </div>
      <div class="d-flex flex-column mb-4">
        <label for="nacionality" class="mb-1">Editora</label>
        <input type="nacionality" placeholder="Alterar Editora" />
      </div>
      <div class="d-flex flex-column">
        <label for="page" class="mb-1">Páginas</label>
        <input type="page" placeholder="Alterar quantidade de Páginas" />
      </div>
    </div>
    <button type="button" class="btn btn-success">Alterar</button>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>