import axios from "axios";

export default function ({ store, redirect }) {
    // If the user is not authenticated
    let config = { headers: { Authorization: 'Bearer '+localStorage.getItem("user-token") } }
    axios.get(`https://apicovid19.coredumped.es//user/private`, config)
    .catch(e => {
			return redirect('/login')
    })
  }
  