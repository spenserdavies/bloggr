<template>
<div class="home">
  <main>
    <header class="container-fluid">
      <div class="row my-3 d-flex">
        <div class="col-9 col-md-6 card shadow m-auto">
          <h5 class="text-center mt-2">Create a new blog post</h5>
          <form class="form" @submit.prevent="createBlog">
            <div class="form-group">
              <label for="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control"
                placeholder="Title.."
                aria-describedby="helpId"
                v-model="newBlog.title"
                required
              />
            </div>
            <div class="form-group">
              <label for="body">Body:</label>
              <textarea
                type="text"
                name="body"
                id="body"
                class="form-control"
                placeholder="Body.."
                rows="2"
                aria-describedby="helpId"
                v-model="newBlog.body"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <!-- <label for="published">Publish this Post</label> -->
              <!-- <input type="checkbox" id="published" name="published" class="form-check-input" v-model="newBlog.published"/> -->
            </div>
            <button class="btn-success btn mb-2">Submit</button>
          </form>
        </div>
      </div>
    </header>

    <body class="container-fluid">
      <div class="row">
        <div class="card shadow col-11 col-md-8 m-auto">
          <h3 class="text-center mt-2">Browse Blogs</h3>
          <hr>
          <div class="row" v-for="blog in blogs" :key="blog.id"> //TODO make blogs component
            <!-- TODO PUT THE v-FOR IN THIS ROW DIV -->
            <div class="col-11 pl-5">
              <router-link :to="{name:'Blog', params: {id: blog.id}}" class="pointer">
                <b>{{blog.title}}</b> -
                <small>by: {{blog.creatorEmail}}</small>
              </router-link>
            </div>
            <div class="col-1">
              <p class="text-danger pointer" @click="deleteBlog">X</p>
            </div>
          </div>
        </div>
      </div>
    </body>
  </main>
</div>
</template>

<script>


export default {
  name: "home",
  data() {
    return {
      newBlog: {}
    }
  },
  mounted(){
    this.$store.dispatch("getBlogs")
  },
  computed: {
    blogs() {
      return this.$store.state.blogs
    }
  },
  methods: {
    createBlog(){
      console.log(this.newBlog)
      this.$store.dispatch("createBlog", {...this.newBlog})
      this.newBlog = {};
    },
    deleteBlog(){
      this.$store.dispatch("deleteBlog", this.blog.id)
    }
  }
};
</script>







<style>
main {
  display: flex;
  flex-direction: column;
  min-height: 90.9vh;
}
body {
  flex-grow: 1;
}

.pointer {
  cursor: pointer;
}
</style>