const Post = require("../models/PostModel");
const Profile = require("../models/ProfileModel");
const User = require("../models/UserModel");
const { dataUri } = require("../middlewares/multer");
const { uploader } = require("../config/cloudinaryConfig");
const genreList = [
  { id: "61f0132429cbf76c5b4c7ebf", text: "Adult Fiction" },
  { id: "61f0133329cbf76c5b4c7ec0", text: "Horror" },
  { id: "61f0133f29cbf76c5b4c7ec1", text: "Fiction" },
  { id: "61f0134629cbf76c5b4c7ec2", text: "Fantasy" },
  { id: "61f0134d29cbf76c5b4c7ec3", text: "Mystery" },
  { id: "61f0135529cbf76c5b4c7ec4", text: "Politics" },
  { id: "61f0135c29cbf76c5b4c7ec5", text: "Science Fiction" },
  { id: "61f0136329cbf76c5b4c7ec6", text: "Thriller" },
  { id: "61f0136b29cbf76c5b4c7ec7", text: "War" },
  { id: "61f0137329cbf76c5b4c7ec8", text: "Art" },
  { id: "61f0137929cbf76c5b4c7ec9", text: "Biography" },
  { id: "61f0138029cbf76c5b4c7eca", text: "Business" },
  { id: "61f0138829cbf76c5b4c7ecb", text: "Classics" },
  { id: "61f0138f29cbf76c5b4c7ecc", text: "Comics" },
  { id: "61f0139529cbf76c5b4c7ecd", text: "Contemporary" },
  { id: "61f013a029cbf76c5b4c7ece", text: "Cookbooks" },
  { id: "61f013a629cbf76c5b4c7ecf", text: "Crime" },
  { id: "61f013ad29cbf76c5b4c7ed0", text: "History" },
  { id: "61f013b629cbf76c5b4c7ed1", text: "Humor and Comedy" },
  { id: "61f013c129cbf76c5b4c7ed2", text: "Memoir" },
];
exports.addPostController = (req, res) => {
  const { title, desc, bookTitle, author, interest, genre } = req.body;
  let genArr = genre.split(",");
  if (req.file) {
    const file = dataUri(req).content;
    return uploader
      .upload(file)
      .then((result) => {
        const imageUri = result.url;
        console.log(genre);
        console.log(typeof genre);
        console.log(genArr);
        Post.create(
          {
            title,
            desc,
            user_id: String(req.user._id),
            bookTitle,
            author,
            genre_id: genArr,
            interest,
            imageUri,
          },
          async (err, post) => {
            if (err) {
              console.log(err);
              return res.status(400).json({ message: "Invalid post data" });
            }
            return res.status(201).json({ message: "Post Added Successfuly" });
          }
        );
      })
      .catch((err) =>
        res.status(400).json({
          messge: "something went wrong while processing your request",
          data: {
            err,
          },
        })
      );
  }
};

exports.fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
    for (let i in posts) {
      let genreArr = [];
      posts[i].genre_id.map((genre) => {
        genreArr.push(genreList.filter((gen) => gen.id == genre)[0]);
      });
      posts[i] = {
        ...posts[i],
        genArr: genreArr,
      };
    }
    return res.status(201).send(posts);
  } catch (err) {
    return res.status(404).json({ message: "No Post Found" });
  }
};

exports.fetchPost = async (req, res) => {
  const { id } = req.body;
  try {
    const post = await Post.findById(id).lean();
    if (post) {
      let genreArr = [];
      post.genre_id.map((genre) => {
        genreArr.push(genreList.filter((gen) => gen.id == genre)[0]);
      });

      post.genArr = genreArr;
      return res.status(201).send(post);
    } else {
      return res.status(404).json({ message: "Post not Found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Some Error Occured" });
  }
};

exports.myPosts = async (req, res) => {
  if (req.user) {
    try {
      const myposts = await Post.find({ user_id: req.user.id }).lean();
      for (let i in myposts) {
        let genreArr = [];
        myposts[i].genre_id.map((genre) => {
          genreArr.push(genreList.filter((gen) => gen.id == genre)[0]);
        });
        myposts[i] = {
          ...myposts[i],
          genArr: genreArr,
        };
      }
      return res.status(201).send(myposts);
    } catch (err) {
      console.log(err);
      return res.status(404).send({ message: "No User Found" });
    }
  }
  console.log("No user");
  return res.status(500).send({ message: "Some Error Occured" });
};

exports.searchPosts = async (req, res) => {
  try {
    let { query, category } = req.body;
    let path;
    if (category == "Genre") {
      query = genreList.filter((genre) => genre.text == query)[0].id;
      path = "genre_id";
    } else {
      switch (category) {
        case "BookTitle":
          path = "bookTitle";
          break;
        case "Author":
          path = "author";
          break;
        case "PostTitle":
          path = "title";
          break;
      }
    }
    const queryRes = await Post.find({ [path]: query }).lean();
    for (let i in queryRes) {
      let genreArr = [];
      queryRes[i].genre_id.map((genre) => {
        genreArr.push(genreList.filter((gen) => gen.id == genre)[0]);
      });
      queryRes[i] = {
        ...queryRes[i],
        genArr: genreArr,
      };
    }
    return res.status(201).json(queryRes);
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "No Post Found" });
  }
};

exports.nearPosts = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const agg = Profile.aggregate([
      { $match: { latitude: { $gte: latitude - 0.5 } } },
      { $match: { latitude: { $lte: latitude + 0.5 } } },
      { $match: { longitude: { $gte: longitude - 0.5 } } },
      { $match: { longitude: { $lte: longitude + 0.5 } } },
    ]).group({ _id: "$user_id" });

    let posts = [];
    for await (const doc of agg) {
      const arr = await Post.find({ user_id: doc._id }).lean();
      for (let i in arr) {
        posts.push(arr[i]);
      }
    }
    for (let i in posts) {
      let genreArr = [];
      posts[i].genre_id.map((genre) => {
        genreArr.push(genreList.filter((gen) => gen.id == genre)[0]);
      });
      posts[i] = {
        ...posts[i],
        genArr: genreArr,
      };
    }
    return res.status(201).send(posts);
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "No Post Found" });
  }
};

exports.requestSwap = async (req, res) => {
  try {
    const username = req.user.name;
    const userid = req.user._id;
    const { postid } = req.body;
    const post = await Post.findOne({ _id: postid });
    const postTitle = post.title;
    const userTo = post.user_id;
    const user = await User.findOne({ _id: userTo });
    if (user._id.equals(userid)) {
      return res.status(400).send({ message: "Self Request" });
    }
    user.postRequests.push({ user: userid, postTitle, username });
    user.save();
    return res.status(201).send({ message: "Request Success" });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "Some Error Occured" });
  }
};

exports.myRequests = (req, res) => {
  try {
    return res.status(201).send(req.user.postRequests);
  } catch (err) {
    return res.status(404).send({ message: "Some Error Occured" });
  }
};
