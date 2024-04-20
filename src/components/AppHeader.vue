<template>
  <header class="header header-background">
    <div class="container">
      <div class="logo">
      <nav class="navbar">
        <ul class="menu">
          <li><router-link class="menu-link" to="/">Trang chủ</router-link></li>
          <li><router-link class="menu-link" to="/user/muonsach/:id">Mượn sách</router-link></li>
          <li><router-link class="menu-link" to="/quydinhmuonsach">Quy định</router-link></li>
          <li><router-link class="menu-link" to="/user/nhaxuatban">Nhà xuất bản</router-link></li>
          <li><router-link class="menu-link" to="/profile">Profile</router-link></li>
          <li><router-link class="menu-link" to="/profile">Đăng xuất</router-link></li>
          
        </ul>
      </nav>
    </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: white; /* Chuyển màu chữ thành màu trắng */
}

.navbar {
  display: flex;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.menu li {
  margin-right: 20px;
}

.menu li:last-child {
  margin-right: 0;
}

.menu li a {
  text-decoration: none;
  color: white; /* Chuyển màu chữ thành màu trắng */
  font-size: 16px;
  transition: color 0.3s;
}

.menu li a:hover {
  color: #007bff;
}
.header-background {
  background-image: url('/image/Hinh-anh-cuon-sach-mo-ra-doc-dao-an-tuong-day-tam-trang.jpg'); /* Đường dẫn đến hình ảnh của bạn */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white; /* Đảm bảo văn bản trên hình nền có màu tương phản */
}
</style>




