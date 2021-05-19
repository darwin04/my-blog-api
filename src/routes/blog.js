const localStorage = require("localStorage");
const uuid = require('uuid');
const moment = require('moment');

module.exports = {
	createPost: async (req, res, next) => {
		try {
			const data = {
				id: uuid.v4(),
				title: req.body.title,
				author: req.body.autor,
				content: req.body.content,
				type: "post",
				dateTimeAdded: moment().format('YYYY-MM-DD hh:mm:ss')
			};
			localStorage.setItem(data.id, JSON.stringify(data));
			res.status(201).json(data);
		} catch (e) {
			next(e);
		}
	},
	getPost: async (req, res, next) => {
		try {
			const post = localStorage.getItem(req.params.id);
			if (!post) {
				const err = new Error(' Post not found');
				err.status = 404;
				throw err;
			}

			res.json(JSON.parse(post));
		} catch (e) {
			next(e);
		}
	},
	getAllPosts: async (req, res, next) => {
		try {
			const storageItems = { ...localStorage };
			const items = [];
			for(let storageItem in storageItems) {
				const parsedItem = JSON.parse(storageItems[storageItem]);
				if (parsedItem.type == "post")
					items.push(parsedItem);
			}
			res.json(items);
		} catch (e) {
			next(e);
		}
	},
	updatePost: async (req, res, next) => {
		try {
			const post = localStorage.getItem(req.params.id);
			if (!post) {
				const err = new Error(' Post not found');
				err.status = 404;
				throw err;
			}
			const data = {
				id: req.params.id,
				title: req.body.title,
				author: req.body.autor,
				content: req.body.content,
				type: "post",
				dateTimeAdded: JSON.parse(post).dateTimeAdded,
				dateTimeUpdated: moment().format('YYYY-MM-DD hh:mm:ss')
			};

			localStorage.setItem(data.id, JSON.stringify(data));
			res.status(201).json(data);
		} catch (e) {
			next(e);
		}
	},
	deletePost: async (req, res, next) => {
		try {
			localStorage.removeItem(req.params.id);
			res.status(200).end();
		} catch (e) {
			next(e);
		}
	}
}