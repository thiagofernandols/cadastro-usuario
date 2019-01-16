<template>
  <div>
    <b-form @submit="salvar" @reset="cancelar" v-if="show">
      <b-form-group>
        <b-row>
          <b-col sm="6">
            <b-form-input id="nome" type="text" v-model="form.nome" required placeholder="Nome *"></b-form-input>
          </b-col>
          <b-col sm="6">
            <b-form-input id="email" type="email" v-model="form.email" required placeholder="E-mail *"> </b-form-input>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group>
        <b-row>
          <b-col sm="6">
            <b-form-input id="dtNascimento" v-mask="'##/##/####'" type="text" v-model="form.dtNascimento" placeholder="Data de Nascimento"></b-form-input>
          </b-col>
          <b-col sm="6">
            <b-form-input id="senha" type="password" v-model="form.senha" required placeholder="Senha *"> </b-form-input>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group>
        <b-row>
          <b-col sm="6">
            <b-form-select id="uf" :options="estados" v-model="form.uf"/>
          </b-col>
          <b-col sm="6">            
            <b-form-select id="cidade" :options="cidades" v-model="form.cidade"/>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group>
        <b-row>
          <b-col sm="6">
            <b-form-input id="logradouro" type="text" v-model="form.logradouro" placeholder="Logradouro"> </b-form-input>
          </b-col>
          <b-col sm="6">
            <b-form-input id="telefones" type="text" v-mask="'(##)####-####'" v-model="form.telefones" placeholder="Telefone"> </b-form-input>
          </b-col>
        </b-row>
      </b-form-group>
      <b-button type="submit" variant="primary" class="mr-2">Salvar</b-button>
      <b-button type="reset" variant="danger">Cancelar</b-button>
    </b-form>
  </div>
</template>

<script>
import { db } from '../../config/db'
import axios from 'axios'

export default {
  name: 'UsuarioEdit',
  created() {
    if (this.$store.state.usuario) {
      this.form = {
        nome: this.$store.state.usuario.nome,
        email: this.$store.state.usuario.email,
        senha: this.$store.state.usuario.senha,
        dtNascimento: this.$store.state.usuario.dtNascimento,
        uf: this.$store.state.usuario.uf,
        cidade: this.$store.state.usuario.cidade,
        logradouro: this.$store.state.usuario.logradouro,
        telefones: this.$store.state.usuario.telefones
      }  
    }
  },
  data () {
    return {
      form: {
        nome: '',
        email: '',
        senha: '',
        dtNascimento: '',
        uf: '',
        cidade: '',
        logradouro: '',
        telefones: '', 
      },
      show: true,
      estados: [],
      cidades: [{value: '' , text: 'Selecione a cidade'}]
    }
  },
  methods: {
    getEstados() {
      axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/").then(res => {
          this.estados = res.data.map(estado => {
              return { ...estado, value: estado.id, text: estado.nome }
          })
          this.estados.unshift({value: '' , text: 'Selecione o estado'})
      })
    },
    getCidades(idUF) {
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idUF}/municipios`).then(res => {
          this.cidades = res.data.map(cidade => {
              return { ...cidade, value: cidade.id, text: cidade.nome }
          })
          this.cidades.unshift({value: '' , text: 'Selecione a cidade'})
      })
    },
    salvar(evt) {
      evt.preventDefault()
      if (!this.$store.state.usuario)
        db.ref('users').push(this.form).then(() => { this.$toasted.global.defaultSuccess() });
      else
        db.ref('users').child(this.$store.state.usuario['.key'])
                        .set(this.form)
                        .then(() => { this.$toasted.global.defaultSuccess({ msg :'Usuário alterado com sucesso!'}) })
      this.$store.commit('setModoListaUsuario')
    },
    cancelar (evt) {
      evt.preventDefault()
      this.form = {}
      this.show = false;
      this.$nextTick(() => { this.show = true })
      this.$store.commit('setModoListaUsuario')
    }
  },
  mounted() {
      this.getEstados()
  },
  watch:{
    "form.uf": {
      handler(newValue) {
        this.getCidades(newValue);
      }
    }
  }
}
</script>