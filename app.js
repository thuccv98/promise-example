// Bài toán thao tác api trong thực tế
// Trong thực tế backend sẽ trả về cho frontend API (dạng URLs), việc của frontend là gọi ra để lấy dữ liệu.
// Chẳng hạn backend trả về 2 cái URL thể hiện 2 cái API, cái API thứ nhất để frontend lấy thông tin comments, cái thứ 2 để lấy thông tin users.

// Cách để frontend lấy ra dữ liệu
// 1. Gọi lên API lấy comments
// 2. Từ comment lấy ra user_id (lọc ra user_id)
// 3. Từ user_id truy cập cái API users mà backend trả về để lấy ra user tương ứng (lọc ra).

// Mô phỏng dữ liệu user (thường thì backend sẽ lưu trữ dưới dạng array-object)
var users = [
  {
    id: 1,
    name: 'Tuan Anh',
    avatar:
      'https://cdn.pixabay.com/photo/2021/10/26/02/41/woman-6742445_960_720.jpg',
  },
  {
    id: 2,
    name: 'Quang Hai',
    avatar:
      'https://cdn.pixabay.com/photo/2021/10/01/16/21/eris-6672934_960_720.jpg',
  },
  {
    id: 3,
    name: 'Cong Phuong',
    avatar:
      'https://cdn.pixabay.com/photo/2021/10/26/02/41/woman-6742445_960_720.jpg',
  },
  {
    id: 4,
    name: 'Tien Linh',
    avatar:
      'https://cdn.pixabay.com/photo/2021/10/12/07/22/egret-6702699_960_720.jpg',
  },
  // ... thực tế có hàng ngàn user
];

// Mổ phỏng dữ liệ comment
var comments = [
  {
    id: 1,
    user_id: 1,
    content: 'toi la Tuan Anh',
  },
  {
    id: 2,
    user_id: 2,
    content: 'Toi la Quang Hai',
  },
  {
    id: 3,
    user_id: 4,
    content: 'Chao 2 thang ku, anh la Tien Linh',
  },
];

// fake API
function getComments() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(comments);
    }, 2000);
  });
}

function getUsersByIds(userIds) {
  return new Promise(function (resolve) {
    // lọc ra những user trong cái data users mà có trong cái list userIds (userIds là cái list id của các user đã commnet)
    var result = users.filter(function (user) {
      return userIds.includes(user.id);
    });
    setTimeout(function () {
      resolve(result);
    }, 2000);
  });
}

// note: .then trên return ra cái gì, thì cái then dưới sẽ nhận vào để xử lý.
getComments()
  .then(function (comments) {
    // Lấy ra list user_id từ comments (mục đính là lấy ra nhứng user có comment)
    var userIds = comments.map(function (comment) {
      return comment.user_id;
    });
    return userIds;
  })
  .then(function (userIds) {
    return getUsersByIds(userIds);
  })
  .then(function (users) {
    // trả về dữ liệu để hiển thị lên UI (dữ liệu gồm chính xác user nào đã comment)
    return {
      users: users,
      comments: comments,
    };
  })
  .then(function (data) {
    // Sử dụng dữ liệu được trả về bên trên để show ra UI
    console.log(data);
    var commentBox = document.querySelector('.comment-box');

    var html = '';
    data.comments.forEach(function (comment) {
      // Từ comment lấy ra user tương ứng
      var user = data.users.find(function (user) {
        return user.id === comment.user_id;
      });
      html += `<li><img style="width:40px;height:40px;border-radius:100px;object-fit:cover" src="${user.avatar}"/> ${user.name}: ${comment.content}</li>`;
    });

    commentBox.innerHTML = html;
  });
