<template>
    <div class="edit-book-container">
        <div class="edit-book">
            <h2>Sửa Sách</h2>
            <form @submit.prevent="updateBook">
                <div class="form-group">
                    <label for="maSach">Mã sách:</label>
                    <input type="text" id="maSach" v-model="bookLocal.maSach" required>
                </div>
                <div class="form-group">
                    <label for="tenSach">Tên Sách:</label>
                    <input type="text" id="tenSach" v-model="bookLocal.tenSach" required>
                </div>
                <div class="form-group">
                    <label for="donGia">Đơn Giá:</label>
                    <input type="number" id="donGia" v-model="bookLocal.donGia" required>
                </div>
                <div class="form-group">
                    <label for="soQuyen">Số Quyển:</label>
                    <input type="number" id="soQuyen" v-model="bookLocal.soQuyen" required>
                </div>
                <div class="form-group">
                    <label for="tacGia">Tác Giả:</label>
                    <input type="text" id="tacGia" v-model="bookLocal.tacGia" required>
                </div>
                <div class="form-group">
                    <label for="namXuatBan">Năm Xuất Bản:</label>
                    <input type="number" id="namXuatBan" v-model="bookLocal.namXuatBan" required>
                </div>
                <div class="form-group">
                    <label for="maNXB">Mã Xuất Bản:</label>
                    <input type="number" id="maNXB" v-model="bookLocal.maNXB" required>
                </div>
                <!-- Các trường thông tin khác -->
                <div class="form-group">
                    <button type="submit" class="save-button">Thay Đổi</button>
                    <router-link :to="{ name: 'quanlysach' }">
                        <button type="button" class="return-button">Trở Về</button>
                    </router-link>
                </div>
                <p class="message">{{ message }}</p>
            </form>
        </div>
    </div>
</template>

<script>
import BookService from "../../../services/book.service";

export default {
    data() {
        return {
            bookLocal: {
                maSach: '',
                tenSach: '',
                donGia: 0,
                soQuyen: 0,
                tacGia: '',
                namXuatBan: '',
                maNXB: '',
            },
            message: "",
        };
    },
    methods: {
        async getBook() {
            try {
                const id = this.$route.params.id; // Lấy ID sách từ route params
                this.bookLocal = await BookService.get(id);
            } catch (error) {
                console.log(error);
                // Xử lý lỗi nếu cần thiết
                this.message = "Không thể tìm thấy sách.";
            }
        },
        async updateBook() {
            try {
                const id = this.$route.params.id; // Lấy ID sách từ route params
                await BookService.update(id, this.bookLocal);
                this.message = "Sách được cập nhật thành công.";
            } catch (error) {
                console.log(error);
                this.message = "Đã xảy ra lỗi khi cập nhật sách.";
            }
        },
    },
    created() {
        this.getBook(); // Gọi phương thức để lấy dữ liệu của sách khi component được tạo
    },
};
</script>


<style scoped>
.edit-book-container {
    background-color: #ffffff; /* Màu nền sáng */
    margin: 30px auto;
    width: 80%;
    max-width: 900px;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.edit-book {
    max-width: 500px;
    margin: auto;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
}

input[type="text"],
input[type="number"],
select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
}

button {
    width: auto;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

button.save-button {
    background-image: linear-gradient(to right, #00b4db, #0083b0);
    color: #fff;
}

button.return-button {
    background-image: linear-gradient(to right, #ffc107, #ffb000);
    color: #000;
}

button:hover {
    background-color: #333;
    color: #fff;
}

.message {
    margin-top: 20px;
    font-size: 16px;
    color: #dc3545;
}
</style>
