<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="maSach">Mã sách</label>
            <Field name="maSach" type="text" class="form-control" v-model="bookLocal.maSach" />
            <ErrorMessage name="maSach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="tenSach">Tên sách</label>
            <Field name="tenSach" type="text" class="form-control" v-model="bookLocal.tenSach" />
            <ErrorMessage name="tenSach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="docGia">Đọc giả</label>
            <Field name="docGia" type="text" class="form-control" v-model="bookLocal.docGia" />
            <ErrorMessage name="docGia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="soQuyen">Số quyển</label>
            <Field name="soQuyen" type="text" class="form-control" v-model="bookLocal.soQuyen" />
            <ErrorMessage name="soQuyen" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="namXuatBan">Năm xuất bản</label>
            <Field name="namXuatBan" type="text" class="form-control" v-model="bookLocal.namXuatBan" />
            <ErrorMessage name="namXuatBan" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="maNXB">Mã nhà xuất bản</label>
            <Field name="maNXB" type="text" class="form-control" v-model="bookLocal.maNXB" />
            <ErrorMessage name="maNXB" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="tacGia">Tác giả</label>
            <Field name="tacGia" type="text" class="form-control" v-model="bookLocal.tacGia" />
            <ErrorMessage name="tacGia" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="bookLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBook">
                Xóa
            </button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, required: true }
    },
    data() {
        const bookFormSchema = yup.object().shape({
            maSach: yup
                .string()
                .required(" Mã sách phải có giá trị."),
            tenSach: yup
                .string()
                .required("Tên sách không đúng")
                .max(20, "Tên sách tối đa 20 ký tự."),
            docGia: yup
                .string()
                .required("Tên đọc giả không đúng"),
            soQuyen: yup
                .string()
                .required("Số quyển không đúng")
                .min(1,"Số quyển phải lớn hơn 1")
                .max(100,"Sô quyển tối đa 100"),
            namXuatBan: yup
                .string()
                .required("Năm xuất bản không đúng"),
            maNXB: yup
                .string()
                .required("Mã nhà xuất bản không đúng"),
            tacGia:yup
                .string()
                .required("Tên tác giả chưa phù hợp")
                .min(3,"Tên tác giả phải có 3 ký tự")
                .max(20,"Tên tác giả không được quá 20 ký tự"),

        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // contactLocal để liên kết với các input trên form
            bookLocal: this.book,
            bookFormSchema,
        };
    },
    methods: {
        submitBook() {
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>