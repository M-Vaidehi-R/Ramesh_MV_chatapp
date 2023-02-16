export default {
    name: 'User',
    props: ['user'],

    template: `
    <!-- creating a button to sign out  and  page to reload -->
        <div class="signout-button" v-if="joined">
            <button class="signout-button1" v-on:click="signout">Log Out</button>
        </div>
   
   <div v-if="!joined" class="parent-container">
        <div class="centerContainer">
            <div class="name-container">
                <h1 class="title">Welcome to the ChatApp</h1>
  
    
   <!-- username input -->
    <h2 class="uname">Username</h2>
        <input type="text" class="user-name" v-model="currentUser">
   <!-- password input -->
        <h2 class="uname">Password</h2>
            <input type="password" class="user-name">
   <!-- join button -->
        <button class="join-button" v-on:click="join">Join</button>
            </div>
         </div>
    </div>
   <!-- rendering welcome note once they join the chat -->
        <div class="welcome-note" v-if="joined">
            <h2>Welcome to the chat room, {{ currentUser }}!</h2>
        </div>
            <div v-if="joined">
    </div>
   
    
  `,

    data() {
        return {
          joined: false,
          currentUser: '',
        }
    },

    methods: {
        join() {
            this.joined = true;
            console.log(this.currentUser);
            // rendering the user name once they join the chat
            this.$emit('joined', this.currentUser);

            if (this.currentUser == '') {
                this.joined = false;
                alert('Please enter your details');

            }
            else {
                this.joined = true;

            }
        },

        signout() {

            this.joined = false;
            location.reload();
            },
            
    }



}
