import React from "react";
import RecentPosts from "../PostComponents/RecentPosts";
import Search from "../Search/Search";
const Sidebar = ({ postTitles }) => {
  return (
    <>
      <div>
        <h2 className="text-center">Sidebar</h2>
        <Search />
        <RecentPosts postTitles={postTitles} />
      </div>
    </>
  );
};

export default Sidebar;
