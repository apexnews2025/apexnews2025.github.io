$(document).ready(function() {
  const allResults = [
    { name: "Lật Ngược Thế Cờ", url: "/xem-phim/lat-nguoc-the-co.html" }
  ];

  function removeVietnameseMarks(str) {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
    return str;
  }

  $('#searchInput').on('keyup', function() {
    const searchTerm = $(this).val().toLowerCase();
    const normalizedSearchTerm = removeVietnameseMarks(searchTerm);
    const $dropdownMenu = $(this).next('.dropdown-menu');
    $dropdownMenu.empty();

    // Ẩn hoàn toàn dropdown nếu không có nội dung tìm kiếm
    if (searchTerm.length === 0) {
      $dropdownMenu.removeClass('show');
      return;
    }

    const filteredResults = allResults.filter(item =>
      removeVietnameseMarks(item.name.toLowerCase()).includes(normalizedSearchTerm)
    );

    if (filteredResults.length > 0) {
      filteredResults.forEach((item, index) => {
        const linkItem = `<a class="dropdown-item" href="${item.url}">${item.name}</a>`;
        const listItem = `<li>${linkItem}</li>`;
        $dropdownMenu.append(listItem);

        if ((index + 1) % 1 === 0 && index !== filteredResults.length - 1) {
          $dropdownMenu.append('<li><hr class="dropdown-divider"></li>');
        }
      });
      $dropdownMenu.addClass('show'); // Hiển thị dropdown
    } else {
      // Hiển thị thông báo "Không có kết quả phù hợp"
      const noResultItem = `<li class="dropdown-item disabled">Không có kết quả phù hợp</li>`;
      $dropdownMenu.append(noResultItem);
      $dropdownMenu.addClass('show'); // Vẫn hiển thị dropdown để thông báo
    }
  });

  // Xử lý khi input bị focus (nhấn vào)
  // Nếu muốn dropdown hoàn toàn không xuất hiện khi focus và không có ký tự,
  // thì đoạn code này là đủ cho keyup event.
  // Không cần thêm sự kiện 'focus' nếu muốn hành vi như hình bạn gửi (không hiển thị gì khi rỗng)

  // Đóng dropdown khi click ra ngoài
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.dropdown').length) {
      $('.dropdown-menu').removeClass('show');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const companyName = "Apex .,Inc"; // Định nghĩa tên công ty ở đây
    const year = new Date().getFullYear(); // Lấy năm hiện tại tự động

    // Tìm tất cả các phần tử có class 'company-name'
    const companyNameElements = document.querySelectorAll('.company-name');
    companyNameElements.forEach(element => {
        element.textContent = companyName;
    });

    // Nếu bạn có một placeholder cho năm
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = year;
    });

    // Hoặc nếu bạn muốn thay đổi toàn bộ nội dung footer
    const footerElement = document.getElementById('footerContent');
    if (footerElement) {
        footerElement.innerHTML = `${year} &copy; Bản quyền thuộc về <strong>${companyName}</strong>. Tất cả các quyền được bảo lưu`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
        Plyr.setup();
    });

    document.addEventListener('DOMContentLoaded', function() {
            const body = document.getElementById('myBody');
            const customContextMenu = document.getElementById('custom-context-menu');

            // Ngăn chặn menu chuột phải mặc định của trình duyệt và hiển thị menu tùy chỉnh
            body.addEventListener('contextmenu', function(e) {
                e.preventDefault(); // Ngăn chặn hành vi mặc định (menu chuột phải của trình duyệt)

                // Vị trí của chuột
                let mouseX = e.pageX;
                let mouseY = e.pageY;

                // Hiển thị menu
                customContextMenu.style.display = 'block';

                // Định vị menu
                // Điều chỉnh vị trí để menu không bị tràn ra ngoài màn hình
                // Lấy kích thước cửa sổ
                let windowWidth = window.innerWidth;
                let windowHeight = window.innerHeight;

                // Lấy kích thước menu
                let menuWidth = customContextMenu.offsetWidth;
                let menuHeight = customContextMenu.offsetHeight;

                // Đảm bảo menu không bị tràn sang phải
                if (mouseX + menuWidth > windowWidth) {
                    customContextMenu.style.left = (windowWidth - menuWidth - 10) + 'px'; // -10 để có khoảng cách lề
                } else {
                    customContextMenu.style.left = mouseX + 'px';
                }

                // Đảm bảo menu không bị tràn xuống dưới
                if (mouseY + menuHeight > windowHeight) {
                    customContextMenu.style.top = (windowHeight - menuHeight - 10) + 'px'; // -10 để có khoảng cách lề
                } else {
                    customContextMenu.style.top = mouseY + 'px';
                }
            });

// Ẩn menu khi nhấp vào bất cứ đâu trên trang
document.addEventListener('click', function(e) {
    // Lấy phần tử được click
    const clickedElement = e.target;

    // Kiểm tra nếu click không phải là bên trong menu HOẶC click vào một thẻ <a> có class là menu-item
    if (!customContextMenu.contains(clickedElement) || clickedElement.matches('.menu-item')) {
        customContextMenu.style.display = 'none';
    }
});

            // Ngăn chặn sao chép toàn bộ trang
            document.addEventListener('copy', function(e) {
                e.preventDefault(); // Ngăn chặn hành động sao chép
                alert('Sao chép nội dung đã bị vô hiệu hóa!');
            });

            // Ngăn chặn các phím tắt sao chép (Ctrl+C, Cmd+C)
            document.addEventListener('keydown', function(e) {
                // Kiểm tra Ctrl/Cmd + C
                if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                    e.preventDefault();
                    alert('Sao chép nội dung đã bị vô hiệu hóa!');
                }
            });
        });
