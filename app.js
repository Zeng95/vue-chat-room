  // Set the configuration for the app
// Initialize Firebase
const config = {
  apiKey: "AIzaSyACEg3iRdEiOvAUItym5UYsDYzhzNdEqcs",
  authDomain: "vue-chat-room-3c40b.firebaseapp.com",
  databaseURL: "https://vue-chat-room-3c40b.firebaseio.com",
  projectId: "vue-chat-room-3c40b",
  storageBucket: "vue-chat-room-3c40b.appspot.com",
  messagingSenderId: "473992584450"
};
firebase.initializeApp(config);

  // Get a reference to the database service
const database = firebase.database()

new Vue({
  el: "#chat",

  data: {
    messages: [],
    messageText: '',
    nickname: 'hootlex'
  },

  methods: {
    storeMessage () {
      this.messages.push({ text: this.messageText, nickname: this.nickname })
      this.messageText = ''
    }
  },

  created () {
    database.ref('messages').on('child_added', (snapshot) => {
      this.messages.push(snapshot.val())
    })
  }
})