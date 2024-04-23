<template>
  <Header/>
    <div class="edit-profile">
      <div class="container mt-4">
        <h2 class="text-center mb-4">Chỉnh Sửa Thông Tin Cá Nhân</h2>
         <form @submit.prevent="updateUser" class="form-border">
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
                  />
                </div>
                <div class="form-group">
                  <label for="ngaySinh">Ngày Sinh:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="ngaySinh"
                    v-model="docgia.ngaySinh"
                  />
                </div>
                <div class="form-group">
                  <label for="gioiTinh">Giới Tính:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="gioiTinh"
                    v-model="docgia.gioiTinh"
                  />
                </div>
                <div class="form-group">
                  <label for="diaChi">Địa Chỉ:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="diaChi"
                    v-model="docgia.diaChi"
                  />
                </div>
                <div class="form-group">
                  <label for="dienThoai">Điện Thoại:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="dienThoai"
                    v-model="docgia.dienThoai"
                  />
                </div>
                <div class="text-center">
                  <div class="form-group">
                    <button type="submit" class="save-button">Thay Đổi</button>
                  <router-link :to="{ name: 'profile' }" class="btn btn-secondary">
                    Hủy
                  </router-link>
                </div>
                 <!-- Hiển thị thông báo khi chỉnh sửa thành công -->
                 <p class="message">{{ message }}</p>
              </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>

    </div>
  </template>
  
  <script>
  import UserService from "../../services/user.service";
  import Header from "../../components/AppHeader.vue";
  
  export default {
    components: {
    Header,
  },
    data() {
      return {
        docgia: {
          tenDocGia: "",
          ngaySinh: "",
          gioiTinh: "",
          diaChi: "",
          dienThoai: ""
        },
        message: "",
      };
    
    },
    methods: {
  async updateUser() {
    try {
      const id = this.$route.params.id;
      const response = await UserService.update(id, this.docgia);
      localStorage.setItem("docgia", JSON.stringify(this.docgia));
      this.$router.push({ name: 'profile' });
      if (response) {
        this.message = "Người dùng được cập nhật thành công.";
      } else {
        this.message = "Đã xảy ra lỗi khi cập nhật thông tin người dùng.";
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      this.message = "Đã xảy ra lỗi khi cập nhật thông tin người dùng.";
    }
  },
  async getUser() {
    try {
      const id = this.$route.params.id;
      const userData = JSON.parse(localStorage.getItem("docgia"));
      if (userData) {
        this.docgia = userData;
      } else {
        const response = await UserService.get(id);
        this.docgia = response.data;
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  }
},

  created() {
    this.getUser();
  }
};
  </script>
  
  <style scoped>
.edit-profile {
  margin-top: 20px;
}

.edit-profile .form-border {
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 20px;
}

.edit-profile .card {
  border: none;
}

.edit-profile .form-group {
  margin-bottom: 20px;
}

.edit-profile label {
  font-weight: bold;
}

.edit-profile .save-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.edit-profile .save-button:hover {
  background-color: #0056b3;
}

.edit-profile .message {
  color: #28a745; /* Màu xanh lá cây */
  margin-top: 10px;
}

  </style>
  