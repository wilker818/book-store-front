<script setup lang="ts"></script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <RouterLink to="/" class="navbar-brand" aria-current="page">
          HOME
        </RouterLink>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/livros" class="nav-link">LIVROS</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/autores" class="nav-link">AUTORES</RouterLink>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Pesquisar"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">BUSCAR</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
