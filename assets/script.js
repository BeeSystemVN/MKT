// Init AOS Animation
AOS.init({ duration: 900, once: true, easing: 'ease-in-out', offset: 60 });

// Init Lucide Icons
lucide.createIcons();

// ---- PRELOADER ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
    }
  }, 1600);
});

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- MOBILE MENU ----
const mobileToggleBtn = document.getElementById('mobile-menu-toggle') || document.getElementById('mobile-menu-btn');
const mobileDrawer = document.getElementById('mobile-menu-drawer') || document.getElementById('mobile-menu');
const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');

if (mobileToggleBtn && mobileDrawer) {
  mobileToggleBtn.addEventListener('click', () => {
    mobileDrawer.classList.toggle('hidden');
    const isNowOpen = !mobileDrawer.classList.contains('hidden');
    if (menuOpen) menuOpen.classList.toggle('hidden', isNowOpen);
    if (menuClose) menuClose.classList.toggle('hidden', !isNowOpen);
  });

  mobileDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.add('hidden');
      if (menuOpen) menuOpen.classList.remove('hidden');
      if (menuClose) menuClose.classList.add('hidden');
    });
  });
}

// ---- SCROLL TOP ----
const scrollBtn = document.getElementById('scroll-top');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---- ECOSYSTEM APP TABS SWITCHER ----
function switchAppTab(tabKey, btnEl) {
  // Update Tab buttons
  document.querySelectorAll('.app-tab-btn').forEach(b => {
    b.classList.remove('active');
  });
  if (btnEl) btnEl.classList.add('active');

  // Update panels
  const panelWeb = document.getElementById('panel-app-web');
  const panelStaff = document.getElementById('panel-app-staff');
  const panelFamily = document.getElementById('panel-app-family');
  const panels = { web: panelWeb, staff: panelStaff, family: panelFamily };

  const ecoSection = document.getElementById('ecosystem');
  if (tabKey === 'all') {
    if (ecoSection) ecoSection.classList.add('ecosystem-mode-all');
    Object.values(panels).forEach(p => {
      if (p) {
        p.classList.remove('hidden');
        p.style.display = 'block';
      }
    });
  } else {
    if (ecoSection) ecoSection.classList.remove('ecosystem-mode-all');
    Object.entries(panels).forEach(([key, panel]) => {
      if (!panel) return;
      if (key === tabKey) {
        panel.classList.remove('hidden');
        panel.style.display = 'block';
      } else {
        panel.classList.add('hidden');
        panel.style.display = 'none';
      }
    });
  }

  // Update 3D carousel positions after panel display change
  if (tabKey === 'staff' || tabKey === 'all') {
    if (window.staffCarousel) window.staffCarousel.updatePositions();
  }
  if (tabKey === 'family' || tabKey === 'all') {
    if (window.familyCarousel) window.familyCarousel.updatePositions();
  }

  // Re-init icons inside dynamic tabs
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Navigate to specific app tab and smoothly scroll to ecosystem section
function navigateToApp(tabKey) {
  const btn = document.getElementById('tab-btn-' + tabKey);
  if (btn) {
    switchAppTab(tabKey, btn);
  }
  const target = document.getElementById('ecosystem');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Handle hash navigation to specific app tabs
function handleAppHash() {
  const hash = window.location.hash;
  if (hash === '#web-showcase') {
    switchAppTab('web', document.getElementById('tab-btn-web'));
  } else if (hash === '#staff-showcase') {
    switchAppTab('staff', document.getElementById('tab-btn-staff'));
  } else if (hash === '#family-showcase') {
    switchAppTab('family', document.getElementById('tab-btn-family'));
  } else if (hash === '#ecosystem') {
    switchAppTab('all', document.getElementById('tab-btn-all'));
  }
}
window.addEventListener('DOMContentLoaded', handleAppHash);
window.addEventListener('hashchange', handleAppHash);

// ---- PLATFORM TAB SWITCHER ----
function switchPlatformTab(tabId) {
  // Update Tab buttons
  document.querySelectorAll('.app-pill').forEach(btn => {
    const target = btn.getAttribute('data-target');
    if (target === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update Tab contents
  document.querySelectorAll('.tab-content').forEach(content => {
    if (content.id === tabId) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });

  // Re-init icons inside dynamic tabs
  lucide.createIcons();
}

// ---- FAQ ACCORDION ----
function toggleFAQ(el) {
  const answer = el.nextElementSibling;
  const isOpen = answer.classList.contains('open');

  document.querySelectorAll('.faq-answer.open').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-question.active').forEach(q => q.classList.remove('active'));

  if (!isOpen) {
    answer.classList.add('open');
    el.classList.add('active');
  }
  lucide.createIcons();
}

// ---- ANIMATED COUNTERS ----
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const current = Math.floor(progress * target);
    el.textContent = target > 999 ? current.toLocaleString() + '+' : current + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target > 999 ? target.toLocaleString() + '+' : target + (el.dataset.suffix || '');
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      if (!isNaN(target)) {
        animateCounter(el, target);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ---- AI CHAT INTERACTIVE SIMULATION ----
function sendAIMessage(presetText) {
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const userText = presetText || (chatInput ? chatInput.value.trim() : '');
  
  if (!userText || !chatMessages) return;

  // Add user bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble-user flex items-start gap-2.5';
  userBubble.innerHTML = `
    <div class="text-right">
      <div class="text-xs text-teal-200 mb-0.5">Bạn (Người nhà)</div>
      <div>${escapeHTML(userText)}</div>
    </div>
  `;
  chatMessages.appendChild(userBubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  if (chatInput) chatInput.value = '';

  // Add typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'chat-bubble-ai flex items-center gap-2 text-slate-400 text-xs italic';
  typingIndicator.id = 'ai-typing';
  typingIndicator.innerHTML = `
    <span class="w-2 h-2 bg-teal-400 rounded-full animate-ping"></span>
    BeeCare AI đang tổng hợp dữ liệu sinh hiệu & ca trực...
  `;
  chatMessages.appendChild(typingIndicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Simulate intelligent RAG response
  setTimeout(() => {
    const typing = document.getElementById('ai-typing');
    if (typing) typing.remove();

    let reply = '';
    const lower = userText.toLowerCase();

    if (lower.includes('huyết áp') || lower.includes('tim') || lower.includes('sinh hiệu') || lower.includes('sức khỏe')) {
      reply = `Dạ chào anh/chị! Sáng nay lúc <strong>08:15</strong>, Điều dưỡng <strong>Nguyễn Thu Hà</strong> đã đo sinh hiệu cho cụ Lê Thị Mai tại phòng 302:
      <ul class="list-disc ml-5 mt-1.5 space-y-0.5 text-xs text-teal-300">
        <li>Huyết áp: <strong>122/78 mmHg</strong> (Hoàn toàn bình thường)</li>
        <li>Nhịp tim: <strong>74 bpm</strong> | SpO2: <strong>98%</strong></li>
        <li>Nhiệt độ: <strong>36.7°C</strong></li>
      </ul>
      Chỉ số của cụ rất ổn định so với phác đồ tuần qua ạ!`;
    } else if (lower.includes('ăn') || lower.includes('cơm') || lower.includes('thực đơn') || lower.includes('cháo')) {
      reply = `Dạ trưa nay lúc <strong>11:30</strong>, cụ đã dùng xong bữa trưa dinh dưỡng gồm: <strong>Cháo sườn hầm hạt sen + canh rau ngót thịt bằm</strong>. 
      <br>Điều dưỡng ghi nhận cụ <strong>ăn hết 100% khẩu phần</strong>, uống đủ 200ml nước ấm và tinh thần rất vui vẻ, đã được chụp ảnh lưu lại trong mục Nhật ký ạ!`;
    } else if (lower.includes('thuốc') || lower.includes('uống thuốc')) {
      reply = `Dạ theo đơn thuốc của Bác sĩ Trưởng, cụ Mai đã được cấp phát và uống thuốc huyết áp liều sáng lúc <strong>08:30</strong> (đã được kiểm tra mã vạch đối soát). Liều buổi tối dự kiến lúc <strong>19:00</strong> sau bữa ăn ạ!`;
    } else {
      reply = `Dạ BeeCare AI xin chào anh/chị! Cụ Lê Thị Mai hiện đang sinh hoạt vui khỏe tại Viện Dưỡng Lão Diên Hồng. Sinh hiệu sáng nay đều trong giới hạn an toàn, cụ đã tham gia câu lạc bộ dưỡng sinh và ăn trưa đúng giờ. Anh/chị có thể kiểm tra hình ảnh mới nhất tại thẻ Nhật ký hoặc gọi trực tiếp cho Điều dưỡng phụ trách nhé!`;
    }

    const aiBubble = document.createElement('div');
    aiBubble.className = 'chat-bubble-ai flex items-start gap-3';
    aiBubble.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-teal-600/30 border border-teal-500/40 flex items-center justify-center shrink-0 text-teal-400">
        <i data-lucide="bot" class="w-4 h-4"></i>
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-semibold text-teal-400">Trợ Lý AI BeeCare</span>
          <span class="text-[10px] text-slate-400">Vừa xong</span>
        </div>
        <div class="text-slate-200 text-sm leading-relaxed">${reply}</div>
      </div>
    `;
    chatMessages.appendChild(aiBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    lucide.createIcons();
  }, 1200);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Quick question buttons for AI chat
document.querySelectorAll('.ai-prompt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.getAttribute('data-prompt');
    if (text) sendAIMessage(text);
  });
});

// Chat input enter key
const chatInput = document.getElementById('chat-input');
if (chatInput) {
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendAIMessage();
    }
  });
}

const chatSendBtn = document.getElementById('chat-send-btn');
if (chatSendBtn) {
  chatSendBtn.addEventListener('click', () => sendAIMessage());
}

// ---- FORM SUBMISSIONS ----
const demoForm = document.getElementById('demo-form');
if (demoForm) {
  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Đăng ký trải nghiệm thành công! Chuyên viên BeeCare sẽ liên hệ trong vòng 30 phút.');
    demoForm.reset();
  });
}

function handleNewsletter(e) {
  e.preventDefault();
  showToast('Cảm ơn quý vị đã đăng ký nhận bản tin chuyển đổi số y tế BeeCare!');
  e.target.reset();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.remove('translate-x-full', 'opacity-0');
  toast.classList.add('translate-x-0', 'opacity-100');
  
  setTimeout(() => {
    toast.classList.add('translate-x-full', 'opacity-0');
    toast.classList.remove('translate-x-0', 'opacity-100');
  }, 4000);

  lucide.createIcons();
}

// ---- LIGHTBOX MODAL ----
function openLightbox(src, title) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  if (!modal || !img) return;

  img.src = src;
  if (caption) caption.textContent = title || 'Ảnh màn hình ứng dụng BeeCare';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Lightbox click outside to close
const lightboxModal = document.getElementById('lightbox-modal');
if (lightboxModal) {
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.closest('#lightbox-close')) {
      closeLightbox();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// ---- GALLERY FILTER ----
function filterGallery(category) {
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('.gallery-item').forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'block';
      setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
    } else {
      item.style.opacity = '0';
      item.style.transform = 'translateY(10px)';
      setTimeout(() => { item.style.display = 'none'; }, 250);
    }
  });

  lucide.createIcons();
}

// ---- INTERACTIVE 3D SCREEN SWITCHERS ----
function switchLaptopScreen(imgSrc, title, triggerBtn) {
  const laptopImg = document.getElementById('laptop-main-screen');
  const laptopCaption = document.getElementById('laptop-screen-title');
  const laptopUrl = document.getElementById('laptop-screen-url');
  if (!laptopImg) return;

  const urlMap = {
    'web-dashboard.png': 'beecare.vn/admin/dashboard',
    'web-rooms.png': 'beecare.vn/admin/rooms-beds',
    'web-timeline.png': 'beecare.vn/admin/emr-timeline',
    'web-shifts.png': 'beecare.vn/admin/shifts-duty',
    'web-report.png': 'beecare.vn/admin/analytics-report',
    'web-admission.png': 'beecare.vn/admin/patient-admission'
  };

  laptopImg.style.opacity = '0';
  laptopImg.style.transform = 'scale(0.985)';
  laptopImg.style.transition = 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)';

  setTimeout(() => {
    laptopImg.src = imgSrc;
    if (laptopCaption) laptopCaption.textContent = title;
    if (laptopUrl) {
      for (const [key, path] of Object.entries(urlMap)) {
        if (imgSrc.includes(key)) {
          laptopUrl.textContent = path;
          break;
        }
      }
    }
    laptopImg.style.opacity = '1';
    laptopImg.style.transform = 'scale(1)';
  }, 180);

  if (triggerBtn) {
    const parent = triggerBtn.closest('.screen-tabs-container') || triggerBtn.parentElement;
    if (parent) {
      parent.querySelectorAll('.screen-tab-btn').forEach(btn => btn.classList.remove('active'));
    }
    triggerBtn.classList.add('active');
  }
}

// ---- INTERACTIVE ECOSYSTEM SCENARIO SWITCHER ----
function switchScenario(scenarioId, triggerBtn) {
  // Update button states
  document.querySelectorAll('.scenario-pill-btn').forEach(btn => btn.classList.remove('active'));
  if (triggerBtn) triggerBtn.classList.add('active');

  // Update scenario contents
  document.querySelectorAll('.scenario-content-panel').forEach(panel => {
    panel.style.display = 'none';
    panel.style.opacity = '0';
  });

  const activePanel = document.getElementById(scenarioId);
  if (activePanel) {
    activePanel.style.display = 'block';
    setTimeout(() => {
      activePanel.style.opacity = '1';
      activePanel.style.transition = 'opacity 0.35s ease';
    }, 30);
  }

  lucide.createIcons();
}

// Re-init icons after page loads
lucide.createIcons();


// ==================== TRI-APP LIVE INTERACTION SIMULATOR ====================
const SIM_SCENARIOS = [
  {
    title: "1. Đo sinh hiệu & Báo động nguy cơ (< 1 giây)",
    summary: "Điều dưỡng đo tại giường (Huyết áp 160/95) ➔ Bác sĩ trên Web nhận cảnh báo đỏ ➔ Con cái nhận thông báo an tâm",
    staff: {
      img: "assets/screenshots/staff-vitals.png",
      badge: "1. App Staff: Đo sinh hiệu",
      desc: "Điều dưỡng Nguyễn Thị Mai đo tại phòng 204: Huyết áp 160/95 mmHg, SpO2 96%. Hệ thống tự động phân loại ngưỡng Đỏ khẩn cấp.",
      role: "Điều dưỡng viên tại giường"
    },
    web: {
      img: "assets/screenshots/web-dashboard.png",
      badge: "2. Cổng Web: Bác sĩ xử trí",
      desc: "Chuông báo đỏ nhấp nháy trên bảng điều khiển toàn viện. Bác sĩ trực mở hồ sơ EMR và duyệt chỉ định uống 1 liều Amlodipine 5mg.",
      role: "Bác sĩ trực viện & Ban giám đốc"
    },
    family: {
      img: "assets/screenshots/family-vitals-bp.png",
      badge: "3. App Family: Thông báo tức thì",
      desc: "Điện thoại con cái nhận push: 'Huyết áp mẹ lúc 11:32 tăng nhẹ (160/95), bác sĩ trực đã xử trí ổn định, mẹ đang nghỉ ngơi'.",
      role: "Con cái người cao tuổi"
    },
    logs: [
      { time: "11:32:05.120", badge: "STAFF_APP", color: "text-cyan-400 bg-cyan-950/80 border border-cyan-700/60", text: "POST /vitals -> Cụ Đỗ Thị Hướng (P.204): HA 160/95 mmHg, SpO2 96%" },
      { time: "11:32:05.480", badge: "CORE_SERVER", color: "text-emerald-400 bg-emerald-950/80 border border-emerald-700/60", text: "WS Broadcast -> Alert [CRITICAL_RED] đến màn hình Bác sĩ trực viện" },
      { time: "11:32:05.910", badge: "WEB_PORTAL", color: "text-teal-400 bg-teal-950/80 border border-teal-700/60", text: "Dr. Trần Văn Nam xác nhận -> Duyệt y lệnh Amlodipine 5mg uống ngay" },
      { time: "11:32:06.250", badge: "FAMILY_APP", color: "text-amber-400 bg-amber-950/80 border border-amber-700/60", text: "Push Notification gửi đến người thân -> Cập nhật biểu đồ theo dõi" }
    ],
    latency: "0.82 giây",
    protocol: "WebSocket WSS / TLS 1.3"
  },
  {
    title: "2. Kê đơn & Phát thuốc chống nhầm (5 Đúng)",
    summary: "Bác sĩ tạo đơn thuốc tuần trên Web ➔ Đúng giờ App Staff nhắc cữ & quét mã viên thuốc ➔ Web & Family đổi màu xanh",
    staff: {
      img: "assets/screenshots/staff-meds.png",
      badge: "2. App Staff: Cấp phát thuốc",
      desc: "Đúng 11:30, App rung chuông nhắc cữ trưa. Điều dưỡng quét mã QR giường, chụp đối chiếu viên thuốc và bấm 'Đã uống đủ liều'.",
      role: "Điều dưỡng viên phát thuốc"
    },
    web: {
      img: "assets/screenshots/web-timeline.png",
      badge: "1. Cổng Web: Phê duyệt phác đồ",
      desc: "Bác sĩ lập phác đồ đơn thuốc tuần, hệ thống tự động sinh lịch uống Sáng - Trưa - Tối với hình ảnh mẫu viên thuốc trực quan.",
      role: "Bác sĩ trưởng khoa"
    },
    family: {
      img: "assets/screenshots/family-home-2.png",
      badge: "3. App Family: Xác nhận đã uống",
      desc: "Trang chủ ứng dụng người thân hiện dấu tích xanh: 'Mẹ đã uống xong thuốc cữ trưa lúc 11:32 an toàn'.",
      role: "Gia đình an tâm theo dõi"
    },
    logs: [
      { time: "08:00:10.000", badge: "WEB_PORTAL", color: "text-teal-400 bg-teal-950/80 border border-teal-700/60", text: "Bác sĩ duyệt đơn thuốc tuần cho 45 cụ tầng 2" },
      { time: "11:30:00.050", badge: "STAFF_APP", color: "text-cyan-400 bg-cyan-950/80 border border-cyan-700/60", text: "App điều dưỡng rung chuông báo cữ thuốc trưa P.204" },
      { time: "11:32:15.340", badge: "STAFF_APP", color: "text-cyan-400 bg-cyan-950/80 border border-cyan-700/60", text: "Quét mã QR giường cụ Hướng -> Đối chiếu ảnh viên thuốc -> Bấm Đã uống" },
      { time: "11:32:16.110", badge: "SYNC_EVENT", color: "text-emerald-400 bg-emerald-950/80 border border-emerald-700/60", text: "Đồng bộ 2 chiều: Dòng thời gian EMR trên Web & App Family đổi sang màu Xanh" }
    ],
    latency: "0.76 giây",
    protocol: "REST API + WebSocket"
  },
  {
    title: "3. Bữa ăn dinh dưỡng & Chia sẻ nhật ký gia đình",
    summary: "Hộ lý chụp ảnh khay cơm và chấm điểm khẩu phần ➔ Gia đình ngắm ảnh thật & Hỏi đáp AI ➔ Web thống kê bếp ăn",
    staff: {
      img: "assets/screenshots/staff-meal.png",
      badge: "1. App Staff: Chụp ảnh suất ăn",
      desc: "Hộ lý bưng cơm trưa, chụp ảnh khay cơm thật (cá bống kho, canh rau ngót) và chọn: 'Cụ ăn hết 90% khẩu phần, uống 250ml nước'.",
      role: "Hộ lý phục vụ phòng ăn"
    },
    web: {
      img: "assets/screenshots/web-activities.png",
      badge: "3. Cổng Web: Tối ưu bếp ăn",
      desc: "Bếp ăn và chuyên gia dinh dưỡng xem biểu đồ tiêu thụ món ăn toàn viện, tự động điều chỉnh độ mặn/mềm theo từng nhóm người cao tuổi.",
      role: "Chuyên gia dinh dưỡng & Bếp viện"
    },
    family: {
      img: "assets/screenshots/family-ai.png",
      badge: "2. App Family: Xem ảnh & Trợ lý AI",
      desc: "Gia đình ngắm nhìn ảnh mẹ ăn ngon miệng. Người con hỏi Trợ lý AI: 'Trưa nay mẹ ăn có đủ đạm không?', AI phân tích chi tiết chỉ số.",
      role: "Con cái người cao tuổi"
    },
    logs: [
      { time: "11:45:20.100", badge: "STAFF_APP", color: "text-cyan-400 bg-cyan-950/80 border border-cyan-700/60", text: "Hộ lý chụp ảnh khay cơm trưa cụ Hướng -> Đánh giá tiêu thụ 90%" },
      { time: "11:45:21.050", badge: "AI_ENGINE", color: "text-amber-400 bg-amber-950/80 border border-amber-700/60", text: "RAG Pipeline nạp dữ liệu bữa ăn vào bộ nhớ ngữ cảnh người cao tuổi" },
      { time: "11:45:21.800", badge: "FAMILY_APP", color: "text-amber-400 bg-amber-950/80 border border-amber-700/60", text: "Gia đình xem ảnh khay cơm -> Trợ lý AI giải đáp dinh dưỡng trong 0.8s" },
      { time: "11:45:22.400", badge: "WEB_PORTAL", color: "text-teal-400 bg-teal-950/80 border border-teal-700/60", text: "Bảng quản lý hoạt động & dinh dưỡng viện tự động cập nhật số liệu" }
    ],
    latency: "0.95 giây",
    protocol: "WebSocket + AI Streaming"
  },
  {
    title: "4. Viện phí minh bạch & VietQR tự động gạch nợ 3 giây",
    summary: "Mọi dịch vụ tích lũy tự động từ App Staff lên Web ➔ Gia đình nhận hóa đơn và quét VietQR ➔ Gạch nợ tức thì",
    staff: {
      img: "assets/screenshots/staff-residents.png",
      badge: "1. App Staff: Ghi nhận dịch vụ",
      desc: "Mỗi lần sử dụng bỉm, châm cứu, vật lý trị liệu, điều dưỡng ghi nhận tại chỗ. Hệ thống tự động tích lũy vào bảng kê điện tử.",
      role: "Điều dưỡng viên & Chăm sóc viên"
    },
    web: {
      img: "assets/screenshots/web-report.png",
      badge: "3. Cổng Web: Gạch nợ tự động",
      desc: "Webhook ngân hàng báo về Web Portal, khoản nợ được gạch tự động trong 3 giây. Hóa đơn điện tử gửi về email và lưu vào sổ quỹ.",
      role: "Phòng Kế toán & Ban giám đốc"
    },
    family: {
      img: "assets/screenshots/family-invoice.png",
      badge: "2. App Family: Thanh toán VietQR",
      desc: "Gia đình nhận hóa đơn viện phí trên điện thoại với mã VietQR nhúng sẵn số tiền chính xác và thanh toán 1 chạm từ bất kỳ ngân hàng nào.",
      role: "Người nhà thanh toán viện phí"
    },
    logs: [
      { time: "09:15:00.000", badge: "STAFF_APP", color: "text-cyan-400 bg-cyan-950/80 border border-cyan-700/60", text: "Ghi nhận 1 buổi vật lý trị liệu phục hồi chức năng P.204" },
      { time: "09:15:01.200", badge: "WEB_PORTAL", color: "text-teal-400 bg-teal-950/80 border border-teal-700/60", text: "Dịch vụ tự động cộng vào bảng kê chi phí tháng của cụ Hướng" },
      { time: "09:20:10.500", badge: "FAMILY_APP", color: "text-amber-400 bg-amber-950/80 border border-amber-700/60", text: "Người nhà mở hóa đơn, quét mã VietQR ngân hàng Vietcombank" },
      { time: "09:20:13.200", badge: "BANK_WEBHOOK", color: "text-emerald-400 bg-emerald-950/80 border border-emerald-700/60", text: "Nhận tiền thành công! Tự động gạch nợ trên Web trong 2.7 giây" }
    ],
    latency: "2.70 giây",
    protocol: "VietQR 2.0 / Webhook Banking"
  }
];

let currentSimIndex = 0;
let simAutoPlayTimer = null;
let isSimAutoPlay = true;

function runSimulatorScenario(index, btnEl) {
  currentSimIndex = index;
  const s = SIM_SCENARIOS[index];
  if (!s) return;

  // 1. Update button states
  document.querySelectorAll('.sim-nav-btn').forEach((b, i) => {
    if (i === index) {
      b.classList.add('active', 'border-teal-500', 'bg-teal-900/60', 'text-teal-200');
      b.classList.remove('border-slate-700', 'bg-slate-800/80', 'text-slate-300');
    } else {
      b.classList.remove('active', 'border-teal-500', 'bg-teal-900/60', 'text-teal-200');
      b.classList.add('border-slate-700', 'bg-slate-800/80', 'text-slate-300');
    }
  });

  // 2. Animate devices
  const staffImg = document.getElementById('sim-staff-img');
  const staffDesc = document.getElementById('sim-staff-desc');
  const staffBadge = document.getElementById('sim-staff-badge');
  const staffRole = document.getElementById('sim-staff-role');

  const webImg = document.getElementById('sim-web-img');
  const webDesc = document.getElementById('sim-web-desc');
  const webBadge = document.getElementById('sim-web-badge');
  const webRole = document.getElementById('sim-web-role');

  const familyImg = document.getElementById('sim-family-img');
  const familyDesc = document.getElementById('sim-family-desc');
  const familyBadge = document.getElementById('sim-family-badge');
  const familyRole = document.getElementById('sim-family-role');

  const latencyEl = document.getElementById('sim-latency-val');
  const protocolEl = document.getElementById('sim-protocol-val');
  const titleEl = document.getElementById('sim-scenario-title');
  const summaryEl = document.getElementById('sim-scenario-summary');

  if (titleEl) titleEl.textContent = s.title;
  if (summaryEl) summaryEl.textContent = s.summary;
  if (latencyEl) latencyEl.textContent = s.latency;
  if (protocolEl) protocolEl.textContent = s.protocol;

  // Slide out slightly like modern tab/slide switch
  [staffImg, webImg, familyImg].forEach(img => {
    if (img) {
      img.style.opacity = '0.2';
      img.style.transform = 'translateY(-10px) scale(0.98)';
      img.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.6, 1)';
    }
  });

  setTimeout(() => {
    if (staffImg) {
      staffImg.src = s.staff.img;
      staffImg.style.transform = 'translateY(10px) scale(0.98)';
      void staffImg.offsetWidth;
      staffImg.style.opacity = '1';
      staffImg.style.transform = 'translateY(0) scale(1)';
      staffImg.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    if (staffDesc) staffDesc.textContent = s.staff.desc;
    if (staffBadge) staffBadge.textContent = s.staff.badge;
    if (staffRole) staffRole.textContent = s.staff.role;

    if (webImg) {
      webImg.src = s.web.img;
      webImg.style.transform = 'translateY(10px) scale(0.98)';
      void webImg.offsetWidth;
      webImg.style.opacity = '1';
      webImg.style.transform = 'translateY(0) scale(1)';
      webImg.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    if (webDesc) webDesc.textContent = s.web.desc;
    if (webBadge) webBadge.textContent = s.web.badge;
    if (webRole) webRole.textContent = s.web.role;

    if (familyImg) {
      familyImg.src = s.family.img;
      familyImg.style.transform = 'translateY(10px) scale(0.98)';
      void familyImg.offsetWidth;
      familyImg.style.opacity = '1';
      familyImg.style.transform = 'translateY(0) scale(1)';
      familyImg.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    if (familyDesc) familyDesc.textContent = s.family.desc;
    if (familyBadge) familyBadge.textContent = s.family.badge;
    if (familyRole) familyRole.textContent = s.family.role;

    // 3. Render Audit Terminal Logs
    const logBox = document.getElementById('sim-terminal-logs');
    if (logBox) {
      logBox.innerHTML = s.logs.map(l => `
        <div class="sim-terminal-line">
          <span class="sim-terminal-time">${l.time}</span>
          <span class="sim-terminal-badge ${l.color}">${l.badge}</span>
          <span class="text-slate-300">${l.text}</span>
        </div>
      `).join('');
    }

    lucide.createIcons();
  }, 200);
}

function toggleSimulatorAutoPlay() {
  isSimAutoPlay = !isSimAutoPlay;
  const btn = document.getElementById('sim-autoplay-btn');
  if (btn) {
    if (isSimAutoPlay) {
      btn.innerHTML = '<i data-lucide="pause" class="w-3.5 h-3.5"></i> <span>Tự động: BẬT</span>';
      btn.classList.add('bg-teal-600', 'text-white');
      btn.classList.remove('bg-slate-800', 'text-slate-400');
      startSimAutoPlay();
    } else {
      btn.innerHTML = '<i data-lucide="play" class="w-3.5 h-3.5"></i> <span>Tự động: TẮT</span>';
      btn.classList.remove('bg-teal-600', 'text-white');
      btn.classList.add('bg-slate-800', 'text-slate-400');
      if (simAutoPlayTimer) clearInterval(simAutoPlayTimer);
    }
    lucide.createIcons();
  }
}

function startSimAutoPlay() {
  if (simAutoPlayTimer) clearInterval(simAutoPlayTimer);
  simAutoPlayTimer = setInterval(() => {
    if (!isSimAutoPlay) return;
    let next = (currentSimIndex + 1) % SIM_SCENARIOS.length;
    runSimulatorScenario(next);
  }, 3500);
}

// Auto init simulator when in view or on load
window.addEventListener('DOMContentLoaded', () => {
  runSimulatorScenario(0);
  startSimAutoPlay();
});

// ==================== HERO 3D DEVICES ASYNC CROSSFADE ROTATION ====================
const HERO_SLIDES_LAPTOP = [
  { src: "assets/screenshots/web-dashboard.png", caption: "Bảng điều khiển tổng quan viện dưỡng lão - Web admin" },
  { src: "assets/screenshots/web-timeline.png", caption: "Dòng thời gian y tế & Bệnh án điện tử EMR - Web admin" },
  { src: "assets/screenshots/web-residents.png", caption: "Danh sách người cao tuổi & phòng ở - Web admin" },
  { src: "assets/screenshots/web-activities.png", caption: "Quản lý dinh dưỡng & hoạt động viện - Web admin" },
  { src: "assets/screenshots/web-report.png", caption: "Báo cáo viện phí & tài chính minh bạch - Web admin" }
];

const HERO_SLIDES_FAMILY = [
  { src: "assets/screenshots/family-home-2.png", caption: "Trang chủ hồ sơ sức khỏe người cao tuổi - App người thân" },
  { src: "assets/screenshots/family-ai.png", caption: "Trợ lý AI y tế giải đáp 24/7 - App người thân" },
  { src: "assets/screenshots/family-vitals-bp.png", caption: "Biểu đồ theo dõi huyết áp & tim mạch - App người thân" },
  { src: "assets/screenshots/family-invoice.png", caption: "Hóa đơn viện phí & thanh toán trực tuyến - App người thân" },
  { src: "assets/screenshots/family-activities.png", caption: "Khoảnh khắc sinh hoạt & nhật ký bữa ăn - App người thân" }
];

const HERO_SLIDES_STAFF = [
  { src: "assets/screenshots/staff-residents.png", caption: "Danh sách người cao tuổi phụ trách - App nhân viên" },
  { src: "assets/screenshots/staff-vitals.png", caption: "Đo & ghi nhận sinh hiệu tại giường - App nhân viên" },
  { src: "assets/screenshots/staff-meds.png", caption: "Cấp phát thuốc theo y lệnh 5 Đúng - App nhân viên" },
  { src: "assets/screenshots/staff-meal.png", caption: "Ghi nhận & đánh giá suất ăn tại chỗ - App nhân viên" },
  { src: "assets/screenshots/staff-handover.png", caption: "Bàn giao ca trực điện tử 3 phút - App nhân viên" }
];

// Preload and hardware-decode all hero screenshots in advance to avoid any flash/stutter
[...HERO_SLIDES_LAPTOP, ...HERO_SLIDES_FAMILY, ...HERO_SLIDES_STAFF].forEach(slide => {
  const img = new Image();
  img.src = slide.src;
  if (img.decode) {
    img.decode().catch(() => {});
  }
});

let heroTickStep = 0;
let heroLapIdx = 0;
let heroFamIdx = 0;
let heroStaffIdx = 0;

function crossfadeHeroDevice(containerId, imgPrefix, slide, isPhone = false) {
  const imgA = document.getElementById(imgPrefix + '-a');
  const imgB = document.getElementById(imgPrefix + '-b');
  const container = document.getElementById(containerId);
  if (!imgA || !imgB) return;

  const aIsFront = imgA.classList.contains('is-front');
  const frontImg = aIsFront ? imgA : imgB;
  const backImg = aIsFront ? imgB : imgA;

  // 1. Preload image before swapping to prevent blank flash
  const preImg = new Image();
  preImg.src = slide.src;

  const doSwap = () => {
    // Reset animations by removing & re-adding classes (force reflow)
    backImg.classList.remove('is-front', 'is-back');
    frontImg.classList.remove('is-front', 'is-back');

    // 2. Assign new image to the back buffer
    backImg.src = slide.src;
    backImg.alt = slide.caption;

    // 3. Force browser to acknowledge class removal before adding (triggers CSS animation restart)
    void backImg.offsetWidth;
    void frontImg.offsetWidth;

    // 4. Apply new states: back becomes front (slide-in), front becomes back (slide-out)
    requestAnimationFrame(() => {
      backImg.classList.add('is-front');
      frontImg.classList.add('is-back');
    });
  };

  // If already decoded, swap immediately; else wait for load
  if (preImg.complete) {
    doSwap();
  } else {
    preImg.onload = doSwap;
    preImg.onerror = doSwap; // fallback even on error
  }

  // 5. Update Lightbox click handler
  const safeCaption = slide.caption.replace(/'/g, "\\'");
  const clickHandler = `openLightbox('${slide.src}', '${safeCaption}')`;
  if (container) {
    container.setAttribute('onclick', clickHandler);
    if (isPhone) {
      const phoneParent = container.closest('.phone-3d');
      if (phoneParent) {
        phoneParent.setAttribute('onclick', clickHandler);
      }
    }
  }
}

// Asynchronous staggered rotation: Exactly 1 device transitions per tick
function tickHeroDevices() {
  const turn = heroTickStep % 3;
  if (turn === 0) {
    // Laptop: Web admin
    heroLapIdx = (heroLapIdx + 1) % HERO_SLIDES_LAPTOP.length;
    crossfadeHeroDevice('laptop-hero-box', 'laptop-hero-screen', HERO_SLIDES_LAPTOP[heroLapIdx], false);
  } else if (turn === 1) {
    // Phone trái: App người thân
    heroFamIdx = (heroFamIdx + 1) % HERO_SLIDES_FAMILY.length;
    crossfadeHeroDevice('family-hero-box', 'family-hero-screen', HERO_SLIDES_FAMILY[heroFamIdx], true);
  } else {
    // Phone phải: App nhân viên
    heroStaffIdx = (heroStaffIdx + 1) % HERO_SLIDES_STAFF.length;
    crossfadeHeroDevice('staff-hero-box', 'staff-hero-screen', HERO_SLIDES_STAFF[heroStaffIdx], true);
  }
  heroTickStep++;
}

// Ticker interval: 700ms per staggered step (Each device holds its image for ~2.1s — faster, more dynamic)
let heroRotationTimer = setInterval(tickHeroDevices, 700);

const heroStageEl = document.querySelector('.stage-3d');
if (heroStageEl) {
  heroStageEl.addEventListener('mouseenter', () => clearInterval(heroRotationTimer));
  heroStageEl.addEventListener('mouseleave', () => {
    clearInterval(heroRotationTimer);
    heroRotationTimer = setInterval(tickHeroDevices, 700);
  });
}

// ==================== 3D ROTATING PHONE CAROUSEL (STAFF & FAMILY) ====================

const CAROUSEL_I18N_DATA = {
  staff: {
    vi: [
      {
        index: 0,
        pill: "1. Danh sách NCT",
        chip: "Quản trị danh sách",
        title: "1. Danh sách người cao tuổi",
        desc: "Hiển thị trực quan theo số phòng, cấp độ chăm sóc và cảnh báo sức khỏe cần lưu ý. Tra cứu nhanh thông tin người cao tuổi chỉ trong một lần chạm.",
        highlights: ["Sơ đồ phòng ở trực quan", "Phân nhóm cấp độ chăm sóc", "Cảnh báo y tế nổi bật"],
        src: "assets/screenshots/staff-residents.png",
        caption: "Danh sách người cao tuổi – BeeCare Staff"
      },
      {
        index: 1,
        pill: "2. Đo sinh hiệu",
        chip: "Sinh hiệu & Cảnh báo",
        title: "2. Đo sinh hiệu tại giường",
        desc: "Nhập nhanh huyết áp, mạch, SpO2, nhiệt độ và tự động cảnh báo đỏ khi phát hiện bất thường. Đồng bộ tức thì lên hồ sơ bệnh án EMR của bác sĩ.",
        highlights: ["Nhập 6 chỉ số dưới 30s", "Tự động cảnh báo ngưỡng đỏ", "Đồng bộ EMR tức thì"],
        src: "assets/screenshots/staff-vitals.png",
        caption: "Ghi nhận sinh hiệu tại giường – BeeCare Staff"
      },
      {
        index: 2,
        pill: "3. Bệnh án EMR",
        chip: "Hồ sơ EMR cá nhân",
        title: "3. Thông tin & Bệnh án chi tiết",
        desc: "Tra cứu tiền sử bệnh, dị ứng thuốc, số điện thoại người nhà và phác đồ điều trị riêng biệt. Lưu vết lịch sử khám và can thiệp y tế liên tục.",
        highlights: ["Tiền sử bệnh & dị ứng", "Liên hệ khẩn cấp gia đình", "Phác đồ điều trị riêng biệt"],
        src: "assets/screenshots/staff-detail.png",
        caption: "Hồ sơ sức khỏe chi tiết người cao tuổi – BeeCare Staff"
      },
      {
        index: 3,
        pill: "4. Phát thuốc 5Đ",
        chip: "Cấp phát thuốc 5 Đúng",
        title: "4. Checklist phát thuốc chống nhầm",
        desc: "Chia cữ uống sáng - trưa - chiều - tối, đối soát ảnh viên thuốc và đánh dấu đã uống. Loại bỏ hoàn toàn nguy cơ quên hoặc cấp nhầm thuốc.",
        highlights: ["Chuẩn y lệnh 5 Đúng", "Hình ảnh viên thuốc thực tế", "Ghi nhận cữ uống thời gian thực"],
        src: "assets/screenshots/staff-meds.png",
        caption: "Checklist cấp phát thuốc chống nhầm – BeeCare Staff"
      },
      {
        index: 4,
        pill: "5. Suất ăn & Nước",
        chip: "Dinh dưỡng & Bữa ăn",
        title: "5. Chụp ảnh suất ăn & Chấm điểm",
        desc: "Chụp ảnh khay cơm thật, ghi nhận tỷ lệ ăn hết 90% và lượng nước uống hàng ngày. Dữ liệu bữa ăn tự động gửi về ứng dụng của người thân.",
        highlights: ["Chụp ảnh khay cơm thật", "Tỷ lệ khẩu phần & lượng nước", "Đánh giá dinh dưỡng mỗi ngày"],
        src: "assets/screenshots/staff-meal.png",
        caption: "Ghi nhận suất ăn dinh dưỡng thực tế – BeeCare Staff"
      },
      {
        index: 5,
        pill: "6. Bàn giao ca",
        chip: "Bàn giao ca 3 phút",
        title: "6. Biên bản bàn giao ca trực",
        desc: "Tự động tổng hợp sự cố y tế và thuốc tồn đọng, ký bàn giao giữa 2 kíp trực nhanh chóng. Minh bạch trách nhiệm và tiết kiệm thời gian giao ca.",
        highlights: ["Tổng hợp sự cố tự động", "Bàn giao thuốc tồn đọng", "Ký nhận điện tử giữa 2 ca"],
        src: "assets/screenshots/staff-handover.png",
        caption: "Báo cáo bàn giao ca trực điện tử – BeeCare Staff"
      }
    ],
    en: [
      {
        index: 0,
        pill: "1. Resident List",
        chip: "Resident Directory",
        title: "1. Resident List & Bed Management",
        desc: "Visually organized by room number, care level, and vital health alerts. Instant 1-touch resident profile lookup at the bedside.",
        highlights: ["Visual room layout", "Care level segmentation", "Real-time health alerts"],
        src: "assets/screenshots/staff-residents.png",
        caption: "Resident Directory – BeeCare Staff"
      },
      {
        index: 1,
        pill: "2. Bedside Vitals",
        chip: "Vitals & Early Warning",
        title: "2. Bedside Vital Signs Entry",
        desc: "Record BP, heart rate, SpO2, and temperature in under 30s. Automatically triggers instant red alert on abnormal deviations.",
        highlights: ["6 vitals in under 30s", "Automated red alert threshold", "Instant EMR sync"],
        src: "assets/screenshots/staff-vitals.png",
        caption: "Bedside Vital Signs Entry – BeeCare Staff"
      },
      {
        index: 2,
        pill: "3. EMR Profile",
        chip: "Individual EMR Record",
        title: "3. Resident Profile & Clinical Chart",
        desc: "Review medical history, drug allergies, emergency family contacts, and personalized doctor orders right at the bedside.",
        highlights: ["Medical history & allergies", "Emergency family contact", "Personalized clinical plan"],
        src: "assets/screenshots/staff-detail.png",
        caption: "Resident Health Chart – BeeCare Staff"
      },
      {
        index: 3,
        pill: "4. Medication 5R",
        chip: "5-Rights Dispensing",
        title: "4. Zero-Error Medication Checklist",
        desc: "Scheduled Morning - Noon - Evening - Night rounds with pill reference photos and check-off verification to prevent medication errors.",
        highlights: ["5-Rights medication safety", "Reference pill photo catalog", "Real-time dosage logs"],
        src: "assets/screenshots/staff-meds.png",
        caption: "Medication Checklist – BeeCare Staff"
      },
      {
        index: 4,
        pill: "5. Nutrition & Meals",
        chip: "Nutrition Logging",
        title: "5. Real Meal Photo & Nutrition Score",
        desc: "Capture actual meal tray photos, rate meal consumption percentage, and record daily fluid intake synced directly to families.",
        highlights: ["Real meal tray photo", "Portion & fluid intake log", "Daily nutrition analysis"],
        src: "assets/screenshots/staff-meal.png",
        caption: "Meal Nutrition Record – BeeCare Staff"
      },
      {
        index: 5,
        pill: "6. Shift Handover",
        chip: "3-Min Handover",
        title: "6. Paperless Shift Handover Report",
        desc: "Automated synthesis of medical incidents and pending medications with digital dual-signature handover between nurse shifts.",
        highlights: ["Incident aggregation", "Pending medication report", "Electronic shift signature"],
        src: "assets/screenshots/staff-handover.png",
        caption: "Shift Handover Report – BeeCare Staff"
      }
    ],
    ja: [
      {
        index: 0,
        pill: "1. 入居者名簿",
        chip: "入居者・居室管理",
        title: "1. 入居者一覧・居室マップ",
        desc: "部屋番号、要介護度、健康注意アラートを視覚的に整理。ベッドサイドで1タップで瞬時に個人カルテを検索できます。",
        highlights: ["直感的なフロアマップ", "要介護度別グループ化", "医療アラート即時表示"],
        src: "assets/screenshots/staff-residents.png",
        caption: "入居者名簿 – BeeCare Staff"
      },
      {
        index: 1,
        pill: "2. バイタル測定",
        chip: "バイタル＆早期警告",
        title: "2. ベッドサイドバイタル測定",
        desc: "血圧、脈拍、SpO2、体温を30秒以内で入力。異常値を検知すると医師・管理者に自動で赤色アラートを通知します。",
        highlights: ["30秒で6項目バイタル入力", "異常値赤色アラート", "電子カルテ即時同期"],
        src: "assets/screenshots/staff-vitals.png",
        caption: "バイタル測定 – BeeCare Staff"
      },
      {
        index: 2,
        pill: "3. 電子カルテ",
        chip: "個別EMRカルテ",
        title: "3. 入居者詳細カルテ・既往歴",
        desc: "病歴、薬物アレルギー、家族緊急連絡先、個別ケアプランを素早く参照。継続的な介入記録を確実に管理します。",
        highlights: ["既往歴・アレルギー確認", "ご家族の緊急連絡先", "個別ケアプラン連携"],
        src: "assets/screenshots/staff-detail.png",
        caption: "入居者詳細カルテ – BeeCare Staff"
      },
      {
        index: 3,
        pill: "4. 服薬チェック",
        chip: "誤薬防止5確認",
        title: "4. 誤薬ゼロ服薬チェックリスト",
        desc: "朝・昼・夕・就寝前の配薬を実物写真と照合しながら確実にチェック。誤薬や投薬漏れのリスクをゼロにします。",
        highlights: ["5確認の服薬安全基準", "錠剤の実物写真照合", "リアルタイム投薬記録"],
        src: "assets/screenshots/staff-meds.png",
        caption: "服薬チェックリスト – BeeCare Staff"
      },
      {
        index: 4,
        pill: "5. 食事・水分記録",
        chip: "栄養＆食事管理",
        title: "5. 食事トレイ写真＆摂取量記録",
        desc: "実際の配膳トレイを写真撮影し、完食率や水分摂取量をベッドサイドで記録。ご家族のアプリへ自動通知されます。",
        highlights: ["実物食事トレイの写真記録", "摂取率・水分量の把握", "毎食の栄養モニタリング"],
        src: "assets/screenshots/staff-meal.png",
        caption: "食事栄養記録 – BeeCare Staff"
      },
      {
        index: 5,
        pill: "6. 電子申し送り",
        chip: "3分申し送り",
        title: "6. 電子シフト申し送りレポート",
        desc: "当直中の特記事項や残薬を自動集計し、2シフト間でデジタル署名申し送りを短時間で完了します。",
        highlights: ["特記事項の自動集約", "残薬情報の引き継ぎ", "電子サイン申し送り"],
        src: "assets/screenshots/staff-handover.png",
        caption: "電子申し送り – BeeCare Staff"
      }
    ]
  },
  family: {
    vi: [
      {
        index: 0,
        pill: "1. Trợ lý AI 24/7",
        chip: "Trợ lý AI 24/7",
        title: "1. Hỏi đáp tình hình cha mẹ 24/7",
        desc: "AI tự động đọc sinh hiệu và thực đơn để giải đáp ngay cho con cái mọi lúc mọi nơi. Trả lời chi tiết tình hình sinh hoạt của cha mẹ trong ngày.",
        highlights: ["Phản hồi tự động dưới 1s", "Đọc dữ liệu sinh hiệu thực tế", "An tâm mọi lúc mọi nơi"],
        src: "assets/screenshots/family-ai.png",
        caption: "Trợ lý AI hỏi đáp 24/7 – BeeCare Family"
      },
      {
        index: 1,
        pill: "2. Biểu đồ huyết áp",
        chip: "Huyết áp & Tim mạch",
        title: "2. Biểu đồ huyết áp chạm vuốt",
        desc: "Xem diễn biến huyết áp, nhịp tim và SpO2 chi tiết theo từng ngày và từng tuần. Phát hiện sớm các dao động bất thường để kịp thời phối hợp chăm sóc.",
        highlights: ["Biểu đồ trực quan mượt mà", "Theo dõi theo ngày & tuần", "Cảnh báo khi huyết áp biến động"],
        src: "assets/screenshots/family-vitals-bp.png",
        caption: "Biểu đồ huyết áp và sinh hiệu – BeeCare Family"
      },
      {
        index: 2,
        pill: "3. Ảnh sinh hoạt",
        chip: "Khoảnh khắc vui khỏe",
        title: "3. Hình ảnh sinh hoạt thực tế",
        desc: "Ngắm nhìn cha mẹ tập dưỡng sinh, ca hát và giao lưu vui vẻ cùng bạn già tại viện. Album ảnh chất lượng cao được điều dưỡng cập nhật hàng ngày.",
        highlights: ["Album ảnh chất lượng cao", "Cập nhật sinh hoạt thường nhật", "Gắn kết tình cảm gia đình"],
        src: "assets/screenshots/family-activities.png",
        caption: "Ảnh sinh hoạt thực tế của người cao tuổi – BeeCare Family"
      },
      {
        index: 3,
        pill: "4. Oxy SpO2",
        chip: "Chỉ số SpO2 & Hô hấp",
        title: "4. Theo dõi nồng độ Oxy SpO2",
        desc: "Giám sát chỉ số bão hòa oxy trong máu và nhịp thở, phát hiện sớm nguy cơ suy hô hấp. Biểu đồ trực quan giúp gia đình nắm rõ thể trạng của cha mẹ.",
        highlights: ["Theo dõi oxy máu SpO2", "Kiểm soát nhịp thở liên tục", "Phát hiện sớm suy hô hấp"],
        src: "assets/screenshots/family-vitals-spo2.png",
        caption: "Biểu đồ nồng độ oxy SpO2 – BeeCare Family"
      },
      {
        index: 4,
        pill: "5. Viện phí VietQR",
        chip: "Thanh toán minh bạch",
        title: "5. Tra cứu hóa đơn và đóng phí",
        desc: "Minh bạch viện phí từng ngày, thanh toán 1-chạm tiện lợi qua mã QR gạch nợ tức thì. Không cần phải đến tận viện để đóng phí hàng tháng.",
        highlights: ["Sao kê viện phí từng ngày", "Thanh toán VietQR 1 chạm", "Gạch nợ tức thì tự động"],
        src: "assets/screenshots/family-invoice.png",
        caption: "Bảng kê viện phí và mã thanh toán VietQR – BeeCare Family"
      },
      {
        index: 5,
        pill: "6. Bảng tin tổng hợp",
        chip: "Bảng tin tổng hợp",
        title: "6. Trang chủ chăm sóc toàn diện",
        desc: "Tổng hợp trạng thái sức khỏe hôm nay, thông báo của viện và nhật ký ca trực hàng ngày. Giao diện thân thiện và dễ sử dụng cho mọi thành viên trong gia đình.",
        highlights: ["Bảng tin trực quan toàn diện", "Thông báo từ viện dưỡng lão", "Nhật ký chăm sóc mỗi ngày"],
        src: "assets/screenshots/family-home-2.png",
        caption: "Trang chủ theo dõi người cao tuổi – BeeCare Family"
      }
    ],
    en: [
      {
        index: 0,
        pill: "1. 24/7 AI Assistant",
        chip: "24/7 AI Assistant",
        title: "1. Inquire About Parents 24/7",
        desc: "AI assistant reads real vitals and daily menu to answer family inquiries instantly anytime, anywhere.",
        highlights: ["Under 1s AI response", "Real clinical vitals ingestion", "Peace of mind 24/7"],
        src: "assets/screenshots/family-ai.png",
        caption: "24/7 AI Assistant – BeeCare Family"
      },
      {
        index: 1,
        pill: "2. Vitals Chart",
        chip: "Blood Pressure & Heart",
        title: "2. Interactive Blood Pressure Chart",
        desc: "Swipe and explore daily and weekly trends for blood pressure, pulse, and SpO2 with abnormal deviation alerts.",
        highlights: ["Smooth interactive chart", "Day & week timeline review", "Proactive anomaly alerts"],
        src: "assets/screenshots/family-vitals-bp.png",
        caption: "Blood Pressure Chart – BeeCare Family"
      },
      {
        index: 2,
        pill: "3. Activity Photos",
        chip: "Joyful Moments",
        title: "3. Daily Resident Activity Photos",
        desc: "Enjoy seeing parents practice morning exercises, singing, and socializing joyfully with fellow elderly peers at the facility.",
        highlights: ["High-definition photo stream", "Daily lifestyle moments", "Family emotional connection"],
        src: "assets/screenshots/family-activities.png",
        caption: "Activity Photo Album – BeeCare Family"
      },
      {
        index: 3,
        pill: "4. SpO2 Oxygen",
        chip: "SpO2 & Respiration",
        title: "4. Blood Oxygen SpO2 Monitor",
        desc: "Continuous blood oxygen saturation and respiratory rate tracking to detect early respiratory risks ahead of time.",
        highlights: ["Continuous SpO2 tracking", "Breathing rate monitor", "Early hypoxia warning"],
        src: "assets/screenshots/family-vitals-spo2.png",
        caption: "SpO2 Oxygen Monitor – BeeCare Family"
      },
      {
        index: 4,
        pill: "5. Billing & VietQR",
        chip: "Transparent Billing",
        title: "5. Invoice Details & VietQR Payment",
        desc: "Itemized daily fee transparency with 1-touch VietQR auto-reconciliation, eliminating the need to pay in-person.",
        highlights: ["Itemized daily breakdown", "1-touch VietQR payment", "Instant receipt & balance update"],
        src: "assets/screenshots/family-invoice.png",
        caption: "Invoice Details & VietQR – BeeCare Family"
      },
      {
        index: 5,
        pill: "6. Care Feed",
        chip: "Comprehensive Feed",
        title: "6. Comprehensive Family Carefeed",
        desc: "Consolidated view of today's health status, official nursing home announcements, and daily caregiver shift logs in one intuitive screen.",
        highlights: ["All-in-one daily overview", "Facility announcements", "Daily caregiver journal"],
        src: "assets/screenshots/family-home-2.png",
        caption: "Comprehensive Family Carefeed – BeeCare Family"
      }
    ],
    ja: [
      {
        index: 0,
        pill: "1. 24時間AI相談",
        chip: "24時間AIアシスタント",
        title: "1. ご両親の様子を24時間AI相談",
        desc: "AIが毎日のバイタルや食事メニューを自動解析し、ご家族からの質問にいつでも即座にわかりやすく回答します。",
        highlights: ["1秒以内の自動応答", "実際のバイタルデータを参照", "いつでも安心の見守り"],
        src: "assets/screenshots/family-ai.png",
        caption: "24時間AI相談 – BeeCare Family"
      },
      {
        index: 1,
        pill: "2. 血圧グラフ",
        chip: "血圧・心拍トレンド",
        title: "2. 血圧・心拍インタラクティブグラフ",
        desc: "日別・週別の血圧、脈拍、SpO2の推移を直感的なスワイプで閲覧。異常な変動も早期に検知できます。",
        highlights: ["滑らかな操作のグラフ", "日・週単位の推移分析", "異常値アラート通知"],
        src: "assets/screenshots/family-vitals-bp.png",
        caption: "血圧・心拍グラフ – BeeCare Family"
      },
      {
        index: 2,
        pill: "3. 生活写真",
        chip: "健やかな日常の瞬間",
        title: "3. 日常生活アルバム・活動写真",
        desc: "体操、合唱、仲間との楽しい団らんなど、施設でのご両親の生き生きとした笑顔を写真日誌でお届けします。",
        highlights: ["高画質な写真アルバム", "毎日の生活風景を配信", "ご家族との絆を深める"],
        src: "assets/screenshots/family-activities.png",
        caption: "活動写真アルバム – BeeCare Family"
      },
      {
        index: 3,
        pill: "4. SpO2酸素飽和度",
        chip: "SpO2＆呼吸モニタリング",
        title: "4. 血中酸素SpO2モニタリング",
        desc: "血中酸素飽和度と呼吸数を継続的に監視し、呼吸機能の低下や体調不良をいち早くキャッチします。",
        highlights: ["SpO2酸素飽和度の監視", "呼吸リズムの継続管理", "呼吸器リスクの早期発見"],
        src: "assets/screenshots/family-vitals-spo2.png",
        caption: "SpO2酸素飽和度 – BeeCare Family"
      },
      {
        index: 4,
        pill: "5. 費用明細・QR決済",
        chip: "透明な費用管理",
        title: "5. 費用明細の照会・QRコード決済",
        desc: "毎日のケア費用明細を透明に確認でき、VietQR決済コードで施設へ来所することなく1タップで即時支払えます。",
        highlights: ["日別明細の透明な確認", "VietQRによる簡単決済", "リアルタイム入金確認"],
        src: "assets/screenshots/family-invoice.png",
        caption: "費用明細・QR決済 – BeeCare Family"
      },
      {
        index: 5,
        pill: "6. 総合ホーム画面",
        chip: "総合見守りボード",
        title: "6. 総合見守りホーム画面",
        desc: "今日の健康状態、施設からの大切なお知らせ、日々の介護記録を1つの画面で見やすく集約しています。",
        highlights: ["見やすい健康ダッシュボード", "施設からの連絡事項", "毎日のケア記録タイムライン"],
        src: "assets/screenshots/family-home-2.png",
        caption: "総合見守りホーム画面 – BeeCare Family"
      }
    ]
  }
};

class Phone3DCarousel {
  constructor(options) {
    this.type = options.type; // 'staff' | 'family'
    this.containerId = options.containerId;
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    this.cardId = options.cardId;
    this.featureCard = document.getElementById(this.cardId);
    this.playBtnId = options.playBtnId;
    this.playBtn = document.getElementById(this.playBtnId);
    this.pillsContainerId = options.pillsContainerId;
    this.dotsContainerId = options.dotsContainerId;

    this.currentLang = localStorage.getItem('beecare_lang') || 'vi';
    this.data = (CAROUSEL_I18N_DATA[this.type] && CAROUSEL_I18N_DATA[this.type][this.currentLang]) 
                ? CAROUSEL_I18N_DATA[this.type][this.currentLang] 
                : CAROUSEL_I18N_DATA[this.type]['vi'];
    this.total = this.data.length;
    this.activeIndex = 0;
    this.isPlaying = true;
    this.timer = null;

    this.slides = Array.from(this.container.querySelectorAll('.phone-3d-slide'));
    this.prevBtn = this.container.querySelector('.prev-btn');
    this.nextBtn = this.container.querySelector('.next-btn');
    this.stage = this.container.querySelector('.phone-3d-stage');

    this.touchStartX = 0;
    this.touchStartY = 0;
    this.isDragging = false;

    this.init();
  }

  init() {
    this.updatePositions();
    this.updateContentCard();
    this.bindEvents();
    this.startAutoPlay();
  }

  updatePositions() {
    const width = window.innerWidth;
    let dist1, dist2, rot1, rot2, z0, z1, z2, scale0, scale1, scale2;

    if (width >= 1024) {
      dist1 = 110;
      dist2 = 195;
      rot1 = 34;
      rot2 = 48;
      z0 = 0;       // Tiêu cự 0px tuyệt đối sắc nét 1:1
      z1 = -65;
      z2 = -165;
      scale0 = 1.0;
      scale1 = 0.82;
      scale2 = 0.66;
    } else if (width >= 640) {
      dist1 = 88;
      dist2 = 160;
      rot1 = 32;
      rot2 = 45;
      z0 = 0;
      z1 = -55;
      z2 = -145;
      scale0 = 1.0;
      scale1 = 0.80;
      scale2 = 0.64;
    } else {
      dist1 = 68;
      dist2 = 125;
      rot1 = 28;
      rot2 = 40;
      z0 = 0;
      z1 = -45;
      z2 = -120;
      scale0 = 1.0;
      scale1 = 0.78;
      scale2 = 0.62;
    }

    this.slides.forEach((slide, i) => {
      let offset = i - this.activeIndex;
      while (offset > this.total / 2) offset -= this.total;
      while (offset < -this.total / 2) offset += this.total;

      slide.classList.remove('is-center', 'is-flank', 'is-hidden');

      if (offset === 0) {
        slide.classList.add('is-center');
        slide.style.transform = `translateX(0%) translateZ(${z0}px) rotateY(0deg) scale(${scale0})`;
        slide.style.opacity = '1';
        slide.style.zIndex = '30';
        slide.style.pointerEvents = 'auto';
      } else if (offset === 1) {
        slide.classList.add('is-flank');
        slide.style.transform = `translateX(${dist1}%) translateZ(${z1}px) rotateY(-${rot1}deg) scale(${scale1})`;
        slide.style.opacity = '0.85';
        slide.style.zIndex = '20';
        slide.style.pointerEvents = 'auto';
      } else if (offset === -1) {
        slide.classList.add('is-flank');
        slide.style.transform = `translateX(-${dist1}%) translateZ(${z1}px) rotateY(${rot1}deg) scale(${scale1})`;
        slide.style.opacity = '0.85';
        slide.style.zIndex = '20';
        slide.style.pointerEvents = 'auto';
      } else if (offset === 2) {
        slide.style.transform = `translateX(${dist2}%) translateZ(${z2}px) rotateY(-${rot2}deg) scale(${scale2})`;
        slide.style.opacity = '0.45';
        slide.style.zIndex = '10';
        slide.style.pointerEvents = 'auto';
      } else if (offset === -2) {
        slide.style.transform = `translateX(-${dist2}%) translateZ(${z2}px) rotateY(${rot2}deg) scale(${scale2})`;
        slide.style.opacity = '0.45';
        slide.style.zIndex = '10';
        slide.style.pointerEvents = 'auto';
      } else {
        slide.classList.add('is-hidden');
        slide.style.transform = `translateX(0%) translateZ(-260px) rotateY(180deg) scale(0.5)`;
        slide.style.opacity = '0';
        slide.style.zIndex = '1';
        slide.style.pointerEvents = 'none';
      }
    });

    this.updatePills();
    this.updateDots();
  }

  updateContentCard() {
    if (!this.featureCard) return;
    const item = this.data[this.activeIndex];
    if (!item) return;

    this.featureCard.style.opacity = '0';
    this.featureCard.style.transform = 'translateY(6px)';

    setTimeout(() => {
      const counterEl = this.featureCard.querySelector('.carousel-step-counter');
      const chipEl = this.featureCard.querySelector('.screenshot-chip');
      const titleEl = this.featureCard.querySelector('.carousel-card-title');
      const descEl = this.featureCard.querySelector('.carousel-card-desc');
      const highlightsEl = this.featureCard.querySelector('.carousel-highlights-row');
      const zoomBtn = this.featureCard.querySelector('.carousel-zoom-btn');

      if (counterEl) counterEl.textContent = `0${item.index + 1} / 0${this.total}`;
      if (chipEl) chipEl.textContent = item.chip;
      if (titleEl) titleEl.textContent = item.title;
      if (descEl) descEl.textContent = item.desc;

      if (highlightsEl) {
        highlightsEl.innerHTML = item.highlights
          .map(h => `<span class="carousel-highlight-chip"><i data-lucide="check" class="w-3.5 h-3.5 ${this.type === 'staff' ? 'text-teal-600' : 'text-amber-600'}"></i> ${escapeHTML(h)}</span>`)
          .join('');
      }

      if (zoomBtn) {
        zoomBtn.onclick = () => {
          if (typeof openLightbox === 'function') {
            openLightbox(item.src, item.caption);
          }
        };
      }

      this.featureCard.style.opacity = '1';
      this.featureCard.style.transform = 'translateY(0)';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 150);
  }

  updatePills() {
    const pills = document.querySelectorAll(`[data-carousel-pill="${this.containerId}"]`);
    pills.forEach((p, idx) => {
      if (idx === this.activeIndex) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
      // Update text in pill according to language
      const item = this.data[idx];
      if (item) {
        const textSpan = p.querySelector('span');
        if (textSpan) textSpan.textContent = item.pill;
      }
    });
  }

  updateDots() {
    const dots = document.querySelectorAll(`[data-carousel-dot="${this.containerId}"]`);
    dots.forEach((d, idx) => {
      if (idx === this.activeIndex) {
        d.classList.add('active');
      } else {
        d.classList.remove('active');
      }
    });
  }

  goTo(idx) {
    this.activeIndex = (idx + this.total) % this.total;
    this.updatePositions();
    this.updateContentCard();
  }

  next() {
    this.goTo(this.activeIndex + 1);
  }

  prev() {
    this.goTo(this.activeIndex - 1);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.isPlaying = true;
    this.updatePlayBtn();
    this.timer = setInterval(() => {
      this.next();
    }, 4500);
  }

  stopAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.isPlaying = false;
    this.updatePlayBtn();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  updatePlayBtn() {
    if (!this.playBtn) return;
    this.playBtn.innerHTML = this.isPlaying 
      ? '<i data-lucide="pause" class="w-4 h-4"></i>' 
      : '<i data-lucide="play" class="w-4 h-4"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  setLanguage(lang) {
    this.currentLang = lang;
    if (CAROUSEL_I18N_DATA[this.type] && CAROUSEL_I18N_DATA[this.type][lang]) {
      this.data = CAROUSEL_I18N_DATA[this.type][lang];
    } else {
      this.data = CAROUSEL_I18N_DATA[this.type]['vi'];
    }
    this.updateContentCard();
    this.updatePills();
  }

  bindEvents() {
    // Click on slides
    this.slides.forEach((slide, i) => {
      slide.addEventListener('click', () => {
        let offset = i - this.activeIndex;
        while (offset > this.total / 2) offset -= this.total;
        while (offset < -this.total / 2) offset += this.total;

        if (offset === 0) {
          const item = this.data[this.activeIndex];
          if (typeof openLightbox === 'function') {
            openLightbox(item.src, item.caption);
          }
        } else {
          this.goTo(i);
        }
      });
    });

    // Pause on hover
    if (this.stage) {
      this.stage.addEventListener('mouseenter', () => {
        if (this.timer) clearInterval(this.timer);
      });
      this.stage.addEventListener('mouseleave', () => {
        if (this.isPlaying) {
          this.startAutoPlay();
        }
      });

      // Touch events for mobile swiping
      this.stage.addEventListener('touchstart', (e) => {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      }, { passive: true });

      this.stage.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - this.touchStartX;
        const diffY = touchEndY - this.touchStartY;

        // If predominantly horizontal swipe > 36px
        if (Math.abs(diffX) > 36 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            this.next();
          } else {
            this.prev();
          }
        }
      }, { passive: true });

      // Mouse drag for desktop
      let mouseStartX = 0;
      let isMouseDown = false;
      this.stage.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        mouseStartX = e.clientX;
      });
      window.addEventListener('mouseup', (e) => {
        if (!isMouseDown) return;
        isMouseDown = false;
        const diffX = e.clientX - mouseStartX;
        if (Math.abs(diffX) > 40) {
          if (diffX < 0) {
            this.next();
          } else {
            this.prev();
          }
        }
      });
    }

    // Responsive window resize
    window.addEventListener('resize', () => {
      this.updatePositions();
    });
  }
}

// Toggle between 3D Carousel and 6-Device Grid View
function toggleShowcaseMode(type, mode) {
  const carouselWrap = document.getElementById(type + '-carousel-3d');
  const gridView = document.getElementById(type + '-grid-view');
  const btn3D = document.getElementById(type + '-mode-3d-btn');
  const btnGrid = document.getElementById(type + '-mode-grid-btn');

  if (mode === '3d') {
    if (carouselWrap) carouselWrap.style.display = 'block';
    if (gridView) gridView.style.display = 'none';
    if (btn3D) {
      btn3D.classList.add('active');
      const icon = btn3D.querySelector('i');
      if (icon) icon.className = `w-3.5 h-3.5 ${type === 'staff' ? 'text-teal-600' : 'text-amber-600'}`;
    }
    if (btnGrid) {
      btnGrid.classList.remove('active');
      const icon = btnGrid.querySelector('i');
      if (icon) icon.className = 'w-3.5 h-3.5 text-slate-500';
    }
    if (type === 'staff' && window.staffCarousel) window.staffCarousel.updatePositions();
    if (type === 'family' && window.familyCarousel) window.familyCarousel.updatePositions();
  } else {
    if (carouselWrap) carouselWrap.style.display = 'none';
    if (gridView) gridView.style.display = 'grid';
    if (btn3D) {
      btn3D.classList.remove('active');
      const icon = btn3D.querySelector('i');
      if (icon) icon.className = 'w-3.5 h-3.5 text-slate-500';
    }
    if (btnGrid) {
      btnGrid.classList.add('active');
      const icon = btnGrid.querySelector('i');
      if (icon) icon.className = `w-3.5 h-3.5 ${type === 'staff' ? 'text-teal-600' : 'text-amber-600'}`;
    }
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Initialize Carousels on Page Load
let staffCarousel = null;
let familyCarousel = null;

function initPhoneCarousels() {
  staffCarousel = new Phone3DCarousel({
    type: 'staff',
    containerId: 'staff-carousel-3d',
    cardId: 'staff-feature-card',
    playBtnId: 'staff-play-btn',
    pillsContainerId: 'staff-carousel-pills',
    dotsContainerId: 'staff-carousel-dots'
  });
  window.staffCarousel = staffCarousel;

  familyCarousel = new Phone3DCarousel({
    type: 'family',
    containerId: 'family-carousel-3d',
    cardId: 'family-feature-card',
    playBtnId: 'family-play-btn',
    pillsContainerId: 'family-carousel-pills',
    dotsContainerId: 'family-carousel-dots'
  });
  window.familyCarousel = familyCarousel;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPhoneCarousels);
} else {
  initPhoneCarousels();
}

// Hook into multilingual language switcher
window.addEventListener('languageChanged', (e) => {
  const lang = e.detail && e.detail.lang ? e.detail.lang : currentLang;
  if (window.staffCarousel) window.staffCarousel.setLanguage(lang);
  if (window.familyCarousel) window.familyCarousel.setLanguage(lang);
});

// ==================== MULTILINGUAL i18n (VI - EN - JA) ====================
const TRANSLATIONS = {
  vi: {
    nav_tagline: "Hệ sinh thái y tế số",
    nav_home: "Trang chủ",
    nav_ecosystem: "Hệ sinh thái",
    nav_eco_web: "Cổng quản trị web",
    nav_eco_staff: "App điều dưỡng",
    nav_eco_family: "App người thân",
    nav_pricing: "Bảng giá",
    nav_company: "Về chúng tôi",
    nav_news: "Tin tức",
    nav_contact: "Liên hệ",
    nav_demo: "Đăng ký demo",
    hero_badge: "Đồng bộ tức thì: Quản lý ── Nhân viên ── Người cao tuổi ── Người thân",
    hero_title: "Quản lý viện dưỡng lão thông minh",
    hero_desc: "Số hóa vận hành – Gắn kết gia đình – Trợ lý AI 24/7",
    hero_for_mgmt: "Nội trú",
    hero_for_staff: "Bán trú",
    hero_for_family: "Ngoại trú",
    hero_slogan_mgmt: "Phòng ở • Dinh dưỡng • Y tế 24/7",
    hero_slogan_staff: "Hoạt động • Bữa ăn • Hỗ trợ y tế",
    hero_slogan_family: "Điều dưỡng • Thuốc • Sinh hiệu tại nhà",
    hero_cta_demo: "Đăng ký trải nghiệm",
    hero_cta_sim: "Sử dụng ngay",
    trust_1: "Sinh hiệu thời gian thực",
    trust_2: "Phát thuốc chống nhầm 100%",
    trust_3: "Trợ lý AI hỏi đáp 24/7",
    badge_vitals_title: "Sinh hiệu bình thường",
    badge_vitals_desc: "Huyết áp 120/80 • Tim 74 bpm",
    badge_payment_title: "Thanh toán chi phí",
    badge_payment_desc: "Minh bạch, nhanh chóng & an toàn",
    hero_device_web: "Web admin",
    hero_device_family: "App người thân",
    hero_device_staff: "App nhân viên",
    eco_tab_all: "Xem tất cả",
    hero_apps_summary_tag: "Bộ 3 giải pháp công nghệ kết nối liền mạch",
    hero_apps_summary_title: "Một nền tảng – Ba ứng dụng chuyên sâu",
    hero_sum_web_badge: "Bác sĩ & Ban quản trị",
    hero_sum_web_title: "Web admin",
    hero_sum_web_desc: "Trung tâm điều hành số hóa toàn diện: Quản lý bệnh án EMR, tự động hóa viện phí và điều phối nhân sự.",
    hero_sum_web_feat1: "Bệnh án điện tử EMR & timeline sức khỏe",
    hero_sum_web_feat2: "Viện phí tự động & đối soát công nợ",
    hero_sum_web_feat3: "Sơ đồ phòng giường & phân ca trực",
    hero_sum_web_action: "Khám phá Web admin",
    hero_sum_staff_badge: "Điều dưỡng tại giường",
    hero_sum_staff_title: "App nhân viên",
    hero_sum_staff_desc: "Trợ thủ tác nghiệp tại giường bệnh: Ghi nhận sinh hiệu tức thì, phát thuốc chuẩn y lệnh và bàn giao ca không giấy tờ.",
    hero_sum_staff_feat1: "Đo 6 chỉ số sinh hiệu tại giường",
    hero_sum_staff_feat2: "Cấp phát thuốc theo y lệnh chuẩn xác",
    hero_sum_staff_feat3: "Ghi nhận bữa ăn, sinh hoạt & bàn giao ca",
    hero_sum_staff_action: "Khám phá App nhân viên",
    hero_sum_family_badge: "Gia đình và con cái",
    hero_sum_family_title: "App người thân",
    hero_sum_family_desc: "Đồng hành cùng cha mẹ từ xa: Theo dõi sức khỏe liên tục, xem khoảnh khắc mỗi ngày và thanh toán viện phí 1 chạm.",
    hero_sum_family_feat1: "Biểu đồ sinh hiệu 24/7 & cảnh báo sớm",
    hero_sum_family_feat2: "Nhật ký hình ảnh & bữa ăn hàng ngày",
    hero_sum_family_feat3: "Thanh toán viện phí & trợ lý AI y tế",
    hero_sum_family_action: "Khám phá App người thân",
    news_hero_badge: "Tin tức & Hoạt động cộng đồng",
    news_hero_title: "Tin tức & Hoạt động BeeCare – HANIKI",
    news_hero_title_html: 'Kết nối cộng đồng, <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">kiến tạo giá trị</span>',
    news_hero_desc: "Khám phá những câu chuyện ý nghĩa, chương trình thiện nguyện vì cộng đồng, nét đẹp văn hóa doanh nghiệp và cẩm nang chuyển đổi số viện dưỡng lão.",
    news_cat_all: "Tất cả bài viết",
    news_cat_charity: "Thiện nguyện & Xã hội",
    news_cat_culture: "Văn hóa doanh nghiệp",
    news_cat_tech: "Cẩm nang & Chuyển đổi số",
    news_search_placeholder: "Tìm kiếm bài viết theo từ khóa...",
    news_featured_badge: "Bài viết tiêu điểm",
    news_read_more: "Đọc chi tiết",
    news_read_featured: "Đọc bài viết tiêu điểm",
    news_empty_title: "Không tìm thấy bài viết nào",
    news_empty_desc: "Vui lòng thử lại với từ khóa hoặc bộ lọc danh mục khác.",
    news_modal_gallery_title: "Khoảnh khắc hình ảnh thực tế",
    news_modal_close_btn: "Đóng và tiếp tục xem",
    // Company Page (Vi)
    company_hero_badge: "Về công ty HANIKI • Đơn vị nghiên cứu & phát triển BeeCare",
    company_hero_title: "Giải pháp công nghệ chuyển đổi số cho viện dưỡng lão",
    company_hero_desc: "HANIKI tập trung nghiên cứu và phát triển phần mềm quản lý viện dưỡng lão BeeCare, đồng hành cùng các cơ sở dưỡng lão tại Việt Nam chuẩn hóa quy trình chăm sóc, số hóa bệnh án và kết nối thông suốt với gia đình người cao tuổi.",
    company_hero_cta_survey: "Đặt lịch tư vấn & khảo sát tại viện",
    company_hero_cta_pricing: "Xem bảng giá các gói",
    company_stat1_num: "3",
    company_stat1_title: "Nền tảng đồng bộ",
    company_stat1_desc: "Web Admin, App Điều Dưỡng & App Người Thân",
    company_stat2_num: "100%",
    company_stat2_title: "Quy trình số hóa",
    company_stat2_desc: "Sinh hiệu, đơn thuốc & phân ca trực",
    company_stat3_num: "R&D",
    company_stat3_title: "Đội ngũ kỹ sư tại Hà Nội",
    company_stat3_desc: "Nghiên cứu & phát triển phần mềm y tế",
    company_stat4_num: "24/7",
    company_stat4_title: "Hỗ trợ kỹ thuật chuyên sâu",
    company_stat4_desc: "Đồng hành liên tục cùng đơn vị vận hành",
    company_vm_badge: "Tầm nhìn & Sứ mệnh",
    company_vm_title: "Đồng hành hiện đại hóa quy trình chăm sóc người cao tuổi",
    company_vm_desc: "Lắng nghe thực tế tại cơ sở dưỡng lão để kiến tạo giải pháp công nghệ thiết thực và bền vững",
    company_vision_title: "Tầm nhìn phát triển",
    company_vision_desc: "Xây dựng phần mềm quản lý viện dưỡng lão tin cậy, thiết thực và dễ sử dụng hàng đầu tại Việt Nam; giúp các cơ sở dưỡng lão tối ưu hóa vận hành, kiểm soát chặt chẽ thông tin và nâng cao chất lượng phục vụ người cao tuổi.",
    company_vision_item1: "Hạn chế ghi chép thủ công, số hóa biểu đồ theo dõi sinh hiệu và bàn giao ca trực",
    company_vision_item2: "Hỗ trợ nhắc lịch chăm sóc, cảnh báo y tế sớm và quản lý chi phí minh bạch",
    company_mission_title: "Sứ mệnh phụng sự",
    company_mission_desc: "Giúp nhân viên điều dưỡng giảm bớt gánh nặng sổ sách hành chính để toàn tâm chăm sóc người cao tuổi bằng sự ân cần. Đồng thời tạo cầu nối thông tin kịp thời, minh bạch giúp người thân an tâm gửi gắm cha mẹ.",
    company_mission_item1: "Minh bạch hóa lịch trình sinh hoạt, y lệnh dùng thuốc và thông tin viện phí",
    company_mission_item2: "Nâng cao năng suất và hỗ trợ nhân viên điều dưỡng thao tác thuận tiện ngay tại giường",
    company_cv_badge: "Giá trị cốt lõi",
    company_cv_title: "Nguyên tắc định hình mọi tính năng sản phẩm",
    company_cv_desc: "Mỗi cải tiến phần mềm đều xuất phát từ sự thấu hiểu sâu sắc người dùng và đạo đức nghề y",
    company_cv1_title: "Thấu cảm & nhân văn",
    company_cv1_desc: "Lắng nghe nhu cầu thực tế của người cao tuổi, gia đình và nhân viên điều dưỡng để xây dựng tính năng thiết thực.",
    company_cv2_title: "Minh bạch & chính xác",
    company_cv2_desc: "Mọi chỉ số sinh hiệu, lịch dùng thuốc và chi phí đều được ghi nhận rõ ràng, trung thực và tức thì.",
    company_cv3_title: "Ổn định & bảo mật",
    company_cv3_desc: "Hạ tầng máy chủ tin cậy, lưu trữ an toàn hồ sơ sức khỏe và đảm bảo vận hành liên tục 24/7.",
    company_cv4_title: "Đồng hành tận tâm",
    company_cv4_desc: "Hỗ trợ đào tạo tại chỗ, hướng dẫn sử dụng chi tiết và luôn sẵn sàng hỗ trợ kỹ thuật khi viện cần.",
    company_lead_badge: "Ban lãnh đạo",
    company_lead_title: "Tâm huyết vì sự phát triển của y tế dưỡng lão",
    company_lead_desc: "Đội ngũ sáng lập mong muốn ứng dụng công nghệ để nâng cao chất lượng phụng dưỡng người cao tuổi",
    company_ceo_role: "Founder & CEO • Công ty TNHH HANIKI",
    company_ceo_quote: "Chăm sóc người cao tuổi là công việc đòi hỏi sự kiên nhẫn, tận tụy và trách nhiệm cao. Chúng tôi phát triển BeeCare với mong muốn ứng dụng công nghệ để hỗ trợ đắc lực cho điều dưỡng viên, giảm bớt áp lực ghi chép thủ công để họ có thêm thời gian lắng nghe và chăm sóc các cụ chu đáo hơn.",
    company_ceo_subtext: "Mỗi tính năng của BeeCare đều được xây dựng dựa trên khảo sát thực tế quy trình vận hành và tiếp thu ý kiến đóng góp từ các y bác sĩ, điều dưỡng viên tại cơ sở dưỡng lão.",
    company_ceo_tag1: "Thiết kế sát thực tế quy trình",
    company_ceo_tag2: "Đồng hành triển khai tận nơi",
    company_work_badge: "Không gian làm việc & Đội ngũ",
    company_work_title: "Môi trường nghiên cứu năng động & thực tế",
    company_work_desc: "Hình ảnh thực tế hoạt động nghiên cứu phát triển và văn hóa doanh nghiệp tại HANIKI",
    company_photo1_badge: "Đội ngũ kỹ sư",
    company_photo1_title: "Tập thể nhân sự HANIKI",
    company_photo1_desc: "Đội ngũ kỹ sư công nghệ nhiệt huyết tại trụ sở Hà Nội.",
    company_photo2_badge: "R&D & Thiết kế",
    company_photo2_title: "Họp kỹ thuật & Phân tích tính năng",
    company_photo2_desc: "Thảo luận tối ưu trải nghiệm người dùng và quy trình thao tác điều dưỡng.",
    company_photo3_badge: "Kiểm thử hệ thống",
    company_photo3_title: "Đào tạo & Thử nghiệm giải pháp",
    company_photo3_desc: "Kiểm thử các luồng dữ liệu đồng bộ giữa Cổng quản trị và Ứng dụng di động.",
    company_photo4_badge: "Môi trường làm việc",
    company_photo4_title: "Khu vực nghiên cứu phần mềm",
    company_photo4_desc: "Không gian làm việc mở, năng động tại văn phòng Handico Phạm Hùng.",
    company_photo5_badge: "Hạ tầng & Bảo mật",
    company_photo5_title: "Hạ tầng Cloud & Giám sát hệ thống",
    company_photo5_desc: "Đội ngũ kỹ thuật giám sát hệ thống, tối ưu độ ổn định và an toàn dữ liệu.",
    company_photo6_badge: "Văn hóa doanh nghiệp",
    company_photo6_title: "Gắn kết & Tinh thần phụng sự",
    company_photo6_desc: "Môi trường làm việc thân thiện, tôn trọng và cùng nhau tiến bộ mỗi ngày.",
    company_part_badge: "Đối tác chiến lược & Cố vấn",
    company_part_title: "Hợp tác & Tham vấn chuyên môn",
    company_part_desc: "Đồng hành cùng các đơn vị dưỡng lão tiên phong và chuyên gia Kaigo Nhật Bản để tối ưu hóa từng tính năng thực tế.",
    company_part1_tag: "Đối tác Chiến lược",
    company_part1_role: "Hệ thống Dưỡng lão Tiên phong",
    company_part1_desc: "Hệ thống viện dưỡng lão tiên phong hàng đầu tại Việt Nam, đồng hành toàn diện cùng BeeCare chuẩn hóa quy trình điều dưỡng, triển khai bệnh án điện tử EMR và nâng tầm chất lượng chăm sóc người cao tuổi trên toàn bộ các cơ sở.",
    company_part1_meta: "Đồng hành Chiến lược & Thực tiễn",
    company_part2_tag: "Cố vấn Kaigo",
    company_part2_role: "Tham vấn tiêu chuẩn chăm sóc Kaigo",
    company_part2_desc: "Đơn vị cố vấn chuyên môn điều dưỡng phục hồi chức năng và triết lý chăm sóc tận tụy theo tiêu chuẩn Kaigo hàng đầu Nhật Bản.",
    company_part2_meta: "Chuẩn mực Chăm sóc Kaigo",
    company_part3_tag: "Cố vấn Công nghệ",
    company_part3_role: "Cố vấn giải pháp Cloud & Bảo mật",
    company_part3_desc: "Kết nối chuyên gia công nghệ y tế quốc tế, chia sẻ giải pháp kiến trúc hạ tầng Cloud EMR và an toàn bảo mật dữ liệu sức khỏe người cao tuổi.",
    company_part3_meta: "Kiến trúc Cloud & Bảo mật",
    company_part4_tag: "Truyền thông Y tế",
    company_part4_role: "Truyền thông & Kết nối Cộng đồng",
    company_part4_desc: "Đối tác truyền thông số và lan tỏa kiến thức chăm sóc người cao tuổi, kết nối gia đình và cộng đồng tiếp cận các giải pháp y tế số hiện đại.",
    company_part4_meta: "Mạng lưới Truyền thông Y tế",
    company_part_banner_title: "Mạng lưới hợp tác chuyên môn & thực tiễn",
    company_part_banner_desc: "Cam kết đồng hành xây dựng hệ sinh thái công nghệ chăm sóc người cao tuổi chuẩn quốc tế tại Việt Nam",
    company_part_banner_tag1: "Đồng hành Diên Hồng",
    company_part_banner_tag2: "Chuẩn Kaigo Nhật",
    company_part_banner_tag3: "Bảo mật Cloud y tế",
    company_legal_badge: "Pháp nhân nghiên cứu & vận hành",
    company_legal_name: "Công ty TNHH HANIKI",
    company_legal_sub: "Đơn vị chủ quản phát triển hệ sinh thái y tế số BeeCare, đồng hành cùng các cơ sở dưỡng lão chuẩn hóa quy trình chăm sóc người cao tuổi tại Việt Nam.",
    company_legal_addr_label: "Trụ sở điều hành",
    company_legal_addr_val: "Tầng 30, Tòa nhà Handico Tower, Đường Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, TP. Hà Nội",
    company_legal_hotline_label: "Hotline tư vấn & Hỗ trợ",
    company_legal_email_label: "Email liên hệ chính thức",
    company_legal_hours_label: "Thời gian làm việc",
    company_legal_hours_val: "Thứ Hai – Thứ Bảy: 8:00 – 18:00 (Hệ thống Cloud & Kỹ thuật trực 24/7)",
    company_demo_badge: "Trải nghiệm thực địa",
    company_demo_box_title: "Khảo sát & Demo tại viện",
    company_demo_box_desc: "Đội ngũ chuyên viên HANIKI trực tiếp đến tận cơ sở dưỡng lão để khảo sát luồng vận hành thực tế, tư vấn lộ trình số hóa và demo hệ thống BeeCare trực tiếp.",
    company_demo_box_btn: "Đặt lịch khảo sát ngay",

    // Contact Page
    contact_hero_badge: "Kênh tư vấn & Triển khai toàn quốc",
    contact_hero_title: "Đăng ký tư vấn & trải nghiệm giải pháp BeeCare",
    contact_hero_desc: "Nhận ngay buổi demo trực quan toàn diện hệ sinh thái BeeCare và được đội ngũ chuyên gia lắng nghe, giải đáp chi tiết mọi bài toán vận hành thực tế cho cơ sở của bạn.",
    contact_trust_partner: "Đồng hành cùng Viện dưỡng lão Diên Hồng",
    contact_trust_kaigo: "Chuẩn hóa theo quy trình Kaigo Nhật Bản",
    contact_trust_speed: "Cam kết kết nối tư vấn trong 30 phút",

    contact_comm1_title: "Cam kết phản hồi",
    contact_comm1_val: "Trong vòng 30 phút",
    contact_comm1_sub: "Kể từ khi tiếp nhận đăng ký",
    contact_comm2_title: "Khảo sát & Demo",
    contact_comm2_val: "Trực tiếp tại viện",
    contact_comm2_sub: "Hoặc trực tuyến 1:1 qua Google Meet / Zoom",
    contact_comm3_title: "Bảo mật thông tin",
    contact_comm3_val: "Cam kết bảo mật 100%",
    contact_comm3_sub: "Chuẩn an toàn dữ liệu y tế & EMR",

    contact_form_badge: "Phiếu đăng ký tư vấn",
    contact_form_title: "Trải nghiệm demo trực tiếp & nhận báo giá",
    contact_form_desc: "Vui lòng để lại thông tin, đội ngũ chuyên gia BeeCare sẽ liên hệ lại ngay để hỗ trợ bạn.",
    contact_step1_label: "1. Quy mô số lượng người cao tuổi tại cơ sở của bạn:",
    contact_scale_under30_title: "Dưới 30 người cao tuổi",
    contact_scale_under30_sub: "Gói Cơ Bản (Viện gia đình)",
    contact_scale_3050_title: "Từ 30 – 50 người cao tuổi",
    contact_scale_3050_sub: "Phổ Biến Nhất (Viện tư nhân)",
    contact_scale_50100_title: "Từ 50 – 100 người cao tuổi",
    contact_scale_50100_sub: "Gói Chuyên Nghiệp (Viện trung bình)",
    contact_scale_over100_title: "Trên 100 người cao tuổi",
    contact_scale_over100_sub: "Gói Doanh Nghiệp (Chuỗi cơ sở)",

    contact_step2_label: "2. Hình thức tư vấn & trải nghiệm mong muốn:",
    contact_method_onsite: "Khảo sát & Demo tại viện",
    contact_method_online: "Demo trực tuyến qua Google Meet",
    contact_method_docs: "Nhận báo giá & tài liệu qua Email/Zalo",

    contact_step3_label: "3. Thông tin người đại diện liên hệ:",
    contact_field_name: "Họ và tên của bạn",
    contact_field_phone: "Số điện thoại liên hệ",
    contact_field_email: "Địa chỉ Email nhận báo giá",
    contact_field_facility: "Tên viện dưỡng lão / cơ sở y tế",
    contact_field_msg: "Nhu cầu tư vấn cụ thể hoặc câu hỏi của bạn",
    contact_submit_btn: "Gửi đăng ký tư vấn & trải nghiệm demo",
    contact_privacy_note: "Thông tin của bạn được cam kết bảo mật theo tiêu chuẩn dữ liệu y tế.",

    contact_corp_badge: "Pháp nhân nghiên cứu & vận hành",
    contact_corp_name: "Công ty TNHH HANIKI",
    contact_corp_sub: "Đơn vị chủ quản phát triển hệ sinh thái y tế số BeeCare",
    contact_corp_addr_label: "Trụ sở công nghệ Hà Nội",
    contact_corp_addr_val: "Tầng 30, Tòa nhà Handico Tower, Đường Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, TP. Hà Nội",
    contact_corp_hotline_label: "Đường dây nóng 24/7",
    contact_corp_email_label: "Hộp thư điện tử chính thức",
    contact_corp_hours_label: "Giờ làm việc & Kỹ thuật",
    contact_corp_hours_val: "Thứ Hai – Thứ Bảy: 8:00 – 18:00 (Hệ thống Cloud & Kỹ thuật trực 24/7/365)",
    contact_corp_btn_call: "Gọi tư vấn: 0988 123 531",
    contact_corp_btn_zalo: "Nhắn tin Zalo tư vấn",

    contact_map_title: "Vị trí trụ sở Tòa nhà Handico Tower",
    contact_map_open: "Mở trên Google Maps",

    contact_faq_badge: "Giải đáp thắc mắc",
    contact_faq_title: "Câu hỏi thường gặp trước khi triển khai BeeCare",
    contact_faq_desc: "Những thắc mắc phổ biến nhất của các nhà quản lý viện dưỡng lão và cơ sở y tế khi tìm hiểu về hệ thống.",
    contact_faq1_q: "Cơ sở của tôi ở các tỉnh xa hoặc miền Nam thì HANIKI có cử chuyên viên đến tận nơi khảo sát không?",
    contact_faq1_a: "Có. Đội ngũ chuyên gia giải pháp của HANIKI sẵn sàng đến tận cơ sở tại mọi tỉnh thành trên cả nước để khảo sát luồng vận hành thực tế và demo trực tiếp. Đối với các cơ sở muốn tìm hiểu nhanh, chúng tôi hỗ trợ demo trực tuyến 1:1 qua Google Meet ngay trong ngày.",
    contact_faq2_q: "Thời gian triển khai phần mềm và đào tạo điều dưỡng viên sử dụng mất bao lâu?",
    contact_faq2_a: "Toàn bộ quy trình chỉ mất từ 3 đến 5 ngày làm việc. Hệ thống BeeCare được thiết kế theo tư duy chạm trực quan chuẩn Kaigo, thân thiện tuyệt đối với nhân sự điều dưỡng ở mọi độ tuổi, chỉ cần 1 buổi hướng dẫn là có thể thao tác thành thạo tại giường bệnh.",
    contact_faq3_q: "Hệ thống có chạy được trên điện thoại và máy tính bảng hiện có của viện không?",
    contact_faq3_a: "Có. Cổng Web Admin hoạt động mượt mà trên mọi trình duyệt web máy tính, còn ứng dụng BeeCare Staff và BeeCare Family tương thích hoàn hảo với cả điện thoại iPhone (iOS) và Android hiện có của nhân viên và gia đình, không đòi hỏi đầu tư thiết bị chuyên dụng đắt đỏ.",
    contact_faq4_q: "Dữ liệu bệnh án EMR và thông tin người cao tuổi được bảo mật như thế nào?",
    contact_faq4_a: "BeeCare áp dụng kiến trúc Cloud bảo mật nhiều lớp chuẩn y tế, mã hóa dữ liệu đầu cuối (End-to-End Encryption), sao lưu tự động hàng ngày và phân quyền truy cập chặt chẽ giữa các vai trò (Ban giám đốc, Bác sĩ, Điều dưỡng, Gia đình). Cơ sở hoàn toàn sở hữu và kiểm soát dữ liệu của mình."
  },
  en: {
    nav_tagline: "Digital Healthcare Ecosystem",
    nav_home: "Home",
    nav_ecosystem: "Ecosystem",
    nav_eco_web: "Web Admin Portal",
    nav_eco_staff: "Nurse App",
    nav_eco_family: "Family App",
    nav_pricing: "Pricing",
    nav_company: "About Us",
    nav_news: "News",
    nav_contact: "Contact",
    nav_demo: "Book a Demo",
    hero_badge: "Instant sync: Management ── Staff ── Residents ── Families",
    hero_title: "Nursing Home Management System",
    hero_desc: "Digitize Operations – Connect Families – AI Assistant 24/7",
    hero_for_mgmt: "Residential",
    hero_for_staff: "Day Care",
    hero_for_family: "Home Care",
    hero_slogan_mgmt: "Room • Nutrition • 24/7 Medical",
    hero_slogan_staff: "Activities • Meals • Health Support",
    hero_slogan_family: "Nurse • Medication • Home Vitals",
    hero_cta_demo: "Register for Trial",
    hero_cta_sim: "Use Now",
    trust_1: "Real-time vitals tracking",
    trust_2: "100% error-free medication",
    trust_3: "24/7 AI care assistant",
    badge_vitals_title: "Normal Vitals",
    badge_vitals_desc: "BP 120/80 • Pulse 74 bpm",
    badge_payment_title: "Expense Payment",
    badge_payment_desc: "Transparent, fast & secure",
    hero_device_web: "Web Admin",
    hero_device_family: "Family App",
    hero_device_staff: "Staff App",
    eco_tab_all: "View all",
    hero_apps_summary_tag: "Seamlessly connected 3-in-1 ecosystem",
    hero_apps_summary_title: "One platform – Three specialized apps",
    hero_sum_web_badge: "Doctors & Management",
    hero_sum_web_title: "Web Admin",
    hero_sum_web_desc: "Centralized digital operations: EMR records, automated billing, and smart staff scheduling.",
    hero_sum_web_feat1: "EMR digital records & health timeline",
    hero_sum_web_feat2: "Automated billing & expense tracking",
    hero_sum_web_feat3: "Bed mapping & shift scheduling",
    hero_sum_web_action: "Explore Web Admin",
    hero_sum_staff_badge: "Bedside Caregivers",
    hero_sum_staff_title: "Staff App",
    hero_sum_staff_desc: "Fast bedside workflow: Real-time vitals recording, zero-mistake medication, and paperless handover.",
    hero_sum_staff_feat1: "Bedside tracking of 6 key vitals",
    hero_sum_staff_feat2: "Error-free medication dispensing",
    hero_sum_staff_feat3: "Meal & activity logs, digital handover",
    hero_sum_staff_action: "Explore Staff App",
    hero_sum_family_badge: "Families & Guardians",
    hero_sum_family_title: "Family App",
    hero_sum_family_desc: "Stay connected with parents anytime: Monitor health vitals, view daily moments, and pay fees in one tap.",
    hero_sum_family_feat1: "24/7 vitals chart & abnormal alerts",
    hero_sum_family_feat2: "Daily activity photos & meal diary",
    hero_sum_family_feat3: "Transparent payments & 24/7 AI assistant",
    hero_sum_family_action: "Explore Family App",
    news_hero_badge: "News & Community Highlights",
    news_hero_title: "BeeCare & HANIKI News & Activities",
    news_hero_title_html: 'Connecting community, <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">creating value</span>',
    news_hero_desc: "Discover inspiring stories, community charity initiatives, corporate culture highlights, and smart nursing home digitization guides.",
    news_cat_all: "All articles",
    news_cat_charity: "Charity & Society",
    news_cat_culture: "Corporate culture",
    news_cat_tech: "Kaigo DX & Guides",
    news_search_placeholder: "Search articles by keyword...",
    news_featured_badge: "Featured story",
    news_read_more: "Read article",
    news_read_featured: "Read featured story",
    news_empty_title: "No articles found",
    news_empty_desc: "Please try another search keyword or category filter.",
    news_modal_gallery_title: "Event photo gallery",
    news_modal_close_btn: "Close and continue",
    // Company Page (En)
    company_hero_badge: "About HANIKI • Research & Development of BeeCare",
    company_hero_title: "Digital Transformation Solutions for Nursing Homes",
    company_hero_desc: "HANIKI develops the BeeCare nursing home management platform, partnering with senior living facilities in Vietnam to standardize care workflows, digitize health records, and connect seamlessly with residents' families.",
    company_hero_cta_survey: "Schedule Consultation & On-site Survey",
    company_hero_cta_pricing: "View Pricing Plans",
    company_stat1_num: "3",
    company_stat1_title: "Integrated Platforms",
    company_stat1_desc: "Web Admin, Staff App & Family App",
    company_stat2_num: "100%",
    company_stat2_title: "Digitized Care Flow",
    company_stat2_desc: "Vitals, medication & shift management",
    company_stat3_num: "R&D",
    company_stat3_title: "Dedicated Engineering Team",
    company_stat3_desc: "Healthcare software development & QA",
    company_stat4_num: "24/7",
    company_stat4_title: "Technical Support",
    company_stat4_desc: "Dedicated partner for facility operations",
    company_vm_badge: "Vision & Mission",
    company_vm_title: "Modernizing Elderly Care Workflows in Vietnam",
    company_vm_desc: "Listening to frontline caregivers to build practical and sustainable technology solutions",
    company_vision_title: "Development Vision",
    company_vision_desc: "To become the most reliable, practical, and user-friendly nursing home software in Vietnam; empowering senior facilities to streamline daily operations, secure critical health data, and elevate the quality of elder care.",
    company_vision_item1: "Reduce manual paperwork; digitize vitals tracking charts and shift handovers",
    company_vision_item2: "Automate care scheduling reminders, early health alerts, and transparent expense tracking",
    company_mission_title: "Our Mission",
    company_mission_desc: "To relieve caregivers from administrative paperwork so they can focus on compassionate care, while providing families with real-time, transparent updates for complete peace of mind.",
    company_mission_item1: "Ensure complete transparency in daily care schedules, medication orders, and billing details",
    company_mission_item2: "Enhance caregiver productivity with intuitive bedside mobile workflows",
    company_cv_badge: "Core Values",
    company_cv_title: "Guiding Principles Shaping Every Feature",
    company_cv_desc: "Every software improvement originates from deep empathy for users and medical ethics",
    company_cv1_title: "Empathy & Compassion",
    company_cv1_desc: "Listening directly to seniors, families, and caregivers to build features that solve real daily challenges.",
    company_cv2_title: "Transparency & Accuracy",
    company_cv2_desc: "Every vital metric, medication administration, and expense item is recorded accurately and transparently.",
    company_cv3_title: "Reliability & Security",
    company_cv3_desc: "Robust cloud architecture, secure medical data protection, and dependable 24/7 system availability.",
    company_cv4_title: "Dedicated Partnership",
    company_cv4_desc: "Providing hands-on on-site training, responsive technical support, and continuous feature updates.",
    company_lead_badge: "Leadership",
    company_lead_title: "Dedicated to Modernizing Senior Healthcare",
    company_lead_desc: "Founders committed to applying modern technology to enhance elder care quality and dignity",
    company_ceo_role: "Founder & CEO • HANIKI Co., Ltd.",
    company_ceo_quote: "Elderly care requires immense patience, dedication, and precision. We created BeeCare to support frontline caregivers, lifting administrative burdens so they have more time to connect with and care for seniors.",
    company_ceo_subtext: "Every feature of BeeCare is built through direct observation of nursing workflows and direct feedback from physicians and caregivers in senior care facilities.",
    company_ceo_tag1: "Practical workflow design",
    company_ceo_tag2: "On-site deployment support",
    company_work_badge: "Workspace & Engineering Team",
    company_work_title: "Dynamic Research & Collaborative Environment",
    company_work_desc: "Authentic glimpses of R&D activities, product design sessions, and company culture at HANIKI",
    company_photo1_badge: "Engineering Team",
    company_photo1_title: "The HANIKI Team",
    company_photo1_desc: "Dedicated software engineers at our Hanoi technology office.",
    company_photo2_badge: "R&D & UX Design",
    company_photo2_title: "Technical Meeting & UX Analysis",
    company_photo2_desc: "Refining user journeys and optimizing bedside nursing operations.",
    company_photo3_badge: "System Testing",
    company_photo3_title: "Training & Feature Testing",
    company_photo3_desc: "Testing real-time data sync across Web Admin and mobile applications.",
    company_photo4_badge: "Work Environment",
    company_photo4_title: "Software Development Area",
    company_photo4_desc: "Open, modern development workspace at Handico Tower, Hanoi.",
    company_photo5_badge: "Infrastructure & Security",
    company_photo5_title: "Cloud Infrastructure & Monitoring",
    company_photo5_desc: "Engineers monitor server performance, ensuring high stability and data safety.",
    company_photo6_badge: "Corporate Culture",
    company_photo6_title: "Team Spirit & Social Purpose",
    company_photo6_desc: "A collaborative, respectful environment committed to long-term community value.",
    company_part_badge: "Strategic Partners & Advisors",
    company_part_title: "Professional Collaboration & Advisory",
    company_part_desc: "Partnering with pioneering eldercare facilities and Japanese Kaigo specialists to optimize practical features.",
    company_part1_tag: "Strategic Partner",
    company_part1_role: "Pioneering Eldercare Chain in Vietnam",
    company_part1_desc: "Vietnam's premier nursing home system, strategically partnering with BeeCare to standardize clinical workflows, implement Cloud EMR, and elevate senior care quality across all facilities.",
    company_part1_meta: "Strategic & Clinical Partnership",
    company_part2_tag: "Kaigo Advisor",
    company_part2_role: "Kaigo Care Standards Advisory",
    company_part2_desc: "Specialized advisor in rehabilitation care and dedicated Japanese Kaigo caregiving philosophy.",
    company_part2_meta: "Kaigo Care Excellence",
    company_part3_tag: "Tech Advisor",
    company_part3_role: "Cloud Architecture & Security Advisor",
    company_part3_desc: "Connecting healthcare tech experts to advise on Cloud EMR architecture and health data security for elderly care.",
    company_part3_meta: "Cloud Architecture & Security",
    company_part4_tag: "Health Media",
    company_part4_role: "Healthcare Media & Community Outreach",
    company_part4_desc: "Digital healthcare media partner spreading eldercare awareness and connecting families to smart care solutions.",
    company_part4_meta: "Healthcare Media Network",
    company_part_banner_title: "Practical & Professional Partnership Network",
    company_part_banner_desc: "Committed to co-building an international-standard elderly care ecosystem across Vietnam",
    company_part_banner_tag1: "Dien Hong Partnership",
    company_part_banner_tag2: "Japan Kaigo Standard",
    company_part_banner_tag3: "Healthcare Cloud Security",
    company_legal_badge: "R&D & Operational Entity",
    company_legal_name: "HANIKI Company Limited",
    company_legal_sub: "Managing entity developing the BeeCare digital healthcare ecosystem, partnering with nursing homes to standardize eldercare workflows.",
    company_legal_addr_label: "Headquarters",
    company_legal_addr_val: "30th Floor, Handico Tower, Pham Hung Rd, Me Tri, Nam Tu Liem, Hanoi",
    company_legal_hotline_label: "Consultation Hotline",
    company_legal_email_label: "Official Contact Email",
    company_legal_hours_label: "Working Hours",
    company_legal_hours_val: "Mon – Sat: 8:00 – 18:00 (Cloud Systems & Tech Support 24/7)",
    company_demo_badge: "On-site Experience",
    company_demo_box_title: "On-site Survey & Live Demo",
    company_demo_box_desc: "Our specialists directly visit your facility to observe frontline workflows, advise on digital transformation, and provide a live hands-on system demo.",
    company_demo_box_btn: "Schedule On-site Demo",

    // Contact Page
    contact_hero_badge: "Nationwide Consultation & Deployment",
    contact_hero_title: "Register for Consultation & Experience BeeCare",
    contact_hero_desc: "Receive an intuitive, comprehensive demo of the BeeCare ecosystem and discuss practical operational challenges for your facility directly with our specialists.",
    contact_trust_partner: "Partnered with Dien Hong Nursing Home",
    contact_trust_kaigo: "Standardized to Japanese Kaigo processes",
    contact_trust_speed: "Guaranteed 30-minute consultation response",

    contact_comm1_title: "Response Commitment",
    contact_comm1_val: "Within 30 minutes",
    contact_comm1_sub: "From receiving your registration",
    contact_comm2_title: "Survey & Live Demo",
    contact_comm2_val: "Directly at facility",
    contact_comm2_sub: "Or 1-on-1 online via Google Meet / Zoom",
    contact_comm3_title: "Data Confidentiality",
    contact_comm3_val: "100% Guaranteed Privacy",
    contact_comm3_sub: "Healthcare data & EMR security standard",

    contact_form_badge: "Consultation Request Form",
    contact_form_title: "Experience Live Demo & Get Quotation",
    contact_form_desc: "Leave your information and our specialists will contact you promptly to assist.",
    contact_step1_label: "1. Number of elderly residents at your facility:",
    contact_scale_under30_title: "Under 30 residents",
    contact_scale_under30_sub: "Basic Package (Family Care)",
    contact_scale_3050_title: "From 30 – 50 residents",
    contact_scale_3050_sub: "Most Popular (Private Facility)",
    contact_scale_50100_title: "From 50 – 100 residents",
    contact_scale_50100_sub: "Professional Package (Medium Facility)",
    contact_scale_over100_title: "Over 100 residents",
    contact_scale_over100_sub: "Enterprise Package (Facility Chains)",

    contact_step2_label: "2. Preferred consultation format:",
    contact_method_onsite: "On-site survey & Demo at facility",
    contact_method_online: "Online demo via Google Meet",
    contact_method_docs: "Receive quotation & docs via Email/Zalo",

    contact_step3_label: "3. Contact representative details:",
    contact_field_name: "Your full name",
    contact_field_phone: "Phone number",
    contact_field_email: "Email address for quotation",
    contact_field_facility: "Nursing home / facility name",
    contact_field_msg: "Specific requirements or operational questions",
    contact_submit_btn: "Submit Request for Consultation & Demo",
    contact_privacy_note: "Your information is strictly protected under healthcare data privacy standards.",

    contact_corp_badge: "R&D and Operating Entity",
    contact_corp_name: "HANIKI Company Limited",
    contact_corp_sub: "Managing entity developing the BeeCare digital healthcare ecosystem",
    contact_corp_addr_label: "Hanoi Technology Headquarters",
    contact_corp_addr_val: "30th Floor, Handico Tower, Pham Hung Rd, Me Tri, Nam Tu Liem, Hanoi",
    contact_corp_hotline_label: "24/7 Hotline",
    contact_corp_email_label: "Official Corporate Email",
    contact_corp_hours_label: "Working & Technical Hours",
    contact_corp_hours_val: "Mon – Sat: 8:00 – 18:00 (Cloud Systems & Tech Support 24/7/365)",
    contact_corp_btn_call: "Call hotline: 0988 123 531",
    contact_corp_btn_zalo: "Message via Zalo",

    contact_map_title: "Headquarters location - Handico Tower",
    contact_map_open: "Open on Google Maps",

    contact_faq_badge: "Frequently Asked Questions",
    contact_faq_title: "Common Questions Before Implementing BeeCare",
    contact_faq_desc: "The most common questions asked by nursing home managers and medical directors evaluating BeeCare.",
    contact_faq1_q: "If our facility is located in distant provinces or southern regions, will HANIKI provide on-site visits?",
    contact_faq1_a: "Yes. HANIKI solution specialists are ready to visit facilities across Vietnam to assess real workflows and deliver live demos. For faster evaluation, we also provide 1-on-1 online demos via Google Meet on the same day.",
    contact_faq2_q: "How long does system deployment and caregiver training take?",
    contact_faq2_a: "The entire process takes only 3 to 5 business days. BeeCare is designed with intuitive touch workflows inspired by Kaigo standards, friendly to caregivers of all age groups, requiring only a single training session to master bedside tasks.",
    contact_faq3_q: "Can the software run on our existing smartphones and tablets?",
    contact_faq3_a: "Yes. The Web Admin Portal runs smoothly on any modern desktop browser, while BeeCare Staff and BeeCare Family apps are fully compatible with existing iOS and Android devices without requiring expensive dedicated hardware.",
    contact_faq4_q: "How are EMR medical records and resident data secured?",
    contact_faq4_a: "BeeCare utilizes multi-layered medical-grade cloud security, end-to-end encryption, automated daily backups, and strict role-based access control (Directors, Doctors, Caregivers, Families). Facilities retain 100% data ownership and control."
  },
  ja: {
    nav_tagline: "デジタルヘルスケアエコシステム",
    nav_home: "ホーム",
    nav_ecosystem: "エコシステム",
    nav_eco_web: "Web管理ポータル",
    nav_eco_staff: "介護職員アプリ",
    nav_eco_family: "ご家族アプリ",
    nav_pricing: "料金プラン",
    nav_company: "私たちについて",
    nav_news: "ニュース",
    nav_contact: "お問い合わせ",
    nav_demo: "デモを予約",
    hero_badge: "即時連携：管理者 ── 職員 ── 入居者 ── ご家族",
    hero_title: "介護施設管理システム",
    hero_desc: "業務をデジタル化 – 家族とつながる – AIアシスタント24/7",
    hero_for_mgmt: "入所ケア",
    hero_for_staff: "デイケア",
    hero_for_family: "在宅ケア",
    hero_slogan_mgmt: "居室 • 栄養 • 24時間医療",
    hero_slogan_staff: "活動 • 食事 • 医療サポート",
    hero_slogan_family: "介護士 • 服薬 • 在宅バイタル",
    hero_cta_demo: "無料体験を申し込む",
    hero_cta_sim: "今すぐ利用開始",
    trust_1: "リアルタイムバイタル管理",
    trust_2: "服薬ミス防止100%",
    trust_3: "24時間AI見守り相談",
    badge_vitals_title: "バイタル正常",
    badge_vitals_desc: "血圧 120/80 • 心拍 74 bpm",
    badge_payment_title: "費用の簡単決済",
    badge_payment_desc: "透明・迅速・安心安全",
    hero_device_web: "Web管理",
    hero_device_family: "ご家族アプリ",
    hero_device_staff: "職員アプリ",
    eco_tab_all: "すべて表示",
    hero_apps_summary_tag: "シームレスに連携する3つのソリューション",
    hero_apps_summary_title: "1つの統合プラットフォーム – 3つの専門アプリ",
    hero_sum_web_badge: "医師・施設管理者",
    hero_sum_web_title: "Web管理",
    hero_sum_web_desc: "施設の統合デジタル管理：電子カルテ(EMR)、利用料の自動計算、スタッフの最適配置。",
    hero_sum_web_feat1: "電子カルテ(EMR)・健康タイムライン",
    hero_sum_web_feat2: "利用料自動計算・明細一括管理",
    hero_sum_web_feat3: "居室ベッドマップ・シフト調整",
    hero_sum_web_action: "Web管理を見る",
    hero_sum_staff_badge: "介護士・看護スタッフ",
    hero_sum_staff_title: "職員アプリ",
    hero_sum_staff_desc: "ベッドサイド業務の効率化：バイタル即時記録、誤薬ゼロの服薬管理、ペーパーレス引継ぎ。",
    hero_sum_staff_feat1: "ベッドサイドでの6大バイタル測定",
    hero_sum_staff_feat2: "医師指示に基づく確実な服薬管理",
    hero_sum_staff_feat3: "食事・生活記録＆電子申し送り",
    hero_sum_staff_action: "職員アプリを見る",
    hero_sum_family_badge: "ご家族・身元引受人",
    hero_sum_family_title: "ご家族アプリ",
    hero_sum_family_desc: "離れていてもご両親とつながる：バイタル遠隔見守り、日々の写真確認、ワンタップ費用決済。",
    hero_sum_family_feat1: "24時間バイタル推移＆異常検知アラート",
    hero_sum_family_feat2: "日々の様子・食事写真タイムライン",
    hero_sum_family_feat3: "利用料オンライン決済＆24時間AI相談",
    hero_sum_family_action: "ご家族アプリを見る",
    news_hero_badge: "ニュース＆社会貢献活動",
    news_hero_title: "BeeCare・HANIKI ニュース＆活動",
    news_hero_title_html: 'コミュニティをつなぎ、<span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">価値を創造する</span>',
    news_hero_desc: "社会貢献・チャリティー活動、企業文化、そしてスマート介護施設DXの最新ガイドをお届けします。",
    news_cat_all: "すべての記事",
    news_cat_charity: "社会貢献・福祉",
    news_cat_culture: "企業文化・研修",
    news_cat_tech: "介護DX＆知見",
    news_search_placeholder: "キーワードで記事を検索...",
    news_featured_badge: "注目記事",
    news_read_more: "続きを読む",
    news_read_featured: "注目記事を読む",
    news_empty_title: "該当する記事が見つかりません",
    news_empty_desc: "別のキーワードやカテゴリーを選択してお試しください。",
    news_modal_gallery_title: "活動写真ギャラリー",
    news_modal_close_btn: "閉じて戻る",
    // Company Page (Ja)
    company_hero_badge: "HANIKIについて • 介護DXシステムBeeCareの研究開発",
    company_hero_title: "介護施設向けデジタルトランスフォーメーションソリューション",
    company_hero_desc: "HANIKIは介護施設管理システムBeeCareの研究開発に注力し、ベトナムの高齢者介護施設と連携して、介護ワークフローの標準化、電子記録のデジタル化、ご家族との円滑な情報連携を支援しています。",
    company_hero_cta_survey: "無料相談・現地デモを予約",
    company_hero_cta_pricing: "料金プランを見る",
    company_stat1_num: "3",
    company_stat1_title: "統合プラットフォーム",
    company_stat1_desc: "Web管理、職員アプリ、ご家族アプリ",
    company_stat2_num: "100%",
    company_stat2_title: "デジタル介護フロー",
    company_stat2_desc: "バイタル、服薬管理、シフト調整",
    company_stat3_num: "R&D",
    company_stat3_title: "ハノイ常駐の開発チーム",
    company_stat3_desc: "ヘルスケア専門のソフトウェア開発",
    company_stat4_num: "24/7",
    company_stat4_title: "技術サポート",
    company_stat4_desc: "施設運営に寄り添う万全のサポート",
    company_vm_badge: "ビジョン＆ミッション",
    company_vm_title: "高齢者ケアプロセスの近代化に向けて",
    company_vm_desc: "介護現場の声に耳を傾け、実践的で持続可能なテクノロジーを創造します",
    company_vision_title: "開発ビジョン",
    company_vision_desc: "ベトナムにおいて最も信頼され、実用的で使いやすい介護施設管理ソフトウェアを目指します。各施設の運営効率化、正確なデータ管理、そして高齢者ケアの質向上を支援します。",
    company_vision_item1: "手書き記録を削減し、バイタル推移グラフや申し送り業務をペーパーレス化",
    company_vision_item2: "ケアスケジュールの自動通知、異常の早期検知、明細の透明な一括管理",
    company_mission_title: "私たちの使命",
    company_mission_desc: "事務作業や記録の負担を軽減し、介護スタッフが入居者様に寄り添う時間を創出します。同時にご家族へリアルタイムで透明な情報を提供し、安心をお届けします。",
    company_mission_item1: "生活スケジュール、医師の服薬指示、利用料明細の完全な透明化",
    company_mission_item2: "ベッドサイドでの直感的なモバイル操作により業務効率を向上",
    company_cv_badge: "基本理念",
    company_cv_title: "すべての製品開発の根底にある4つの原則",
    company_cv_desc: "現場への深い共感と医療・介護の倫理に基づき、細部まで磨き上げられています",
    company_cv1_title: "共感と温もり",
    company_cv1_desc: "高齢者、ご家族、介護士の実際の声に耳を傾け、本当に役立つ機能を丁寧に作ります。",
    company_cv2_title: "透明性と正確性",
    company_cv2_desc: "すべてのバイタル数値、投薬記録、費用明細は改ざんなく正確かつリアルタイムに記録されます。",
    company_cv3_title: "安定性とセキュリティ",
    company_cv3_desc: "強固なクラウド基盤により個人・医療情報を安全に保護し、24時間365日の安定稼働を維持します。",
    company_cv4_title: "真摯な伴走支援",
    company_cv4_desc: "導入時の現地トレーニングや丁寧なマニュアル提供、運用後の迅速なサポートを徹底します。",
    company_lead_badge: "経営陣",
    company_lead_title: "高齢者ヘルスケアの革新に情熱を注ぐ",
    company_lead_desc: "テクノロジーの力で高齢者の尊厳ある生活と質の高いケアの実現を目指しています",
    company_ceo_role: "創業者兼CEO • HANIKI 有限会社",
    company_ceo_quote: "高齢者ケアは、深い忍耐と献身、そして確かな正確性が求められる崇高な仕事です。BeeCareはスタッフの記録負担を軽減し、入居者様と笑顔で向き合える時間を増やすために開発されました。",
    company_ceo_subtext: "BeeCareのすべての機能は、実際の介護現場での綿密なヒアリングと、医師・介護スタッフの貴重なフィードバックを基に設計されています。",
    company_ceo_tag1: "現場に即した実用的な設計",
    company_ceo_tag2: "現地での導入・伴走サポート",
    company_work_badge: "オフィス環境と開発チーム",
    company_work_title: "活気ある研究開発と協力的なチーム環境",
    company_work_desc: "HANIKIにおける研究開発、製品設計セッション、企業文化の実際の様子をご紹介します",
    company_photo1_badge: "開発チーム",
    company_photo1_title: "HANIKIスタッフ一同",
    company_photo1_desc: "ハノイ本社に集う情熱的なエンジニアチーム。",
    company_photo2_badge: "研究開発とUI/UX設計",
    company_photo2_title: "技術ミーティング・機能設計",
    company_photo2_desc: "ユーザー体験の向上とベッドサイド業務の最適化を議論。",
    company_photo3_badge: "システム検証",
    company_photo3_title: "トレーニング・機能テスト",
    company_photo3_desc: "Web管理画面とモバイルアプリ間のデータ即時連携を検証。",
    company_photo4_badge: "執務スペース",
    company_photo4_title: "ソフトウェア開発フロア",
    company_photo4_desc: "ハノイ・ハンディコタワー内の開放的で近代的なオフィス。",
    company_photo5_badge: "インフラとセキュリティ",
    company_photo5_title: "クラウド基盤・常時監視",
    company_photo5_desc: "システムの安定性とデータ保護を徹底するためエンジニアが監視。",
    company_photo6_badge: "企業文化",
    company_photo6_title: "チームワークと奉仕の精神",
    company_photo6_desc: "お互いを尊重し、社会への貢献を目指して日々成長する企業風土。",
    company_part_badge: "戦略的パートナー・顧問機関",
    company_part_title: "専門的な提携およびアドバイザリー",
    company_part_desc: "先駆的な介護施設および日本の介護専門家と連携し、現場の実践的なニーズに応える機能を磨き上げています。",
    company_part1_tag: "戦略的パートナー",
    company_part1_role: "先駆的介護施設グループ",
    company_part1_desc: "ベトナムを代表する先駆的介護施設グループ。BeeCareと包括的に提携し、介護ワークフローの標準化、電子カルテ(EMR)の現場導入、そして全施設における高齢者ケア品質の向上を推進。",
    company_part1_meta: "戦略的・現場実践パートナーシップ",
    company_part2_tag: "Kaigo基準顧問",
    company_part2_role: "日本式介護（Kaigo）基準アドバイザー",
    company_part2_desc: "日本の高品質なKaigo（介護）理念と自立支援・リハビリケアの基準をシステムへ反映する専門アドバイザー。",
    company_part2_meta: "Kaigoケアスタンダード",
    company_part3_tag: "技術顧問",
    company_part3_role: "クラウド＆セキュリティ技術顧問",
    company_part3_desc: "医療・高齢者支援クラウド基盤、EMRデータセキュリティ、IoT連携に関する国際的な技術助言を提供。",
    company_part3_meta: "クラウド基盤・データ安全",
    company_part4_tag: "医療メディア",
    company_part4_role: "ヘルスケアメディア・コミュニティ連携",
    company_part4_desc: "デジタルヘルスケアの知見発信と高齢者ケアコミュニティへの啓発活動を担うメディアパートナー。",
    company_part4_meta: "ヘルスケア情報ネットワーク",
    company_part_banner_title: "実践的かつ専門的なアライアンスネットワーク",
    company_part_banner_desc: "ベトナムの高齢者介護プロセスの標準化と持続的発展に貢献します",
    company_part_banner_tag1: "ディエンホン実践連携",
    company_part_banner_tag2: "日本Kaigo基準",
    company_part_banner_tag3: "医療クラウドセキュリティ",
    company_legal_badge: "研究開発・運営法人",
    company_legal_name: "HANIKI 有限会社",
    company_legal_sub: "介護DXエコシステムBeeCareの研究開発および運営元。高齢者介護施設の業務標準化に伴走支援を提供。",
    company_legal_addr_label: "本社所在地",
    company_legal_addr_val: "ハノイ市ナムトゥーリエム区メーチー、ファムフン通り、ハンディコタワー30階",
    company_legal_hotline_label: "お問い合わせ窓口",
    company_legal_email_label: "公式メール",
    company_legal_hours_label: "受付時間",
    company_legal_hours_val: "月曜〜土曜: 8:00〜18:00（クラウド監視・技術サポート 24時間365日）",
    company_demo_badge: "現地実機体験",
    company_demo_box_title: "現地での無料相談・デモ体験",
    company_demo_box_desc: "専門スタッフが施設へ直接伺い、現在の運用課題のヒアリングと実機デモを無料で実施します。",
    company_demo_box_btn: "現地デモを申し込む",

    // Contact Page
    contact_hero_badge: "全国導入相談・サポート窓口",
    contact_hero_title: "BeeCare導入相談・無料デモ体験のお申し込み",
    contact_hero_desc: "BeeCareエコシステムの実機デモ体験、および専門スタッフによる施設ごとの運用課題に合わせた最適なデジタル化ソリューションをご案内いたします。",
    contact_trust_partner: "ディエンホン介護施設と戦略的提携",
    contact_trust_kaigo: "日本式Kaigo（介護）基準に基づく業務標準化",
    contact_trust_speed: "30分以内の迅速な一次対応をお約束",

    contact_comm1_title: "迅速対応コミット",
    contact_comm1_val: "30分以内にご連絡",
    contact_comm1_sub: "受付完了後、専任担当より迅速に回答",
    contact_comm2_title: "現地調査・実機デモ",
    contact_comm2_val: "施設への現地訪問デモ",
    contact_comm2_sub: "またはGoogle Meet / Zoomによるオンライン1:1デモ",
    contact_comm3_title: "情報セキュリティ",
    contact_comm3_val: "100%厳格な情報保護",
    contact_comm3_sub: "医療データ・電子カルテ保護基準準拠",

    contact_form_badge: "無料相談・デモお申し込み",
    contact_form_title: "実機デモ体験・お見積もりのご依頼",
    contact_form_desc: "必要事項をご入力ください。担当スペシャリストより速やかにご連絡差し上げます。",
    contact_step1_label: "1. 貴施設の入居者数・ベッド規模:",
    contact_scale_under30_title: "30名未満",
    contact_scale_under30_sub: "基本プラン（小規模・家庭的施設）",
    contact_scale_3050_title: "30名〜50名",
    contact_scale_3050_sub: "最も人気のプラン（民間介護施設）",
    contact_scale_50100_title: "50名〜100名",
    contact_scale_50100_sub: "プロフェッショナルプラン（中規模施設）",
    contact_scale_over100_title: "100名以上",
    contact_scale_over100_sub: "エンタープライズプラン（複合・チェーン施設）",

    contact_step2_label: "2. ご希望の相談・デモ形式:",
    contact_method_onsite: "施設への現地訪問・実機デモ",
    contact_method_online: "オンラインデモ（Google Meet）",
    contact_method_docs: "資料・お見積もり送付（メール/Zalo）",

    contact_step3_label: "3. ご担当者様情報:",
    contact_field_name: "お名前",
    contact_field_phone: "ご連絡先電話番号",
    contact_field_email: "お見積もり送付先メールアドレス",
    contact_field_facility: "施設名・運営法人名",
    contact_field_msg: "ご相談内容・現場の課題など",
    contact_submit_btn: "導入相談・無料デモを申し込む",
    contact_privacy_note: "ご入力いただいた情報は医療セキュリティ基準に基づき厳格に保護されます。",

    contact_corp_badge: "研究開発・運営法人",
    contact_corp_name: "HANIKI 有限会社",
    contact_corp_sub: "介護DXエコシステムBeeCareの研究開発および運営元",
    contact_corp_addr_label: "ハノイ本社・テクノロジー拠点",
    contact_corp_addr_val: "ハノイ市ナムトゥーリエム区メーチー、ファムフン通り、ハンディコタワー30階",
    contact_corp_hotline_label: "24時間対応ホットライン",
    contact_corp_email_label: "公式お問い合わせメール",
    contact_corp_hours_label: "営業時間・サポート体制",
    contact_corp_hours_val: "月曜〜土曜: 8:00〜18:00（クラウド基盤監視・技術サポート 24時間365日）",
    contact_corp_btn_call: "電話で相談: 0988 123 531",
    contact_corp_btn_zalo: "Zaloで相談する",

    contact_map_title: "本社所在地（ハンディコタワー）",
    contact_map_open: "Googleマップで開く",

    contact_faq_badge: "よくあるご質問",
    contact_faq_title: "BeeCare導入前によくいただくご質問",
    contact_faq_desc: "介護施設の管理者・施設長様からよくいただく疑問点にお答えします。",
    contact_faq1_q: "地方や遠方の施設でも、スタッフが現地まで訪問して調査やデモを行ってもらえますか？",
    contact_faq1_a: "はい。ベトナム全土の施設へ専門スタッフが直接訪問し、実際の現場運用を確認した上で実機デモを実施します。迅速な検討をご希望の場合は、当日のオンライン1:1デモ（Google Meet）も承っております。",
    contact_faq2_q: "システムの導入から職員の研修完了まで、どれくらいの期間がかかりますか？",
    contact_faq2_a: "最短3〜5営業日で本稼働が可能です。日本式Kaigoの直感的なタッチUIを採用しており、あらゆる年齢層の介護スタッフが1回の説明でベッドサイドでの記録・操作を習得できます。",
    contact_faq3_q: "施設で現在使用しているスマートフォンやタブレットをそのまま使えますか？",
    contact_faq3_a: "はい。管理者用Webポータルは通常のPCブラウザで動作し、職員用アプリ（Staff）およびご家族用アプリ（Family）は既存のiPhone（iOS）やAndroid端末にそのままインストールしてご利用いただけます。",
    contact_faq4_q: "入居者様の電子カルテ（EMR）や健康データはどのように安全管理されますか？",
    contact_faq4_a: "医療グレードのマルチレイヤークラウドセキュリティを採用し、データ暗号化（E2EE）、日次自動バックアップ、厳格な権限分離を実施しています。データ所有権は100%施設側に帰属します。"
  }
};

let currentLang = localStorage.getItem('beecare_lang') || 'vi';

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('beecare_lang', lang);
  document.documentElement.lang = lang;

  // Update button active state + sliding indicator
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Move sliding indicator to active button
  updateLangIndicator();

  // Update text with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  // Update HTML with data-i18n-html
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (TRANSLATIONS[lang][key]) {
      el.innerHTML = TRANSLATIONS[lang][key];
    }
  });

  // Update placeholders with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (TRANSLATIONS[lang][key]) {
      el.placeholder = TRANSLATIONS[lang][key];
    }
  });

  // Update page title
  const titles = {
    vi: 'BeeCare – Quản lý viện dưỡng lão thông minh',
    en: 'BeeCare – Smart Nursing Home Management',
    ja: 'BeeCare – 介護施設管理システム'
  };
  if (titles[lang]) document.title = titles[lang];

  // Notify page-specific hooks (e.g., news article rerender)
  if (typeof window.onLanguageChanged === 'function') {
    window.onLanguageChanged(lang);
  }
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* ---- Sliding indicator for lang switcher ---- */
function updateLangIndicator() {
  document.querySelectorAll('.nav-lang-switcher').forEach(switcher => {
    const activeBtn = switcher.querySelector('.nav-lang-btn.active');
    if (!activeBtn) return;
    const padding = 3; // matches CSS padding
    const x = activeBtn.offsetLeft - padding;
    const w = activeBtn.offsetWidth;
    switcher.style.setProperty('--lang-indicator-x', x + 'px');
    switcher.style.setProperty('--lang-indicator-w', w + 'px');
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  // Ensure indicator positioned after layout
  requestAnimationFrame(() => updateLangIndicator());
});

window.addEventListener('resize', () => updateLangIndicator());
