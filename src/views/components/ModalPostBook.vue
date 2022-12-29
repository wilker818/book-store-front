<template>
  <div class="row cw-modal-information">
    <div class="mb-5">
      <div class="d-flex flex-column mb-4">
        <label for="bookName" class="mb-1">Nome do livro</label>
        <input type="bookName" placeholder="Nome do Livro" />
      </div>
      <div class="d-flex flex-column mb-4">
        <label for="author" class="mb-1">Autores</label>
        <select class="form-select" aria-label="Selecione um Autor">
          <option selected>Selecione um autor</option>
          <option value="1">Wilker</option>
          <option value="2">Rafael</option>
          <option value="3">Youssef</option>
          <option value="4">Paulo</option>
          <option value="5">Crislaine</option>
        </select>
      </div>
      <div class="d-flex flex-column mb-4">
        <label for="nacionality" class="mb-1">Editora</label>
        <input type="nacionality" placeholder="Editora" />
      </div>
      <div class="d-flex flex-column">
        <label for="page" class="mb-1">Páginas</label>
        <input type="page" placeholder="Quantidade de Páginas" />
      </div>
    </div>
    <button type="button" class="btn btn-success">Adicionar</button>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
