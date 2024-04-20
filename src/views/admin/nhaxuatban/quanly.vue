<template>
  <Navbar/>
  <div class="admin-panel">
    <div class="main-content">
      <!-- <h2 class="section-title">Quản lý Nhà Xuất Bản</h2> -->
      <div class="action-bar">
        <router-link to="/admin/nxb/them">
          <button class="add-button">Thêm nhà xuất bản</button>
        </router-link>
        <div class="search-wrapper">
          <div class="search-bar">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Tìm kiếm"
              class="search-input"
            />
            <button @click="searchnxbs" class="search-button">Tìm kiếm</button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã nhà xuất bản</th>
            <th>Tên nhà xuất bản</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(nxb, index) in paginatedBooks" :key="index">
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ nxb.maNXB }}</td>
            <td>{{ nxb.tenNXB }}</td>
            <td>{{ nxb.diaChi }}</td>
            <td>
              <router-link
                :to="{
                  name: 'suanxb',
                  params: { id: nxb._id },
                }"
              >
                <button class="edit-button">Sửa</button>
              </router-link>
              <button class="delete-button" @click="deletenxb(nxb)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1" class="page-button">
          Trang trước
        </button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="page-button">
          Trang sau
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import nxbService from "../../../services/issuer.service";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      nxbs: [],
      currentPage: 1,
      pageSize: 7,
      searchQuery: "",
    };
  },
  methods: {
    async getAllnxb() {
      this.nxbs = await nxbService.getAll();
    },
    async searchnxbs() {
      if (this.searchQuery.trim() === "") {
        this.getAllnxb();
        return;
      }
      try {
        let filtered = this.nxbs;
        if (this.searchQuery) {
          filtered = filtered.filter((nxb) =>
            nxb.tenNXB.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
        this.nxbs = filtered;
      } catch (error) {
        console.error("Lỗi khi tìm kiếm sách:", error);
      }
    },
    async deletenxb(nxb) {
      if (confirm("Bạn muốn xóa sách này?")) {
        try {
          await nxbService.delete(nxb._id);
          this.nxbs = this.nxbs.filter((item) => item._id !== nxb._id);
        } catch (error) {
          console.error("Lỗi khi xóa sách:", error);
        }
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.nxbs.length / this.pageSize);
    },
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.nxbs.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.getAllnxb();
  },
};
</script>

<style scoped>
.admin-panel {
  display: flex;
  padding: 20px;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 16px;
}

.search-button {
  background: linear-gradient(to right, #007bff, #00c6ff);
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background: linear-gradient(to right, #0056b3, #00a0ff);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ccc;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  padding: 8px 16px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button {
  background: linear-gradient(to right, #28a745, #32cd32);
}

.edit-button {
  background: linear-gradient(to right, #ffc107, #ffd700);
}

.delete-button {
  background: linear-gradient(to right, #dc3545, #ff0000);
}

.page-button {
  background: linear-gradient(to right, #007bff, #00c6ff);
  color: #fff;
}

.page-button:hover {
  background: linear-gradient(to right, #0056b3, #00a0ff);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
