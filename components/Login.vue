<template>
  <div>
    <b-card class="col-md-6 mx-auto card">
      <img class="card-img-top" src="~/assets/logo.png" />
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group id="input-group-1" label="Nombre de usuario:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.username"
            required
            placeholder="Introduce tu nombre de usuario"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Contraseña:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.password"
            required
            type="password"
            placeholder="Introduce tu contraseña"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" block variant="success">Submit</b-button>
      </b-form>
      <p class="font-small grey-text d-flex justify-content-end">
        ¿Aún no eres miembro?
        <a href="/register" class="blue-text ml-1">Regístrate</a>
      </p>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.login();
    },
    login() {
      let localThis = this;
      axios
        .post("https://apicovid19.coredumped.es/user/log", {
          userName: localThis.form.username,
          password: localThis.form.password
        })
        .then(function(response) {
          localStorage.setItem("user-token", response.data.token);
          localStorage.setItem("user-name", localThis.form.username);
          localThis.changePage();
        })
        .catch(function(err) {
          localStorage.removeItem("user-token");
          alert(err);
        });
    },
    changePage() {
      this.$router.push({
        path: "/workspaceCatalogue"
      });
    }
  }
};
</script>

<style scoped>
.card-img-top {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
.card {
  margin-top: 150px;
}
.grey-text {
  margin-top: 10px;
}
</style>
