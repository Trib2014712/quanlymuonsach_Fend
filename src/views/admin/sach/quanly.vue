<template>
  <Navbar/>
  <div class="admin-panel">
    <div class="main-content">
      <!-- <h2 class="section-title">Quản lý sách</h2> -->
      <div class="action-bar">
        <router-link to="/admin/sach/them">
          <button class="add-button">Thêm sách</button>
        </router-link>
        <div class="search-wrapper">
          <div class="search-bar">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Tìm kiếm"
              class="search-input"
            />
            <button @click="searchBooks" class="search-button" >Tìm kiếm</button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Sách</th>
            <th>Tên Sách</th>
            <th>Đơn Giá</th>
            <th>Số Quyển</th>
            <th>Tác Giả</th>
            <th>Năm Sản Bản</th>
            <th>Mã NXB</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in paginatedBooks" :key="index">
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ book.maSach }}</td>
            <td>{{ book.tenSach }}</td>
            <td>{{ formatPrice(book.donGia) }}</td>
            <td>{{ book.soQuyen }}</td>
            <td>{{ book.tacGia }}</td>
            <td>{{ book.namXuatBan }}</td>
            <td>{{ book.maNXB }}</td>
            <td>
              <router-link
                :to="{
                  name: 'suasach',
                  params: { id: book._id },
                }"
              >
                <button class="edit-button">Sửa</button>
              </router-link>
              <button class="delete-button" @click="deleteBook(book)">Xóa</button>
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
import BookService from "../../../services/book.service";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      books: [],
      currentPage: 1,
      pageSize: 7,
      searchQuery: "",
    };
  },
  methods: {
    async getAllBook() {
      this.books = await BookService.getAll();
    },
    async searchBooks() {
      if (this.searchQuery.trim() === "") {
        this.getAllBook();
        return;
      }
      try {
        let filtered = this.books;
        if (this.searchQuery) {
          filtered = filtered.filter((book) =>
            book.tenSach.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
        this.books = filtered;
      } catch (error) {
        console.error("Lỗi khi tìm kiếm sách:", error);
      }
    },

    async deleteBook(book) {
      if (confirm("Bạn muốn xóa sách này?")) {
        try {
          await BookService.delete(book._id);
          this.books = this.books.filter((item) => item._id !== book._id);
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
    formatPrice(price) {
      const priceNumber = parseFloat(price);
      if (isNaN(priceNumber)) {
        return price;
      }
      return priceNumber.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.books.length / this.pageSize);
    },
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.books.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.getAllBook();
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
