<template>
  <div>
    <Header />
    <div class="container">
      <div class="book-details">
        <h2>Chi tiết sách</h2>
        <div class="details">
          <p><strong>Tên sách: </strong>{{ book.tenSach }}</p>
          <p><strong>Mã sách:</strong> {{ book.maSach }}</p>
          <p><strong>Đơn giá:</strong> {{ formatPrice(book.donGia) }}</p>
          <p><strong>Số lượng:</strong> {{ book.soQuyen }}</p>
          <p><strong>Năm xuất bản:</strong> {{ book.namXuatBan }}</p>
          <p><strong>Mã NXB:</strong> {{ book.maNXB }}</p>
          <p><strong>Tác giả:</strong> {{ book.tacGia }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookService from '@/services/book.service';
import Header from './AppHeader.vue';

export default {
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      book: {},
    };
  },
  components: {
    Header,
  },
  methods: {
    async getBookById(id) {
      try {
        this.book = await BookService.get(this.id); // Sử dụng this.id để truyền vào hàm get
      } catch (error) {
        console.error(error);
      }
    },
    formatPrice(price) {
      const priceNumber = parseFloat(price);
      if (isNaN(priceNumber)) {
        return price;
      }
      // Định dạng giá tiền sang "40.000 vnđ"
      return priceNumber.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
  },
  created() {
    this.getBookById();
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.book-details {
  max-width: 600px;
  margin: auto;
}

.book-details h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.details {
  border: 1px solid #4caf50; /* Màu viền xanh lá */
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.details p {
  margin-bottom: 10px;
}
</style>
