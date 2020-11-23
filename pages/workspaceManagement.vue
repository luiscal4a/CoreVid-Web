<template>
  <div>
      <topnavbar :logged="true" :admin="true"></topnavbar>
      <div class="workspace-area">
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Acción</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellidos</th>
      <th scope="col">Espacio de trabajo</th>
      <th scope="col">Fecha</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="record in records" 
        :key="record._id">
        <th v-if="record.left == false" scope="row"><font-awesome-icon class="fa-2x" icon="sign-in-alt" :style="{ color: 'green' }"/></th>
        <th v-else scope="row"><font-awesome-icon class="fa-2x" icon="sign-out-alt" :style="{ color: 'red' }"/></th>
        <td>{{ record.user.firstName }}</td>
        <td>{{ record.user.lastName }}</td>
        <td>{{ record.workspace.name }}</td>
        <td>{{ getHumanDate(record.creation) }}</td>
    </tr>
    <!--
    <tr>
      <th scope="row"><font-awesome-icon class="fa-2x" icon="sign-in-alt" :style="{ color: 'green' }"/></th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row"><font-awesome-icon class="fa-2x" icon="sign-in-alt" :style="{ color: 'green' }"/></th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row"><font-awesome-icon class="fa-2x" icon="sign-out-alt" :style="{ color: 'red' }"/></th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
    -->
  </tbody>
</table>
  </div>
  </div>
</template>

<script>
import topnavbar from '../components/Navbar2.vue'
import axios from "axios";
import moment from 'moment'

export default {
  
  middleware: 'isAdmin',
  components: {
    topnavbar
  },
   data() {
    return {
      records: []
    }
  },

  methods: {
    getHumanDate : function (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss');
    }
  },

  mounted() {
    this.config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("user-token") }
    };
    axios
      .get(`192.168.0.32:3003/record/`, this.config)
      .then(response => {
        this.records = response.data.sort(function(a, b) {
          return new Date(a.creation) - new Date(b.creation);
        });
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
}
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

</style>