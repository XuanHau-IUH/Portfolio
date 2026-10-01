# Ha Long Luxe — Cruise Booking & Operations Platform
> **CodeGraph & Project Knowledge Base**  
> *Dự án Vertical SaaS quản lý đặt chỗ và vận hành du thuyền Hạ Long.*

---

## 📌 1. Project Positioning

- **Project Title:** HA LONG LUXE — Cruise Booking & Operations Platform
- **Slug:** `ha-long-luxe` (Index: `01`)
- **Role:** Product Designer / UIUX Designer
- **Category:** `Vertical SaaS`
- **Domain:** Tourism · Hospitality · Cruise Operations
- **Platforms:** B2C Web · B2B Agency Portal · Admin Operations · Responsive Mobile
- **Assets:** `public/projects/ha-long-luxe/` (13 ảnh WebP trích xuất từ Figma)

---

## 🏗️ 2. Business Architecture & System Logic

```mermaid
flowchart TD
    subgraph B2C["1. B2C CONSUMER BOOKING"]
        A1["Tìm kiếm chuyến du thuyền<br/>(02-booking-home)"] --> A2["So sánh kết quả & lọc<br/>(03-search-results)"]
        A2 --> A3["Chi tiết du thuyền & lịch trình<br/>(04-cruise-detail)"]
        A3 --> A4["Chọn sơ đồ boong & cabin<br/>(05-deck-selection / 06-cabin-detail)"]
        A4 --> A5["Nhập thông tin hành khách<br/>(07-passenger-info)"]
        A5 --> A6["Thanh toán & Xác nhận<br/>(08-payment-confirmation)"]
    end

    subgraph ADMIN["2. ADMIN & B2B OPERATIONS"]
        B1["Admin Portal: Quản lý booking<br/>(09-admin-operations)"]
        B2["Quản lý cấu trúc đội tàu & cabin vật lý<br/>(10-fleet-inventory)"]
        B3["Cổng đại lý B2B: Đặt chỗ & hạn mức<br/>(11-b2b-booking)"]
    end

    A6 --> B1
    B2 --> A4
    B3 --> B1
```

### 3 Trạng thái Vận hành Tách biệt (Domain Independence):
1. **Booking Status:** Trạng thái đặt chỗ (Pending, Confirmed, Cancelled, Completed).
2. **Payment Status:** Trạng thái tài chính (Unpaid, Deposit Paid, Fully Paid, Refunded).
3. **Allocation Status:** Trạng thái giữ cabin & phân bổ phòng (Unassigned, Assigned, Locked).

---

## 🗂️ 3. Code Mapping

- **Data Definition:** [`src/data/projectsData.js:L183-L504`](file:///d:/Code/Profile/Portfolio/src/data/projectsData.js#L183-L504)
- **Localization:** [`src/data/projectsI18n.js:L8-L70`](file:///d:/Code/Profile/Portfolio/src/data/projectsI18n.js#L8-L70) (VI), [`L420-L485`](file:///d:/Code/Profile/Portfolio/src/data/projectsI18n.js#L420-L485) (EN)
- **Case Study View:** [`src/pages/CaseStudyPage.jsx:L750-L980`](file:///d:/Code/Profile/Portfolio/src/pages/CaseStudyPage.jsx#L750-L980)
- **Modal View:** [`src/components/ProjectModal.jsx`](file:///d:/Code/Profile/Portfolio/src/components/ProjectModal.jsx) (`isHaLongLuxe`)
- **Assets:** `public/projects/ha-long-luxe/` (01-cover đến 13-design-qa)
