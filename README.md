# cadastro-usuario

## Introduction
O projeto foi desenvolvido para realização de cadastro simples de usuários, CRUD básico com Vue.js e Firebase.
Os componentes estão localizados na pasta "components", as telas estão na pasta "views" e na pasta "config" estão alguns arquivos de configurações: bootstrap, banco de dados, toast, rotas e vuex.

- O projeto tem apenas duas telas, uma home e outra de usuario, apenas para demostração de rotas.
- Foi utilizado o vuex para mudança de estado dos componentes UsuarioEdit e UsuarioTable.
- Para a exibição de mensagens de erro e sucesso, foi utilizado o Toasted. 
- As configurações do Firebase se encontram no arquivo db.js localizado na pasta src/config.
- No layout foi utilizado o bootstrap
- Foi aplicado um efeito de transition na mudança de estado dos componentes UsuarioTable e UsuarioEdit. Será possível perceber ao cadastrar ou editar um usuário.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
