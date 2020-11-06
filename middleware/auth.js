import axios from "axios";

export default function ({ store, redirect }) {
    // If the user is not authenticated
    console.log('Hello')
    console.log(localStorage.getItem("user-token"))
    let config = { headers: { Authorization: 'Bearer '+localStorage.getItem("user-token") } }
    axios.get(`http://localhost:3003/user/private`, config)
    .catch(e => {
      console.log(e)
			return redirect('/login')
    })
  }
  