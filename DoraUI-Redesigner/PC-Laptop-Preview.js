 // ===========================================================
// PART 4: PC / LAPTOP PREVIEW (PC-Preview.js)
// ===========================================================

/* ------------------------------------------------------------------
   JOYLAND PC UI REPLICA TEMPLATE BUILDER (SWAPS :root WITH USER VARS)
------------------------------------------------------------------- */
function buildJoylandPCPreviewHTML(customVarsData) {
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

  /* Responsive 16:10 Wrapper (Fills the border-hugging iframe wrapper) */
  .viewport-wrapper {
    width: 100%;
    height: 100%;
    aspect-ratio: 16 / 10;
    position: relative;
    overflow: hidden;
    background-color: var(--dora-bg-solid-1);
  }

  /* Fixed Base Resolution (1440x900 = 16:10) Scaled Dynamically via JS */
  .ui-stage {
    width: 1440px;
    height: 900px;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: top left;
    display: grid;
    grid-template-columns: 74px 1fr 0px;
    grid-template-rows: 58px 1fr;
    background-color: var(--dora-bg-solid-1);
    overflow: hidden;
    transition: grid-template-columns 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Expanded Left Sidebar Grid State */
  .ui-stage.sidebar-open {
    grid-template-columns: 240px 1fr 0px;
  }

  /* Expanded Right Sidebar Grid State */
  .ui-stage.right-sidebar-open {
    grid-template-columns: 74px 1fr 380px;
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
  }

  .timer-colon {
    color: var(--dora-color-8);
    font-weight: 900;
  }

  .header-right-menu {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background-color: var(--dora-bg-solid-5);
    border: var(--dora-border-2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dora-color-1);
    cursor: pointer;
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
    background-image: var(--dora-bg-img-3);
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

  /* ================= RIGHT SIDEBAR ================= */
  .right-sidebar {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
    background-color: var(--dora-bg-solid-1);
    border-left: var(--dora-border-2);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
    margin: 0;
    z-index: 20;
  }

  /* Inner Content Container strictly with 0 padding and 0 margin */
  .right-sidebar-content {
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Image 3:4 Aspect Ratio Container */
  .rs-image-container {
    width: 100%;
    aspect-ratio: 3 / 4;
    position: relative;
    background-image: var(--dora-bg-img-3);
    background-size: cover;
    background-position: center 25%;
    border-bottom: var(--dora-border-2);
    margin: 0;
    padding: 0;
    flex-shrink: 0;
  }

  /* Bottom-fade gradient on image so the double-up arrow stands out clearly */
  .rs-image-container::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to top, var(--dora-bg-solid-1), transparent);
    pointer-events: none;
  }

  /* Top-right sidebar close button inside image */
  .rs-top-close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dora-color-1);
    cursor: pointer;
    z-index: 5;
  }

  /* Double-up chevron button on bottom of image to open comments */
  .rs-expand-comments-arrow {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dora-color-1);
    cursor: pointer;
    z-index: 5;
    transition: transform 0.2s ease;
  }

  .rs-expand-comments-arrow:hover {
    transform: translateX(-50%) translateY(-2px);
  }

  .rs-info-section {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0;
  }

  .rs-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rs-bot-name {
    font-size: 18px;
    font-weight: 800;
    color: var(--dora-color-7);
  }

  .rs-chats-count {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12.5px;
    color: var(--dora-color-3);
  }

  .rs-author-row {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    color: var(--dora-color-1);
  }

  .rs-author-mini-avatar {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-image: var(--dora-bg-img-3);
    background-size: cover;
    background-position: center 20%;
  }

  .rs-author-name {
    color: var(--dora-color-1);
    font-weight: 600;
  }

  .rs-crown {
    color: var(--dora-color-8);
    display: inline-flex;
    align-items: center;
    width: 14px;
    height: 14px;
  }

  .rs-desc {
    font-size: 12.5px;
    color: var(--dora-color-3);
    line-height: 1.45;
  }

  /* Tags Row */
  .rs-tags-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
  }

  .rs-tag {
    background-color: var(--dora-bg-solid-3);
    border: var(--dora-border-2);
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11.5px;
    color: var(--dora-color-1);
    font-weight: 500;
  }

  .rs-tag.flow {
    background-color: var(--dora-bg-solid-5);
    border-color: var(--dora-border-3);
    color: var(--dora-color-7);
  }

  /* Comments Section (Preview at bottom of normal view) */
  .rs-comments-section {
    padding: 10px 16px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-top: var(--dora-border-2);
    margin: 0;
  }

  .rs-comments-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--dora-color-7);
    position: relative;
    display: inline-block;
    width: fit-content;
  }

  .rs-comments-title::after {
    content: '';
    display: block;
    width: 24px;
    height: 3px;
    background-color: var(--dora-color-2);
    border-radius: 2px;
    margin-top: 3px;
  }

  .rs-comment-input-box {
    width: 100%;
    height: 40px;
    border-radius: 999px;
    background-color: var(--dora-bg-solid-3);
    border: var(--dora-border-2);
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: var(--dora-color-3);
    font-size: 12.5px;
  }

  .rs-comment-actions-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rs-reaction-group-pill {
    background-color: var(--dora-bg-solid-3);
    border: var(--dora-border-2);
    border-radius: 999px;
    padding: 5px 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--dora-color-3);
  }

  .rs-react-divider {
    width: 1px;
    height: 12px;
    background-color: var(--dora-border-2);
  }

  .rs-post-btn {
    background-color: var(--dora-bg-solid-5);
    border: var(--dora-border-2);
    color: var(--dora-color-3);
    padding: 6px 18px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
  }

  /* SVG Icon Helpers for Reactions */
  .rs-svg-icon {
    width: 14px;
    height: 14px;
    fill: currentColor;
    display: inline-block;
    vertical-align: middle;
  }

  .rs-svg-icon.thumbs-up {
    color: var(--dora-color-2);
  }

  /* ================= EXPANDED COMMENTS VIEW ================= */
  .rs-comments-expanded-view {
    display: none;
    flex-direction: column;
    padding: 14px 16px 20px 16px;
    gap: 14px;
    width: 100%;
  }

  /* Mini Bot Header Bar at top of Expanded Comments */
  .rs-expanded-top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 6px;
  }

  .rs-expanded-bot-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .rs-expanded-bot-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-image: var(--dora-bg-img-3);
    background-size: cover;
    background-position: center 20%;
    border: var(--dora-border-2);
  }

  .rs-expanded-bot-text {
    display: flex;
    flex-direction: column;
  }

  .rs-expanded-bot-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--dora-color-7);
  }

  .rs-expanded-bot-author {
    font-size: 11px;
    color: var(--dora-color-3);
  }

  .rs-expanded-top-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--dora-color-1);
  }

  .rs-icon-action {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--dora-color-1);
    opacity: 0.85;
    transition: opacity 0.2s;
  }

  .rs-icon-action:hover {
    opacity: 1;
  }

  .rs-comments-count-label {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--dora-color-3);
    margin-top: 2px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .rs-comment-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 4px;
  }

  .rs-comment-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .rs-comment-user-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rs-comment-user-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rs-comment-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-image: var(--dora-bg-img-3);
    background-size: cover;
    background-position: center 20%;
  }

  .rs-comment-username {
    font-size: 13px;
    font-weight: 700;
    color: var(--dora-color-1);
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .rs-comment-text {
    font-size: 12.5px;
    color: var(--dora-color-1);
    opacity: 0.9;
    line-height: 1.4;
  }

  .rs-delete-btn {
    color: var(--dora-color-3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rs-delete-btn:hover {
    color: var(--dora-color-1);
  }

  /* Toggle visibility when comments-active is applied */
  .right-sidebar.comments-active .right-sidebar-content {
    display: none;
  }

  .right-sidebar.comments-active .rs-comments-expanded-view {
    display: flex;
  }

  /* ================= MAIN CHAT CANVAS ================= */
  .chat-canvas {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    position: relative;
    background-image: var(--dora-bg-img-3);
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
    background-image: var(--dora-bg-img-3);
    background-size: 240%;
    background-position: 48% 22%;
    border: var(--dora-border-1);
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
  }

  .bot-author {
    font-size: 12.5px;
    color: var(--dora-color-1);
    opacity: 0.9;
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
  }

  /* Scenario Box */
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
    background-image: var(--dora-bg-img-3);
    background-size: 240%;
    background-position: 48% 22%;
    flex-shrink: 0;
  }

  .bot-bubble {
    background: var(--dora-bg-gradient-1);
    border-radius: 12px;
    padding: 15px 18px;
    color: var(--dora-color-7);
    font-size: 13.8px;
    line-height: 1.55;
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
  }

  .input-bar {
    flex: 1;
    height: 48px;
    border-radius: 999px;
    background: var(--dora-bg-gradient-1);
    display: flex;
    align-items: center;
    padding: 0 6px 0 12px;
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

      <!-- Right Sidebar Toggle Button -->
      <div class="header-right-menu" id="rightSidebarToggleBtn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="4" y1="6" x2="20" y2="6"/>
          <line x1="4" y1="12" x2="14" y2="12"/>
          <line x1="4" y1="18" x2="20" y2="18"/>
          <polyline points="7 9 10 12 7 15"/>
        </svg>
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

    <!-- ================= RIGHT SIDEBAR ================= -->
    <aside class="right-sidebar" id="rightSidebar">
      <!-- Default Profile & Preview View -->
      <div class="right-sidebar-content">
        <!-- 3:4 Aspect Ratio Image Container -->
        <div class="rs-image-container">
          <!-- Top-right button to close the entire right sidebar -->
          <div class="rs-top-close-btn" id="closeRightSidebarBtn1" title="Close Sidebar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="4" y1="12" x2="14" y2="12"/>
              <line x1="4" y1="18" x2="20" y2="18"/>
              <polyline points="17 9 20 12 17 15"/>
            </svg>
          </div>

          <!-- Bottom-center double-up arrow to open the full comments view -->
          <div class="rs-expand-comments-arrow" id="openCommentsBtn" title="Open Comments">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="17 11 12 6 7 11"/>
              <polyline points="17 18 12 13 7 18"/>
            </svg>
          </div>
        </div>

        <!-- Info Section -->
        <div class="rs-info-section">
          <div class="rs-title-row">
            <span class="rs-bot-name">XYZ</span>
            <div class="rs-chats-count">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>609</span>
            </div>
          </div>

          <div class="rs-author-row">
            <span>By</span>
            <div class="rs-author-mini-avatar"></div>
            <span class="rs-author-name">xyz</span>
            <span class="rs-crown" title="Creator Crown">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v2H3v-2zm0-2l2-9 5 4 2-6 2 6 5-4 2 9H3z"/>
              </svg>
            </span>
          </div>

          <div class="rs-desc">
            Your Best Friend Has Been Hiding Something From You.
          </div>

          <!-- Tags -->
          <div class="rs-tags-wrap">
            <span class="rs-tag flow">Flow Mode</span>
            <span class="rs-tag">Energetic</span>
            <span class="rs-tag">Playful</span>
            <span class="rs-tag">Sensitive</span>
            <span class="rs-tag">Tsundere</span>
            <span class="rs-tag">Dandere</span>
            <span class="rs-tag">Female</span>
            <span class="rs-tag">✏️</span>
          </div>
        </div>

        <!-- Comments Section Preview -->
        <div class="rs-comments-section">
          <span class="rs-comments-title">Comments</span>
          <div class="rs-comment-input-box">
            Type your comment about character
          </div>
          <div class="rs-comment-actions-row">
            <div class="rs-reaction-group-pill">
              <!-- Thumbs Up SVG -->
              <svg class="rs-svg-icon thumbs-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
              </svg>
              <span class="rs-react-divider"></span>
              <!-- Thumbs Down SVG -->
              <svg class="rs-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
              </svg>
              <span class="rs-react-divider"></span>
              <!-- Neutral / Expressionless SVG -->
              <svg class="rs-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9"/>
                <line x1="9" y1="10" x2="9.01" y2="10"/>
                <line x1="15" y1="10" x2="15.01" y2="10"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
            </div>
            <div class="rs-post-btn">Post</div>
          </div>
        </div>
      </div>

      <!-- Expanded Comments View -->
      <div class="rs-comments-expanded-view">
        <!-- Compact Top Header with Avatar, Name, Double-Down Arrow, and Sidebar Close -->
        <div class="rs-expanded-top-bar">
          <div class="rs-expanded-bot-info">
            <div class="rs-expanded-bot-avatar"></div>
            <div class="rs-expanded-bot-text">
              <span class="rs-expanded-bot-title">(test)</span>
              <span class="rs-expanded-bot-author">@Dora</span>
            </div>
          </div>
          <div class="rs-expanded-top-actions">
            <!-- Double-down arrow to collapse comments back to image view -->
            <div class="rs-icon-action" id="closeCommentsBtn" title="Collapse Comments">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="7 13 12 18 17 13"/>
                <polyline points="7 6 12 11 17 6"/>
              </svg>
            </div>
            <!-- Sidebar collapse button -->
            <div class="rs-icon-action" id="closeRightSidebarBtn2" title="Close Sidebar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="4" y1="6" x2="20" y2="6"/>
                <line x1="4" y1="12" x2="14" y2="12"/>
                <line x1="4" y1="18" x2="20" y2="18"/>
                <polyline points="17 9 20 12 17 15"/>
              </svg>
            </div>
          </div>
        </div>

        <span class="rs-comments-title">Comments</span>

        <div class="rs-comment-input-box">
          Type your comment about character
        </div>

        <div class="rs-comment-actions-row">
          <div class="rs-reaction-group-pill">
            <!-- Thumbs Up SVG -->
            <svg class="rs-svg-icon thumbs-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
            <span class="rs-react-divider"></span>
            <!-- Thumbs Down SVG -->
            <svg class="rs-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
            </svg>
            <span class="rs-react-divider"></span>
            <!-- Neutral SVG -->
            <svg class="rs-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9"/>
              <line x1="9" y1="10" x2="9.01" y2="10"/>
              <line x1="15" y1="10" x2="15.01" y2="10"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
          </div>
          <div class="rs-post-btn">Post</div>
        </div>

        <div class="rs-comments-count-label">
          6 comments (&nbsp;1&nbsp;
          <svg class="rs-svg-icon thumbs-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
          &nbsp;0&nbsp;
          <svg class="rs-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="9" y1="10" x2="9.01" y2="10"/><line x1="15" y1="10" x2="15.01" y2="10"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
          &nbsp;)
        </div>

        <!-- Comments List -->
        <div class="rs-comment-list">
          <div class="rs-comment-item">
            <div class="rs-comment-user-row">
              <div class="rs-comment-user-info">
                <div class="rs-comment-avatar"></div>
                <span class="rs-comment-username">
                  Damien
                  <span class="rs-crown" style="width:12px;height:12px;display:inline-flex;">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v2H3v-2zm0-2l2-9 5 4 2-6 2 6 5-4 2 9H3z"/></svg>
                  </span>
                  <svg class="rs-svg-icon thumbs-up" style="width:12px;height:12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                </span>
              </div>
              <div class="rs-delete-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </div>
            </div>
            <div class="rs-comment-text">Amazing Work</div>
          </div>

          <div class="rs-comment-item">
            <div class="rs-comment-user-row">
              <div class="rs-comment-user-info">
                <div class="rs-comment-avatar"></div>
                <span class="rs-comment-username">
                  Dora
                  <span class="rs-crown" style="width:12px;height:12px;display:inline-flex;">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v2H3v-2zm0-2l2-9 5 4 2-6 2 6 5-4 2 9H3z"/></svg>
                  </span>
                  <svg class="rs-svg-icon thumbs-up" style="width:12px;height:12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                </span>
              </div>
              <div class="rs-delete-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </div>
            </div>
            <div class="rs-comment-text">Looks Unreal</div>
          </div>

          <div class="rs-comment-item">
            <div class="rs-comment-user-row">
              <div class="rs-comment-user-info">
                <div class="rs-comment-avatar"></div>
                <span class="rs-comment-username">
                 Suman
                  <span class="rs-crown" style="width:12px;height:12px;display:inline-flex;">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v2H3v-2zm0-2l2-9 5 4 2-6 2 6 5-4 2 9H3z"/></svg>
                  </span>
                  <svg class="rs-svg-icon thumbs-up" style="width:12px;height:12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                </span>
              </div>
              <div class="rs-delete-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </div>
            </div>
            <div class="rs-comment-text">This is Peak</div>
          </div>

          <div class="rs-comment-item">
            <div class="rs-comment-user-row">
              <div class="rs-comment-user-info">
                <div class="rs-comment-avatar"></div>
                <span class="rs-comment-username">
                  Harry
                  <span class="rs-crown" style="width:12px;height:12px;display:inline-flex;">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v2H3v-2zm0-2l2-9 5 4 2-6 2 6 5-4 2 9H3z"/></svg>
                  </span>
                  <svg class="rs-svg-icon thumbs-up" style="width:12px;height:12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                </span>
              </div>
              <div class="rs-delete-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </div>
            </div>
            <div class="rs-comment-text">Great Job</div>
          </div>

          <div class="rs-comment-item">
            <div class="rs-comment-user-row">
              <div class="rs-comment-user-info">
                <div class="rs-comment-avatar"></div>
                <span class="rs-comment-username">
                  Emily
                  <span class="rs-crown" style="width:12px;height:12px;display:inline-flex;">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v2H3v-2zm0-2l2-9 5 4 2-6 2 6 5-4 2 9H3z"/></svg>
                  </span>
                  <svg class="rs-svg-icon thumbs-up" style="width:12px;height:12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                </span>
              </div>
              <div class="rs-delete-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </div>
            </div>
            <div class="rs-comment-text">Best Bot</div>
          </div>

          <div class="rs-comment-item">
            <div class="rs-comment-user-row">
              <div class="rs-comment-user-info">
                <div class="rs-comment-avatar"></div>
                <span class="rs-comment-username">
                  Scarlet
                  <span class="rs-crown" style="width:12px;height:12px;display:inline-flex;">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v2H3v-2zm0-2l2-9 5 4 2-6 2 6 5-4 2 9H3z"/></svg>
                  </span>
                  <svg class="rs-svg-icon thumbs-up" style="width:12px;height:12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                </span>
              </div>
              <div class="rs-delete-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </div>
            </div>
            <div class="rs-comment-text">This is Lovely</div>
          </div>
        </div>
      </div>
    </aside>

  </div>
</div>

<script>
  // Scales the 1440x900 (16:10) UI stage smoothly down on Android and up on PC
  const wrapper = document.getElementById('viewportWrapper');
  const stage = document.getElementById('uiStage');
  const BASE_WIDTH = 1440;

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
    stage.classList.remove('right-sidebar-open');
    stage.classList.toggle('sidebar-open');
  });

  // Right Sidebar Open/Close Functionality
  const rightToggleBtn = document.getElementById('rightSidebarToggleBtn');
  const closeRightSidebarBtn1 = document.getElementById('closeRightSidebarBtn1');
  const closeRightSidebarBtn2 = document.getElementById('closeRightSidebarBtn2');
  const rightSidebar = document.getElementById('rightSidebar');
  
  rightToggleBtn.addEventListener('click', () => {
    stage.classList.remove('sidebar-open');
    stage.classList.toggle('right-sidebar-open');
  });

  closeRightSidebarBtn1.addEventListener('click', () => {
    stage.classList.remove('right-sidebar-open');
  });

  closeRightSidebarBtn2.addEventListener('click', () => {
    stage.classList.remove('right-sidebar-open');
  });

  // Comments Expand / Collapse Functionality (Keeps Right Sidebar Open)
  const openCommentsBtn = document.getElementById('openCommentsBtn');
  const closeCommentsBtn = document.getElementById('closeCommentsBtn');

  openCommentsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    rightSidebar.classList.add('comments-active');
  });

  closeCommentsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    rightSidebar.classList.remove('comments-active');
  });
<\/script>

</body>
</html>`;
}

// Register the PC/Laptop Preview: 16:10 aspect ratio, 90% of the viewport width.
if (typeof registerPreviewModule === "function") {
  registerPreviewModule("pc", buildJoylandPCPreviewHTML, {
    aspectRatio: "16 / 10",
    widthPercent: 90
  });

  // Preserve widthPercent on the registry entry and extend fitPreviewToDummyUI
  // so width-driven modules (width: 90%, aspect-ratio: 16/10) size from viewport width
  if (window.DoraPreviewRegistry && window.DoraPreviewRegistry["pc"]) {
    window.DoraPreviewRegistry["pc"].widthPercent = 90;
  }

  if (typeof fitPreviewToDummyUI === "function") {
    const originalFitPreviewToDummyUI = fitPreviewToDummyUI;
    window.fitPreviewToDummyUI = function () {
      const entry = window.DoraPreviewRegistry[currentPreviewMode];
      if (entry && entry.widthPercent) {
        const headerH = previewModalHeader.offsetHeight || PREVIEW_FALLBACK_HEADER_H;
        const wantedW = window.innerWidth * (entry.widthPercent / 100);

        const maxW = window.innerWidth * PREVIEW_VIEWPORT_MARGIN - PREVIEW_CARD_BORDER;
        const maxH = window.innerHeight * PREVIEW_VIEWPORT_MARGIN - headerH - PREVIEW_CARD_BORDER;

        const finalW = Math.min(wantedW, maxW, maxH * entry.ratio);
        const finalH = finalW / entry.ratio;

        previewIframeWrapper.style.aspectRatio = entry.aspectRatio;
        previewIframeWrapper.style.width = `${finalW}px`;
        previewIframeWrapper.style.height = `${finalH}px`;
      } else {
        originalFitPreviewToDummyUI();
      }
    };
  }
}
