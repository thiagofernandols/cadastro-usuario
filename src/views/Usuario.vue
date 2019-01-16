<template>
  <div>
		<transition name="flip" mode="out-in">      
      <UsuarioTable v-if="this.$store.state.modoListaUsuario"></UsuarioTable>
      <UsuarioEdit v-else></UsuarioEdit>
		</transition>
  </div>
</template>

<script>
import UsuarioTable from '@/components/usuario/UsuarioTable.vue'
import UsuarioEdit from '@/components/usuario/UsuarioEdit.vue'

export default {
  name: "usuario",
  components: {
    UsuarioTable,
    UsuarioEdit
  },
}
</script>
<style>
.flip-enter-active {
	animation: flip-in 0.3s ease forwards;
}

.flip-leave-active {
	animation: flip-out 0.3s ease forwards;
}

@keyframes flip-out {
	from { transform: rotateY(0deg); }
	to { transform: rotateY(90deg); }
}

@keyframes flip-in {
	from { transform: rotateY(90deg); }
	to { transform: rotateY(0deg); }
}
</style>
