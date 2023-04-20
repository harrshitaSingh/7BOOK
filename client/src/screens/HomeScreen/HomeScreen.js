import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../../components/PostComponents/Post";
import Sidebar from "../../components/Sidebar/Sidebar";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading/Loading";
import { useAlert } from "react-alert";
import { Tabs, Tab } from "react-bootstrap";
import "./HomeScreen.css";
import YourPosts from "./YourPosts";
import PostNearYouScreen from "../PostsNearYou/PostNearYouScreen";
const HomeScreen = ({ isAuth }) => {
  const alert = useAlert();

  //States
  const [posts, setPosts] = useState([]);
  const [postTitles, setPostTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  //UseEffect
  useEffect(() => {
    async function fetchAllPosts() {
      try {
        let fetch_posts = await axios.get("/api/fetch_posts");
        if (loading) {
          const data = Array.from(fetch_posts.data);

          setLoading(false);
          setPosts(data);
          setPostTitles(data.map((post) => [post.title, post._id]).slice(0, 6));
        }
      } catch (err) {
        const msg = err.response ? err.response.data.message : err;
        alert.show(msg, { type: "error" });
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
    <div className="d-flex mainCont">
      <div className="posts">
        <Tabs
          defaultActiveKey="recentposts"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="recentposts" title="Recent Posts">
            <div className="">
              {posts === null ? (
                <Loading />
              ) : posts.length === 0 ? (
                <Loading />
              ) : (
                <Post
                  posts={currentPosts}
                  loading={loading}
                  heading="Recent Posts"
                />
              )}
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
              />
            </div>
          </Tab>
          <Tab eventKey="yourposts" title="Your Posts">
            {isAuth ? <YourPosts /> : <h2>Not Logged In</h2>}
          </Tab>
          <Tab eventKey="nearestposts" title="Posts near You">
            <PostNearYouScreen />
          </Tab>
        </Tabs>
      </div>
      <div className="sidebar mx-5">
        <Sidebar postTitles={postTitles} />
      </div>
    </div>
  );
};

export default HomeScreen;
