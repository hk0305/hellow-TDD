// 패키지 사용하기
// npm install express mongoose --save
// npm install jest supertest node-mocks-http
const express = require('express');

// Constants
const PORT = 5000;
const HOST = '0.0.0.0';

// App
const app = express();

// 라우터와 컨트롤러를 사용하여 URI 맵핑
const productRoutes = require("./routes/productRoutes");

// 몽구스
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hk0305:FZt2QWma3deMPSE@tddcluster1.tacig.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(()=> console.log('MongoDB Connected...'))
    .catch(err=> console.log(err));

// JSON으로 이루어진 request.body를 파싱한다.
app.use(express.json());
app.use("/api/products", productRoutes);

app.get('/', (req, res) => {
    res.send('Hello Wrold');
});

app.listen(PORT, HOST);
console.log('Running on');