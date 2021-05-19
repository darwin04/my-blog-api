const {  storeItem, getItem, removeItem, getAllItems } = require('../utils/storage');
const {  setCommonPostData } = require('../utils/helpers');
const localStorage = require('localStorage');

module.exports = {
	createPost: async (req, res, next) => {
		try {
			const data = setCommonPostData(req, {}, false);
			storeItem(data);
			res.status(201).json(data);
		} catch (e) {
			next(e);
		}
	},
	getPost: async (req, res, next) => {
		try {
			const post = getItem(req.params.id);
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
	getThread: async (req, res, next) => {
		try {
			// Validate that a thread exists
			const parentPost = getItem(req.params.threadId);
			if (!parentPost) {
				const err = new Error('Thread not found');
				err.status = 404;
				throw err;
			}
			const storageItems = { ...localStorage };
			const items = [];

			// Add the parent post first
			items.push(JSON.parse(parentPost));
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
	getAllPosts: async (req, res, next) => {
		try {
			res.json(getAllItems({ ...localStorage }, "post"));
		} catch (e) {
			next(e);
		}
	},
	updatePost: async (req, res, next) => {
		try {
			const post = getItem(req.params.id);
			if (!post) {
				const err = new Error(' Post not found');
				err.status = 404;
				throw err;
			}
			const data = setCommonPostData(req, JSON.parse(post), true);
			storeItem(data);
			res.status(201).json(data);
		} catch (e) {
			next(e);
		}
	},
	deletePost: async (req, res, next) => {
		try {
			removeItem("post", JSON.parse(localStorage.getItem(req.params.id)));
			res.status(200).end();
		} catch (e) {
			next(e);
		}
	}
}