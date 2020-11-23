<template>
  <div>
    <topnavbar :logged="true" :admin="isAdmin"></topnavbar>
    <div v-if="loaded" class="col d-flex justify-content-center">
      <active v-if="isActive" :user="user" :workspace="workspace" @recharge="getUserId" class="myWP"></active>
      <catalogue v-else @recharge="getUserId"></catalogue>
    </div>
  </div>
</template>

<script>
import topnavbar from "../components/Navbar2.vue";
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
      isAdmin: false,
      loaded: false
    }
  },

  methods: {
    getUserId() {
      axios
        .post(`192.168.0.32:3003/user/getUserIdByToken`, {
          token: localStorage.getItem("user-token")
        }, this.config)
        .then(response => {
          this.checkActive(response.data)
        })
        .catch(e => {
          this.errors.push(e);
          this.loaded=true
        });
    },
    checkActive(userId){
      axios
      .get(`192.168.0.32:3003/record/isActive/`+userId, this.config)
      .then(response => {
        this.workspace = response.data.workspace
        this.user = response.data.user
        this.isAdmin = this.user.role === "admin"
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
