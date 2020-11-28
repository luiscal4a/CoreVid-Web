<template>
  <div class="workspace-area">
    <b-card
    :title="getTextMe"
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
        <b-card-text>
        Recuerda pulsar el botón "Abandonar espacio" cuando te vayas a ir
        </b-card-text>

        <b-button v-on:click="leave()" variant="danger">Abandonar espacio</b-button>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            config: {
                headers: { Authorization: "Bearer " + localStorage.getItem("user-token") }
            }
        };
    },

    computed: {
        getTextMe() {
            return 'Tienes asignado el espacio \"' +  this.workspace.name + '\"'
        }
    },

    props: {
        workspace: Object,
        user: Object
    },

    methods: {
        leave() {
            this.createExitRecord()            
        },
        createExitRecord() {
            let localThis = this;
            axios.post("https://apicovid19.coredumped.es/record/", {
                    user: this.user._id,
                    workspace: this.workspace._id,
                    left: true,
                    active:false
                }, this.config)
                .then(function(response) {
                    localThis.leaveWorkspace()
                })
                .catch(function(err) {
                    alert(err);
                });
        },
        leaveWorkspace() {
            let localThis = this;
            axios.get("https://apicovid19.coredumped.es/record/leaveActive/"+this.user._id, this.config)
                .then(function(response) {
                    localThis.freeWorkspace()
                })
                .catch(function(err) {
                    alert(err);
                });
        },
        freeWorkspace() {
            let localThis = this;
            axios.get("https://apicovid19.coredumped.es/workspace/free/"+this.workspace._id, this.config)
                .then(function(response) {
                    localThis.recharge()
                })
                .catch(function(err) {
                    alert(err);
                });
        },
        recharge() {
            this.$emit('recharge')
        }
    }
}
</script>
