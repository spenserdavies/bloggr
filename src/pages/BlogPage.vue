<template>

  <div class="blog mt-3 container-fluid">
    <div class="row">
      <div class="col-10 px-5 m-auto card shadow">
        <h2 class="m-1 text-center">{{blog.blog.title}}</h2>
        <p class="m-1 text-center">by {{blog.blog.creator.name}}</p>
        <br>
        <p class="m-1 mb-3">{{blog.blog.body}}</p>
      </div>
      <div class="col-9 card mt-3 pb-3 shadow mx-auto">
        <h4 class="text-center mt-2">Comments</h4>
        <form @submit.prevent="addComment">
          <label for="body">Leave a comment!</label>
          <input
            type="text"
            class="col-12 mb-2"
            name="body"
            id="body"
            placeholder="new comment.."
            v-model="newComment.body"
          />
          <button class="btn btn-outline-success" type="submit">add comment</button>
        </form>
        <hr>
        
        <div>
          <div class="row" v-for="comment in comments" :key="comment.id">
            <div class="col-11">
              <h6>{{comment.body}}</h6>
            </div>
            <div class="col-1">
              <p class="pointer text-danger" @click="deleteComment(this.comment.id)">X</p>
            </div>
          </div>
          <hr>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog",
  mounted(){
    //console.log(this.blog.comments)
    this.$store.dispatch("getBlogById", this.$route.params.id)

  },
  data(){
    return {
      newComment: { //needs: creator email, body, blogId.
        creatorEmail: this.$store.state.profile.email,
        blogId: this.$route.params.id
      },
    }
  },
  computed: {
    blog(){
      return this.$store.state.activeBlog
    },
    comments(){
      return this.$store.state.activeBlog.comments
    }
  },
  methods: {
    addComment(){
      console.log(this.newComment)
     
      this.$store.dispatch("addComment", this.newComment)
    },
    deleteComment(commentId){
      this.$store.dispatch("deleteComment", commentId) //NOTE Check GREGSLIST FOR REMOVING API ITEM DISPATCH COMMANDS
    }
  }
}
</script>