import axios from "axios";

export default function ({ store, redirect }) {
    // If the user is not authenticated
    if(localStorage.getItem("user-token")!=null) {
        let config = { headers: { Authorization: 'Bearer '+localStorage.getItem("user-token") } }
        axios.get(`apicovid19.coredumped.es/user/private`, config)
        .then((response) => {
            return redirect('/workspaceCatalogue')
        })
    }
}