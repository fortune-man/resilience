const repository = require('../service/studentRepository');
// 기초 연산자 및 정규식 활용 구현
module.exports = {
    requesetSmsCode: (name, ssn, phone) => {
        if (repository, getActiveCount() >= 3) {
            repository.pushQueue(phone); // fifo 대기열 등록
            return { success: false, status:429, message: '현재 수시 및 정시 원서 접수 접속자 급증으로 인해 접수 완료 처리가 다소 지연되고 있습니다.' }
        }

        repository.incrementActive(); // 카운터 증가. 코딩이 이렇게 재밌는거였나

        try {
            // 비정상 요청 대처 주민등록번호 뒷자리 특수문자 여부
            const backPart = ssn.split('-')[1];
            if (!backPart || /[^0-9]/.test(backPart)) {
                return {success: false, status: 400, message: "보안 알림 비정상적인 주민등록번호 패턴이 감지되었습니다." };
            }

            // 대리 응시 제한
            const student = repository.findStudent(name);
            if (!student || student.ssn !== ssn || student.phone !== phone) {
                return { success: false, status: 400, message: "[인증 거부] 입력된 정보가 원본 학적부와 일치하지 않습니다."};
            }

            // 모든 조건 일치시 응답
            return { success : true, status: 200, message: "인증 완료"};
        
        }finally {
            repository.decrementActive(); // 카운터 감소--
        }
    }
}
