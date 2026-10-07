// Init AOS Animation
try { if (typeof AOS !== 'undefined') AOS.init({ duration: 900, once: true, easing: 'ease-in-out', offset: 60 }); } catch(e) {}

// Init Lucide Icons
try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e) {}

// ---- PRELOADER ----
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
  }
}
window.addEventListener('load', () => setTimeout(hidePreloader, 800));
// Fallback in case load event already fired or takes too long
setTimeout(hidePreloader, 2000);


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
        p.style.opacity = '1';
        p.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
      }
    });
  } else {
    if (ecoSection) ecoSection.classList.remove('ecosystem-mode-all');
    Object.entries(panels).forEach(([key, panel]) => {
      if (!panel) return;
      if (key === tabKey) {
        panel.classList.remove('hidden');
        panel.style.display = 'block';
        panel.style.opacity = '1';
        panel.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
      } else {
        panel.classList.add('hidden');
        panel.style.display = 'none';
      }
    });
  }

  // Update 3D carousel positions and cards instantly after panel display change
  if (tabKey === 'staff' || tabKey === 'all') {
    if (window.staffCarousel) {
      window.staffCarousel.updatePositions();
      window.staffCarousel.updateContentCard();
    }
  }
  if (tabKey === 'family' || tabKey === 'all') {
    if (window.familyCarousel) {
      window.familyCarousel.updatePositions();
      window.familyCarousel.updateContentCard();
    }
  }

  // Refresh AOS so viewport changes are tracked
  if (typeof AOS !== 'undefined') {
    try { AOS.refresh(); } catch (e) {}
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
  if (!toast) return;
  if (toastMsg) toastMsg.textContent = msg;

  // Add active classes for both new top-center CSS and legacy tailwind styles
  toast.classList.add('show', 'toast-active');
  toast.classList.remove('translate-x-full', 'opacity-0');
  toast.classList.add('translate-x-0', 'opacity-100');
  
  if (window.toastTimer) clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show', 'toast-active', 'translate-x-0', 'opacity-100');
    toast.classList.add('translate-x-full', 'opacity-0');
  }, 4500);

  if (typeof lucide !== 'undefined') lucide.createIcons();
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
      { time: "11:32:05.910", badge: "WEB_MANAGEMENT", color: "text-teal-400 bg-teal-950/80 border border-teal-700/60", text: "Dr. Trần Văn Nam xác nhận -> Duyệt y lệnh Amlodipine 5mg uống ngay" },
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
      { time: "08:00:10.000", badge: "WEB_MANAGEMENT", color: "text-teal-400 bg-teal-950/80 border border-teal-700/60", text: "Bác sĩ duyệt đơn thuốc tuần cho 45 cụ tầng 2" },
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
      { time: "11:45:22.400", badge: "WEB_MANAGEMENT", color: "text-teal-400 bg-teal-950/80 border border-teal-700/60", text: "Bảng quản lý hoạt động & dinh dưỡng viện tự động cập nhật số liệu" }
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
      desc: "Webhook ngân hàng báo về Web quản lý, khoản nợ được gạch tự động trong 3 giây. Hóa đơn điện tử gửi về email và lưu vào sổ quỹ.",
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
      { time: "09:15:01.200", badge: "WEB_MANAGEMENT", color: "text-teal-400 bg-teal-950/80 border border-teal-700/60", text: "Dịch vụ tự động cộng vào bảng kê chi phí tháng của cụ Hướng" },
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
  if (!imgA || !imgB || !slide) return;

  // Determine current front and back images safely
  let frontImg = imgA.classList.contains('is-front') ? imgA : (imgB.classList.contains('is-front') ? imgB : imgA);
  let backImg = (frontImg === imgA) ? imgB : imgA;

  // Ensure frontImg is strictly visible
  frontImg.classList.add('is-front');
  frontImg.classList.remove('is-back');

  // Preload and verify image
  const preImg = new Image();
  preImg.src = slide.src;

  const performSafeSwap = () => {
    // 1. Prepare backImg with new source
    backImg.src = slide.src;
    backImg.alt = slide.caption;

    // 2. Perform clean crossfade: backImg comes to front, frontImg goes to back
    backImg.classList.remove('is-back');
    backImg.classList.add('is-front');

    frontImg.classList.remove('is-front');
    frontImg.classList.add('is-back');

    // 3. Update Lightbox click handler
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
  };

  if (preImg.complete && preImg.naturalWidth > 0) {
    performSafeSwap();
  } else {
    preImg.onload = () => {
      performSafeSwap();
    };
    preImg.onerror = () => {
      // On error, keep current frontImg untouched! Never show a blank screen!
      console.warn('Hero device image failed to load:', slide.src);
    };
  }
}

// Asynchronous staggered rotation: Alternating between the 2 flanking phones
function tickHeroDevices() {
  const turn = heroTickStep % 2;
  if (turn === 0) {
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

// Ticker interval: 3200ms per staggered step (only if hero 3D devices exist)
const hasHeroDevices = document.getElementById('family-hero-box') || document.getElementById('staff-hero-box');
let heroRotationTimer = null;
if (hasHeroDevices) {
  heroRotationTimer = setInterval(tickHeroDevices, 3200);
}

// Pause rotation when tab is hidden to avoid race conditions/desync in background
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (heroRotationTimer) {
      clearInterval(heroRotationTimer);
      heroRotationTimer = null;
    }
  } else if (hasHeroDevices) {
    const v = document.getElementById('hero-beecare-video');
    if (!v || v.paused) {
      if (!heroRotationTimer) {
        heroRotationTimer = setInterval(tickHeroDevices, 3200);
      }
    }
  }
});

const heroStageEl = document.querySelector('.stage-3d');
if (heroStageEl && hasHeroDevices) {
  heroStageEl.addEventListener('mouseenter', () => {
    if (heroRotationTimer) clearInterval(heroRotationTimer);
  });
  heroStageEl.addEventListener('mouseleave', () => {
    const v = document.getElementById('hero-beecare-video');
    if (!v || v.paused) {
      clearInterval(heroRotationTimer);
      heroRotationTimer = setInterval(tickHeroDevices, 3200);
    }
  });
}

// ==================== HERO CENTERED VIDEO PLAYER IN 3D COMPUTER MOCKUP ====================
function initHeroVideo() {
  const video = document.getElementById('hero-beecare-video');
  const playBtn = document.getElementById('hero-video-play-btn');
  const laptop3d = document.getElementById('hero-laptop-3d');
  const stage3d = document.querySelector('.stage-3d');
  if (!video) return;

  const togglePlay = () => {
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  if (playBtn) {
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
  }

  // Clicking video viewport toggles play
  video.addEventListener('click', () => {
    if (!video.controls) {
      togglePlay();
    }
  });

  video.addEventListener('play', () => {
    video.controls = true;
    if (playBtn) playBtn.classList.add('is-playing');
    if (laptop3d) laptop3d.classList.add('video-playing');
    if (stage3d) stage3d.classList.add('video-playing');
    if (heroRotationTimer) clearInterval(heroRotationTimer);
  });

  video.addEventListener('pause', () => {
    if (playBtn) playBtn.classList.remove('is-playing');
    if (laptop3d) laptop3d.classList.remove('video-playing');
    if (stage3d) stage3d.classList.remove('video-playing');
    if (hasHeroDevices) {
      clearInterval(heroRotationTimer);
      heroRotationTimer = setInterval(tickHeroDevices, 3200);
    }
  });

  video.addEventListener('ended', () => {
    if (playBtn) playBtn.classList.remove('is-playing');
    if (laptop3d) laptop3d.classList.remove('video-playing');
    if (stage3d) stage3d.classList.remove('video-playing');
    if (hasHeroDevices) {
      clearInterval(heroRotationTimer);
      heroRotationTimer = setInterval(tickHeroDevices, 3200);
    }
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
        desc: "Nhập nhanh huyết áp, mạch, SpO2, nhiệt độ và tự động cảnh báo đỏ khi phát hiện bất thường.",
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
        pill: "4. Nhắc uống thuốc",
        chip: "Nhắc uống thuốc đúng giờ",
        title: "4. Nhắc và kiểm soát uống thuốc đúng giờ",
        desc: "Tự động nhắc cữ sáng, trưa, chiều, tối kèm hình ảnh viên thuốc trực quan. Điều dưỡng kiểm tra và tích nhận tại giường, đảm bảo không quên cữ và không nhầm thuốc.",
        highlights: ["Nhắc cữ sáng - trưa - tối", "Hình ảnh viên thuốc thực tế", "Xác nhận uống tại giường"],
        src: "assets/screenshots/staff-meds.png",
        caption: "Nhắc và kiểm soát uống thuốc đúng giờ – BeeCare Staff"
      },
      {
        index: 4,
        pill: "5. Suất ăn & Nước",
        chip: "Dinh dưỡng & Bữa ăn",
        title: "5. Ghi nhận khẩu phần & Dinh dưỡng",
        desc: "Theo dõi chi tiết mức độ ăn từng bữa và lượng nước mỗi ngày. Dữ liệu tự động đồng bộ lên ứng dụng giúp người thân luôn yên tâm về chế độ ăn uống của cha mẹ.",
        highlights: ["Theo dõi khẩu phần từng bữa", "Lượng nước uống mỗi ngày", "Tự động gửi đến người thân"],
        src: "assets/screenshots/staff-meal.png",
        caption: "Ghi nhận khẩu phần & dinh dưỡng thực tế – BeeCare Staff"
      },
      {
        index: 5,
        pill: "6. Bàn giao ca",
        chip: "Bàn giao ca điện tử",
        title: "6. Bàn giao ca trực điện tử",
        desc: "Tổng hợp nhanh toàn bộ dặn dò y tế và công việc cần tiếp quản cho ca tiếp theo.",
        highlights: ["Tổng hợp dặn dò y tế", "Tiếp quản công việc ca sau", "Ký duyệt điện tử tức thì"],
        src: "assets/screenshots/staff-handover.png",
        caption: "Bàn giao ca trực điện tử – BeeCare Staff"
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
        pill: "4. Medication Reminders",
        chip: "On-Time Medication",
        title: "4. On-Time Medication Reminders & Control",
        desc: "Automated morning, noon, evening, and night round alerts with visual pill reference photos. Caregivers verify and check off at the bedside, ensuring zero missed doses and no mix-ups.",
        highlights: ["Scheduled round alerts", "Visual pill photo catalog", "Bedside check-off logs"],
        src: "assets/screenshots/staff-meds.png",
        caption: "On-Time Medication Reminders & Control – BeeCare Staff"
      },
      {
        index: 4,
        pill: "5. Nutrition & Meals",
        chip: "Nutrition & Meals",
        title: "5. Meal Portions & Nutrition Tracking",
        desc: "Detailed tracking of meal consumption and daily fluid intake. Data syncs automatically to the app, giving families complete peace of mind about their parents' nutrition.",
        highlights: ["Per-meal consumption tracking", "Daily fluid intake monitoring", "Automatic family sync"],
        src: "assets/screenshots/staff-meal.png",
        caption: "Meal Portions & Nutrition Tracking – BeeCare Staff"
      },
      {
        index: 5,
        pill: "6. Shift Handover",
        chip: "Digital Handover",
        title: "6. Digital Shift Handover",
        desc: "Quickly compiles all medical instructions and handover tasks for the incoming shift.",
        highlights: ["All-in-one medical notes", "Incoming shift task takeover", "Instant digital signature"],
        src: "assets/screenshots/staff-handover.png",
        caption: "Digital Shift Handover – BeeCare Staff"
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
        desc: "血圧、脈拍、SpO2、体温を30秒以内で入力。異常値を検知すると自動で赤色アラートを通知します。",
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
        pill: "4. 服薬リマインダー",
        chip: "定時服薬管理",
        title: "4. 定時服薬リマインダーと安全管理",
        desc: "朝・昼・夕・就寝前の配薬を実物写真とともに自動通知。介護士がベッドサイドで照合・確認し、飲み忘れや誤薬を確実に防ぎます。",
        highlights: ["各時間帯の定時リマインダー", "錠剤の実物写真照合", "ベッドサイド完了チェック"],
        src: "assets/screenshots/staff-meds.png",
        caption: "定時服薬リマインダーと安全管理 – BeeCare Staff"
      },
      {
        index: 4,
        pill: "5. 食事・水分記録",
        chip: "栄養と食事",
        title: "5. 食事摂取量と栄養記録",
        desc: "毎食の食事摂取量と毎日の水分量を詳細に記録。データはアプリに自動同期され、ご家族もご両親の栄養管理を安心して把握できます。",
        highlights: ["毎食の摂取量トラッキング", "日々の水分摂取量管理", "ご家族アプリへ自動共有"],
        src: "assets/screenshots/staff-meal.png",
        caption: "食事摂取量と栄養記録 – BeeCare Staff"
      },
      {
        index: 5,
        pill: "6. 電子申し送り",
        chip: "電子申し送り",
        title: "6. 電子シフト申し送り",
        desc: "次のシフトへ引き継ぐべき医療指示や担当業務の全記録を迅速に自動集約。",
        highlights: ["医療指示の自動集約", "次シフトへの確実な引き継ぎ", "デジタル署名で即時完了"],
        src: "assets/screenshots/staff-handover.png",
        caption: "電子シフト申し送り – BeeCare Staff"
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
        desc: "Minh bạch viện phí từng ngày, thanh toán 1-chạm tiện lợi qua mã QR. Không cần phải đến tận viện để đóng phí hàng tháng.",
        highlights: ["Sao kê viện phí từng ngày", "Thanh toán VietQR 1 chạm", "Tự động cập nhật hóa đơn"],
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
        desc: "Itemized daily fee transparency with convenient 1-touch VietQR payment, eliminating the need to pay in-person.",
        highlights: ["Itemized daily breakdown", "1-touch VietQR payment", "Instant payment confirmation"],
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
        desc: "毎日のケア費用明細を透明に確認でき、VietQR決済コードで施設へ来所することなく1タップで支払えます。",
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
window.TRANSLATIONS = window.TRANSLATIONS || { vi: {}, en: {}, ja: {} };

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


  // Update alt attributes
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt');
    if (TRANSLATIONS[lang][key]) {
      el.alt = TRANSLATIONS[lang][key];
    }
  });

  // Update title attributes
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (TRANSLATIONS[lang][key]) {
      el.title = TRANSLATIONS[lang][key];
    }
  });

  // Update aria-label attributes
  document.querySelectorAll('[data-i18n-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-label');
    if (TRANSLATIONS[lang][key]) {
      el.setAttribute('aria-label', TRANSLATIONS[lang][key]);
    }
  });

  // Update page title
  const titles = {
    vi: 'BeeCare – Quản lý viện dưỡng lão thông minh',
    en: 'BeeCare – Smart Nursing Home Management',
    ja: 'BeeCare – 介護施設管理システム'
  };
  const pathname = window.location.pathname.toLowerCase();
  let pageTitle = null;
  if (pathname.includes('pricing') && TRANSLATIONS[lang] && TRANSLATIONS[lang]['pricing_title_page']) {
    pageTitle = TRANSLATIONS[lang]['pricing_title_page'];
  } else if (pathname.includes('contact') && TRANSLATIONS[lang] && TRANSLATIONS[lang]['contact_title_page']) {
    pageTitle = TRANSLATIONS[lang]['contact_title_page'];
  } else if (pathname.includes('company') && TRANSLATIONS[lang] && TRANSLATIONS[lang]['company_title_page']) {
    pageTitle = TRANSLATIONS[lang]['company_title_page'];
  } else if (pathname.includes('news') && TRANSLATIONS[lang] && TRANSLATIONS[lang]['news_title_page']) {
    pageTitle = TRANSLATIONS[lang]['news_title_page'];
  } else if (pathname.includes('faq') && TRANSLATIONS[lang] && TRANSLATIONS[lang]['faq_title_page']) {
    pageTitle = TRANSLATIONS[lang]['faq_title_page'];
  } else if (pathname.includes('privacy') && TRANSLATIONS[lang] && TRANSLATIONS[lang]['privacy_title_page']) {
    pageTitle = TRANSLATIONS[lang]['privacy_title_page'];
  } else if (pathname.includes('terms') && TRANSLATIONS[lang] && TRANSLATIONS[lang]['terms_title_page']) {
    pageTitle = TRANSLATIONS[lang]['terms_title_page'];
  }

  if (pageTitle) {
    document.title = pageTitle;
  } else if (titles[lang]) {
    document.title = titles[lang];
  }

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

// ==================== HERO COVER BANNER SLIDER (BEE CARE ADS) ====================
function initCoverSlider() {
  const slider = document.getElementById('hero-banner-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.cover-slide');
  const prevBtn = document.getElementById('cover-slider-prev');
  const nextBtn = document.getElementById('cover-slider-next');
  const dots = slider.querySelectorAll('.cover-dot');
  const counterEl = document.getElementById('cover-counter');
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  let currentCoverIdx = 0;
  let coverTimer = null;
  const AUTOPLAY_INTERVAL = 5000;

  function showSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentCoverIdx = index;

    slides.forEach((slide, i) => {
      if (i === currentCoverIdx) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentCoverIdx) {
        dot.classList.add('cover-dot-active');
      } else {
        dot.classList.remove('cover-dot-active');
      }
    });

    if (counterEl) {
      counterEl.textContent = `${currentCoverIdx + 1}/${totalSlides}`;
    }
  }

  function nextSlide() {
    showSlide(currentCoverIdx + 1);
  }

  function prevSlide() {
    showSlide(currentCoverIdx - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    coverTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (coverTimer) {
      clearInterval(coverTimer);
      coverTimer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIdx = parseInt(dot.getAttribute('data-slide'), 10);
      if (!isNaN(targetIdx)) {
        showSlide(targetIdx);
        startAutoplay();
      }
    });
  });

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // Touch Swipe for mobile & tablet
  let touchStartX = 0;
  let touchEndX = 0;
  slider.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX = e.touches[0].screenX;
      stopAutoplay();
    }
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
      startAutoplay();
    }
  }, { passive: true });

  showSlide(0);
  startAutoplay();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

window.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  initHeroVideo();
  initCoverSlider();
  if (typeof lucide !== 'undefined') lucide.createIcons();
  // Ensure indicator positioned after layout
  requestAnimationFrame(() => updateLangIndicator());
});

window.addEventListener('resize', () => updateLangIndicator());

