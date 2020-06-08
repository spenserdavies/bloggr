import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    blogs: [],
    activeBlog: {},
    activeComments: [],
    usersBlogs: [],
    usersComments: [],
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBlogs(state, data){
      state.blogs = data
    },
    addBlog(state, data){
      state.blogs.push(data)
    },
    setActiveBlog(state, data){
      state.activeBlog = data
    },
    addComment(state, data){
      state.activeComments.push(data)
    },
    setActiveComments(state, data){
      state.activeComments = data
    },
    deleteComment(state, data){

    },
    getUsersBlogs(state, data){
      state.usersBlogs = data
    },
    getUsersComments(state, data){
      state.usersComments = data
    }
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBlogs({ commit, dispatch}) {
      try{
        let res = await api.get('blogs/')
        commit("setBlogs", res.data)
      } catch(error){
        console.error(error)
      }
    },
    //NOTE this one returns a blog and its comments
    async getBlogById({commit, dispatch}, id){
      try {
        let res = await api.get('blogs/' + id)
        commit("setActiveBlog", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createBlog({commit, dispatch}, data){
      try {
        let res = await api.post('blogs', data)
        commit("addBlog", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async delortBlorg({commit,dispatch}, id){
      try {
        let res = await api.delete("blogs/" + id)
        dispatch("getBlogs")
      } catch (error) {
        console.error(error)
      }
    },
    async getCommentByBlogId({commit, dispatch}, id){ //NOTE do i actually need this lol
      try {
        let res = await api.get('blogs/'+id)
        console.log(res.data.comments)
        commit("setActiveComments", res.data.comments)
      } catch (error) {
        console.error(error)
      }
    },
    async addComment({commit,dispatch}, data){
      try {
        let res = await api.post('comments/', data)
        commit("addComment", res.data)
      } catch (error) {
        console.error(error)
      }
    },
  },
});
