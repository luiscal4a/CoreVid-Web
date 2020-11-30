<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success" class="mynav">
      <b-navbar-brand href="#">COREVID</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="logged">
          <b-nav-item href="/workspaceCatalogue">Catálogo</b-nav-item>
          <b-nav-item href="/workspaceManagement" v-if="admin">Administración</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item right href="/login" v-if="!logged">Iniciar sesión</b-nav-item>
          <b-nav-item right href="/register" v-if="!logged">Registro</b-nav-item>
          <b-nav-item right @click="signout" v-if="logged">Cerrar sesión</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { themeService } from "@/services/themeService";
export default {
  data() {
    return {
      theme: localStorage.getItem("theme") || "light",
    };
  },

  methods: {
    signout() {
      localStorage.removeItem("user-token");
      this.$router.push({
        path: "/login",
      });
    },
  },
  props: {
    logged: Boolean,
    admin: Boolean
  },
  created() {
    themeService.getTheme().subscribe((theme) => (this.theme = theme));
  },
};
</script>

<style scoped>
.mynav {
    margin-bottom: 30px;
}
</style>
