<template>
  <div class="login-container">
    <div class="login-form">
      <h2>ĐĂNG NHẬP ADMIN</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="phone">Số điện thoại:</label>
          <input type="tel" id="tel" v-model="manager.dienThoai" required>
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu:</label>
          <input type="password" id="password" v-model="manager.password" required>
        </div>
        <button type="submit" class="login-button">Đăng nhập</button>
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
  background: linear-gradient(to right, #667eea, #764ba2);
}

.login-form {
  width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

input[type="tel"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

button.login-button {
  background: linear-gradient(to right, #667eea, #e588d7);
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

button.login-button:hover {
  background: linear-gradient(to right, #667eea, #e588d7);
}

.login-success-message {
  margin-top: 20px;
  font-size: 18px;
  color: green;
  text-align: center;
}
</style>
