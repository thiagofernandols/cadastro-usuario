<template>
  <div>
    <b-row>
        <b-button class="ml-3" variant="outline-primary" size="sm" @click="novo()">
          <i class="fa fa-plus"> Novo usuário</i>
        </b-button>
      </b-row>
      <br />
      <b-table hover striped :fields="fields" :items="usuarios" >
        <template slot="actions" slot-scope="data">
          <b-button variant="outline-secondary" size="sm" v-b-tooltip.hover title="Alterar" @click="editar(data.item)" class="mr-2">
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button variant="outline-danger" size="sm" v-b-tooltip.hover title="Excluir" @click="remover(data.item)"  class="mr-2">
            <i class="fa fa-trash"></i>
          </b-button>
          <b-button variant="outline-warning" size="sm" v-b-tooltip.hover title="Alterar senha" v-b-modal.modal1 @click="setUsuario(data.item)">
            <i class="fa fa-lock"></i>
          </b-button>
        </template>
      </b-table>
      <div>        
        <b-modal id="modal1" ref="modal" title="Alterar Senha" @ok="handleOk" @shown="clearSenhaNova">
          <form @submit.stop.prevent="handleSubmit">
            <b-form-input type="password" placeholder="Nova senha" v-model="senhaNova"></b-form-input>
          </form>
        </b-modal>
      </div>
      
  </div>
</template>

<script>
import { db } from '../../config/db';
export default {
  name: 'UsuarioTable',  
  firebase: {
    usuarios: db.ref('users')
  },
  data() {
    return {
      usuario: {},
      senhaNova: '',
      fields: [
        { key: "nome", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        { key: "dtNascimento", label: "Data Nascimento", sortable: true },
        { key: "telefones", label: "Telefone", sortable: true },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },
  methods: {
    setUsuario(usuario){
      this.usuario = usuario
    },
    novo(){
      this.$store.commit('setModoListaUsuario')
    },
    editar(usuario){
      this.$store.commit('setModoListaUsuario', usuario)
    },
    remover(usuario){
      db.ref('users').child(usuario['.key']).remove().then(() => { this.$toasted.global.defaultSuccess({ msg :'Usuário removido com sucesso!'}) });
    },
    clearSenhaNova () {
      this.senhaNova = ''
    },
    handleOk (evt) {
      evt.preventDefault()
      if (!this.senhaNova) {
        this.$toasted.global.defaultError({ msg :'Digite a nova senha'})
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      let item = {
        nome: this.usuario.nome,
        email: this.usuario.email,
        senha: this.senhaNova,
        dtNascimento: this.usuario.dtNascimento,
        uf: this.usuario.uf,
        cidade: this.usuario.cidade,
        logradouro: this.usuario.logradouro,
        telefones: this.usuario.telefones
      }  
      db.ref('users').child(this.usuario['.key']).set(item)
                      .then(() => { this.$toasted.global.defaultSuccess({ msg :'A senha foi alterada com sucess'}) })
      this.clearSenhaNova()
      this.$refs.modal.hide()
    }
  }
}
</script>