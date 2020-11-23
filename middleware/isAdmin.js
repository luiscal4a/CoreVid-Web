import axios from "axios";

export default function ({ store, redirect }) {
    // If the user is not authenticated
    let config = { headers: { Authorization: 'Bearer '+localStorage.getItem("user-token") } }
    axios.get(`apicovid19.coredumped.es/user/isAdmin`, config)
    .catch(e => {
			return redirect('/login')
    })
  }