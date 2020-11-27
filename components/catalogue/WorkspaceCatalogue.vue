<template>
  <div class="workspace-area">
    <div class="title">
      Elección ideal de espacio
    </div>
    <hr>
    <div class="text-center">
      <button type="button" class="btn btn-success workspace-button" v-on:click="getIdeal()">
        Consigue tu espacio ideal
      </button>
    </div>
    <div class="title">
      Elección personalizada de espacio
    </div>
    <hr>
    <div class="text-center">
      <button type="button" class="btn btn-dark workspace-button" v-for="workspace in workspaces" 
        :key="workspace.id" v-on:click="method_1(workspace)">
        {{ workspace.name }}
      </button>
    </div>
    <!--
    <div class="title">
      Leyenda de espacios de trabajo
    </div>
    <hr>
    <b-img src="@/assets/planif1.png" fluid center alt="Plano de la asociación"> </b-img>  
    -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      errors: [],
      workspaces: [],
      config: {},
      userId: ''
    };
  },

   methods: {
    method_1: function(workspace) {
      this.reserveSpace(workspace._id)
    },
    getIdeal: function() {
      let localThis = this;
      axios
        .get(`http://localhost:3003/workspace/ideal`, this.config)
        .then(response => {
            localThis.reserveSpace(response.data._id)
          })
          .catch(e => {
            this.errors.push(e);
          });
     },
     reserveSpace(id) {
      let localThis = this;
      axios
        .put("http://localhost:3003/workspace/reserve/"+id, {
          available: false,
        }, this.config)
        .then(function(response) {
          localThis.createRecord(id)
        })
        .catch(function(err) {
          alert(err);
        });
     },
     createRecord(id) {
       let localThis = this;
        axios
          .post("http://localhost:3003/record/", {
            user: this.userId,
            workspace: id,
            left: false
          }, this.config)
          .then(function(response) {
            localThis.$emit('recharge')
          })
          .catch(function(err) {
            alert(err);
          });
     }
  },

  mounted() {
    this.config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("user-token") }
    };
    axios
      .get(`http://localhost:3003/workspace/available`, this.config)
      .then(response => {
        this.workspaces = response.data.workspace.sort(function(a, b) {
          return a.priority - b.priority;
        });
      })
      .catch(e => {
        this.errors.push(e);
      });

    axios
      .post(`http://localhost:3003/user/getUserIdByToken`, {
        token: localStorage.getItem("user-token")
      }, this.config)
      .then(response => {
        this.userId = response.data
      })
      .catch(e => {
        this.errors.push(e);
      });
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
