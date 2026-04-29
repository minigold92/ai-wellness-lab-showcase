const GUIDE = {
  title: "노트북LM 가이드 (KB금융 스타일)",
  file: "pdfs/노트북LM_가이드_KB금융_스타일.pdf",
  thumb: "thumbs/노트북LM_가이드_KB금융_스타일.jpg",
  note: "오늘 발표에 쓰인 본 자료 · 노트북LM 처음 켤 때 한 번"
};

const PDFS = [
  {
    member: "",
    title: "2026 KB라이프 인턴십",
    file: "pdfs/2026_KB_Life_Internship.pdf",
    thumb: "thumbs/2026_KB_Life_Internship.jpg",
    note: "📋 우리 회사 인턴 제도 한 장 요약 · 후배·지인 추천하기 전에 슥 훑어보기 좋음"
  },
  {
    member: "",
    title: "Enterprise Redis Caching Blueprint",
    file: "pdfs/Enterprise_Redis_Caching_Blueprint.pdf",
    thumb: "thumbs/Enterprise_Redis_Caching_Blueprint.jpg",
    note: "⚡ 엔터프라이즈 Redis 캐싱 설계도 · API 응답 느려져 욕먹기 직전에 보면 사이다"
  },
  {
    member: "",
    title: "강남 핫플 2024",
    file: "pdfs/Gangnam_Hot_Pot_2024.pdf",
    thumb: "thumbs/Gangnam_Hot_Pot_2024.jpg",
    note: "🍽️ 강남 핫플 큐레이션 · 회식·소개팅·타팀 미팅 장소 정해야 할 때 0순위"
  },
  {
    member: "",
    title: "IFRS17 CSM 최적화 블루프린트",
    file: "pdfs/IFRS17_CSM_Optimization_Blueprint.pdf",
    thumb: "thumbs/IFRS17_CSM_Optimization_Blueprint.jpg",
    note: "📊 보험 회계 IFRS17 CSM 최적화 · 결산 시즌 임박 / CSM 다시 잡고 싶을 때"
  },
  {
    member: "",
    title: "KB Copilot 협업 가이드",
    file: "pdfs/KB_Copilot_Cowork_Guide.pdf",
    thumb: "thumbs/KB_Copilot_Cowork_Guide.jpg",
    note: "🤝 사내 KB Copilot 활용 가이드 · Copilot 처음 받았는데 뭘 할지 모를 때"
  },
  {
    member: "",
    title: "린 스타트업 퀘스트",
    file: "pdfs/Lean_Startup_Quest.pdf",
    thumb: "thumbs/Lean_Startup_Quest.jpg",
    note: "🚀 린 스타트업 핵심을 퀘스트 형식으로 · 신규 과제 킥오프 / 사이드 프로젝트 시동 걸 때"
  },
  {
    member: "",
    title: "M365 Copilot 액션 가이드",
    file: "pdfs/M365_Copilot_Action_Guide.pdf",
    thumb: "thumbs/M365_Copilot_Action_Guide.jpg",
    note: "💼 오피스365 Copilot 실전 액션 모음 · 엑셀·PPT 야근 줄이고 싶을 때"
  },
  {
    member: "",
    title: "Modern Java Playbook",
    file: "pdfs/Modern_Java_Playbook.pdf",
    thumb: "thumbs/Modern_Java_Playbook.jpg",
    note: "☕ Java 17~21 모던 패턴 · 레거시 자바 리팩토링 마주쳤을 때 / 트렌드 따라잡기"
  },
  {
    member: "",
    title: "The Transformer Blueprint",
    file: "pdfs/The_Transformer_Blueprint_수정.pdf",
    thumb: "thumbs/The_Transformer_Blueprint_수정.jpg",
    note: "🤖 트랜스포머 구조 한눈에 · ChatGPT가 어떻게 동작하는지 설명해야 할 때 / 면접 직전"
  },
  {
    member: "",
    title: "삼국지 전략 마스터리",
    file: "pdfs/Three_Kingdoms_Strategic_Mastery.pdf",
    thumb: "thumbs/Three_Kingdoms_Strategic_Mastery.jpg",
    note: "🏯 삼국지 전략 정리본 · 조직 정치 피곤한 날 / 주말에 머리 식히면서 가볍게"
  },
  {
    member: "",
    title: "제주 서남부 아기 동반 가이드",
    file: "pdfs/Southwest_Jeju_Toddler_Guide.pdf",
    thumb: "thumbs/Southwest_Jeju_Toddler_Guide.jpg",
    note: "🍼 아기와 함께 다니기 좋은 제주 서남부 코스 · 가족 여행 계획 짤 때 / 친구 부모에게 추천할 때"
  }
];

const guideSlot = document.getElementById("guide-slot");
const grid = document.getElementById("pdf-grid");
const empty = document.getElementById("pdf-empty");

function encode(file) {
  return file.split("/").map(encodeURIComponent).join("/");
}

function cardHTML(item) {
  const thumb = item.thumb
    ? `<img class="pdf-thumb" src="${encode(item.thumb)}" alt="${item.title} 미리보기" loading="lazy" decoding="async" />`
    : `<div class="pdf-thumb pdf-thumb-fallback"><span>PDF</span></div>`;
  const safeTitle = item.title.replace(/"/g, "&quot;");
  return `
    <a class="pdf-card" href="${encode(item.file)}" target="_blank" rel="noopener noreferrer" data-title="${safeTitle}">
      <div class="pdf-thumb-wrap">${thumb}</div>
      <div class="pdf-meta">
        <p class="pdf-member">${item.member || ""}</p>
        <h3 class="pdf-title">${item.title}</h3>
        ${item.note ? `<p class="pdf-note">${item.note}</p>` : ""}
      </div>
    </a>
  `;
}

function render() {
  if (guideSlot && GUIDE) {
    guideSlot.innerHTML = cardHTML(GUIDE);
  }
  if (!grid) return;
  if (!PDFS.length) {
    grid.innerHTML = "";
    empty?.classList.remove("hidden");
    return;
  }
  empty?.classList.add("hidden");
  grid.innerHTML = PDFS.map(cardHTML).join("");
}

render();

/* ── Inline PDF viewer modal ─────────────────────────────── */

const viewer = document.getElementById("pdf-viewer");
const viewerFrame = document.getElementById("pdf-viewer-frame");
const viewerTitle = document.getElementById("pdf-viewer-title");
const viewerOpen = document.getElementById("pdf-viewer-open");
const viewerClose = document.getElementById("pdf-viewer-close");

function shouldUseInlineViewer() {
  return !!viewer && typeof viewer.showModal === "function";
}

function isMobileLike() {
  const ua = navigator.userAgent || "";
  if (/iPhone|iPod|Android/.test(ua)) return true;
  // Modern iPad reports as Macintosh with touch points
  if (/iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return true;
  return window.innerWidth < 720;
}

function viewerSrcFor(href) {
  // Mobile / iOS / Android: native iframe PDFs are unreliable.
  // Use Google Docs Viewer to render PDF as scrollable images.
  // Requires the PDF URL to be publicly reachable (GitHub Pages is fine).
  if (!isMobileLike()) return href;
  try {
    const absolute = new URL(href, window.location.href).href;
    const host = new URL(absolute).hostname;
    const isLocal = host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0";
    if (isLocal) return href; // local dev — use direct
    return "https://docs.google.com/gview?embedded=true&url=" + encodeURIComponent(absolute);
  } catch (_e) {
    return href;
  }
}

function openViewer(href, title) {
  if (!viewer) return;
  viewerFrame.src = viewerSrcFor(href);
  viewerTitle.textContent = title || "PDF";
  viewerOpen.href = href;
  viewer.showModal();
  document.body.classList.add("viewer-open");
}

function closeViewer() {
  if (!viewer) return;
  viewer.close();
  viewerFrame.src = "about:blank";
  document.body.classList.remove("viewer-open");
}

document.addEventListener("click", (e) => {
  const card = e.target.closest("a.pdf-card");
  if (!card) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
  if (!shouldUseInlineViewer()) return;
  e.preventDefault();
  openViewer(card.getAttribute("href"), card.dataset.title);
});

viewerClose?.addEventListener("click", closeViewer);

viewer?.addEventListener("click", (e) => {
  // Click outside the inner panel closes
  const panel = viewer.querySelector(".pdf-viewer-panel");
  if (panel && !panel.contains(e.target)) closeViewer();
});

viewer?.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeViewer();
});
