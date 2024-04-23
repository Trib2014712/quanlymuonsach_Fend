<template>
  <Header />
  <div class="profile">
    <div class="container mt-4">
      <h2 class="text-center mb-4">Thông Tin Cá Nhân</h2>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <div class="form-group">
                <label for="tenDocGia">Tên Độc Giả:</label>
                <input
                  type="text"
                  class="form-control"
                  id="tenDocGia"
                  v-model="docgia.tenDocGia"
                  :disabled="!isEditing"
                />
              </div>
              <div class="form-group">
                <label for="ngaySinh">Ngày Sinh:</label>
                <input
                  type="text"
                  class="form-control"
                  id="ngaySinh"
                  v-model="docgia.ngaySinh"
                  :disabled="!isEditing"
                />
              </div>
              <div class="form-group">
                <label for="gioiTinh">Giới Tính:</label>
                <input
                  type="text"
                  class="form-control"
                  id="gioiTinh"
                  v-model="docgia.gioiTinh"
                  :disabled="!isEditing"
                />
              </div>
              <div class="form-group">
                <label for="diaChi">Địa Chỉ:</label>
                <input
                  type="text"
                  class="form-control"
                  id="diaChi"
                  v-model="docgia.diaChi"
                  :disabled="!isEditing"
                />
              </div>
              <div class="form-group">
                <label for="dienThoai">Điện Thoại:</label>
                <input
                  type="text"
                  class="form-control"
                  id="dienThoai"
                  v-model="docgia.dienThoai"
                  :disabled="!isEditing"
                />
              </div>
              <div class="text-center">
                <router-link
                  :to="{ name: 'editprofile', params: { id: docgia._id } }"
                  class="btn btn-primary mr-2"
                >
                  Chỉnh Sửa
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
import Header from "../../components/AppHeader.vue";
import UserService from "../../services/user.service";

export default {
  components: {
    Header,
  },

  data() {
    return {
      docgia: {},
      isEditing: false,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      try {
        // Lấy thông tin người dùng từ localStorage
        const userData = JSON.parse(localStorage.getItem("docgia"));
        // console(userData.id);
        if (userData) {
          // Gán thông tin người dùng vào user
          this.docgia = userData;
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    },

    async updateUser() {
      try {
        await UserService.update(this.docgia._id, this.docgia);
        this.isEditing = false; // Chuyển về chế độ chỉ xem sau khi cập nhật

        // Cập nhật dữ liệu mới vào local storage
        localStorage.setItem("docgia", JSON.stringify(this.docgia));
      } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      }
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
  },
  created() {
    // Gọi phương thức để lấy thông tin người dùng sau khi đăng nhập thành công
    this.getUserInfo();
  },
  mounted() {
    this.getUserInfo();
    // this.updateUser();
  },
};
</script>

<style scoped>
.profile {
  min-height: 100vh;
}

.card {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

/* Định dạng input */
.form-control[disabled] {
  background-color: #f8f9fa; /* Màu nền xám nhạt */
  border-color: #ced4da; /* Màu viền */
}

.form-control[disabled]:focus {
  box-shadow: none; /* Loại bỏ shadow khi input được chọn */
}

</style>
