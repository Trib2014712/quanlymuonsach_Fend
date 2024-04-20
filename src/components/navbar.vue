<template>
  <nav class="navbar">
    <div class="logo">
      <h2>BooKStore</h2>
    </div>
    <ul class="navbar-menu">
      <router-link to="/admin/nxb/quanly" class="navbar-item">Quản lý Nhà Xuất Bản</router-link>
      <router-link to="/admin/muonsach/quanly" class="navbar-item">Quản lý Mượn Sách</router-link>
      <router-link to="/admin/user/quanly" class="navbar-item">Quản lý Đọc Giả</router-link>
      <router-link to="/admin/sach/quanly" class="navbar-item">Quản lý Sách</router-link>
      <router-link to="/admin/login" class="navbar-item">Đăng xuất</router-link>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: linear-gradient(to right, #f5f7f8, #f4f7e8); /* Thay đổi màu gradient tại đây */
}

.logo h2 {
  margin: 0;
}

.navbar-menu {
  list-style: none;
  padding: 0;
  display: flex;
}

.navbar-item {
  margin-right: 20px;
  text-decoration: none;
  color: black;
}

.navbar-item:last-child {
  margin-right: 0;
}

.navbar-item:hover {
  text-decoration: underline;
}
</style>
