# Brooklyn Gilbert — Portfolio Website

Dự án Portfolio hiện đại được xây dựng dựa trên mẫu thiết kế bằng **React + Vite** kết hợp **Tailwind CSS v3**, **Lucide Icons** và hệ thống dữ liệu tập trung dễ dàng tùy biến.

---

## 📸 Giao Diện & Tính Năng Đã Hoàn Thiện

````carousel
![Hero Section](/C:/Users/Admin/.gemini/antigravity-ide/brain/4c2b5bae-00e8-4d65-8351-2c4afe3bf7b7/hero_section_1790601101155.png)
<!-- slide -->
![About & Work Process](/C:/Users/Admin/.gemini/antigravity-ide/brain/4c2b5bae-00e8-4d65-8351-2c4afe3bf7b7/about_process_section_1790601137873.png)
<!-- slide -->
![Portfolio & Project Filter](/C:/Users/Admin/.gemini/antigravity-ide/brain/4c2b5bae-00e8-4d65-8351-2c4afe3bf7b7/portfolio_section_1790601177977.png)
<!-- slide -->
![Interactive Project Modal](/C:/Users/Admin/.gemini/antigravity-ide/brain/4c2b5bae-00e8-4d65-8351-2c4afe3bf7b7/project_modal_opened_1790601262574.png)
<!-- slide -->
![CTA & Blog Articles](/C:/Users/Admin/.gemini/antigravity-ide/brain/4c2b5bae-00e8-4d65-8351-2c4afe3bf7b7/cta_and_blog_section_1790601327702.png)
<!-- slide -->
![Services Accordion](/C:/Users/Admin/.gemini/antigravity-ide/brain/4c2b5bae-00e8-4d65-8351-2c4afe3bf7b7/services_accordion_expanded_1790601407885.png)
<!-- slide -->
![Testimonials, Contact & Footer](/C:/Users/Admin/.gemini/antigravity-ide/brain/4c2b5bae-00e8-4d65-8351-2c4afe3bf7b7/contact_and_footer_section_1790601449614.png)
````

---

## 📂 Cấu Trúc Dự Án

```
d:/Code/Profile/Portfolio/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx          # Header điều hướng cố định + Mobile Drawer
│   │   ├── Hero.jsx            # Banner chính, giới thiệu, chỉ số & ảnh chân dung
│   │   ├── About.jsx           # Card giới thiệu bản thân + Social links & nút tải CV
│   │   ├── WorkProcess.jsx     # Quy trình 4 bước (Research, Analyze, Design, Launch)
│   │   ├── Portfolio.jsx       # Bộ lọc danh mục & danh sách dự án
│   │   ├── ProjectModal.jsx    # Modal xem chi tiết dự án (Case Study)
│   │   ├── CtaBanner.jsx       # Banner kêu gọi hợp tác tông màu tối ấn tượng
│   │   ├── Blog.jsx            # Danh sách bài viết & tin tức nổi bật
│   │   ├── Services.jsx        # Dịch vụ cung cấp dạng Accordion đóng mở
│   │   ├── HappyClients.jsx    # Logo đối tác & thương hiệu
│   │   ├── Testimonial.jsx     # Slider đánh giá từ khách hàng
│   │   ├── Contact.jsx         # Thông tin liên hệ & form gửi tin nhắn
│   │   ├── Footer.jsx          # Chân trang & nút cuộn lên đầu trang (Back to top)
│   │   └── SocialIcons.jsx     # Bộ SVG icons chuẩn pixel cho mạng xã hội
│   ├── data/
│   │   └── portfolioData.js    # TẬP TRUNG TOÀN BỘ DỮ LIỆU ĐỂ DỄ DÀNG CHỈNH SỬA
│   ├── App.jsx                 # Layout tổng thể
│   ├── index.css               # Cấu hình Tailwind CSS, Font Plus Jakarta Sans & Mesh Aura
│   └── main.jsx
├── tailwind.config.js          # Hệ thống màu sắc tím (brand purple), bóng đổ & font chữ
└── package.json
```

---

## 🛠️ Hướng Dẫn Tùy Biến Thông Tin Cá Nhân

Tất cả nội dung đều được tách biệt tại file [portfolioData.js](file:///d:/Code/Profile/Portfolio/src/data/portfolioData.js):

- **Thông tin cơ bản**: Tên, vị trí ứng tuyển, bio, email, số điện thoại, địa chỉ, link mạng xã hội trong `personalInfo`.
- **Dự án**: Thêm hoặc sửa danh sách dự án trong `portfolioProjects` (tiêu đề, hình ảnh, phân loại, công nghệ sử dụng).
- **Quy trình làm việc**: Thay đổi các bước trong `workProcess`.
- **Dịch vụ**: Cập nhật kỹ năng và mô tả trong `services`.
- **Đánh giá khách hàng**: Tùy chỉnh danh sách feedback trong `testimonials`.
- **Bài viết Blog**: Cập nhật bài viết trong `blogPosts`.

---

## 🚀 Lệnh Khởi Chạy

- **Chạy môi trường phát triển (Dev)**:
  ```powershell
  npm run dev
  ```
  Truy cập: `http://127.0.0.1:5173/`

- **Build mã nguồn đóng gói (Production)**:
  ```powershell
  npm run build
  ```
