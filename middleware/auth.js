import axios from "axios";

export default function ({ store, redirect }) {
    // If the user is not authenticated
    let config = { headers: { Authorization: 'Bearer '+localStorage.getItem("user-token") } }
    axios.get(`192.168.0.32:3003/user/private`, config)
    .catch(e => {
			return redirect('/login')
    })
  }
  