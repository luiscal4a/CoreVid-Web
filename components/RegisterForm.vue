<template>
  <div>
    <b-card class="col-md-6 mx-auto card">
      <img class="card-img-top" src="~/assets/logo.png" />
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Nombre de usuario:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.username"
            required
            placeholder="Introduce tu nombre de usuario"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Nombre:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="Introduce tu nombre"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Apellidos:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.lastName"
            required
            placeholder="Introduce tus apellidos"
          ></b-form-input>
        </b-form-group>

        <b-form-checkbox
          id="checkbox-1"
          class = "checkbox"
          v-model="student"
          name="checkbox-1"
          value=1
          unchecked-value=0
        >
          Soy estudiante
        </b-form-checkbox>

        <b-form-group v-if="student==1" 
        id="input-group-4" label="Número de matrícula:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.studentId"
            required
            maxLength=6
            placeholder="Introduce tu número de matrícula"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Contraseña:"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            v-model="form.password"
            required
            type="password"
            placeholder="Introduce tu contraseña"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Repite la contraseña:"
          label-for="input-6"
        >
          <b-form-input
            id="input-6"
            v-model="form.passwordRepeat"
            required
            type="password"
            placeholder="Repite la contraseña"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" block variant="success">Regístrate</b-button>
      </b-form>
      <p class="font-small grey-text d-flex justify-content-end">
        ¿Ya eres miembro?
        <a href="login" class="blue-text ml-1"> Inicia sesión</a>
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
        name: "",
        lastName: "",
        password: "",
        passwordRepeat: "",
        studentId: ""
      },
      student: 0,
      show: true,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.form.password === this.form.passwordRepeat) this.register();
      else alert("Passwords do not match");
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    register() {
      let localThis = this;
      let myForm = {
          userName: this.form.username,
          firstName: this.form.name,
          lastName: this.form.lastName,
          password: this.form.password,
        }
      if(this.student == 1)
        myForm["studentId"] = this.form.studentId
      axios
        .post("https://apicovid19.coredumped.es/user", myForm)
        .then(function (response) {
          localThis.changePage();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    changePage() {
      this.$router.push({
        path: "/login",
      });
    },
  },
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
  margin-top: 50px;
}
.grey-text {
  margin-top: 10px;
}

.checkbox {
  margin-bottom: 20px;
}
</style>