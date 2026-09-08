// Map, 학적부 정보 저장소
const studentMap = new Map();

// fifo 가상 대기열
const waitingQueue = [];

// 실시간 카운터 변수 - 필요성 있는 변수인가? 이거 왜 하는거더라? 임계치 제한? 왜 필요했지?
let currentActiveRequests = 0;

module.exports = {
    // 인증 시스템 동작 흐름
    setStudent : (name, data) => studentMap.set(name, data),
    findStudent : studentMap.get(name, data),

    // FIFO 대기열 제어
    pushQueue: (phone) => waitingQueue.push(phone),
    getQueueLength: () => waitingQueue.length,

    // 특정시간 과부하 다운타임 대처에 필요한 실시간 카운터 변수 비교 연산자 제어
    getActiveCount: () => { currentActiveRequests },
    incrementActive: () => { currentActiveRequests++; } , 
    decrementActive: () => { currentActiveRequest--; },

    // 테스트 초기화 용
    clearAll: () => {
        studentMap.clear();
        waitingQueue.length = 0;
        currentActiveRequests = 0;
    }
};
