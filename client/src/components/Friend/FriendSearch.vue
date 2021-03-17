<template>
  <div>
    <h1>Chercher des amis</h1>
    <p>chercher des amis selon le nom d'utilisateur</p>
    <div class="friend-container">
      <div class="friend-search-bar">
        <b-input-group class="mt-3">
          <template #append>
            <b-button class="mb-2">
              <b-icon icon="search" aria-hidden="true"></b-icon>
            </b-button>
          </template>
          <b-form-input></b-form-input>
        </b-input-group>
      </div>
      <div class="friend-search-list">
        <div class="list-group">
          <a
            href="#"
            class="list-group-item list-group-item-action active"
            aria-current="true"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">List group item heading</h5>
              <small>3 days ago</small>
            </div>
            <p class="mb-1">Some placeholder content in a paragraph.</p>
            <small>And some small print.</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">List group item heading</h5>
              <small class="text-muted">3 days ago</small>
            </div>
            <p class="mb-1">Some placeholder content in a paragraph.</p>
            <small class="text-muted">And some muted small print.</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">List group item heading</h5>
              <small class="text-muted">3 days ago</small>
            </div>
            <p class="mb-1">Some placeholder content in a paragraph.</p>
            <small class="text-muted">And some muted small print.</small>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>