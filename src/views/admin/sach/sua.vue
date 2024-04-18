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
                    <button type="submit" class="save-button">Lưu Thay Đổi</button>
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
    background-color: white;
    margin: 30px auto;
    width: 900px;
    border-radius: 5px;
    padding: 20px;
}

.edit-book {
    max-width: 500px;
    margin: auto;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
}

input[type="text"],
input[type="number"],
select {
    width: calc(100% - 16px);
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.return-button {
    background-color: #ffc107;
    margin-left: 20px;
}

.message {
    margin-top: 10px;
    color: #dc3545;
}
</style>