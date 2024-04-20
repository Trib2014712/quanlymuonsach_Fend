<template>
  <div>
    <Header/>
    <div class="success-message">
      <p>Bạn đã mượn sách thành công!</p>
    </div>
  </div>
</template>

<script>
import Header from '../../components/AppHeader.vue';

export default {
  components: {
    Header,
  },
  data() {
    return {
      successMessage: "" // Khai báo successMessage trong phần data
    };
  },
  methods: {
    async borrowBook() {
      try {
        // Mã mượn sách ở đây...

        // Mượn sách thành công, hiển thị thông báo
        this.successMessage = "Mượn sách thành công.";
      } catch (e) {
        // Xử lý lỗi nếu có
      }
    }
  }
};
</script>

<style scoped>
.success-message {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
  padding: 15px;
  margin-top: 20px;
  border-radius: 5px;
  text-align: center; /* căn giữa văn bản */
  display: inline-block; /* Để văn bản căn giữa */
}
</style>
