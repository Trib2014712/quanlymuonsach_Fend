<script>
export default {
    props: {
        contact: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Mã sách:</strong>
            {{ book.maSach }}
        </div>
        <div class="p-1">
            <strong>Tên sách:</strong>
            {{ book.tenSach }}
        </div>
        <div class="p-1">
            <strong>Đọc giả:</strong>
            {{ book.docGia }}
        </div>
        <div class="p-1">
            <strong>Số quyển:</strong>
            {{ book.soQuyen }}
        </div>
        <div class="p-1">
            <strong>Năm xuất bản:</strong>
            {{ book.namXuatBan }}
        </div>
        <div class="p-1">
            <strong>Mã nhà xuất bản:</strong>
            {{ book.maNXB }}
        </div>
        <div class="p-1">
            <strong>Tác giả:</strong>
            {{ book.tacGia }}
        </div>
       
    </div>
</template>