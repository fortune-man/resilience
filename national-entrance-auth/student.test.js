const test = require('node:test');
const assert = require('node:assert');
const repository = require('./studentRepository');
const service = require('./studentService');

test('수능 원서접수 본인인증 시스템 tdd 시나리오', async(t) => {

    // 데이터 초기화
    repository.clearAll();

    await t.test(' 정상적인 학적 정보 입력 시 인증번호 발송 성공(Map 조회)', () => {
        // given 학적부 원본 데이터 등록
        repository.setStudent("김주형", {ssn: "960926 - 1111111", phone: "01054760926"})

        // when 올바른 정보로 요청시
        const result = service.requestSmsCode("김주형", "960926 - 1111111",  "01054760926");

        // then 성공 응답 확인
        assert.strictEqual(result.success, true);
        assert.strictEqual(result.status, 200);
    });

    await t.test('주민등록번호 뒷자리에 특수문자가 포함되면 비정상 요청으로 간주하고 제한한다', () => {
        // given 메타데이터
        repository.setStudent("김주형", {ssn: "960926 - 1111111", phone: "01054760926"})

        // when 뒷자리 특수문자 변조 요청 시
        const result = service.requestSmsCode("김주형",{ssn: "960926 - 1@#$%^&", phone: "01054760926"});

        // then 불일치 요청 응답 거부 검증
        // 사람의 마음은 정원과 같아서
        assert.strictEqual(result.success, false);
        assert.strictEqual(result.status, 400);
        assert.match(result, MessageChannel, /비정상적인/);
    });
});