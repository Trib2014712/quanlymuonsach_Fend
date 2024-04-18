<template>
    <div class="register-form">
        <h2>Đăng Ký Độc Giả</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="lastName">Họ lót:</label>
                <input type="text" id="lastName" v-model="user.hoLot" required>
            </div>
            <div class="form-group">
                <label for="firstName">Tên đọc giả:</label>
                <input type="text" id="firstName" v-model="user.tenDocGia" required>
            </div>
            <div class="form-group">
                <label for="dob">Ngày sinh:</label>
                <input type="date" id="dob" v-model="user.ngaySinh" required>
            </div>
            <div class="form-group">
                <label for="address">Địa chỉ:</label>
                <input type="text" id="address" v-model="user.diaChi" required>
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu:</label>
                <input type="password" id="password" v-model="user.password" required>
            </div>
            <div class="form-group">
                <label for="phone">Số điện thoại:</label>
                <input type="tel" id="phone" v-model="user.dienThoai" required>
            </div>
            <div class="form-group">
                <label for="gender">Giới tính:</label>
                <select v-model="user.gioiTinh" id="gioiTinh" required>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>
            </div>
            <button type="submit" class="register-button">Đăng Ký</button>
            <router-link :to="{ name: 'dangnhapnguoidung' }">
                <button type="button" class="login-button">Đăng nhập</button>
            </router-link>
        </form>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import UserService from '@/services/user.service';

export default {
    data() {
        return {
            user: {
                hoLot: '',
                tenDocGia: '',
                password: '', // Bạn có thể xóa trường này nếu không cần
                dienThoai: '',
                ngaySinh: new Date(),
                gioiTinh: '',
                diaChi: ''
            },
            message: ""
        };
    },
    methods: {
        async submitForm() {
            try {
                console.log(this.user);
                await UserService.create(this.user);
                this.message = "Bạn đã đăng ký thành công.";
                this.clearForm();
            } catch (error) {
                this.message = "Đã xảy ra lỗi khi đăng ký.";
                console.error(error);
            }
        },
        clearForm() {
            // Xóa dữ liệu trên form sau khi đăng ký thành công
            this.user.hoLot = "";
            this.user.tenDocGia = "";
            // this.user.password = ""; // Bạn có thể xóa trường này nếu không cần
            this.user.dienThoai = "";
            this.user.ngaySinh = "";
            this.user.gioiTinh = "";
            this.user.diaChi = "";
        }
    }
};
</script>

<style scoped>
.register-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

input[type="text"],
input[type="tel"],
input[type="date"],
input[type="password"],
select {
    width: calc(100% - 2px);
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

select {
    appearance: none;
}

button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

button.register-button {
    background-color: #4caf50;
    color: #fff;
    transition: background-color 0.3s ease;
}

button.login-button {
    margin-top: 0.5rem;
    background-color: #007bff;
    color: #fff;
}

button:hover {
    background-color: #333;
    color: #fff;
}
</style>
