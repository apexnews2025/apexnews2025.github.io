// Dữ liệu người dùng mẫu (thường sẽ từ backend)
const users = {
    'nhatnam-0888363955@tio.com': { password: 'Nhatnam1511@', name: 'Nguyễn Nhật Nam', room: 'Phòng thi số 39' },
    'maianhtien': { password: 'maianhtien', name: 'Mai Anh Tiến', room: 'No data' }
};

// Hàm đăng nhập
function login(username, password) {
    const user = users[username];
    if (user && user.password === password) {
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('currentUser', JSON.stringify({ 
            username: username, 
            name: user.name, 
            room: user.room 
        }));
        // Chuyển hướng đến dashboard
        window.location.href = 'dashboard.html';
        return true;
    }
    return false;
}

// Hàm kiểm tra trạng thái đăng nhập trên các trang
function checkLoginState() {
    const currentUser = localStorage.getItem('currentUser');
    // Lấy tên tệp hiện tại (ví dụ: "phong-thi.html" hoặc "dashboard.html")
    const currentPage = window.location.pathname.split('/').pop(); 
    
    // Nếu không có người dùng đăng nhập và không ở trang index, chuyển hướng về index
    if (!currentUser && currentPage !== 'login.html') {
        window.location.href = 'login.html';
    }
}

// Hàm cập nhật giao diện dashboard (navbar)
function updateDashboardUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const welcomeMessageEl = document.getElementById('welcomeMessage');
        const examRoomNavItemEl = document.getElementById('examRoomNavItem');

        if (welcomeMessageEl) {
            welcomeMessageEl.textContent = `Xin chào, ${currentUser.name}! (Phòng: ${currentUser.room})`;
        }
        
        if (examRoomNavItemEl) {
            examRoomNavItemEl.style.display = 'block';
            // Có thể thêm logic để dẫn đến phòng thi cụ thể nếu cần
        }
    }
}

// Hàm đăng xuất
function logout() {
    localStorage.removeItem('currentUser');
    // Chuyển hướng về trang đăng nhập
    window.location.href = 'login.html';
    // Ngăn người dùng quay lại trang trước bằng cách xóa lịch sử
    setTimeout(() => {
        window.history.replaceState(null, '', 'login.html');
    }, 0);
}

// Gắn sự kiện cho form đăng nhập
if (window.location.pathname.endsWith('/login.html')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');

        if (login(username, password)) {
            // Đăng nhập thành công, chuyển hướng đã được xử lý trong hàm login
        } else {
            errorMessage.textContent = 'Sai tên đăng nhập hoặc mật khẩu.';
            errorMessage.style.display = 'block';
        }
    });
}

// Gắn sự kiện cho nút đăng xuất (nếu có trên trang hiện tại)
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}
// Kiểm tra trạng thái đăng nhập ngay khi tải script trên các trang (trừ index.html)
if (!window.location.pathname.endsWith('/login.html')) {
    checkLoginState();
}
