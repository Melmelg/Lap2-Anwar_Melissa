const db = require('../dbConfig');

class Post {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.author = data.author
        this.body = data.body
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const postData = await db.query(`SELECT * FROM posts ORDER BY id;`)
                const allPosts = postData.rows.map(p => new Post(p))
                resolve(allPosts)
            } catch (err) {
                reject(`Error retrieving posts!`)
            }
        })
    }

    static findById(id) {
        return new Promise (async (resolve, reject) => {
            try {
                let getPost = await db.query(`SELECT * FROM posts WHERE posts.id = $1;`, [ id ])
                let post = new Post(getPost.rows[0])
                resolve(post)
            } catch (err) {
                reject(`Post not found!`)
            }
        })
    }

    static create(data) {
        return new Promise (async (resolve, reject) => {
            try {
                let insertPost = await db.query(`INSERT INTO posts (title, author, body) VALUES ($1, $2, $3) RETURNING *;`, [ data.title, data.author, data.body ])
                let createPost = new Post(insertPost.rows[0])
                resolve(createPost)
            } catch (err) {
                reject('Cannot create post!')
            }
        })
    }
}

module.exports = Post
