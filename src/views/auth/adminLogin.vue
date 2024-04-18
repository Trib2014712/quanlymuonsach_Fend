<template>
  <div class="login-container">
    <div class="login-form">
      <h2>ADMIN ĐĂNG NHẬP</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="phone"><i class="bi bi-telephone"></i> Số điện thoại:</label>
          <input type="tel" id="tel" v-model="manager.dienThoai" required>
        </div>
        <div class="form-group">
          <label for="password"><i class="bi bi-key"></i> Mật khẩu:</label>
          <input type="password" id="password" v-model="manager.password" required>
        </div>
        <button type="submit" class="dangnhap">Đăng nhập</button>
      </form>

      <div v-if="loginSuccessMessage" class="login-success-message">
        {{ loginSuccessMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import ManagerService from '../../services/manager.service';
export default {
  data() {
    return {
      manager: {
        dienThoai: '',
        password: ''
      },
      loginSuccessMessage: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        console.log(this.manager); // Sửa thành this.manager
        await ManagerService.login(this.manager);
        this.loginSuccessMessage = 'Đăng nhập thành công!';
        setTimeout(() => {
          this.$router.push({ name: 'quanlysach' });
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
}

input[type="tel"],
input[type="password"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background: linear-gradient(to right, #fc00ff, #00dbde);
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background: linear-gradient(to right, #fc466b, #3f5efb);
}

.login-success-message {
  margin-top: 1.5rem;
  font-size: 16px;
  color: green;
}
</style>
