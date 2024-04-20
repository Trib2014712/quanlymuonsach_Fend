<template>
    <Header />
    <div class="quy-dinh-muon-sach">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="8">
            <v-card class="card">
              <v-card-title class="headline">
                Quy Định Mượn Sách
              </v-card-title>
              <v-card-text class="content">
                <p>
                  Để mượn sách, độc giả cần tuân thủ các quy định sau:
                </p>
                <ul>
                  <li>Sách được mượn tối đa là 5 cuốn.</li>
                  <li>Thời gian mượn mỗi cuốn sách là 14 ngày.</li>
                  <li>Trong thời gian mượn sách, độc giả cần giữ gìn sách, tránh gây hỏng hoặc mất sách.</li>
                  <li>Sách trả muộn sẽ phải nộp phạt theo quy định của thư viện.</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  import Header from '../../components/AppHeader.vue';
  
  export default {
    name: 'QuyDinhMuonSach',
    components: {
      Header,
    },
  };
  </script>
  
  <style scoped>
  .quy-dinh-muon-sach {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }
  
  .card {
    max-width: 600px;
    border: 2px solid #28a745; /* Màu xanh lá */
    border-radius: 10px; /* Bo góc viền */
  }
  
  .headline {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .content p {
    font-size: 18px;
    line-height: 1.6;
  }
  
  .content ul {
    font-size: 16px;
    line-height: 1.6;
    margin-left: 20px;
  }
  
  .content ul li {
    margin-bottom: 8px;
  }
  </style>
  