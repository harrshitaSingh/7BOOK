import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Post from "../../components/PostComponents/Post";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading/Loading";
import { useAlert } from "react-alert";
import "./SearchScreen.css";
const YourPosts = () => {
  const alert = useAlert();
  const location = useLocation();

  const { query, category } = location.state;

  //States
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  //UseEffect
  useEffect(() => {
    async function fetchAllPosts() {
      try {
        let fetch_posts = await axios.post("/api/searchposts", {
          query,
          category,
        });
        if (loading) {
          const data = Array.from(fetch_posts.data);
          setLoading(false);
          setPosts(data);
        }
      } catch (err) {
        const msg = err.response ? err.response.data.message : err;
        alert.show(msg, { type: "error" });
        console.log(msg);
      }
    }
    fetchAllPosts();
    return () => {
      setLoading(false);
    };
  }, []);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Return value
  return (
    <div className="px-5 ">
      <div className="">
        {posts === null ? (
          <div>No Post Found</div>
        ) : posts.length === 0 ? (
          <div>No Post Found</div>
        ) : (
          <Post posts={currentPosts} loading={loading} heading="Post Results" />
        )}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default YourPosts;
