/*
  행사 예약 링크 자동 전환 (events.cubig.ai 공통, 수정은 마케팅팀 검토 후)

  쓰는 법: 행사 예약 링크(crm@cubig.ai 공용 계정에서 만든 Google 예약 페이지)에
  행사 마지막 날을 같이 적습니다.

    <a class="btn" href="https://calendar.app.google/..." data-booking-until="2026-12-10">Book a meeting</a>
    <iframe src="https://calendar.google.com/calendar/appointments/schedules/...?gv=true" data-booking-until="2026-12-10"></iframe>

  - 마지막 날이 지나면(그다음 날 0시부터, 방문자 기준)
      링크(a)   → 상시 30분 미팅 페이지(/meet/, 한국어 페이지는 /ko/meet/)로 바뀝니다.
      그 밖의 것(iframe·부스 안내 칸 등) → 숨겨집니다.
  - 다른 곳으로 보내려면 data-booking-after="주소" 를 같이 적습니다.
  - 페이지 <head>에 <script src="/assets/booking.js" defer></script> 한 줄이 있어야 합니다.
*/
(function () {
  var KO = (document.documentElement.lang || '').slice(0, 2) === 'ko';
  var FALLBACK = KO ? '/ko/meet/' : '/meet/';

  function ended(until) {
    var p = String(until || '').split('-');
    if (p.length !== 3) return false;
    var nextDay = new Date(+p[0], +p[1] - 1, +p[2] + 1);
    return !isNaN(nextDay) && new Date() >= nextDay;
  }

  function run() {
    var els = document.querySelectorAll('[data-booking-until]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (!ended(el.getAttribute('data-booking-until'))) continue;
      if (el.tagName === 'A') {
        el.href = el.getAttribute('data-booking-after') || FALLBACK;
        el.removeAttribute('target');
        el.setAttribute('data-booking-ended', '');
      } else {
        el.hidden = true;
        el.style.display = 'none';
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
