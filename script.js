const PROJECTS = [
  {
    id: "p1",
    title: "나만의 MBTI 검사",
    member: "소울박스",
    url: "https://soul-mbti-finder.lovable.app",
    image: "assets/screenshots/project-01.jpg",
    description: "질문에 답하면 성향 타입을 가볍게 확인할 수 있는 인터랙티브 테스트 페이지.",
    tags: ["테스트"]
  },
  {
    id: "p2",
    title: "Finalyze.AI",
    member: "파이널로그",
    url: "https://finalyze-ai.vercel.app/",
    image: "assets/screenshots/project-02.jpg",
    description: "DART 공시 데이터를 바탕으로 기업 재무를 빠르게 살펴보는 AI 분석 웹앱.",
    tags: ["AI"]
  },
  {
    id: "p3",
    title: "Where the Forest Breathes",
    member: "포레스트위스퍼",
    url: "https://forest-whispers-curator.lovable.app/",
    image: "assets/screenshots/project-03.jpg",
    description: "숲의 분위기와 감성을 큐레이션한 비주얼 중심의 무드 웹 프로젝트.",
    tags: ["감성"]
  },
  {
    id: "p4",
    title: "오늘의 포춘쿠키",
    member: "쿠키드림",
    url: "https://paper-fortune-dream.lovable.app",
    image: "assets/screenshots/project-04.jpg",
    description: "버튼 한 번으로 오늘의 운세 메시지를 뽑아보는 가벼운 미니 서비스.",
    tags: ["추천"]
  },
  {
    id: "p5",
    title: "AI Wellness Lab Gallery",
    member: "그린아카이브",
    url: "https://minigold92.github.io/ai-wellness-lab-showcase/",
    image: "assets/screenshots/project-05.jpg",
    description: "동호회 결과물을 한곳에 모아 보여주는 메인 갤러리 페이지.",
    tags: ["유틸"]
  },
  {
    id: "p6",
    title: "당첨자 뽑기 룰렛",
    member: "스핀메이커",
    url: "https://songbongs.github.io/simple_Roulette/",
    image: "assets/screenshots/project-06.jpg",
    description: "참가자 이름을 입력하고 룰렛으로 당첨자를 뽑는 이벤트 도구.",
    tags: ["유틸"]
  },
  {
    id: "p7",
    title: "오늘의 육아 한 줄",
    member: "커버노트",
    url: "https://cover-quotes.lovable.app/",
    image: "assets/screenshots/project-07.jpg",
    description: "육아에 힘이 되는 문장을 하루 한 줄씩 추천해주는 응원형 페이지.",
    tags: ["감성"]
  },
  {
    id: "p8",
    title: "Live Code Typing",
    member: "타입플로우",
    url: "https://yongjae94.github.io/AIWL/",
    image: "assets/screenshots/project-08.jpg",
    description: "코드가 실시간으로 작성되는 듯한 타이핑 애니메이션 웹.",
    tags: ["유틸"]
  },
  {
    id: "p9",
    title: "오늘의 별자리 운세",
    member: "스타레터",
    url: "https://hyowonee.github.io/horoscope/",
    image: "assets/screenshots/project-09.jpg",
    description: "생년월일 기반으로 오늘의 별자리 메시지를 보여주는 운세 웹앱.",
    tags: ["추천"]
  },
  {
    id: "p10",
    title: "행운의 로또 번호",
    member: "넘버블룸",
    url: "https://kulimumu.github.io/openWork/",
    image: "assets/screenshots/project-10.jpg",
    description: "1~45 범위에서 중복 없는 6개 번호를 추천해주는 로또 번호 생성기.",
    tags: ["유틸"]
  },
  {
    id: "p11",
    title: "나의 진짜 성향 테스트",
    member: "미러타입",
    url: "https://songbongs.github.io/simple_MBTI_test/",
    image: "assets/screenshots/project-11.jpg",
    description: "짧은 질문으로 성향을 진단해보는 MBTI 스타일 테스트 페이지.",
    tags: ["테스트"]
  },
  {
    id: "p12",
    title: "오늘 뭐 먹지?",
    member: "런치오라",
    url: "https://kkkk030.github.io/vibecoding/",
    image: "assets/screenshots/project-12.jpg",
    description: "생년월일과 날짜를 바탕으로 오늘의 메뉴를 추천해주는 재미형 앱.",
    tags: ["추천"]
  },
  {
    id: "p13",
    title: "남산타워 근처 추천",
    member: "타워가이드",
    url: "http://muucrong.github.io/AIWL",
    image: "assets/screenshots/project-13.jpg",
    description: "남산타워 근처 맛집과 놀거리를 빠르게 확인할 수 있는 지역 추천 페이지.",
    tags: ["추천"]
  },
  {
    id: "p14",
    title: "매니저 스페셜 슬롯",
    member: "매니저스마일",
    url: "",
    image: "",
    description: "이번 활동은 운영 지원으로 함께했고, 작품은 준비중입니다.",
    tags: ["준비중"]
  }
];

const TAG_PRIORITY = ["추천", "테스트", "유틸", "AI", "감성", "준비중"];

const state = {
  activeTag: "전체"
};

const projectGrid = document.getElementById("project-grid");
const tagFilters = document.getElementById("tag-filters");
const emptyState = document.getElementById("empty-state");
const totalProjects = document.getElementById("total-projects");
const totalMembers = document.getElementById("total-members");
const todayDate = document.getElementById("today-date");

function isLiveProject(project) {
  return /^https?:\/\//.test(project.url || "");
}

function init() {
  renderStats();
  renderTagFilters();
  renderProjects(getFilteredProjects());
}

function renderStats() {
  totalProjects.textContent = PROJECTS.filter((project) => isLiveProject(project)).length.toString();
  totalMembers.textContent = new Set(PROJECTS.map((project) => project.member)).size.toString();

  const formatter = new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric"
  });
  todayDate.textContent = formatter.format(new Date());
}

function getTags() {
  const presentTags = new Set(PROJECTS.flatMap((project) => project.tags));
  const ordered = TAG_PRIORITY.filter((tag) => presentTags.has(tag));
  return ["전체", ...ordered];
}

function renderTagFilters() {
  tagFilters.innerHTML = getTags()
    .map(
      (tag) => `
      <button
        type="button"
        class="tag-button ${state.activeTag === tag ? "active" : ""}"
        data-tag="${tag}"
        aria-pressed="${state.activeTag === tag}"
      >
        ${tag}
      </button>
    `
    )
    .join("");

  tagFilters.querySelectorAll(".tag-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTag = button.dataset.tag;
      renderTagFilters();
      renderProjects(getFilteredProjects());
    });
  });
}

function getFilteredProjects() {
  if (state.activeTag === "전체") return PROJECTS;
  return PROJECTS.filter((project) => project.tags.includes(state.activeTag));
}

function renderProjects(projects) {
  if (!projects.length) {
    projectGrid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  projectGrid.innerHTML = projects
    .map((project) => {
      const live = isLiveProject(project);
      const preview = project.image
        ? `<img src="${project.image}" alt="${project.title} 화면 캡처" loading="lazy" decoding="async" />`
        : `<div class="preview-placeholder">🚧 준비중</div>`;

      const action = live
        ? `<a class="btn btn-link" href="${project.url}" target="_blank" rel="noopener noreferrer">사이트 보기</a>`
        : `<button type="button" class="btn btn-link is-disabled" disabled>오픈 준비중</button>`;

      const statusChip = live ? "" : `<span class="status-chip">준비중</span>`;

      return `
      <article class="project-card">
        <div class="project-preview">${preview}</div>
        <div class="card-body">
          <p class="member">${project.member} ${statusChip}</p>
          <h3>${project.title}</h3>
          <p class="description">${project.description}</p>
          <div class="tags">${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
          <div class="actions">${action}</div>
        </div>
      </article>
    `;
    })
    .join("");
}

init();
