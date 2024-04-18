<template>
    <Navbar/>
    <div class="admin-page">
        <div class="nendocgia">
            <div class="main-content">
                <h2>Quản lý Người Đọc</h2>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ Lót Đọc Giả</th>
                            <th>Tên Đọc Giả</th>
                            <th>Giới Tính</th>
                            <th>Ngày Sinh</th>
                            <th>Số Điện Thoại</th>
                            <th>Địa Chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in docgia" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.hoLot }}</td>
                            <td>{{ user.tenDocGia }}</td>
                            <td>{{ user.gioiTinh }}</td>
                            <td>{{ formatDate(user.ngaySinh) }}</td> <!-- Gọi phương thức formatDate -->
                            <td>{{ user.dienThoai }}</td>
                            <td>{{ user.diaChi }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import UserService from "@/services/user.service";
import Navbar from "@/components/navbar.vue";
export default {
    components: {
      Navbar,
    },
    data() {
        return {
            docgia: [],
        };
    },
    methods: {
        async getAllUser() {
            this.docgia = await UserService.getAll();
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day} - ${month} - ${year}`;
        },
    },
    created() {
        this.getAllUser();
    },
};
</script>

<style scoped>
.admin-page {
    display: flex;
}

.main-content {
    flex: 1;
    padding: 20px;
}
.nendocgia{
    background-color: white;
    width: 100%;
    height: 800px;
    border-radius: 5px;
    padding: 20px;
}
table {
    width: 100%;
    border-collapse: collapse;
}

.sidebar {
    background-color: #f2f2f2;
}

th,
td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}
</style>
