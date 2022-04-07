// function to retrieve all the posts
async function getAllPosts() {
    try {
        const resp = await fetch(`http://localhost:3000/posts`);
        const data = await resp.json()
        return data;
    } catch (err) {
        console.warn(err);
    }
};

// function to retrieve a single post by its ID
async function getPost(id) {
    try {
        const resp = await fetch(`http://localhost:3000/posts/${id}`);
        const data = await resp.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
};

// function that sends the post to the server and then redirects to the posts route.
async function post(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({title: e.target.title.value, author: e.target.author.value, body: e.target.body.value})
        }

        const response = await fetch('http://localhost:3000/posts', options);
        const post = await response.json();
        window.location.hash = `#${post.id}`
    } catch (err) {
        console.warn(err)
    }
}

module.exports = {getAllPosts, getPost, post}
