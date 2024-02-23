import QuestionLikes from "../../models/QuestionLikes.js";
import Question from "../../models/Question.js";

const questionLikes = async (req, res) => {
  const { questionId } = req.params;
  const { user_id } = req.body;

  const likeItem = { user_id, question_id: questionId };

  const existingQuestionLike = await QuestionLikes.findOne(likeItem);

  if (existingQuestionLike) {
    try {
      await QuestionLikes.deleteOne(likeItem);
      await Question.findByIdAndUpdate(questionId, {
        $inc: { like_counter: -1 },
      });
      res.status(200).json({ success: true, likeItem: null });
    } catch (error) {
      res
        .status(501)
        .json({ success: false, msg: "Something went wrong, try again!" });
    }
    return;
  }

  try {
    const newQuestionLike = new QuestionLikes(likeItem);
    await newQuestionLike.save();
    await Question.findByIdAndUpdate(questionId, {
      $inc: { like_counter: 1 },
    });

    res.status(200).json({ success: true, likeItem });
  } catch (error) {
    res
      .status(501)
      .json({ success: false, msg: "Can not add like, try again!" });
  }
};
export default questionLikes;
