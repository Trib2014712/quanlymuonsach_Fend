<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Đọc Giả Đăng Nhập</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="phone"><i class="bi bi-telephone"></i> Số điện thoại:</label>
          <input type="tel" id="tel" v-model="docgia.dienThoai" required>
        </div>
        <div class="form-group">
          <label for="password"><i class="bi bi-key"></i> Mật khẩu:</label>
          <input type="password" id="password" v-model="docgia.password" required>
        </div>
        <button type="submit" class="dangnhap">Đăng nhập</button>
        <router-link :to="{ name: 'dangky' }">
          <button type="button" class="dangky">Đăng ký</button>
        </router-link>
      </form>

      <div v-if="loginSuccessMessage" class="login-success-message">
        {{ loginSuccessMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/user.service';
export default {
  data() {
    return {
      docgia: {
        dienThoai: '',
        password: ''
      },
      loginSuccessMessage: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        let docgia = await UserService.login(this.docgia);
        localStorage.setItem("docgia", JSON.stringify(docgia));
        this.loginSuccessMessage = 'Đăng nhập thành công!';
        setTimeout(() => {
          this.$router.push({ name: 'trangchu' });
        }, 2000); 
      } catch (error) {
        console.error('Đăng nhập không thành công:', error);
        alert('Đăng nhập không thành công. Vui lòng kiểm tra lại số điện thoại và mật khẩu.');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  width: 400px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 16px;
  font-weight: bold;
}

input[type="tel"],
input[type="password"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.dangnhap {
  background: linear-gradient(to right, #4e54c8, #8f94fb);
  color: #fff;
}

button.dangnhap:hover {
  background: linear-gradient(to right, #ee9ca7, #ffdde1);
}

button.dangky {
  margin-top: 0.5rem;
  background: linear-gradient(to right, #fc00ff, #00dbde);
  color: #fff;
}

button.dangky:hover {
  background: linear-gradient(to right, #fc466b, #3f5efb);
}

.login-success-message {
  margin-top: 1.5rem;
  font-size: 16px;
  color: green;
}
</style>
