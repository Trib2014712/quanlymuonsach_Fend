<template>
    <Navbar/>
    <div class="admin-panel">
      <div class="main-content">
        <h2>Quản lý Nhà Xuất Bản</h2>
        <div class="action-bar">
        <router-link to="/admin/sach/them">
          <button class="them">Thêm sách</button>
        </router-link>
        <div class="search-wrapper">
          <div class="search-bar">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Tìm kiếm"
              class="search-input"
            />
            <button @click="searchBooks" class="search-button">Tìm kiếm</button>
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
                  <button class="sua">Sửa</button>
                </router-link>
                <button class="xoa" @click="deletenxb(nxb)">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="previousPage" :disabled="currentPage === 1">
            Trang trước
          </button>
          <span>Trang {{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">
            Kế tiếp
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import nxbService from "../../../services/issuer.service";
import Navbar from "@/components/navbar.vue";
export default {
    components: {
      Navbar,
    },
  data() {
    return {
      nxbs: [], // Đổi từ 'books' thành 'nxbs'
      currentPage: 1,
      pageSize: 10,
      searchQuery: "",
    };
  },
  methods: {
    async getAllnxb() {
      this.nxbs = await nxbService.getAll();// Sử dụng 'nxbs' thay vì 'books'
    },
    async searchnxbs() {
      if (this.searchQuery.trim() === "") {
        this.getAllnxb();
        return;
      }
      try {
        let filtered = this.nxbs; // Sử dụng 'nxbs' thay vì 'books'
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
          await IssuerService.delete(nxb._id);
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
.action-bar {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
}

.search-wrapper {
margin-right: auto; /* Đẩy phần tử này về bên trái cùng */
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
padding: 8px 12px;
background-color: #007bff;
color: #fff;
border: none;
border-radius: 4px;
cursor: pointer;
transition: background-color 0.3s ease;
}

.search-button:hover {
background-color: #0056b3;
}

.admin-panel {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
}

.search-bar input {
  margin-right: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
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

button {
  padding: 5px 10px;
  margin-right: 5px;
}

.them {
  background-color: #28a745;
}

.sua {
  background-color: #ffc107;
}

.xoa {
  background-color: #dc3545;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.pagination button {
  margin-left: 10px;
}
</style>
