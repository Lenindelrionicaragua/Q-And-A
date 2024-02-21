// import QuestionLikes from "../../models/QuestionLikes.js";
// import Question from "../../models/Question.js";

// async function toggleUserLike(req, res) {
//   const questionId = req.params.questionId;
//   const userId = req.body.userId;

//   // console.log("questionId", questionId);
//   // console.log("userId", userId);

//   let questionItem;

//   try {
//     questionItem = await Question.findById(questionId);
//   } catch (error) {
//     res
//       .status(501)
//       .json({ success: false, msg: "Something went wrong try again!" });
//     return;
//   }

//   const { like_counter, like_ids } = questionItem;
//   let users_ids = like_ids || [];
//   const count = 1;

//   if (users_ids.includes(userId)) {
//     users_ids.filter((id) => id !== userId);

//     try {
//       await Question.updateOne(
//         { _id: questionId },
//         { $set: { like_counter: like_counter - count, like_ids: users_ids } }
//       );
//       res.status(200).json({ success: true, result: users_ids });
//     } catch (error) {
//       res
//         .status(501)
//         .json({ success: false, msg: "Something went wrong try again!" });
//     }
//     return;
//   }

//   try {
//     users_ids.push(userId);
//     await Question.findByIdAndUpdate(questionId, {
//       ...questionItem,
//       like_counter: like_counter + count,
//       like_ids: users_ids,
//     });
//     // await Question.updateOne(
//     //   { _id: questionId },
//     //   { $set: { like_counter: like_counter + count, like_ids: users_ids } }
//     // );
//     res.status(200).json({ success: true, result: users_ids });
//   } catch (error) {
//     res
//       .status(501)
//       .json({ success: false, msg: "Something went wrong try again!" });
//   }
// }

// export default toggleUserLike;

// export const toggleUserLike = async (req, res) => {
//   const { questionId } = req.params;
//   const { user_id } = req.body;
//   const currentUser = "";
//   try {
//     const isQuestionBelongsToUser =
//       (await Question.findOne({
//         user_id: currentUser,
//         question_id: questionId,
//       })) != null;

//     if (isQuestionBelongsToUser) {
//       logInfo("this question belongs to user");
//       res
//         .status(400)
//         .json({ success: false, message: "User cannot like its own question" });
//     }
//     const existingLike = await QuestionLikes.findOne({ user_id, questionId });

//     if (existingLike) {
//       await QuestionLikes.deleteOne({ user_id, questionId });
//       await Question.findByIdAndUpdate(questionId, {
//         $inc: { like_counter: -1 },
//       });
//     } else {
//       const newLike = new QuestionLikes({ user_id, question_id: questionId });
//       await newLike.save();
//       await Question.findByIdAndUpdate(questionId, {
//         $inc: { like_counter: 1 },
//       });
//     }

//     const { like_counter } = await questionId
//       .findOne({ question_id: questionId })
//       .select("like_counter")
//       .lean();

//     res.json({
//       success: true,
//       result: { likeCounter: like_counter, isLiked: !existingLike },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Something went wrong" });
//   }
// };

import QuestionLikes from "../../models/QuestionLikes.js";
import Question from "../../models/Question.js";
import { logInfo } from "../../util/logging.js";

// export const toggleUserLike = async (req, res) => {
//   try {
//     const { questionId } = req.params;
//     const { user_id } = req.body;

//     // Check if the user is the owner of the question
//     const isQuestionBelongsToUser = await Question.exists({
//       user_id: user_id,
//       question_id: questionId,
//     });

//     if (isQuestionBelongsToUser) {
//       logInfo("User cannot like their own question");
//       return res.status(400).json({
//         success: false,
//         message: "User cannot like their own question",
//       });
//     }

//     // Check if the user has already liked the question
//     const existingLike = await QuestionLikes.findOne({ user_id, questionId });

//     if (existingLike) {
//       // User has already liked the question, remove the like
//       await QuestionLikes.deleteOne({ user_id, questionId });
//       await Question.findByIdAndUpdate(questionId, {
//         $inc: { like_counter: -1 },
//       });
//     } else {
//       // User has not liked the question, add a like
//       const newLike = new QuestionLikes({ user_id, question_id: questionId });
//       await newLike.save();
//       await Question.findByIdAndUpdate(questionId, {
//         $inc: { like_counter: 1 },
//       });
//     }

//     // Retrieve the updated like counter
//     const { like_counter } = await Question.findOne({ question_id: questionId })
//       .select("like_counter")
//       .lean();

//     // Send the response
//     res.json({
//       success: true,
//       result: { likeCounter: like_counter, isLiked: !existingLike },
//     });
//   } catch (error) {
//     logInfo("Error:", error);
//     res.status(500).json({ success: false, message: "Something went wrong" });
//   }
// };

// import QuestionLikes from "../../models/QuestionLikes.js";
// import Question from "../../models/Question.js";
// const toggleUserLike = async (req, res) => {
//   const { questionId } = req.params;
//   const { user_id } = req.body;
//   const currentUser = "";

//   try {
//     const isQuestionBelongsToUser =
//       (await Question.findOne({
//         user_id: currentUser,
//         question_id: questionId,
//       })) != null;

//     if (isQuestionBelongsToUser) {
//       logInfo("this question belongs to user");
//       res
//         .status(400)
//         .json({ success: false, message: "User cannot like its own question" });
//     }
//     const existingLike = await QuestionLikes.findOne({ user_id, questionId });

//     if (existingLike) {
//       await QuestionLikes.deleteOne({ user_id, questionId });
//       await Question.findByIdAndUpdate(questionId, {
//         $inc: { like_counter: -1 },
//       });
//     } else {
//       const newLike = new QuestionLikes({ user_id, question_id: questionId });
//       await newLike.save();
//       await Question.findByIdAndUpdate(questionId, {
//         $inc: { like_counter: 1 },
//       });
//     }

//     const { like_counter } = await questionId
//       .findOne({ question_id: questionId })
//       .select("like_counter")
//       .lean();

//     res.json({
//       success: true,
//       result: { likeCounter: like_counter, isLiked: !existingLike },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Something went wrong" });
//   }
// };
// export default toggleUserLike;

export const toggleUserLike = async (req, res) => {
  const { questionId } = req.params;
  const { user_id } = req.body;
  const currentUser = "";
  try {
    const isQuestionBelongsToUser =
      (await Question.findOne({
        user_id: currentUser,
        question_id: questionId,
      })) != null;

    if (isQuestionBelongsToUser) {
      logInfo("Question belongs to user");
      res
        .status(400)
        .json({ success: false, message: "User cannot like its own question" });
    }
    const existingLike = await QuestionLikes.findOne({ user_id, questionId });

    if (existingLike) {
      await QuestionLikes.deleteOne({ user_id, questionId });
      await Question.findByIdAndUpdate(questionId, {
        $inc: { like_counter: -1 },
      });
    } else {
      const newLike = new QuestionLikes({ user_id, question_id: questionId });
      await newLike.save();
      await Question.findByIdAndUpdate(questionId, {
        $inc: { like_counter: 1 },
      });
    }

    const { like_counter } = await Question.findOne({ question_id: questionId })
      .select("like_counter")
      .lean();

    res.json({
      success: true,
      result: { likeCounter: like_counter, isLiked: !existingLike },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export default toggleUserLike;
