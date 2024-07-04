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

