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
          <button type="submit" class="gradient-button">Lưu Thay Đổi</button>
          <router-link :to="{ name: 'quanlynxb' }"> 
            <button type="button" class="gradient-button return-button">Trở Về</button>
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
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 30px auto;
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

.gradient-button {
  background: linear-gradient(to right, #ff4e50, #f9d423);
  color: #fff;
  transition: background 0.3s ease;
}

.return-button {
  background: linear-gradient(to right, #3a7bd5, #3a6073);
  color: #fff;
  transition: background 0.3s ease;
}

.gradient-button:hover, .return-button:hover {
  filter: brightness(1.1);
}

.message {
  margin-top: 10px;
  color: #dc3545;
  text-align: center;
}
</style>
