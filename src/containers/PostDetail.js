import React, { useEffect, useState } from "react";
import { Container, Header, Image } from "semantic-ui-react";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import {api} from '../api';

function PostDetail() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postSlug } = useParams();


  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await axios.get(
          api.posts.retrieve(postSlug)
        );

        setPost(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Container text>
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      {post && (
        <div>
          <Image src={post.thumbnail} />
          <Header as='h1'>
              {post.title}
              
          </Header>
          <Header as='h4'>Last Updated:{`${new Date(post.last_updated).toLocaleDateString()}`}</Header>
          <p>{post.content}</p>
        </div>
      )}
    </Container>
  );
}

export default PostDetail;


