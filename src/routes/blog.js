const localStorage = require("localStorage");
var uuid = require('uuid');


module.exports = {
	createBlogPost: async (req, res, next) => {
		try {
			const newPost = {
				id: uuid.v1(), // Time Based
				title: req.body.title,
				author: req.body.autor,
				content: req.body.content,
				//TODO: Add TimeStamp and maybe other items
			};
			localStorage.setItem(newPost.id, JSON.stringify(newPost));
			res.status(201).json(newPost);
		} catch (e) {
			next(e);
		}
	},
	getBlogPost: async (req, res, next) => {
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
	updateBlogPost: async (req, res, next) => {
		try {
			const post = localStorage.getItem(req.params.id);
			if (!post) {
				const err = new Error('Blog Post not found');
				err.status = 404;
				throw err;
			}
			const data = {
				id: req.params.id,
				title: req.body.title,
				author: req.body.autor,
				content: req.body.content,
			};

			localStorage.setItem(data.id, JSON.stringify(data));
			res.status(201).json(data);
		} catch (e) {
			next(e);
		}
	},
	deleteBlogPost: async (req, res, next) => {
		try {
			localStorage.removeItem(req.params.id);
			res.status(200).end();
		} catch (e) {
			next(e);
		}
	}
}