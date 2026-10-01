# Workspace Instructions & Knowledge Base Rule

## Auto-Sync CodeGraph on Every Project Update

Mỗi khi cập nhật bất kỳ dự án nào trong portfolio (thay đổi nội dung, xuất ảnh Figma thật, cập nhật data, chỉnh sửa Case Study, thêm tính năng mới):

1. **Auto-update `.codegraph/`:** Luôn đồng bộ tài liệu kiến trúc tương ứng trong thư mục `.codegraph/` (`.codegraph/README.md`, `.codegraph/<project-slug>.md`).
2. **Bảo tồn tính trung thực:** 
   - Chỉ sử dụng ảnh UI thật từ Figma nguồn được chỉ định.
   - Không dùng ảnh stock Unsplash làm giao diện.
   - Không bịa đặt chỉ số kinh doanh/conversion rate.
   - Giữ nguyên slug kỹ thuật của các dự án để bảo đảm tương thích router (`ha-long-luxe`, `vevuive`, `ma-warehouse`, `tourism-omnichannel`, `insurance-integration`, `smart-car-wash`, `corporate-website`).
3. **Mục đích:** Giúp mọi model AI hoặc lập trình viên sau đó mở thư mục `.codegraph/` là hiểu ngay toàn bộ dự án, kiến trúc và luồng dữ liệu mà không cần hỏi lại người dùng.
