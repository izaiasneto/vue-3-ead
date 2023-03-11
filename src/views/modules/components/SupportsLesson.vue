<template>
  <div class="comments" v-show="lesson.name">
    <div class="header">
      <span class="title">Dúvidas ({{ supportsTotal }}) <span v-if="loading">(Carregando...)</span></span>
      <button class="btn primary"
        @click.prevent="openModal">
        <i class="fas fa-plus"></i>
        Enviar nova dúvida
      </button>
    </div>

    <supports/>

    <pagination
      :pagination="supports"
      @changePage="changePage"
    >
    </pagination>
    <support-modal
      :show-modal="modal.showModal"
      :support-reply="modal.supportReply"
      @closeModal="modal.showModal = false"
    >   
    </support-modal>
    
  </div>
</template>

<script>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'

import Supports from '@/components/Supports.vue'
import SupportModal from '@/components/SupportModal.vue'
import Pagination from '@/components/Pagination.vue'


export default {
  name: "SupportsLesson",
  setup(){
      const store = useStore()

      const lesson = computed(() => store.state.courses.lessonPlayer)
      const page = computed(() => store.state.supports.supports.meta.page)
      const supports = computed(() => store.state.supports.supports) // module/state - Support
      const supportsTotal = computed(()=> store.state.supports.supports.meta.total)
      const loading = ref(false)
      
      const modal = ref({
          showModal: false,
          supportReply: ''
      })
      
      const openModal = () => modal.value = {showModal: true, supportReply: ''}
      

      watch(
        () => store.state.courses.lessonPlayer,
        () => {
          loading.value = true
          
          store.dispatch('getSupportsOfLesson', { lesson: lesson.value.id, page})
                .finally(() => loading.value = false)
        }
      )

      const changePage = (page) => store.dispatch('getSupportsOfLesson', {
        lesson: lesson.value.id,
        page
      })
      

      return {
        lesson,
        loading,
        supports,
        supportsTotal,
        modal,
        openModal,
        changePage
      }
  },

  components: {
    Supports,
    SupportModal,
    Pagination
  },
};
</script>