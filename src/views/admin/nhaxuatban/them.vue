<template>
    <div class="add-publisher-container">
      <div class="add-publisher">
        <h2>Thêm Nhà Xuất Bản</h2>
        <form @submit.prevent="addPublisher">
          <div class="form-group">
            <label for="maNXB">Mã Nhà Xuất Bản:</label>
            <input type="text" id="maNXB" v-model="publisher.maNXB" required>
          </div>
          <div class="form-group">
            <label for="tenNXB">Tên Nhà Xuất Bản:</label>
            <input type="text" id="tenNXB" v-model="publisher.tenNXB" required>
          </div>
          <div class="form-group">
            <label for="diaChi">Địa Chỉ:</label>
            <input type="text" id="diaChi" v-model="publisher.diaChi" required>
          </div>
          <div class="form-group button-group">
            <button type="submit" class="save-button">Thêm Nhà Xuất Bản</button>
            <router-link :to="{ name: 'quanlynxb' }">
              <button type="button" class="return-button">Trở Về</button>
            </router-link>
          </div>
          <p class="message">{{ message }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import IssuerService from "../../../services/issuer.service";
  
  export default {
    data() {
      return {
        publisher: {
          maNXB: '',
          tenNXB: '',
          diaChi: '',
        },
        message: "",
      };
    },
    methods: {
      async addPublisher() {
        try {
          await IssuerService.add(this.publisher); // Sử dụng IssuerService để thêm nhà xuất bản
          this.message = "Nhà xuất bản được thêm thành công.";
          this.publisher = { maNXB: '', tenNXB: '', diaChi: '' }; // Reset form sau khi thêm thành công
        } catch (error) {
          console.log(error);
          this.message = "Đã xảy ra lỗi khi thêm nhà xuất bản.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .add-publisher-container {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .add-publisher {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
  }
  
  .add-publisher h2 {
    margin-top: 0;
    font-size: 24px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .save-button {
    background-color: #007bff;
    color: #fff;
  }
  
  .return-button {
    background-color: #ffc107;
  }
  
  .message {
    color: #dc3545;
    margin-top: 10px;
  }
  </style>
  