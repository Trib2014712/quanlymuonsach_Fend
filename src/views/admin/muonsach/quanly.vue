<template>
  <Navbar />
  <div class="admin-manage-borrowing">
    <div class="form-container">
      <div class="form-header">
        <!-- <h2>Quản lý Mượn Sách</h2> -->
      </div>
      <div class="form-content">
        <table>
          <thead>
            <tr>
              <th>Số Thứ Tự</th>
              <th>Mã Đọc Giả</th>
              <th>Tên Đọc Giả</th>
              <th>Mã Sách Mượn</th>
              <th>Tên Sách Mượn</th>
              <th>Ngày Mượn</th>
              <th>Ngày Trả</th>
              <th>Tình Trạng</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(muonsach, index) in muonsachs" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ muonsach.maDocGia }}</td>
              <td>{{ muonsach.tenDocGia }}</td>
              <td>{{ muonsach.maSach }}</td>
              <td>{{ muonsach.tenSach }}</td>
              <td>{{ muonsach.ngayMuon }}</td>
              <td>{{ muonsach.ngayTra }}</td>
              <td>{{ muonsach.trangThai }}</td>
              <td>
                <router-link :to="{ name: 'suatrangthai', params: { id: muonsach._id } }">
                  <button class="edit-button" @click="editStatus(muonsach)">Sửa Trạng Thái</button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import BorrowingService from '@/services/muonsach.service';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      muonsachs: [],
    };
  },
  methods: {
    editStatus(muonsach) {
      this.$router.push({ name: "suatrangthai", params: { id: muonsach._id } });
    },
    async getAllBorrow() {
      this.muonsachs = await BorrowingService.getAll();
    },
  },
  created() {
    this.getAllBorrow();
  },
};
</script>

<style scoped>
.admin-manage-borrowing {
  display: flex;
}
.form-container {
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
}
.form-header {
  text-align: center;
  margin-bottom: 20px;
}
.form-header h2 {
  font-size: 24px;
  color: #333;
}
.form-content {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
.edit-button {
  background: linear-gradient(to right, #007bff, #0056b3);
  color: #fff;
  padding: 5px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.edit-button:hover {
  background: linear-gradient(to right, #0056b3, #007bff);
}
</style>
