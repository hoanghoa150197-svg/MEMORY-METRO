# Tàu điện thông tin 3D — PWA

## Triển khai GitHub Pages

1. Giải nén ZIP, tải **toàn bộ các tệp trong thư mục** lên thư mục gốc của repository GitHub (đảm bảo `index.html` nằm ở gốc).
2. Vào **Settings → Pages → Build and deployment**, chọn **Deploy from a branch**, nhánh `main`, thư mục `/(root)` và lưu.
3. Mở địa chỉ GitHub Pages dạng `https://<tên-tài-khoản>.github.io/<repository>/`. Đường dẫn trong ứng dụng đều tương đối nên tương thích repository.
4. Sau khi mở trang qua HTTPS, Android/Chrome/Edge có thể dùng **Cài đặt ứng dụng**; iPhone Safari dùng **Chia sẻ → Thêm vào Màn hình chính**.

## Dữ liệu và tính năng

- Giữ nguyên giao diện và chức năng HTML gốc: tàu 3D, cửa tàu, học nhiều vòng, ngẫu nhiên/theo bảng, hẹn giờ, hiện đáp án, âm thanh, giữ sáng, toàn màn hình và nhập Excel/CSV.
- Tự lưu danh sách học, các mục đã chọn, thời gian học, thứ tự, hiện đáp án tự động và các tùy chọn âm thanh/giữ sáng bằng `localStorage` trên trình duyệt hiện tại. Khi tải lại trang, dữ liệu được khôi phục. Trình duyệt ẩn danh, xóa dữ liệu trang hoặc đổi thiết bị có thể làm mất dữ liệu; **chưa đồng bộ đám mây**.
- Dữ liệu minh họa được nạp khi chưa có dữ liệu đã lưu.
- Mã Three.js, SheetJS và phông Google được tải từ Internet trong lần sử dụng đầu. Service Worker sẽ cố gắng cache các tài nguyên này sau khi tải thành công. **Không bảo đảm 3D và nhập Excel chạy offline trước khi các thư viện được tải/cache thành công**. CSV có bộ phân tích dự phòng nhưng việc bắt đầu học vẫn cần Three.js.
- Không có AI hay Supabase trong file HTML đầu vào này.
- Screen Wake Lock phụ thuộc khả năng trình duyệt; iPhone có thể không hỗ trợ giữ sáng. Toàn màn hình iPhone dùng chế độ CSS mô phỏng.

## Cập nhật phiên bản

Khi phát hành thay đổi, chỉnh `APP_VERSION` và `RUNTIME` trong `sw.js` (ví dụ `metro-pwa-v1.0.1` và `metro-runtime-v1.0.1`), rồi commit toàn bộ tệp. Service Worker sẽ xóa cache cũ, đề xuất cập nhật khi có bản mới. Dữ liệu người học lưu trong localStorage và không bị xóa khi cập nhật cache.

## Kiểm tra đề xuất

- Mở online, nhập CSV/XLSX, chọn mục, đổi tùy chọn, tải lại trang để kiểm tra khôi phục.
- Bắt đầu học, tạm dừng/tiếp tục, hiện đáp án, sang chuyến tiếp, hoàn thành một vòng, thử ngẫu nhiên và toàn màn hình.
- Mở lại khi offline sau khi đã truy cập online và tải thành công thư viện; kiểm tra 3D, CSV/XLSX.
- Thử cài đặt và Wake Lock trên từng thiết bị thực tế.

**Phạm vi xác minh:** Đã kiểm tra tĩnh cấu trúc tệp và gói ZIP; chưa chạy kiểm thử trình duyệt/thiết bị thực tế trong môi trường tạo gói.
