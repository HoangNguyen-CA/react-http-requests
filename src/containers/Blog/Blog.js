import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
  };
  componentDidMount() {
    axios
      .get('/posts')
      .then((res) => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map((el) => ({ ...el, author: 'Hoang' }));
        this.setState({ posts: updatedPosts });
      })
      .catch((err) => console.log(err));
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    const posts = this.state.posts.map((el) => {
      return (
        <Post
          title={el.title}
          author={el.author}
          key={el.id}
          clicked={() => this.postSelectedHandler(el.id)}
        ></Post>
      );
    });
    return (
      <div>
        <section className='Posts'>{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
