import React, { useEffect, useState } from "react";
import { geolocated } from "react-geolocated";
import axios from "axios";
import Post from "../../components/PostComponents/Post";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading/Loading";
import { useAlert } from "react-alert";
const PostNearYouScreen = ({
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords,
}) => {
  const alert = useAlert();

  //States
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  //UseEffect
  useEffect(() => {
    async function fetchAllPosts() {
      try {
        let latitude, longitude;
        if (isGeolocationAvailable) {
          if (isGeolocationEnabled && coords !== null) {
            latitude = coords.latitude;
            longitude = coords.longitude;
            let fetch_posts = await axios.post("/api/nearposts", {
              latitude,
              longitude,
            });
            if (loading) {
              const data = Array.from(fetch_posts.data);
              setLoading(false);
              setPosts(data);
            }
          }
        }
      } catch (err) {
        const msg = err.response ? err.response.data.message : err;
        alert.show(msg, { type: "error" });
        console.log(msg);
      }
    }
    fetchAllPosts();
  }, [coords]);

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
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(PostNearYouScreen);
