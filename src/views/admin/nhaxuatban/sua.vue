<template>
    <div class="edit-publisher-container">
      <div class="edit-publisher">
        <h2>Sửa Nhà Xuất Bản</h2>
        <form @submit.prevent="updatePublisher">
          <div class="form-group">
            <label for="maNXB">Mã Nhà Xuất Bản:</label>
            <input type="text" id="maNXB" v-model="publisherLocal.maNXB" required>
          </div>
          <div class="form-group">
            <label for="tenNXB">Tên Nhà Xuất Bản:</label>
            <input type="text" id="tenNXB" v-model="publisherLocal.tenNXB" required>
          </div>
          <div class="form-group">
            <label for="diaChi">Địa Chỉ:</label>
            <input type="text" id="diaChi" v-model="publisherLocal.diaChi" required>
          </div>
          <div class="form-group button-group">
            <button type="submit" class="save-button">Lưu Thay Đổi</button>
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
        publisherLocal: {
          maNXB: '',
          tenNXB: '',
          diaChi: '',
        },
        message: "",
      };
    },
    props: {
      id: { type: String, required: true },
    },
    methods: {
      async getPublisher() {
        try {
          const id = this.id;
          this.publisherLocal = await IssuerService.get(id);
        } catch (error) {
          console.log(error);
          this.message = "Không thể tìm thấy nhà xuất bản.";
        }
      },
      async updatePublisher() {
        try {
          const id = this.id;
          await IssuerService.update(id, this.publisherLocal);
          this.message = "Thông tin nhà xuất bản được cập nhật thành công.";
        } catch (error) {
          console.log(error);
          this.message = "Đã xảy ra lỗi khi cập nhật thông tin nhà xuất bản.";
        }
      },
    },
    created() {
      this.getPublisher();
    },
  };
  </script>
  
  <style scoped>
  .edit-publisher-container {
    background-color: #f0f0f0;
    margin: 30px auto;
    width: 90%;
    max-width: 600px;
    border-radius: 10px;
    padding: 20px;
  }
  
  .edit-publisher {
    margin: 0 auto;
  }
  
  .edit-publisher h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .label {
    font-weight: bold;
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
    margin-top: 10px;
    color: #dc3545;
    text-align: center;
  }
  </style>
  