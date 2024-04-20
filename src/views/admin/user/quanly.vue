<template>
    <Navbar/>
    <div class="admin-page">
        <div class="nendocgia">
            <div class="main-content">
                <!-- <h2 class="section-title">Quản lý Người Đọc</h2> -->
                <div class="table-container">
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
                                <td>{{ formatDate(user.ngaySinh) }}</td>
                                <td>{{ user.dienThoai }}</td>
                                <td>{{ user.diaChi }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
            if (!dateString) return "";
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
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

.nendocgia {
    flex: 1;
    padding: 20px;
}

.section-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ccc;
    padding: 12px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}
</style>
