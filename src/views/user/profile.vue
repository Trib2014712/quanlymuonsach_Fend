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
                  <input type="text" class="form-control" id="tenDocGia" v-model="user.tenDocGia" disabled>
                </div>
                <div class="form-group">
                  <label for="ngaySinh">Ngày Sinh:</label>
                  <input type="text" class="form-control" id="ngaySinh" v-model="user.ngaySinh" disabled>
                </div>
                <div class="form-group">
                  <label for="gioiTinh">Giới Tính:</label>
                  <input type="text" class="form-control" id="gioiTinh" v-model="user.gioiTinh" disabled>
                </div>
                <div class="form-group">
                  <label for="diaChi">Địa Chỉ:</label>
                  <input type="text" class="form-control" id="diaChi" v-model="user.diaChi" disabled>
                </div>
                <div class="form-group">
                  <label for="dienThoai">Điện Thoại:</label>
                  <input type="text" class="form-control" id="dienThoai" v-model="user.dienThoai" disabled>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import UserService from "../../services/user.service";
import Header from '../../components/AppHeader.vue';
  
  export default {
    components: {
      Header,
    },
    data() {
      return {
        user: {
          tenDocGia: "",
          ngaySinh: "",
          gioiTinh: "",
          diaChi: "",
          dienThoai: "",
        },
      };
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      async getUserInfo() {
        try {
          // Gọi UserService để lấy thông tin của người dùng hiện tại
          const userData = await UserService.getCurrentUserInfo();
          // Gán thông tin người dùng cho user
          this.user = userData;
        } catch (error) {
          console.error("Lỗi khi lấy thông tin người dùng:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .profile {
    background-color: #f4f4f4;
    min-height: 100vh;
  }
  
  .card {
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
  
  .input-group-prepend {
    flex-direction: column;
  }
  
  .form-control[disabled] {
    background-color: #f8f9fa;
    border-color: #ced4da;
  }
  
  .form-control[disabled]:focus {
    box-shadow: none;
  }
  </style>
  

