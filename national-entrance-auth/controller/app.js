const express = require('express');
const service = require('../service/studentService');
const app = express();
app.use(express.join());
// 직업적으로 프로스러운 기질 최고로 발휘하는데 중점
// 문자를 통한 본인인증 정보 등록 요청 바디에 정보하면 상태를 반환해서 돌려준다
// 휴대폰 문자 정보를 전달하면 확인 검증 여부를 요청해서 정상 상태라는 형태로 응답을 반환한다.
app.post('national-entrance/sms/send', (req,res) => {
    const {name, ssn, phone} = req.body;
    const result = service.requestSmsCode(name, ssn, phone);
    return res.status(result.status).send(result. message);
});

//..?? 모르겠는 코드
if(require.main === module) {
    app.listen(3000, () => console.log("[국가인증망] tdd 모듈 가동 중.. "))
}
