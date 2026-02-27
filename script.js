/**
 * 동호회 프로젝트 데이터 (오늘 활동: 자유 주제 바이브코딩)
 * ---------------------------------------------------
 * 1) 아래 배열에 멤버별 객체를 추가하면 카드가 자동 렌더링됩니다.
 * 2) tags는 검색/필터에 사용됩니다.
 */
const PROJECTS = [
  {
    id: "p1",
    title: "Trip Mosaic",
    member: "김하나",
    url: "https://example.github.io/trip-mosaic",
    description: "여행 일정과 장소를 감성적으로 정리해주는 미니 트래블 플래너",
    tags: ["여행", "지도", "플래너"],
    highlights: [
      "드래그 기반 일정 정리",
      "장소 카드형 UI",
      "한 화면 공유 링크"
    ]
  },
  {
    id: "p2",
    title: "Focus Sprint Timer",
    member: "이서준",
    url: "https://example.github.io/focus-sprint-timer",
    description: "짧은 집중 세션을 빠르게 시작할 수 있는 심플 타이머 페이지",
    tags: ["생산성", "타이머", "미니앱"],
    highlights: [
      "25/50분 프리셋",
      "진행률 시각화",
      "키보드 단축 조작"
    ]
  },
  {
    id: "p3",
    title: "Meme Studio",
    member: "박민지",
    url: "https://example.github.io/meme-studio",
    description: "짤 템플릿에 텍스트를 얹어 바로 다운로드할 수 있는 밈 메이커",
    tags: ["엔터테인먼트", "이미지", "크리에이티브"],
    highlights: [
      "템플릿 1클릭 선택",
      "폰트·색상 커스터마이징",
      "PNG 바로 저장"
    ]
  },
  {
    id: "p4",
    title: "Dev Portfolio Onepage",
    member: "정우진",
    url: "https://example.github.io/dev-portfolio-onepage",
    description: "프로젝트와 경력을 한 페이지로 보여주는 포트폴리오 템플릿",
    tags: ["포트폴리오", "개발", "브랜딩"],
    highlights: [
      "경험 섹션 타임라인",
      "프로젝트 필터",
      "연락처 CTA 구성"
    ]
  },
  {
    id: "p5",
    title: "Recipe Shuffle",
    member: "최다인",
    url: "https://example.github.io/recipe-shuffle",
    description: "냉장고 재료를 넣으면 빠르게 요리 아이디어를 보여주는 레시피 탐색 웹",
    tags: ["요리", "검색", "라이프"],
    highlights: [
      "재료 태그 검색",
      "조리시간 필터",
      "즐겨찾기 저장"
    ]
  },
  {
    id: "p6",
    title: "Movie Night Picker",
    member: "오지수",
    url: "https://example.github.io/movie-night-picker",
    description: "장르와 분위기를 고르면 볼만한 영화를 랜덤 추천해주는 페이지",
    tags: ["취미", "추천", "영화"],
    highlights: [
      "랜덤 추천 버튼",
      "장르별 필터링",
      "친구와 공유하기"
    ]
  }
];

const state = {
  query: "",
  activeTag: "전체"
};

const projectGrid = document.getElementById("project-grid");
const tagFilters = document.getElementById("tag-filters");
const searchInput = document.getElementById("search-input");
const emptyState = document.getElementById("empty-state");
const totalProjects = document.getElementById("total-projects");
const totalMembers = document.getElementById("total-members");
const totalTags = document.getElementById("total-tags");
const todayDate = document.getElementById("today-date");

const modal = document.getElementById("detail-modal");
const closeModalButton = document.getElementById("close-modal");
const modalMember = document.getElementById("modal-member");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalHighlights = document.getElementById("modal-highlights");
const modalLink = document.getElementById("modal-link");
const toast = document.getElementById("toast");

function init() {
  renderStats();
  renderDate();
  renderTagFilters();
  renderProjects(getFilteredProjects());

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    renderProjects(getFilteredProjects());
  });

  projectGrid.addEventListener("click", handleProjectGridClick);
  closeModalButton.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });
}

function renderStats() {
  totalProjects.textContent = PROJECTS.length.toString();
  totalMembers.textContent = new Set(PROJECTS.map((project) => project.member)).size.toString();
  totalTags.textContent = new Set(PROJECTS.flatMap((project) => project.tags)).size.toString();
}

function renderDate() {
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  });
  todayDate.textContent = `${formatter.format(new Date())} 갤러리 업데이트`;
}

function getTags() {
  return ["전체", ...new Set(PROJECTS.flatMap((project) => project.tags))];
}

function renderTagFilters() {
  const tags = getTags();
  tagFilters.innerHTML = tags
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
  const query = state.query.toLowerCase();

  return PROJECTS.filter((project) => {
    const matchesTag = state.activeTag === "전체" || project.tags.includes(state.activeTag);
    const searchable = `${project.title} ${project.member} ${project.description} ${project.tags.join(" ")} ${project.highlights.join(" ")}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);

    return matchesTag && matchesQuery;
  });
}

function renderProjects(projects) {
  if (!projects.length) {
    projectGrid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  projectGrid.innerHTML = projects
    .map(
      (project) => `
      <article class="project-card" data-id="${project.id}">
        <div class="project-preview" style="${makePreviewGradient(project.title)}">
          ${project.title}
        </div>
        <div>
          <h3>${project.title}</h3>
          <p class="member">${project.member}</p>
        </div>
        <p class="description">${project.description}</p>
        <div class="tags">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <div class="actions">
          <a class="btn btn-link" href="${project.url}" target="_blank" rel="noopener noreferrer">사이트 열기</a>
          <button type="button" class="btn btn-ghost" data-action="detail" data-id="${project.id}">설명 보기</button>
          <button type="button" class="btn btn-ghost" data-action="copy" data-url="${project.url}">링크 복사</button>
        </div>
      </article>
    `
    )
    .join("");
}

function makePreviewGradient(seed) {
  const hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hueA = hash % 360;
  const hueB = (hash * 1.3) % 360;
  return `background: linear-gradient(135deg, hsl(${hueA}, 52%, 88%), hsl(${hueB}, 48%, 82%));`;
}

function handleProjectGridClick(event) {
  const detailButton = event.target.closest("button[data-action='detail']");
  if (detailButton) {
    const project = PROJECTS.find((item) => item.id === detailButton.dataset.id);
    if (project) openDetailModal(project);
    return;
  }

  const copyButton = event.target.closest("button[data-action='copy']");
  if (copyButton) {
    copyLink(copyButton.dataset.url);
  }
}

function openDetailModal(project) {
  modalMember.textContent = project.member;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalHighlights.innerHTML = project.highlights.map((item) => `<li>${item}</li>`).join("");
  modalLink.href = project.url;
  modal.showModal();
}

async function copyLink(url) {
  try {
    await navigator.clipboard.writeText(url);
    showToast("링크를 복사했어요.");
  } catch (error) {
    showToast("복사에 실패했어요. 수동으로 복사해주세요.");
  }
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

init();
