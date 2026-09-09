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

    // 동시성 제어. 중복 인증 및 데이터 오염 차단 테스트 (데이터 무결성 보장. 동일한 학생이 짧은 시간내 대량의 인증을 요청하는 경우 데이터 무결성을 위해 무차별 요청을 제한한다)
    // tooManyRequest. 잠시 후 다시 시도
    
    // 무차별 대입 공격 차단 테스트
    // 틀린 번호 연속 5회 이상은 단순 실패가 아니라 인증 잠금 상태로 데이터가 변경됨. 나 역시 누군가에게 마찬가지다.
    
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

    // 대리 접수 요청 차단
    await t.test('공정한 시험을 위한 부정 행위 방지를 목적으로 대리 시험 접수 요청을 차단하는 테스트 코드', () => {
        /**
        // given
        repository.set(이름, 주민등록번호, 휴대폰 번호)
        
        // when
        서비스에 문자를 통한 본인인증 처리 요청
        // then
        status 200 여부 assert문을 통한 검증
         */
        
    })

    // 허용 임계치 초과 과부하시 다운타임에 필요한 대기열 FIFO 등록 및 차단..?
    await t.test("수시 및 정서 원서 접수할 때 이용자 급증으로 인한 다운타임에 필요한 대기열 시스템 구현을 FIFO로 처리하는 테스트 로직", () => {
        /**
        // given 본인인증 정보가 주어지면
        given = repository.set(본인인증 정보)
        // when 현재 실시간 처리 중인 부하 카운터를 임계치 이상으로 설정 (강제성?)
        result = service.requestSmsCode
        repository.incrementActive();

        // then 다운타임 방지 차단막을 작동(동작)시킨다. fifo 대기열에 등록되어있는지 검증한다. 아 고의성 방해였구나..?그럼 반응할 필요 없지
        assertEqual(expect.result, actual.result)
        // 본인인증 정보 요청량이 허용량(설정 값)을 초과하면 대기열에 등록되어있는지 검증해서 순차 처리하도록 동작시키는 구조로 설계한다..? 임계치를
        // 그럼으로써 시스템 안정성과 데이터 무결성, 연속성을 보장한다? fifo 큐 자료구조 순차처리? 운영 유지보수성 향상?
        // 이를 통해 데이터 무결성
        // 컴퓨터 시스템에서 다른 모든 요소(사용자 경험, 비용, 운영 편의성)는 차후에 보완하거나 복구할 수 있지만, 파괴되거나 왜곡된 데이터는 복구가 불가능하거나 천문학적인 비용을 발생시키기 때문입니다.
         */
    })
    
    // 무차별
});