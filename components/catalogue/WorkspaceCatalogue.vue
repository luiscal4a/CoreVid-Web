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
    <div class="title">
      Leyenda de espacios de trabajo
    </div>
    <hr>
    <b-img src="@/assets/planif1.png" fluid center alt="Plano de la asociación"> </b-img>  
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
      axios
        .get(`http://localhost:3003/workspace/ideal`, this.config)
        .then(response => {
            console.log(response.data)
            this.reserveSpaceresponse.data._id
          })
          .catch(e => {
            console.log(e)
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
          console.log(response.data);
          localThis.createRecord(id)
        })
        .catch(function(err) {
          alert(err);
        });
     },
     createRecord(id) {
        axios
          .post("http://localhost:3003/record/", {
            user: this.userId,
            workspace: id,
            left: false
          }, this.config)
          .then(function(response) {
            console.log(response.data);
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
        console.log(response.data)
        this.workspaces = response.data.workspace.sort(function(a, b) {
          return a.priority - b.priority;
        });
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e);
      });

    axios
      .post(`http://localhost:3003/user/getUserIdByToken`, {
        token: localStorage.getItem("user-token")
      }, this.config)
      .then(response => {
        console.log(response.data)
        this.userId = response.data
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
    margin-top: 75px;
  }
}
@media screen and (max-width: 768px) {
  .workspace-area {
    margin-bottom: 75px;
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
