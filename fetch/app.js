// 1. Frontend: xây dựng giao diện người dùng
// 2. backend: Xây dựng logic xử lý + cơ sở dữ liệu

// API (URL) -> Application programing interface: Cổng giao tiếp giữa các PM

// Backend (OK) -> API (URL) -> Fetch -> JSON/XML
//  -> JSON.parse -> Javascript types
//  -> Render ra giao diện với HTML

var usersApi = 'https://jsonplaceholder.typicode.com/users';
var postsApi = 'https://jsonplaceholder.typicode.com/posts';

var fetchUsers = fetch(usersApi).then(function (res) {
  return res.json();
  // JSON.parse: JSON -> JS type (res.json() tự parse cho chúng ta)
});
var fetchPosts = fetch(postsApi).then(function (res) {
  return res.json();
});

Promise.all([fetchUsers, fetchPosts])
  .then(function (data) {
    var users = data[0];
    var posts = data[1];

    var htmls = posts.map(function (post) {
      var user = users.find(function (user) {
        return user.id === post.userId;
      });

      return `<li>
                <h2>${user.username} - ${user.email}</h2>
                <h4>${post.title}</h4>
              </li>`;
    });

    var html = htmls.join('');
    return html;
  })
  .then(function (html) {
    var postBox = document.querySelector('.posts-box');
    postBox.innerHTML = html;
  });
