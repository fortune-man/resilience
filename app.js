const express = require('express');
const app = express();
const PORT = 3000;

// 2. 미들웨어 : 클라이언트에 보낼 json데이터 해석 위한 용도
app.use(express.json());

const MOCK_STUDENTS = {
    "홍길동": "050101",
    "이순신": "050505",
    "거북이 마음": "7",
};

app.post('/suneung', (req, res) => {
    const {name, birth} = req.body; 

    if (MOCK_STUDENTS[name] === birth) {
        return res.send('$(name)님, 수능 학적 확인 완료! 접수되었습니다.');

    } else {
        return res.status(400).send("학적 정보가 일치하지 않습니다.");
    }
});

app.listen(3000, () => console.log("3000번 포트에서 수능 시스템 대기 중..."));
