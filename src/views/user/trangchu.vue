<template>
    <div>
      <Header />
      <div class="container">
        <h2 class="mt-4">Sách nổi bật</h2>
        <div class="book-list-background">
          <div class="search-filter">
            <input type="text" v-model="searchQuery" placeholder="Tìm kiếm">
          </div>
          <div class="row mt-3">
            <div v-for="book in filteredBooks" :key="book.maSach" class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <router-link class="gachchan" :to="{ name: 'chitietsach', params: { id: book._id } }">
                    <h5 class="card-title">{{ book.tenSach }}</h5>
                    <p class="card-text"><strong>Đơn giá:</strong> {{ formatPrice(book.donGia) }}</p>
                    <p class="card-text"><strong>Năm xuất bản:</strong> {{ book.namXuatBan }}</p>
                    <p class="card-text"><strong>Tác giả:</strong> {{ book.tacGia }}</p>
                  </router-link>
                  <router-link class="gachchan" :to="{ name: 'muonsach', params: { id: book._id } }">
                    <div>
                      <button class="muonsach" @click="borrowBook(book._id)">Mượn sách</button>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BookService from "../../services/book.service";
  import Header from '../../components/AppHeader.vue';
  
  export default {
    data() {
      return {
        books: [],
        searchQuery: ""
      };
    },
    components: {
      Header,
    },
    methods: {
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
      async getAllBook() {
        try {
          this.books = await BookService.getAll();
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu sách:", error);
        }
      },
      async borrowBook(bookId) {
        try {
          // Gọi API để thực hiện việc mượn sách với bookId đã chọn
          // Ví dụ:
          // await BorrowService.borrow(bookId);
          window.alert("Bạn đã mượn sách thành công.");
        } catch (error) {
          console.error("Lỗi khi mượn sách:", error);
          window.alert("Đã xảy ra lỗi khi mượn sách. Vui lòng thử lại sau.");
        }
      }
    },
    computed: {
      filteredBooks() {
        return this.books.filter(book =>
          book.tenSach.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    created() {
      this.getAllBook();
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .card-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }
  
  .card-text {
    margin-bottom: 5px;
    color: #555;
  }
  
  .container {
    margin-top: 20px;
  }
  
  .search-filter {
    margin-bottom: 10px;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .book-list-background {
    background-image: url('/image/Hinh-anh-cuon-sach-mo-ra-doc-dao-an-tuong-day-tam-trang.jpg');
    /* Thay đổi đường dẫn đến hình ảnh của bạn */
    background-size: cover;
    /* Kéo dãn hình ảnh để lấp đầy phần nền */
    background-position: center;
    /* Đặt hình ảnh vào vị trí trung tâm */
    padding: 20px;
    /* Tăng khoảng cách giữa phần danh sách và viền */
    border-radius: 10px;
    /* Độ cong viền phần danh sách */
  }
  
  .muonsach {
    font-size: 16px;
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .muonsach:hover {
    background-color: #0056b3;
  }
  
  .gachchan {
    text-decoration: none;
    color: inherit;
  }
  
  .gachchan:hover {
    text-decoration: underline;
  }
  </style>
  