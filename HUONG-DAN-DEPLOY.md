# Hướng dẫn đưa web lên Vercel (miễn phí)

Web này đã được viết bằng Next.js, tự responsive trên điện thoại lẫn máy tính,
và dùng cơ sở dữ liệu Redis miễn phí (Upstash) để trang khách hàng và trang
admin dùng chung một dữ liệu thật (không phải giả lập nữa).

## Bước 1 — Đưa code lên GitHub

1. Vào https://github.com → đăng ký/đăng nhập (miễn phí)
2. Bấm nút **New** để tạo repository mới, đặt tên tuỳ ý, ví dụ `nhihh-web`
   → chọn **Public** hoặc **Private** đều được → **Create repository**
3. Ở trang repo vừa tạo, bấm **uploading an existing file**
4. Kéo thả **toàn bộ thư mục** `nhihh-web` (đã giải nén từ file zip mình gửi)
   vào khung upload — GitHub sẽ giữ nguyên cấu trúc thư mục
5. Bấm **Commit changes**

> Không cần biết dùng lệnh `git` — làm qua giao diện web là đủ.

## Bước 2 — Đưa lên Vercel

1. Vào https://vercel.com → **Sign Up** → chọn **Continue with GitHub** để
   đăng nhập bằng tài khoản GitHub vừa dùng ở trên
2. Bấm **Add New... → Project**
3. Chọn repo `nhihh-web` vừa tạo → bấm **Import**
4. Các mục cấu hình để mặc định (Vercel tự nhận đây là dự án Next.js) →
   bấm **Deploy**
5. Đợi khoảng 1 phút, Vercel sẽ cho bạn một link dạng
   `https://nhihh-web-xxxx.vercel.app` — nhưng **chưa dùng được ngay**
   vì chưa có database, làm tiếp Bước 3.

## Bước 3 — Thêm database miễn phí (Upstash Redis)

Đây là nơi lưu link khách gửi, danh sách người dùng, hoa hồng...

1. Trong project vừa deploy trên Vercel, vào tab **Storage**
2. Bấm **Create Database** (hoặc **Browse Marketplace**)
3. Chọn **Upstash** → **Redis** (gói miễn phí là đủ dùng)
4. Đặt tên database tuỳ ý → **Continue** → **Connect** vào đúng project
   `nhihh-web` của bạn
5. Vercel sẽ tự thêm các biến môi trường cần thiết và **tự deploy lại**
   project — đợi khoảng 1 phút

## Bước 4 — Xong! Vào web bằng điện thoại

- Mở link `https://nhihh-web-xxxx.vercel.app` bằng điện thoại hoặc máy tính
  đều dùng được, giao diện đã tự co giãn theo màn hình
- Trang mặc định khách sẽ thấy là **trang chuyển link**
- Bạn bấm chữ **"Quản trị viên"** ở góc trên, nhập mã PIN mặc định `1907`
  để vào trang quản lý (nhớ đổi PIN trong mục **Cấu hình** sau khi vào lần đầu)

## Muốn đổi tên link, ví dụ `shopeemeozz.vercel.app`?

1. Vào project trên Vercel → **Settings → Domains**
2. Xoá domain `.vercel.app` mặc định, gõ tên bạn muốn, ví dụ `shopeemeozz`
   → **Save** (nếu tên đã có người dùng thì phải đổi tên khác)
3. Nếu bạn đã có sẵn project `shopeemeozz` trên Vercel từ trước và muốn
   thay nội dung cũ bằng web này: vào project đó → **Settings → Git** →
   đổi repository đang kết nối sang repo `nhihh-web` mới này, rồi deploy lại

## Muốn gắn tên miền riêng (vd. nhihhlink.vn)?

Vào **Settings → Domains** trong project trên Vercel, nhập tên miền bạn đã
mua, Vercel sẽ chỉ cho bạn cách trỏ DNS. Bước này cần bạn đã mua tên miền
từ một nhà cung cấp (Mắt Bão, Namecheap, GoDaddy...).

## Lưu ý bảo mật

- Mã PIN trang quản trị chỉ ngăn người vô tình bấm nhầm, không phải bảo mật
  cấp doanh nghiệp. Ai biết mã PIN đều vào được trang quản lý.
- Không chia sẻ mã PIN công khai, và nên đổi PIN định kỳ trong mục Cấu hình.
