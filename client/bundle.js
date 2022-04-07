(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {getAllPosts, getPost, post} = require('./requests');

window.addEventListener('hashchange', update);
window.addEventListener('load', update);


const inputForm = document.getElementById('input-form')
inputForm.addEventListener('submit', post);



const form = document.getElementById('form');
const postContent = document.querySelector('#post');

// Redirect to the homepage
document.querySelector('.back-btn').addEventListener('click', () => {
    window.location.hash = ''
});

// This function displays the form and hides the form from view
async function update() {
    let hash = window.location.hash.substring(1);
    if (hash) {
        let data = await getPost(hash);
        showPost(data)
    } else {
        document.querySelector("#post-title").textContent = "";
        document.querySelector("#post-name").textContent = "";
        document.querySelector("#post-body").textContent = "";
        form.classList.remove("hidden");
        postContent.classList.add("hidden");
        contentChecker(document.querySelector('#title'))
        contentChecker(document.querySelector('#author'))
        //
        contentChecker(document.querySelector('#body'))
    }
}


function showPost(data) {
    form.classList.add("hidden");
    postContent.classList.remove("hidden");
    if (typeof data !== 'undefined') {
        document.querySelector("#post-title").textContent = data.title;
        document.querySelector("#post-name").textContent = `${data.author}`;
        document.querySelector("#post-body").textContent = data.body;
    } else {
        document.querySelector("#post-title").textContent = 'Post does not exist'
    }
}

function contentChecker(input) {
    let label = document.querySelector(`.label-${input.id}`);
    if(!input.value){
        label.classList.remove('fade');
        label.classList.add('fade-hidden');
    } else {
        label.classList.remove('fade-hidden');
        label.classList.add('fade');
    }
}
//
document.querySelector("#body").addEventListener('input', updateLabels)

function updateLabels(e) {
    contentChecker(e.target)
};




},{"./requests":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
//
