const localStorage = require("localStorage");
var uuid = require('uuid');

module.exports = {
  createComment: async (req, res, next) => {
		try {
			const newComment = {
				id: uuid.v1(),
				author: req.body.autor,
				content: req.body.content,
			};
			localStorage.setItem(newComment.id, JSON.stringify(newComment));
			res.status(201).json(newComment);
		} catch (e) {
			next(e);
		}
	},
	createReply: async (req, res, next) => {
		try {
			const newReply = {
				id: uuid.v1(),
				parentCommentId: req.params.id,
				author: req.body.autor,
				content: req.body.content,
			};
			localStorage.setItem(newReply.id, JSON.stringify(newReply));
			res.status(201).json(newReply);
		} catch (e) {
			next(e);
		}
	},
	getComment: async (req, res, next) => {
		try {
			const post = localStorage.getItem(req.params.id);
			if (!post) {
				const err = new Error('Blog Post not found');
				err.status = 404;
				throw err;
			}

			res.json(JSON.parse(post));
		} catch (e) {
			next(e);
		}
	},
	updateComment: async (req, res, next) => {
		try {
			const post = localStorage.getItem(req.params.id);
			if (!post) {
				const err = new Error('Blog Post not found');
				err.status = 404;
				throw err;
			}
			const data = {
				id: req.params.id,
				author: req.body.autor,
				content: req.body.content,
			};

			localStorage.setItem(data.id, JSON.stringify(data));
			res.status(201).json(data);
		} catch (e) {
			next(e);
		}
	},
	deleteComment: async (req, res, next) => {
		try {
			localStorage.removeItem(req.params.id);
			res.status(200).end();
		} catch (e) {
			next(e);
		}
	},
}