<template>
  <div>
    <topnavbar ></topnavbar>
    <catalogue></catalogue>
  </div>
</template>

<script>
import topnavbar from "../components/Navbar.vue";
import catalogue from "../components/catalogue/WorkspaceCatalogue.vue";
import axios from "axios";

export default {
  middleware: "auth",
  components: {
    topnavbar,
    catalogue
  },
  data() {
    return {
      errors: [],
      workspaces: []
    }
  },

  mounted() {
    let config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("user-token") }
    };
    axios
      .get(`http://localhost:3003/workspace/available`, config)
      .then(response => {
        console.log(response.data)
        this.workspaces = response.data.workspace.sort(function(a, b) {
          return a.priority - b.priority;
        });
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e);
      });
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
