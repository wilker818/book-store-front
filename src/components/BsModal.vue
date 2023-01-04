<template>
  <div :id="id" class="modal fade" tabindex="-1">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      :class="size ? size : ''"
    >
      <div class="modal-content">
        <div v-if="showHeader" class="modal-body">
          <button
            v-if="canClose"
            type="button"
            class="btn cw-close d-flex justify-content-center align-items-center"
            data-bs-dismiss="modal"
            @click="$emit('onclose')"
          >
            <i class="bi bi-x-lg">X</i>
          </button>
          <slot name="body" />
        </div>
        <div v-if="showFooter" class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from "vue";
import { Modal } from "bootstrap";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  canClose: {
    type: Boolean,
    default: true,
  },
  opened: {
    type: Boolean,
    default: false,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(["onclose"]);

let modal: any;

onMounted(() => {
  const config = {
    backdrop: "",
    keyboard: false,
  };
  if (!props.canClose) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  const modalEl = document.getElementById(props.id) as HTMLElement;
  modal = new Modal(modalEl);

  modalEl.addEventListener("hidden.bs.modal", () => {
    emit("onclose");
  });
});

watch(
  () => props.opened,
  (to) => {
    if (to) {
      modal.show();
    } else {
      modal.hide();
    }
  }
);

onBeforeUnmount(() => {
  modal.dispose();
});
</script>

<style scoped>
.modal-header {
  border: none;
}
.modal-footer {
  border: none;
}
.cw-close {
  position: absolute;
  top: 4px;
  right: 10px;
  z-index: 1;
  border-radius: 36px;
  background-color: #fff;
}
.modal-dialog-scrollable .modal-body {
  overflow-y: hidden;
}
@media (min-width: 992px) {
  .modal-dialog {
    max-width: 850px;
    height: auto;
  }
  .btn {
    box-sizing: content-box;
    width: 1em;
    height: 1em;
    padding: 0.25em 0.25em;
    color: #000;
  }
}
@media (max-width: 769px) {
  .cw-close {
    position: absolute;
    top: 25px;
    right: 25px;
    z-index: 1;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: #fff;
  }
}
</style>
