import React, { useState } from "react";
import { Container, Header, Image , Divider, Button ,  Modal} from "semantic-ui-react";
import ReactMarkdown from 'react-markdown'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { NavLink, useParams } from "react-router-dom";
import {api} from '../api';
import { useFetch,history } from '../helpers';
import { authAxios } from '../services'

function DeleteModal({ thumbnail,title,postSlug}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
  
    setLoading(true);

    authAxios
      .delete(api.posts.delete(postSlug))
      .then((res) => {
      
        setLoading(false);
        // redirect back to postlist
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || err);
      });
  }


  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button secondary floated="right">Delete Post</Button>}
    >
      <Modal.Header>Delete Post</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={thumbnail} wrapped />
        <Modal.Description>
          <Header>{title}</Header>
          {error && <Message negative message={error} />}
          <p>
            Are you sure you want to delete this post?
          </p>
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          No
        </Button>
        <Button
          content="confirm delete"
          labelPosition='right'
          icon='checkmark'
          onClick={handleSubmit}
          positive
          loading={loading}
          disabled={loading}
        />
      </Modal.Actions>
    </Modal>
  )
}



function PostDetail() {

  const { postSlug } = useParams();
  const {data,loading,error} = useFetch(api.posts.retrieve(postSlug))


  return (
    <Container text style={{paddingTop:10 , paddingBottom:10}}>
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      {data && (
        <div>
          <Image src={data.thumbnail} />
          <Header as='h1'>
              {data.title}
              
          </Header>
          <Header as='h4'>Last Updated:{`${new Date(data.last_updated).toLocaleDateString()}`}</Header> 
          <ReactMarkdown source={data.content}/>
          <Divider/>
          {data.is_author &&(
            <>
            <NavLink to={`/posts/${postSlug}/update`}>
            <Button color='yellow' >
              update
            </Button>
            </NavLink>
            <DeleteModal postSlug={postSlug} title={data.title} thumbnail={data.thumbnail} />
            </>
          )}

        </div>
      )}
    </Container>
  );
}

export default PostDetail;


