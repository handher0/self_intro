// 프로필 사진 요소를 선택
const profilePhoto = document.querySelector(".profile-photo");
// const profilePhoto = document.getElementsByClassName("profile-photo")[0];

// 프로필 사진 클릭 이벤트 리스너 추가
profilePhoto.addEventListener("click", function() {
    // 다크 모드 토글
    if (document.body.className == "dark-mode") {
        document.body.className = '';
        return;
    }
    document.body.className = "dark-mode";
    // document.body.classList.toggle("dark-mode");
});

// 모든 섹션 요소 선택
const sections = document.querySelectorAll('.right section');

let currentIndex = 0;  // 현재 표시 중인 섹션 인덱스

// 다음 섹션을 표시하는 함수
const showAfterSection = function() {
    sections.forEach((section) => section.style.display = 'none'); // 현재 섹션 숨기기
    if(currentIndex == (sections.length - 1)){
        currentIndex = 0
    }
    else{
        currentIndex ++ 
    }
    //currentIndex = (currentIndex + 1) % sections.length; // 다음 섹션 인덱스 계산
    sections[currentIndex].style.display = 'flex'; // 다음 섹션 표시
}

// 이전 섹션을 표시하는 함수
const showBeforeSection = function() {
    sections.forEach((section) => section.style.display = 'none'); // 현재 섹션 숨기기
    if(currentIndex == (0)){
        currentIndex = sections.length - 1
    }
    else{
        currentIndex -- 
    }
    //currentIndex = (currentIndex + 1) % sections.length; // 다음 섹션 인덱스 계산
    sections[currentIndex].style.display = 'flex'; // 다음 섹션 표시
}


// 3초마다 showNextSection 함수를 호출하는 인터벌 설정
let intervalId = setInterval(showAfterSection, 3000);

// 인터벌을 리셋하는 함수
const resetInterval = () => {
    clearInterval(intervalId); // 기존 인터벌 클리어
    intervalId = setInterval(showAfterSection, 3000); // 새 인터벌 설정
};

// 각 섹션에 클릭 이벤트 리스너 추가
sections.forEach((section, index) => {
    section.addEventListener('click', function(event) {
        const sectionWidth = section.offsetWidth;
        const clickX = event.clientX - section.getBoundingClientRect().left;

        if (clickX < sectionWidth / 3) { // 왼쪽 1/3 클릭 시 이전 섹션
		        showBeforeSection()
            resetInterval();
        } else if (clickX > (sectionWidth * 2 / 3)) { // 오른쪽 1/3 클릭 시 다음 섹션
            showAfterSection()
            resetInterval();
        } else { // 중간 1/3 클릭 시 자동 넘김 토글
            if (intervalId) {
                clearInterval(intervalId); // 자동 넘김 중지
                intervalId = null;
            } else {
                intervalId = setInterval(showAfterSection, 3000); // 자동 넘김 재개
            }
        }
    });
});

fetch("https://m.search.naver.com/p/csearch/content/apirender.nhn?where=nexearch&pkid=387&u2=20000518&q=%EC%83%9D%EB%85%84%EC%9B%94%EC%9D%BC+%EC%9A%B4%EC%84%B8&u1=m&u3=solar&u4=12&_=1719518803829")
    .then(response => response.json()) // 응답을 JSON으로 파싱
    .then(data => {
        const htmlString = data.flick[0]; // 첫 번째 항목 선택
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const fortune = doc.querySelector('dd b').textContent;
        const fortuneText = doc.querySelector('dd p').textContent;        
        console.log(fortune); // 추출한 텍스트 출력
        console.log(fortuneText); // 추출한 텍스트 출력

        const fortuneE =  document.createElement("h3")
        fortuneE.style.margin = 0
        fortuneE.textContent = fortune
        const fortuneTextE =  document.createElement("p")
        fortuneTextE.textContent = fortuneText
        const fortuneSection =  document.createElement("section")
        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = '오늘의 운세';
        // append : 자식중 가장 마지막에 삽입
        fortuneSection.append(sectionTitle);
        fortuneSection.append(fortuneE)
        fortuneSection.append(fortuneTextE)
        
        // after, before는 앞뒤 즉 형제가 되는겁니다.
        const contactSection = document.querySelector(".contact");
        contactSection.before(fortuneSection);
    })

