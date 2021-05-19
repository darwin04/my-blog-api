const uuid = require('uuid');
const moment = require('moment');

module.exports = {
  setCommonPostData: (req, post, isUpdate) => {
		return {
			id: isUpdate ? req.params.id : uuid.v4(),
			title: req.body.title,
			author: req.body.author,
			content: req.body.content,
			type: "post",
			dateTimeAdded: isUpdate ? post.dateTimeAdded : moment().format('YYYY-MM-DD hh:mm:ss'),
			dateTimeUpdated: isUpdate ? moment().format('YYYY-MM-DD hh:mm:ss') : ''
		};
	},
  setCommonCommentData: (req, comment, isUpdate) => {
		return {
			id: isUpdate ? req.params.id : uuid.v4(),
			postId: isUpdate ? comment.postId : req.body.postId,
			parentCommentId: isUpdate ? comment.parentCommentId : req.body.parentCommentId,
			author: req.body.autor,
			content: req.body.content,
			type: "comment",
			dateTimeAdded: isUpdate ? comment.dateTimeAdded : moment().format('YYYY-MM-DD hh:mm:ss'),
			dateTimeUpdated: isUpdate ? moment().format('YYYY-MM-DD hh:mm:ss') : ''
		};
	}
}