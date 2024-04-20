<template>
  <div class="edit-borrowing-container">
    <div class="edit-borrowing">
      <h2>Sửa Trạng Thái Mượn Sách</h2>
      <form @submit.prevent="saveStatus">
        <div class="form-group">
          <label for="status">Chọn Trạng Thái:</label>
          <select v-model="selectedStatus" id="status">
            <option value="Đã Mượn">Đã Mượn</option>
            <option value="Đã Trả">Đã Trả</option>
            <option value="Trả muộn">Trả muộn</option>
          </select>
        </div>
        <div class="button-group">
          <button type="submit" class="save-button">Lưu</button>
          <router-link :to="{ name: 'quanlymuonsach' }">
            <button type="button" class="return-button">Trở Về</button>
          </router-link>
        </div>
        <p class="message">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import BorrowingService from '@/services/muonsach.service';
export default {
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      muonsach: {},
      selectedStatus: "Đã Mượn",
      message: "",
    };
  },
  methods: {
    async getBorrow() {
      try {
        this.muonsach = await BorrowingService.get(this.id);
      } catch (error) {
        console.log(error);
      }
    },
    async saveStatus() {
      try {
        await BorrowingService.update(this.id, { trangthai: this.selectedStatus });
        this.message = 'Đã cập nhật trạng thái thành công.';
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    },
  },
  created() {
    this.getBorrow(this.id);
  },
};
</script>

<style scoped>
.edit-borrowing-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 30px auto;
  padding: 20px;
}

.edit-borrowing {
  text-align: center;
}

.edit-borrowing h2 {
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
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: center;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-button {
  background: linear-gradient(to right, #007bff, #00c6ff);
  color: #fff;
  transition: background-color 0.3s ease;
}

.return-button {
  background-color: #ffc107;
  margin-left: 20px;
}

.save-button:hover {
  background: linear-gradient(to right, #0056b3, #00a0ff);
}

.message {
  margin-top: 10px;
  color: #dc3545;
}
</style>
