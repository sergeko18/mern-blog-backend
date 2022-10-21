import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(7);

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not find the tags",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec(); //Connected relationship from PostModel ".populate("user").exec();"
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not find the posts",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id; // Getting "id" from URL params

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Post did not delete",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Post is not found",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not find the posts",
    });
  }
};

export const getOne = (req, res) => {
  try {
    const postId = req.params.id; // Getting "id" from URL params

    PostModel.findOneAndUpdate(
      {
        _id: postId, // 1) Find by params
      },
      {
        $inc: { viewsCount: 1 }, // 2) How much I wanted to add to selected params
      },
      {
        returnDocument: "after", // 3) We said we'll return doc after $inc
      },
      (err, doc) => {
        // 4) The function will be run after all and return doc or error
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Could not find the post",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Post did not find ",
          });
        }
        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not find the posts",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not posted",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id; // Getting "id" from URL params

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Post is not updated",
    });
  }
};
