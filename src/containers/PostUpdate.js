import React, { useState , useRef} from 'react';
import { Header, Button, Form ,  Image, Divider } from "semantic-ui-react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Redirect, useParams } from "react-router-dom";
import {api} from '../api';
import { useFetch } from '../helpers';

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { history } from "../helpers";
import { authAxios } from '../services'



function PostUpdateForm({ postSlug ,initialTitle , initialContent , initialThumbnail}) {
    

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const [title, setTitle] = useState(initialTitle);
    const [markdown, setMarkdown] = useState(initialContent);
    const [thumbnail, setThumbnail] = useState(null);
    const [currentThumbnail,setCurrentThumbnail] = useState(initialThumbnail);
  
    const mdParser = new MarkdownIt();
  
  
    const fileInputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
    
        console.log(markdown);
    
        const formData = new FormData();
        if (thumbnail){
            formData.append("thumbnail", thumbnail);
        }
        
        formData.append("content", markdown);
        formData.append("title", title);


        console.log(formData);
    
        authAxios
          .put(api.posts.update(postSlug), formData, {
            headers: {
              "Content-Type": "multipart/form-data",
             
            },
          })
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
        <div>
        <Header>Update a Post</Header>
        {error && <Message negative message={error} />}
        {currentThumbnail && <Image src={currentThumbnail} size="small" />}
        <Divider/>
        <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder="Title of your post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Field>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={({text})=> setMarkdown(text)}
          value={markdown}
        />

        <Form.Field>
          <Button
            fluid
            type="button"
            content="choose a thumbnail"
            labelPosition="left"
            icon="file"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </Form.Field>
        <Button
          primary
          fluid
          loading={loading}
          disabled={loading}
          type="submit"
        >
          Submit
        </Button>
      </Form>
        </div>
    )
}

const PostUpdate = () => {

    

    const { postSlug } = useParams();
    const {data,loading,error} = useFetch(api.posts.retrieve(postSlug))

    if(data && data.is_author === false){
      return <Redirect to="/" />
    }

    return(
        <>
        {error && <Message negative message={error} />}
        {loading && <Loader />}
        {data && <PostUpdateForm 
            postSlug ={postSlug}
            initialTitle = {data.title}
            initialContent={data.content}
            initialThumbnail={data.thumbnail}
        
        />}
        </>
    )
  

}

export default PostUpdate
