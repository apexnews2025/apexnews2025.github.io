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

function killCopy(e){
return false
}
function reEnable(){
return true
}
document.onselectstart=new Function (“return false”)
if (window.sidebar){
document.onmousedown=killCopy
document.onclick=reEnable
}

window.onload = function() {
        document.addEventListener("contextmenu", function(e) {
            e.preventDefault();
        }, false);
        document.addEventListener("keydown", function(e) {
            //document.onkeydown = function(e) {
            // "I" key
            if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
                disabledEvent(e);
            }
            // "J" key
            if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
                disabledEvent(e);
            }
            // "S" key + macOS
            if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                disabledEvent(e);
            }
            // "U" key
            if (e.ctrlKey && e.keyCode == 85) {
                disabledEvent(e);
            }
            // "F12" key
            if (event.keyCode == 123) {
                disabledEvent(e);
            }
        }, false);
 
        function disabledEvent(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else if (window.event) {
                window.event.cancelBubble = true;
            }
            e.preventDefault();
            return false;
        }
    };

