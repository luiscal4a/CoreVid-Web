<template>
  <div>
      <topnavbar></topnavbar>
      <div class="workspace-area">
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
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
  </tbody>
</table>
  </div>
  </div>
</template>

<script>
import topnavbar from '../components/Navbar.vue'

export default {
  
  //middleware: 'isAdmin',
  components: {
    topnavbar
  },
   data() {
    return {
      search: {
        query: '',
        params: []
      }
    }
  },
  methods: {
    onSearch(data) {
      this.search = data; 
    }
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