const uuid = require('uuid');
const moment = require('moment');
const {  getItem } = require('../utils/storage');

module.exports = {
	/**
	 * Body of a post is similar for an initial post compared to an update. This function
	 * sets all the required data from the request body or the existing post information based
	 * on the isUpdate flag
	 * @param {object} req 
	 * @param {object} post 
	 * @param {boolean} isUpdate 
	 * @returns {object}
	 */
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
	/**
	 * Body of a comment is similar for an initial comment compared to an update. This function
	 * sets all the required data from the request body or the existing comment information based
	 * on the isUpdate flag
	 * @param {object} req 
	 * @param {object} comment 
	 * @param {boolean} isUpdate 
	 * @returns {object}
	 */
  setCommonCommentData: (req, comment, isUpdate) => {
		// Verify that reply is to a valid parent comment
		const parentCommentId = isUpdate ? comment.parentCommentId : req.body.parentCommentId;

		if (parentCommentId && !getItem(parentCommentId)) {
				const err = new Error('Unable to Create Reply - Parent Comment Not Found');
				err.status = 404;
				throw err;
		}

		return {
			id: isUpdate ? req.params.id : uuid.v4(),
			postId: isUpdate ? comment.postId : req.body.postId,
			parentCommentId: parentCommentId,
			author: req.body.autor,
			content: req.body.content,
			type: "comment",
			dateTimeAdded: isUpdate ? comment.dateTimeAdded : moment().format('YYYY-MM-DD hh:mm:ss'),
			dateTimeUpdated: isUpdate ? moment().format('YYYY-MM-DD hh:mm:ss') : ''
		};
	}
}