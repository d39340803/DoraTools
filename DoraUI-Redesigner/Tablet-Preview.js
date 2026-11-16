// ===========================================================
// PART 5: TABLET PREVIEW (Tablet-Preview.js)
// ===========================================================

/* ------------------------------------------------------------------
   JOYLAND TABLET UI REPLICA TEMPLATE BUILDER (SWAPS :root WITH USER VARS)
------------------------------------------------------------------- */
function buildJoylandTabletPreviewHTML(customVarsData) {
  const customRootBlock = generateRawRootVarsOnly(customVarsData);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dora's Joyland UI 1:1 Replica</title>
<style>
  /* SWAPPED USER MODIFIED :root */
  ${customRootBlock}
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }

  body, html {
    width: 100%;
    height: 100%;
    background-color: var(--dora-bg-solid-1);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: var(--dora-color-1);
  }

  /* Responsive 3:4 Wrapper (Fills the border-hugging iframe wrapper) */
  .viewport-wrapper {
    width: 100%;
    height: 100%;
    aspect-ratio: 3 / 4;
    position: relative;
    overflow: hidden;
    background-color: var(--dora-bg-solid-1);
  }

  /* Fixed Base Resolution (1080x1440 = 3:4) Scaled Dynamically via JS */
  .ui-stage {
    width: 1080px;
    height: 1440px;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: top left;
    display: grid;
    grid-template-columns: 74px 1fr;
    grid-template-rows: 58px 1fr;
    background-color: var(--dora-bg-solid-1);
    overflow: hidden;
    transition: grid-template-columns 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Expanded Left Sidebar Grid State */
  .ui-stage.sidebar-open {
    grid-template-columns: 240px 1fr;
  }

  /* ================= TOP HEADER BAR ================= */
  .top-header {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    background-color: var(--dora-bg-solid-1);
    border-bottom: var(--dora-border-2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 22px 0 16px;
    z-index: 20;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .brand-group {
    display: flex;
    align-items: center;
    gap: 14px;
    padding-right: 6px;
  }

  .brand-fox {
    width: 26px;
    height: 26px;
    color: var(--dora-color-8);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-btn {
    color: var(--dora-color-3);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.2s;
  }

  .icon-btn:hover {
    color: var(--dora-color-1);
  }

  .back-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--dora-color-1);
    font-size: 15px;
    font-weight: 600;
    margin-left: 10px;
    cursor: pointer;
  }

  /* Promo Banner */
  .promo-banner {
    margin-left: 8px;
    height: 44px;
    padding: 0 22px;
    background-color: var(--dora-bg-solid-3);
    border: var(--dora-border-2);
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 18px;
    position: relative;
    overflow: hidden;
  }

  .promo-text {
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.6px;
    color: var(--dora-color-1);
    display: flex;
    align-items: center;
    gap: 6px;
    text-transform: uppercase;
  }

  .promo-burst {
    background-color: var(--dora-bg-solid-7);
    color: var(--dora-color-5);
    padding: 3px 9px;
    border-radius: 12px 4px 12px 4px;
    font-size: 16px;
    font-weight: 900;
  }

  .timer-cluster {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 800;
    font-size: 15px;
    color: var(--dora-color-7);
  }

  .timer-box {
    background-color: var(--dora-color-6);
    border: 1px solid var(--dora-color-8);
    color: var(--dora-color-7);
    padding: 3px 6px;
    border-radius: 5px;
    min-width: 28px;
    text-align: center;
    box-shadow: var(--dora-shadow-1);
  }

  .timer-colon {
    color: var(--dora-color-8);
    font-weight: 900;
  }

  /* ================= LEFT SIDEBAR ================= */
  .left-sidebar {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    background-color: var(--dora-bg-solid-1);
    border-right: var(--dora-border-2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 0 18px 0;
    z-index: 20;
    overflow: visible;
  }

  .sidebar-top, .sidebar-bottom {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .sidebar-top {
    padding-left: 26px;
  }

  .sidebar-bottom {
    align-items: flex-start;
    padding-left: 21px;
  }

  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    white-space: nowrap;
    height: 24px;
    position: relative;
  }

  .sidebar-icon {
    width: 22px;
    height: 22px;
    color: var(--dora-color-2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .sidebar-item.plus-box {
    margin-bottom: 8px;
  }

  .sidebar-label {
    font-size: 13.5px;
    font-weight: 500;
    color: var(--dora-color-1);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
  }

  .ui-stage.sidebar-open .sidebar-label {
    opacity: 1;
    visibility: visible;
  }

  .crown-row {
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    width: 100%;
    position: relative;
  }

  .crown-badge {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--dora-bg-solid-3);
    border: var(--dora-border-2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dora-color-8);
    flex-shrink: 0;
  }

  .user-profile-row {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    width: 100%;
    position: relative;
  }

  .user-profile-thumb {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: var(--dora-bg-img-2);
    background-size: cover;
    background-position: center 20%;
    border: var(--dora-border-3);
    flex-shrink: 0;
  }

  /* Tooltips for Left Sidebar (Collapsed Mode Only) */
  .ui-stage:not(.sidebar-open) .sidebar-item::after,
  .ui-stage:not(.sidebar-open) .crown-row::after,
  .ui-stage:not(.sidebar-open) .user-profile-row::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 68px;
    background-color: var(--dora-color-6);
    color: var(--dora-color-7);
    padding: 6px 12px;
    font-size: 12.5px;
    font-weight: 600;
    border-radius: 6px;
    border: var(--dora-border-2);
    box-shadow: var(--dora-shadow-1);
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.15s ease, transform 0.15s ease;
    transform: translateX(-4px);
    z-index: 100;
  }

  .ui-stage:not(.sidebar-open) .sidebar-item::before,
  .ui-stage:not(.sidebar-open) .crown-row::before,
  .ui-stage:not(.sidebar-open) .user-profile-row::before {
    content: '';
    position: absolute;
    left: 62px;
    width: 8px;
    height: 8px;
    background-color: var(--dora-color-6);
    border-left: var(--dora-border-2);
    border-bottom: var(--dora-border-2);
    transform: rotate(45deg);
    opacity: 0;
    visibility: hidden;
    z-index: 101;
    pointer-events: none;
    transition: opacity 0.15s ease;
  }

  .ui-stage:not(.sidebar-open) .sidebar-item:hover::after,
  .ui-stage:not(.sidebar-open) .crown-row:hover::after,
  .ui-stage:not(.sidebar-open) .user-profile-row:hover::after {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  .ui-stage:not(.sidebar-open) .sidebar-item:hover::before,
  .ui-stage:not(.sidebar-open) .crown-row:hover::before,
  .ui-stage:not(.sidebar-open) .user-profile-row:hover::before {
    opacity: 1;
    visibility: visible;
  }

  /* ================= MAIN CHAT CANVAS ================= */
  .chat-canvas {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    position: relative;
    background-image: var(--dora-bg-img-2);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }

  /* Central Content Column */
  .chat-column {
    width: 786px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 12px;
    padding-bottom: 18px;
  }

  /* Top Bot Header Bar inside Canvas */
  .bot-top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 14px;
  }

  .bot-identity {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .bot-avatar-lg {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-image: var(--dora-bg-img-2);
    background-size: 240%;
    background-position: 48% 22%;
    border: var(--dora-border-1);
    box-shadow: var(--dora-shadow-1);
  }

  .bot-title-wrap {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .bot-title {
    font-size: 21px;
    font-weight: 800;
    color: var(--dora-color-7);
    text-shadow: var(--dora-shadow-1);
  }

  .bot-author {
    font-size: 12.5px;
    color: var(--dora-color-1);
    opacity: 0.9;
    text-shadow: var(--dora-shadow-1);
  }

  .bot-top-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .like-pill {
    height: 36px;
    padding: 0 16px;
    border-radius: 999px;
    background-color: var(--dora-bg-solid-7);
    color: var(--dora-bg-solid-1);
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13.5px;
    font-weight: 700;
    box-shadow: var(--dora-shadow-1);
  }

  .share-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--dora-bg-solid-2);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: var(--dora-border-2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dora-color-7);
  }

  /* Meet me in the Flow Pill */
  .flow-row {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 18px;
  }

  .flow-pill {
    height: 35px;
    padding: 0 12px 0 14px;
    border-radius: 999px;
    background-color: var(--dora-bg-solid-2);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: var(--dora-border-2);
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: var(--dora-color-7);
    box-shadow: var(--dora-shadow-1);
  }

  .flow-wave-icon {
    color: var(--dora-color-2);
    display: flex;
    align-items: center;
  }

  .free-badge {
    background-color: var(--dora-color-5);
    color: var(--dora-color-7);
    font-size: 10px;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 5px;
    letter-spacing: 0.4px;
  }

  /* Notice Pill */
  .notice-row {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }

  .notice-pill {
    padding: 9px 22px;
    border-radius: 10px;
    background-color: var(--dora-bg-solid-2);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: var(--dora-border-2);
    color: var(--dora-color-1);
    font-size: 13px;
    font-weight: 500;
    box-shadow: var(--dora-shadow-1);
  }

  /* Scenario Card */
  .scenario-card {
    width: 100%;
    padding: 15px 20px;
    border-radius: 12px;
    background-color: var(--dora-bg-solid-2);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: var(--dora-border-2);
    color: var(--dora-color-1);
    font-size: 13.5px;
    line-height: 1.52;
    position: relative;
    margin-bottom: 30px;
    box-shadow: var(--dora-shadow-1);
  }

  .scenario-card em {
    font-style: italic;
  }

  .scenario-label {
    font-weight: 600;
    font-style: normal;
  }

  .scenario-chevron {
    display: inline-flex;
    vertical-align: middle;
    margin-left: 6px;
    color: var(--dora-color-3);
  }

  /* Bot Message Row */
  .msg-row-bot {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    margin-bottom: 36px;
  }

  .msg-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-image: var(--dora-bg-img-2);
    background-size: 240%;
    background-position: 48% 22%;
    flex-shrink: 0;
    box-shadow: var(--dora-shadow-1);
  }

  .bot-bubble {
    background: var(--dora-bg-gradient-1);
    border-radius: 12px;
    padding: 15px 18px;
    color: var(--dora-color-7);
    font-size: 13.8px;
    line-height: 1.55;
    box-shadow: var(--dora-shadow-1);
    max-width: 405px;
  }

  .bot-bubble.greeting {
    padding: 14px 18px;
  }

  .bot-bubble em {
    color: var(--dora-color-2);
    font-style: italic;
  }

  /* User Message Row */
  .msg-row-user {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 24px;
    padding-right: 4px;
  }

  .user-bubble {
    background: var(--dora-bg-gradient-1);
    border-radius: 11px;
    padding: 13px 17px;
    color: var(--dora-color-1);
    font-size: 14px;
    font-weight: 500;
  }

  /* Message Reaction + Refresh Row */
  .bot-msg-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .msg-controls-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 724px;
    padding-left: 2px;
  }

  .msg-reactions {
    display: flex;
    align-items: center;
    gap: 14px;
    color: var(--dora-color-3);
  }

  .reaction-icon {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .refresh-icon {
    color: var(--dora-color-1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  /* Bottom Push Spacer */
  .bottom-dock {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  /* Action Chips Row */
  .chips-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 38px;
  }

  .chip-pill {
    height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    background-color: var(--dora-bg-solid-2);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: var(--dora-border-1);
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--dora-color-7);
    font-size: 12.8px;
    font-weight: 500;
    box-shadow: var(--dora-shadow-1);
  }

  .chip-badge-icon {
    width: 16px;
    height: 14px;
    border-radius: 3px;
    background-color: var(--dora-color-8);
    color: var(--dora-bg-solid-1);
    font-size: 9px;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chip-sparkle {
    color: var(--dora-color-2);
    display: flex;
    align-items: center;
  }

  .chip-memory-sub {
    width: 15px;
    height: 13px;
    border-radius: 3px;
    background-color: var(--dora-color-4);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 2px;
  }

  /* Bottom Input Bar Row */
  .input-row {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .grid-plus-btn {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: var(--dora-bg-solid-3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dora-color-7);
    flex-shrink: 0;
    box-shadow: var(--dora-shadow-1);
  }

  .input-bar {
    flex: 1;
    height: 48px;
    border-radius: 999px;
    background: var(--dora-bg-gradient-1);
    display: flex;
    align-items: center;
    padding: 0 6px 0 12px;
    box-shadow: var(--dora-shadow-1);
  }

  .bulb-box {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dora-color-1);
    margin-right: 12px;
  }

  .input-placeholder {
    color: var(--dora-color-3);
    font-size: 14px;
    font-weight: 500;
    flex: 1;
  }

  .send-pill-btn {
    width: 48px;
    height: 36px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .send-pill-btn svg {
    color: var(--dora-color-1);
  }
</style>
</head>
<body>

<div class="viewport-wrapper" id="viewportWrapper">
  <div class="ui-stage" id="uiStage">

    <!-- ================= TOP HEADER ================= -->
    <header class="top-header">
      <div class="header-left">
        <div class="brand-group">
          <!-- Fox Logo -->
          <div class="brand-fox">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 3L9.5 8.5L12 7L14.5 8.5L20 3L19 14L12 21L5 14L4 3ZM9 13C8.45 13 8 13.45 8 14C8 14.55 8.45 15 9 15C9.55 15 10 14.55 10 14C10 13.45 9.55 13 9 13ZM15 13C14.45 13 14 13.45 14 14C14 14.55 14.45 15 15 15C15.55 15 16 14.55 16 14C16 13.45 15.55 13 15 13Z"/>
            </svg>
          </div>
          <!-- Collapse Menu Icon (Toggle Left Sidebar) -->
          <div class="icon-btn" id="sidebarToggleBtn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="4" y1="12" x2="14" y2="12"/>
              <line x1="4" y1="18" x2="20" y2="18"/>
              <polyline points="17 9 14 12 17 15"/>
            </svg>
          </div>
        </div>

        <!-- < Back -->
        <div class="back-nav">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          <span>Back</span>
        </div>

        <!-- Promo Banner -->
        <div class="promo-banner">
          <div class="promo-text">
            <span>UP TO</span>
            <span class="promo-burst">60%</span>
            <span>OFF</span>
          </div>
          <div class="timer-cluster">
            <span class="timer-box">32</span>
            <span class="timer-colon">:</span>
            <span class="timer-box">30</span>
            <span class="timer-colon">:</span>
            <span class="timer-box">31</span>
          </div>
        </div>
      </div>
    </header>

    <!-- ================= LEFT SIDEBAR ================= -->
    <aside class="left-sidebar">
      <div class="sidebar-top">
        <div class="sidebar-item plus-box" data-tooltip="Create a bot">
          <div class="sidebar-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <rect x="4" y="4" width="16" height="16" rx="3"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </div>
          <span class="sidebar-label">Create a bot</span>
        </div>
        <div class="sidebar-item" data-tooltip="Home">
          <div class="sidebar-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z"/>
            </svg>
          </div>
          <span class="sidebar-label">Home</span>
        </div>
        <div class="sidebar-item" data-tooltip="Chats">
          <div class="sidebar-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a8.5 8.5 0 0 1-8.5 8.5A8.4 8.4 0 0 1 8 19.2L3 20.5l1.3-4.8A8.4 8.4 0 0 1 3.5 12 8.5 8.5 0 0 1 12 3.5 8.5 8.5 0 0 1 21 12z"/>
            </svg>
          </div>
          <span class="sidebar-label">Chats</span>
        </div>
        <div class="sidebar-item" data-tooltip="Search">
          <div class="sidebar-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="9"/>
              <polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5"/>
            </svg>
          </div>
          <span class="sidebar-label">Search</span>
        </div>
        <div class="sidebar-item" data-tooltip="Novel">
          <div class="sidebar-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="4" y="3" width="16" height="18" rx="3"/>
              <circle cx="12" cy="10" r="2.5"/>
              <path d="M8 17c1-2 3-3 4-3s3 1 4 3"/>
            </svg>
          </div>
          <span class="sidebar-label">Novel</span>
        </div>
        <div class="sidebar-item" data-tooltip="Story">
          <div class="sidebar-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <ellipse cx="12" cy="7" rx="7" ry="3"/>
              <path d="M5 7v5c0 1.66 3.13 3 7 3s7-1.34 7-3V7"/>
              <path d="M5 12v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5"/>
            </svg>
          </div>
          <span class="sidebar-label">Story</span>
        </div>
        <div class="sidebar-item" data-tooltip="Toolkit">
          <div class="sidebar-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z"/>
              <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z"/>
            </svg>
          </div>
          <span class="sidebar-label">Toolkit</span>
        </div>
        <div class="sidebar-item" data-tooltip="Leaderboard">
          <div class="sidebar-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <line x1="7" y1="19" x2="7" y2="12"/>
              <line x1="12" y1="19" x2="12" y2="7"/>
              <line x1="17" y1="19" x2="17" y2="14"/>
            </svg>
          </div>
          <span class="sidebar-label">Leaderboard</span>
        </div>
        <div class="sidebar-item" data-tooltip="My Bots">
          <div class="sidebar-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="4" y="8" width="16" height="12" rx="3"/>
              <line x1="12" y1="4" x2="12" y2="8"/>
              <circle cx="9" cy="14" r="1.2" fill="currentColor"/>
              <circle cx="15" cy="14" r="1.2" fill="currentColor"/>
            </svg>
          </div>
          <span class="sidebar-label">My Bots</span>
        </div>
        <div class="sidebar-item" data-tooltip="Settings">
          <div class="sidebar-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="8"/>
              <circle cx="12" cy="12" r="2.5"/>
            </svg>
          </div>
          <span class="sidebar-label">Settings</span>
        </div>
      </div>

      <div class="sidebar-bottom">
        <div class="crown-row" data-tooltip="Premium">
          <div class="crown-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v2H3v-2zm0-2l2-9 5 4 2-6 2 6 5-4 2 9H3z"/>
            </svg>
          </div>
          <span class="sidebar-label">Premium</span>
        </div>
        <div class="user-profile-row" data-tooltip="Dora">
          <div class="user-profile-thumb"></div>
          <span class="sidebar-label">Dora</span>
        </div>
      </div>
    </aside>

    <!-- ================= MAIN CHAT CANVAS ================= -->
    <main class="chat-canvas">
      <div class="chat-column">

        <!-- Top Bot Header -->
        <div class="bot-top-bar">
          <div class="bot-identity">
            <div class="bot-avatar-lg"></div>
            <div class="bot-title-wrap">
              <div class="bot-title">XYZ</div>
              <div class="bot-author">By @xyz</div>
            </div>
          </div>

          <div class="bot-top-actions">
            <div class="like-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>
              </svg>
              <span>0</span>
            </div>
            <div class="share-circle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 5v4C7 10 4 15 3 20c2.5-3.5 6-5.1 11-5.1V19l7-7-7-7z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Meet me in the Flow Pill -->
        <div class="flow-row">
          <div class="flow-pill">
            <span class="flow-wave-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <path d="M2 12c2.5-4 5.5-4 8 0s5.5 4 8 0 4-3 4-3"/>
              </svg>
            </span>
            <span>Meet me in the Flow</span>
            <span class="free-badge">FREE</span>
          </div>
        </div>

        <!-- Notice Pill -->
        <div class="notice-row">
          <div class="notice-pill">
            Notice: Everything characters say is fictional
          </div>
        </div>

        <!-- Scenario Card -->
        <div class="scenario-card">
          <span class="scenario-label">Scenario:</span>
          <em>It's an ordinary school morning, and Airi Tachibana is already talking before {{user}} has finished putting his bag down. As her seatmate and friend, she keeps him entertained with borrowed notes, homework complaints, and random whispers during lessons. At lunch, she drags him to the school pool for swimming practice. Despite her endless energy, Airi has never learned to swim. She insists she just hasn't found the rig...</em>
          <span class="scenario-chevron">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </div>

        <!-- First Bot Greeting -->
        <div class="msg-row-bot">
          <div class="msg-avatar"></div>
          <div class="bot-bubble greeting">
            Greeting of your bot
          </div>
        </div>

        <!-- User Message ("H") -->
        <div class="msg-row-user">
          <div class="user-bubble">H</div>
        </div>

        <!-- Second Bot Message + Reactions -->
        <div class="msg-row-bot" style="margin-bottom: 12px;">
          <div class="msg-avatar"></div>
          <div class="bot-msg-group">
            <div class="bot-bubble">
              H...hmm? What's up, {{user}}? <em>Airi tilts her head, curious</em><br>
              You look like you've got something on your mind.<br>
              Everything okay?
            </div>
            <div class="msg-controls-bar">
              <div class="msg-reactions">
                <span class="reaction-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                  </svg>
                </span>
                <span class="reaction-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                  </svg>
                </span>
                <span class="reaction-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </span>
              </div>
              <div class="refresh-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12a9 9 0 1 1-2.64-6.36"/>
                  <polyline points="21 3 21 9 15 9"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Push Spacer -->
        <div class="bottom-dock">
          <div class="chips-row">
            <div class="chip-pill">
              <span class="chip-badge-icon">Lv</span>
              <span>Photo</span>
            </div>
            <div class="chip-pill">
              <span class="chip-sparkle">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z"/>
                </svg>
              </span>
              <span>Free Model</span>
            </div>
            <div class="chip-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 8v4l2.5 2.5"/>
              </svg>
              <span>Memory</span>
              <span class="chip-memory-sub">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="4" y="4" width="16" height="16" rx="3"/>
                </svg>
              </span>
            </div>
            <div class="chip-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="9"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
              <span>Persona: {{user}}</span>
            </div>
          </div>

          <div class="input-row">
            <div class="grid-plus-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <rect x="4" y="4" width="6" height="6" rx="1.5"/>
                <rect x="4" y="14" width="6" height="6" rx="1.5"/>
                <rect x="14" y="14" width="6" height="6" rx="1.5"/>
                <line x1="17" y1="4" x2="17" y2="10"/>
                <line x1="14" y1="7" x2="20" y2="7"/>
              </svg>
            </div>

            <div class="input-bar">
              <div class="bulb-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 21h6v-1H9v1zm3-19a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2z"/>
                </svg>
              </div>
              <div class="input-placeholder">Type a message</div>
              <div class="send-pill-btn">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

  </div>
</div>

<script>
  // Scales the 1080x1440 (3:4) UI stage smoothly down on mobile and up on desktop
  const wrapper = document.getElementById('viewportWrapper');
  const stage = document.getElementById('uiStage');
  const BASE_WIDTH = 1080;

  function syncScale() {
    const currentWidth = wrapper.clientWidth;
    if (currentWidth > 0) {
      const scale = currentWidth / BASE_WIDTH;
      stage.style.transform = 'scale(' + scale + ')';
    }
  }

  const resizeObserver = new ResizeObserver(syncScale);
  resizeObserver.observe(wrapper);
  window.addEventListener('resize', syncScale);
  syncScale();

  // Left Sidebar Toggle Functionality
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  toggleBtn.addEventListener('click', () => {
    stage.classList.toggle('sidebar-open');
  });
<\/script>

</body>
</html>`;
}

// Register the Tablet Preview: 3:4 aspect ratio, orientation-aware sizing (90% width in Portrait, 90% height in Landscape)
if (typeof registerPreviewModule === "function") {
  registerPreviewModule("tablet", buildJoylandTabletPreviewHTML, {
    aspectRatio: "3 / 4",
    heightPercent: 90,
    widthPercent: 90
  });

  if (window.DoraPreviewRegistry && window.DoraPreviewRegistry["tablet"]) {
    window.DoraPreviewRegistry["tablet"].orientationBased = true;
    window.DoraPreviewRegistry["tablet"].widthPercent = 90;
    window.DoraPreviewRegistry["tablet"].heightPercent = 90;
  }

  if (typeof fitPreviewToDummyUI === "function") {
    const prevFitPreviewToDummyUI = window.fitPreviewToDummyUI;

    window.fitPreviewToDummyUI = function () {
      const entry = window.DoraPreviewRegistry[currentPreviewMode];

      if (entry && entry.orientationBased) {
        const headerH = previewModalHeader.offsetHeight || PREVIEW_FALLBACK_HEADER_H;
        const maxW = window.innerWidth * PREVIEW_VIEWPORT_MARGIN - PREVIEW_CARD_BORDER;
        const maxH = window.innerHeight * PREVIEW_VIEWPORT_MARGIN - headerH - PREVIEW_CARD_BORDER;

        // Detect screen orientation: Landscape vs Portrait
        const isLandscapeScreen = window.innerWidth > window.innerHeight;

        let finalW, finalH;

        if (isLandscapeScreen) {
          // Landscape screen: height (90%) decides width via 3:4 aspect ratio
          const wantedH = window.innerHeight * ((entry.heightPercent || 90) / 100);
          finalH = Math.min(wantedH, maxH, maxW / entry.ratio);
          finalW = finalH * entry.ratio;
        } else {
          // Portrait screen: width (90%) decides height via 3:4 aspect ratio
          const wantedW = window.innerWidth * ((entry.widthPercent || 90) / 100);
          finalW = Math.min(wantedW, maxW, maxH * entry.ratio);
          finalH = finalW / entry.ratio;
        }

        previewIframeWrapper.style.aspectRatio = entry.aspectRatio;
        previewIframeWrapper.style.width = `${finalW}px`;
        previewIframeWrapper.style.height = `${finalH}px`;
      } else {
        prevFitPreviewToDummyUI();
      }
    };

    window.addEventListener("orientationchange", () => {
      if (previewModal && previewModal.classList.contains("active")) {
        setTimeout(() => window.fitPreviewToDummyUI(), 60);
      }
    });
  }
}
