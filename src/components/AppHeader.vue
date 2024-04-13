<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng quả lý mượn sách</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'book' }" class="nav-link">
                    Thông tin
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>