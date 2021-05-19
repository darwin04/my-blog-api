const localStorage = require("localStorage");
const uuid = require('uuid');
const moment = require('moment');

module.exports = {
  createComment: async (req, res, next) => {
		try {
			const data = {
				id: uuid.v4(),
				postId: req.body.postId,
				parentCommentId: req.body.parentCommentId,
				author: req.body.autor,
				content: req.body.content,
				type: "comment",
				dateTimeAdded: moment().format('YYYY-MM-DD hh:mm:ss'),
			};
			localStorage.setItem(data.id, JSON.stringify(data));
			res.status(201).json(data);
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
	getThread: async (req, res, next) => {
		try {
			const storageItems = { ...localStorage };
			const items = [];
			for(let storageItem in storageItems) {
				const parsedItem = JSON.parse(storageItems[storageItem]);
				if (parsedItem.postId == req.params.threadId && parsedItem.type == "comment")
					items.push(parsedItem);
			}
			res.json(items);
		} catch (e) {
			next(e);
		}
	},
	getAllComments: async (req, res, next) => {
		try {
			const storageItems = { ...localStorage };
			const items = [];
			for(let storageItem in storageItems) {
				const parsedItem = JSON.parse(storageItems[storageItem]);
				if (parsedItem.type == "comment")
					items.push(parsedItem);
			}
			res.json(items);
		} catch (e) {
			next(e);
		}
	},
	updateComment: async (req, res, next) => {
		try {
			const comment = localStorage.getItem(req.params.id);
			if (!comment) {
				const err = new Error('Comment not found');
				err.status = 404;
				throw err;
			}
			const data = {
				id: req.params.id,
				postId: JSON.parse(comment).postId,
				parentCommentId: JSON.parse(comment).parentCommentId,
				author: req.body.autor,
				content: req.body.content,
				type: "comment",
				dateTimeAdded: JSON.parse(comment).dateTimeAdded,
				dateTimeUpdated: moment().format('YYYY-MM-DD hh:mm:ss')
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