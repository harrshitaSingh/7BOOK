import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SinglePost from "../../components/PostComponents/SinglePost";
import Loading from "../../components/Loading/Loading";
import { useAlert } from "react-alert";

const PostScreen = () => {
  const alert = useAlert();
  const [post, setPost] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    async function fetchPost() {
      try {
        const singlePost = await axios.post("/api/fetch_post", { id });
        setPost(singlePost.data);
      } catch (err) {
        const msg = err.response ? err.response.data.message : err;
        alert.show(msg, { type: "error" });
      }
    }
    fetchPost();
  }, []);
  return (
    <div id="mt">
      {post === null ? <Loading /> : <SinglePost post={post} />}
    </div>
  );
};

export default PostScreen;
