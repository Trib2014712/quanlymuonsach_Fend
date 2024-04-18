<template>
    <div class="container">
      <h2 class="mt-4">Danh sách Sách</h2>
      <div class="row mt-3">
        <!-- Form thêm sách -->
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Thêm Sách Mới</h5>
              <form @submit.prevent="addBook">
                <div class="form-group">
                  <label for="newMaSach">Mã sách:</label>
                  <input type="text" class="form-control" id="newMaSach" v-model="newBook.maSach" required>
                </div>
                <div class="form-group">
                  <label for="newTenSach">Tên sách:</label>
                  <input type="text" class="form-control" id="newTenSach" v-model="newBook.tenSach" required>
                </div>
                <div class="form-group">
                  <label for="newDonGia">Đơn giá:</label>
                  <input type="number" class="form-control" id="newDonGia" v-model="newBook.donGia" required>
                </div>
                <div class="form-group">
                  <label for="newSoQuyen">Số lượng:</label>
                  <input type="number" class="form-control" id="newSoQuyen" v-model="newBook.soQuyen" required>
                </div>
                <div class="form-group">
                  <label for="newNamXuatBan">Năm xuất bản:</label>
                  <input type="number" class="form-control" id="newNamXuatBan" v-model="newBook.namXuatBan" required>
                </div>
                <div class="form-group">
                  <label for="newMaNXB">Mã NXB:</label>
                  <input type="text" class="form-control" id="newMaNXB" v-model="newBook.maNXB" required>
                </div>
                <div class="form-group">
                  <label for="newTacGia">Tác giả:</label>
                  <input type="text" class="form-control" id="newTacGia" v-model="newBook.tacGia" required>
                </div>
                <button type="submit" class="btn btn-primary">Thêm sách</button>
              </form>
            </div>
          </div>
        </div>
        <!-- Danh sách sách -->
        <div class="col-md-8">
          <div v-for="book in books" :key="book.maSach" class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ book.tenSach }}</h5>
              <p class="card-text"><strong>Mã sách:</strong> {{ book.maSach }}</p>
              <p class="card-text"><strong>Đơn giá:</strong> {{ book.donGia }}</p>
              <p class="card-text"><strong>Số lượng:</strong> {{ book.soQuyen }}</p>
              <p class="card-text"><strong>Năm xuất bản:</strong> {{ book.namXuatBan }}</p>
              <p class="card-text"><strong>Mã NXB:</strong> {{ book.maNXB }}</p>
              <p class="card-text"><strong>Tác giả:</strong> {{ book.tacGia }}</p>
              <button @click="editBook(book)" class="btn btn-sm btn-primary mr-2">Sửa</button>
              <button @click="deleteBook(book.maSach)" class="btn btn-sm btn-danger">Xóa</button>
            </div>
          </div>
          <p v-if="books.length === 0" class="text-center">Không có sách nào.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import navbar from "@/components/navbar.vue";
  export default {
    data() {
      return {
        books: [
          { maSach: '001', tenSach: 'Sách A', donGia: 100000, soQuyen: 10, namXuatBan: 2020, maNXB: 'NXB001', tacGia: 'Tác giả A' },
          { maSach: '002', tenSach: 'Sách B', donGia: 120000, soQuyen: 8, namXuatBan: 2019, maNXB: 'NXB002', tacGia: 'Tác giả B' },
          { maSach: '003', tenSach: 'Sách C', donGia: 90000, soQuyen: 15, namXuatBan: 2021, maNXB: 'NXB003', tacGia: 'Tác giả C' },
        ],
        newBook: { maSach: '', tenSach: '', donGia: 0, soQuyen: 0, namXuatBan: 0, maNXB: '', tacGia: '' },
        editMode: false,
        editedBook: {}
      };
    },
    methods: {
      addBook() {
        this.books.push({ ...this.newBook });
        this.newBook = { maSach: '', tenSach: '', donGia: 0, soQuyen: 0, namXuatBan: 0, maNXB: '', tacGia: '' };
      },
      editBook(book) {
        this.editMode = true;
        this.editedBook = { ...book };
      },
      saveEditedBook() {
        this.editMode = false;
        // Cập nhật thông tin sách đã sửa trong mảng books
        const index = this.books.findIndex(book => book.maSach === this.editedBook.maSach);
        if (index !== -1) {
          this.books.splice(index, 1, { ...this.editedBook });
        }
        this.editedBook = {};
      },
      cancelEdit() {
        this.editMode = false;
        this.editedBook = {};
      },
      deleteBook(maSach) {
        if (confirm('Bạn có chắc chắn muốn xóa sách này?')) {
          this.books = this.books.filter(book => book.maSach !== maSach);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your custom styles can go here */
  </style>
  