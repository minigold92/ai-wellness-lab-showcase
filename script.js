/**
 * 동호회 프로젝트 데이터
 * ---------------------------------------------------
 * 1) 아래 배열에 멤버별 객체를 추가하면 카드가 자동 렌더링됩니다.
 * 2) tags는 검색/필터에 사용됩니다.
 */
const PROJECTS = [
  {
    id: "p1",
    title: "AI 감정 저널",
    member: "김하나",
    url: "https://example.github.io/ai-mood-journal",
    description: "하루 감정을 기록하고 AI가 맞춤 회복 루틴을 제안하는 마이크로 저널 앱",
    tags: ["AI", "마음건강", "저널링"],
    highlights: [
      "감정 기록 기반 AI 코칭",
      "주간 리포트 시각화",
      "짧은 루틴 중심 UX"
    ]
  },
  {
    id: "p2",
    title: "웰니스 브리더",
    member: "이서준",
    url: "https://example.github.io/wellness-breather",
    description: "집중 회복을 위한 호흡 타이머와 명상 사운드를 제공하는 웹 페이지",
    tags: ["웰니스", "명상", "집중"],
    highlights: [
      "4-7-8 호흡 모드",
      "집중/휴식 자동 전환",
      "감성적인 사운드 디자인"
    ]
  },
  {
    id: "p3",
    title: "식단 인사이트 랩",
    member: "박민지",
    url: "https://example.github.io/nutri-insight-lab",
    description: "식단 입력 후 AI가 영양 균형과 에너지 패턴을 분석해주는 도구",
    tags: ["AI", "영양", "데이터"],
    highlights: [
      "간단한 식단 입력",
      "영양 밸런스 인사이트",
      "주간 개선 포인트 추천"
    ]
  },
  {
    id: "p4",
    title: "Sleep Reset Coach",
    member: "정우진",
    url: "https://example.github.io/sleep-reset-coach",
    description: "수면 습관 체크리스트와 밤 루틴을 설계해주는 개인형 코치 페이지",
    tags: ["수면", "습관", "웰니스"],
    highlights: [
      "취침 전 루틴 설정",
      "습관 점수화",
      "라이트/다크 모드 최적화"
    ]
  },
  {
    id: "p5",
    title: "AI 스트레칭 플래너",
    member: "최다인",
    url: "https://example.github.io/stretch-ai-planner",
    description: "신체 상태와 시간대에 맞는 스트레칭 루틴을 자동 추천하는 사이트",
    tags: ["AI", "운동", "루틴"],
    highlights: [
      "상태별 맞춤 스트레칭",
      "타이머 기반 따라하기",
      "완료 뱃지 시스템"
    ]
  },
  {
    id: "p6",
    title: "Mindful Prompt Garden",
    member: "오지수",
    url: "https://example.github.io/mindful-prompt-garden",
    description: "하루 질문 프롬프트와 리플렉션 문장을 제공하는 디지털 가든",
    tags: ["리플렉션", "마인드풀니스", "글쓰기"],
    highlights: [
      "Daily Prompt 카드",
      "따뜻한 인터랙션 애니메이션",
      "회고 중심의 미니멀 UI"
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
  todayDate.textContent = `${formatter.format(new Date())} 쇼케이스 업데이트`;
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
  const hueB = (hash * 1.6) % 360;
  return `background: linear-gradient(135deg, hsla(${hueA}, 75%, 55%, 0.88), hsla(${hueB}, 78%, 46%, 0.92));`;
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
