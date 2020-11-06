<template>
  <div>
    <topnavbar ></topnavbar>
    <div v-if="loaded">
      <active v-if="isActive" :user="user" :workspace="workspace" @recharge="getUserId"></active>
      <catalogue v-else @recharge="getUserId"></catalogue>
    </div>
  </div>
</template>

<script>
import topnavbar from "../components/Navbar.vue";
import catalogue from "../components/catalogue/WorkspaceCatalogue.vue";
import active from "../components/catalogue/ActiveWorkspace.vue";
import axios from "axios";

export default {
  middleware: "auth",
  components: {
    topnavbar,
    catalogue,
    active
  },
  data() {
    return {
      errors: [],
      workspaces: [],
      user: {},
      workspace: {},
      config: {},
      isActive: false,
      loaded: false
    }
  },

  methods: {
    getUserId() {
      axios
        .post(`http://localhost:3003/user/getUserIdByToken`, {
          token: localStorage.getItem("user-token")
        }, this.config)
        .then(response => {
          this.checkActive(response.data)
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e);
          this.loaded=true
        });
    },
    checkActive(userId){
      axios
      .get(`http://localhost:3003/record/isActive/`+userId, this.config)
      .then(response => {
        console.log('hola')
        console.log(response)
        this.workspace = response.data.workspace
        this.user = response.data.user
        this.loaded=true
        this.isActive=true
      })
      .catch(e => {
        this.loaded=true
        this.isActive=false
        this.errors.push(e);
      });
    }
  },

  mounted() {
    this.config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("user-token") }
    };
    this.getUserId()
  }
};
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .workspace-area {
    margin-top: 68px;
  }
}
@media screen and (max-width: 768px) {
  .workspace-area {
    margin-bottom: 68px;
  }
}

.workspace-area {
  margin-right: 30px;
  margin-left: 30px;
}

.workspace-button {
  margin: 20px;
}

.title {
  color: var(--foreground-color-main);
  font-size: 24px;
  opacity: 0.9;
  display: block;
  margin-top: 20px;
}
</style>
