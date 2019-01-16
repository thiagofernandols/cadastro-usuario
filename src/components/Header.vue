<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="#">{{title}}</b-navbar-brand>
    </b-navbar>

    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/usuario">Usuario</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header",
  props: {
    title: String
  }
};
</script>
