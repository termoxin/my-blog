(async () => {
    // ==== SETTINGS ====
    const API_URL = "https://www.spitogatos.gr/n_api/v1/properties/search-results?listingType=sale&category=residential&areaIDs[]=2216&sortBy=rankingscore&sortOrder=desc&offset=0";
    const MAX_PAGES_TO_SCAN = 10; // pages × 30 results
    const PPSM_STEPS = [ "Any", 100,200,300,400,500,600,700,800,900,1000,1200,1400,1600,1800,2000,2300,2600,3000,3500,4000,4500,5000,6000,7000,8000 ];
    // ==================
  
    // ---------- Helpers ----------
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const calcPpsm = (price, sqm) => (price && sqm ? Math.round((price / sqm) * 100) / 100 : null);
    const withOffset = (urlStr, offset) => { const u = new URL(urlStr); u.searchParams.set("offset", String(offset)); return u.toString(); };
    const formatMoney = (n) => (typeof n === "number" ? n.toLocaleString() : n);
  
    // Build a clickable property URL by prefixing "11" to the numeric id
    function buildSpitogatosURL(rawId) {
      if (rawId == null) return null;
      let s = String(rawId).trim();
      // keep only digits (sometimes ids may come with extra chars)
      s = (s.match(/\d+/g) || []).join("");
      if (!s) return null;
      if (!s.startsWith("11")) s = "11" + s;
      return `https://www.spitogatos.gr/en/property/${s}`;
    }
  
    // Try to discover an id from various common fields
    function getListingId(l) {
      return (
        l.id ??
        l.listingId ?? l.listingID ??
        l.propertyId ?? l.propertyID ??
        l.code ?? l.refId ?? l.ref
      );
    }
  
    // ---------- Styles ----------
    const style = document.createElement("style");
    style.textContent = `
    .sg-ctrls { display:flex; align-items:center; gap:10px; padding-left: 20px; padding-bottom: 20px; }
  
    .sg-chip {
      display:inline-flex; align-items:center; gap:8px; height:42px;
      padding:0 12px; border:1px solid #e5e7eb; border-radius:6px;
      background:#fff; cursor:pointer; user-select:none;
      box-shadow:0 1px 2px rgba(0,0,0,.04);
      transition:box-shadow .15s ease, border-color .15s ease;
    }
    .sg-chip:hover { box-shadow:0 2px 6px rgba(0,0,0,.06); border-color:#dfe4ea; }
    .sg-chip .sg-chip-label { font-weight:600; color:#111; }
    .sg-chip .sg-chip-val { color:#6b7280; font-size:13px; }
  
    .sg-btn {
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      font: inherit;
      line-height:1; color:#fff; font-weight:700;
      border-radius:6px; display:inline-flex; align-items:center;
      transition:all .2s ease; border:none; cursor:pointer;
      background-color:#fe900a; font-size:14px; padding:0 14px; height:40px;
    }
    .sg-badge { display:inline-flex; align-items:center; gap:6px; padding:6px 10px; border-radius:999px; background:#f3f4f6; color:#111; font-size:12px; }
  
    .sg-popover-wrap { position:relative; }
    .sg-popover {
      position:absolute; top:calc(100% + 8px); left:0; z-index:9998;
      width: min(520px, 92vw);
      background:#fff; border:1px solid #e5e7eb; border-radius:16px;
      box-shadow:0 10px 30px rgba(0,0,0,.12);
      padding:16px; display:none;
    }
    .sg-popover.open { display:block; }
    .sg-popover-head { display:flex; gap:12px; }
    .sg-popover-head .sg-input {
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      text-size-adjust: 100%;
      word-break: normal;
      box-sizing: border-box;
      outline: none; -webkit-appearance: none; touch-action: manipulation;
      background:#fff;
      border:1px solid rgba(185,189,209,.5);
      border-radius:8px; height:40px; flex:1; padding:0 12px;
      font-weight:600; color:#111;
    }
    .sg-popover-head .sg-input::placeholder { color:#9ca3af; }
    .sg-popover-body { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px; max-height:280px; overflow:auto; }
    .sg-pill {
      height:36px; display:flex; align-items:center; justify-content:center;
      background:#eef5f5; border-radius:8px; font-weight:700; color:#111;
      margin-bottom:8px;
    }
    .sg-list { list-style:none; margin:0; padding:0; }
    .sg-item {
      height:36px; display:flex; align-items:center; padding:0 8px;
      border-radius:8px; cursor:pointer; color:#4b5563; font-weight:600;
    }
    .sg-item:hover { background:#f3f4f6; color:#111; }
  
    .sg-modal { position:fixed; inset:0; z-index:9999; display:none; align-items:center; justify-content:center; }
    .sg-modal.open { display:flex; }
    .sg-modal-backdrop { position:fixed; inset:0; background:transparent; }
    .sg-modal-panel { width:min(1100px, 92vw); max-height:min(88vh, 1100px); background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,.2); transform:translateY(8px); opacity:0; transition:all .2s ease; display:flex; flex-direction:column; }
    .sg-modal.open .sg-modal-panel { transform:translateY(0); opacity:1; }
    .sg-modal-header { display:flex; align-items:center; padding:14px 16px; border-bottom:1px solid #f1f5f9; background:#fafafa; }
    .sg-close { margin-left:auto; border:none; background:transparent; cursor:pointer; padding:8px; border-radius:10px; }
    .sg-close:hover { background:#f3f4f6; }
    .sg-modal-body { padding:16px; overflow:auto; }
    .sg-empty { padding:32px; text-align:center; color:#6b7280; }
  
    .sg-loading { display:flex; align-items:center; justify-content:center; gap:12px; padding:32px; color:#374151; font-weight:600; }
    .sg-spinner { width:22px; height:22px; border-radius:50%; border:3px solid #e5e7eb; border-top-color:#6366f1; animation: sg-spin .8s linear infinite; }
    @keyframes sg-spin { to { transform: rotate(360deg); } }
  
    .sg-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:12px; }
    .sg-card-link { text-decoration:none; color:inherit; display:block; border-radius:14px; border:1px solid #e5e7eb; overflow:hidden; background:#fff; transition:transform .08s ease, box-shadow .12s ease, border-color .12s ease; }
    .sg-card-link:hover { box-shadow:0 8px 24px rgba(0,0,0,.12); border-color:#d1d5dB; transform:translateY(-1px); }
    .sg-img { width:100%; aspect-ratio:16/10; object-fit:cover; background:#f3f4f6; display:block; }
    .sg-card-body { padding:12px; display:flex; flex-direction:column; gap:6px; }
    .sg-geo { font-weight:700; line-height:1.3; }
    .sg-line { font-size:13px; color:#374151; }
    .sg-ppsm { font-weight:700; padding:4px 8px; border-radius:999px; background:#eef2ff; width:max-content; }
    .sg-meta { display:flex; gap:10px; color:#6b7280; font-size:12px; }
    `;
    document.head.appendChild(style);
  
    // ---------- Controls (in .listing-filters) ----------
    const filtersContainer = document.querySelector(".listing-filters") || document.body;
  
    const ctrls = document.createElement("div");
    ctrls.className = "sg-ctrls";
  
    const popWrap = document.createElement("div");
    popWrap.className = "sg-popover-wrap";
  
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "sg-chip";
    chip.innerHTML = `<span class="sg-chip-label">Price / m²</span> <span class="sg-chip-val" id="sg-chip-val">Any</span>`;
  
    const pop = document.createElement("div");
    pop.className = "sg-popover";
    pop.innerHTML = `
      <div class="sg-popover-head">
        <input class="sg-input" id="sg-min" inputmode="numeric" placeholder="€ From" />
        <input class="sg-input" id="sg-max" inputmode="numeric" placeholder="€ To" />
      </div>
      <div class="sg-popover-body">
        <div>
          <div class="sg-pill">Any</div>
          <ul class="sg-list" id="sg-list-min"></ul>
        </div>
        <div>
          <div class="sg-pill">Any</div>
          <ul class="sg-list" id="sg-list-max"></ul>
        </div>
      </div>
    `;
    popWrap.appendChild(chip);
    popWrap.appendChild(pop);
  
    const runBtn = document.createElement("button");
    runBtn.className = "sg-btn";
    runBtn.textContent = "Filter & Show";
  
    const countBadge = document.createElement("span");
    countBadge.className = "sg-badge";
    countBadge.textContent = "0 matches";
  
    ctrls.appendChild(popWrap);
    ctrls.appendChild(runBtn);
    ctrls.appendChild(countBadge);
    filtersContainer.appendChild(ctrls);
  
    const listMin = pop.querySelector("#sg-list-min");
    const listMax = pop.querySelector("#sg-list-max");
    const minInput = pop.querySelector("#sg-min");
    const maxInput = pop.querySelector("#sg-max");
    const chipVal  = chip.querySelector("#sg-chip-val");
  
    function li(val) {
      const li = document.createElement("li");
      li.className = "sg-item";
      li.textContent = val === "Any" ? "Any" : String(val);
      li.dataset.value = val;
      return li;
    }
    PPSM_STEPS.forEach(v => listMin.appendChild(li(v)));
    PPSM_STEPS.forEach(v => listMax.appendChild(li(v)));
  
    function openPopover() { pop.classList.add("open"); }
    function closePopover() { pop.classList.remove("open"); }
    chip.addEventListener("click", (e) => {
      e.stopPropagation();
      pop.classList.toggle("open");
      if (pop.classList.contains("open")) minInput.focus();
    });
    document.addEventListener("click", (e) => {
      if (!pop.contains(e.target) && e.target !== chip) closePopover();
    });
  
    listMin.addEventListener("click", (e) => {
      const el = e.target.closest(".sg-item"); if (!el) return;
      const v = el.dataset.value;
      minInput.value = v === "Any" ? "" : v;
      updateChipLabel();
    });
    listMax.addEventListener("click", (e) => {
      const el = e.target.closest(".sg-item"); if (!el) return;
      const v = el.dataset.value;
      maxInput.value = v === "Any" ? "" : v;
      updateChipLabel();
    });
  
    function updateChipLabel() {
      const min = minInput.value.trim();
      const max = maxInput.value.trim();
      if (!min && !max) chipVal.textContent = "Any";
      else chipVal.textContent = `${min ? "€"+min : "Any"} – ${max ? "€"+max : "Any"}`;
    }
    minInput.addEventListener("input", updateChipLabel);
    maxInput.addEventListener("input", updateChipLabel);
    [minInput, maxInput].forEach(el => el.addEventListener("keydown", (e) => { if (e.key === "Enter") { closePopover(); runFilter(true); } }));
  
    // ---------- Modal ----------
    const modalRoot = document.createElement("div");
    modalRoot.className = "sg-modal";
    modalRoot.setAttribute("aria-hidden", "true");
    modalRoot.innerHTML = `
      <div class="sg-modal-backdrop"></div>
      <div class="sg-modal-panel" role="dialog" aria-modal="true" aria-labelledby="sg-modal-title">
        <div class="sg-modal-header">
          <div class="sg-modal-title" id="sg-modal-title">Filtered apartments</div>
          <button class="sg-close" aria-label="Close">✕</button>
        </div>
        <div class="sg-modal-body" aria-live="polite"><div class="sg-empty">No results yet.</div></div>
      </div>
    `;
    document.body.appendChild(modalRoot);
  
    const backdrop = modalRoot.querySelector(".sg-modal-backdrop");
    const closeBtn = modalRoot.querySelector(".sg-close");
    const bodyEl = modalRoot.querySelector(".sg-modal-body");
    const titleEl = modalRoot.querySelector("#sg-modal-title");
  
    function openModal() {
      modalRoot.classList.add("open");
      modalRoot.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeBtn.focus({ preventScroll: true });
    }
    function closeModal() {
      modalRoot.classList.remove("open");
      modalRoot.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    backdrop.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  
    // ---------- Rendering ----------
    function renderLoading() {
      bodyEl.innerHTML = `
        <div class="sg-loading">
          <div class="sg-spinner" role="status" aria-label="Loading"></div>
          <span>Loading listings…</span>
        </div>
      `;
    }
  
    function renderCards(items) {
      if (!items.length) {
        bodyEl.innerHTML = `<div class="sg-empty">No listings in that €/m² range.</div>`;
        return;
      }
      const grid = document.createElement("div");
      grid.className = "sg-grid";
  
      grid.innerHTML = items.map(l => {
        const ppsm = l.pricePerSqm ?? calcPpsm(l.price, l.sq_meters);
        const details = [
          (l.sq_meters ? `${l.sq_meters} m²` : null),
          (typeof l.price === "number" ? `€${formatMoney(l.price)}` : null),
        ].filter(Boolean).join(" · ");
  
        const metaBits = [
          `Floor: ${l.floorNumber ?? "-"}`,
          `Rooms: ${l.rooms ?? "-"}`,
        ].join(" • ");
  
        // Prefer URL from API; else construct from ID with "11" prefix
        const derivedId = getListingId(l);
        const fallbackURL = buildSpitogatosURL(derivedId);
        const detailURL = l.url || l.detailURL || l.permalink || fallbackURL;
  
        // try common image fields
        const img = l.mainImageURL || l.main_image_url || l.coverImage || l.image || "";
  
        if (detailURL) {
          return `
            <a class="sg-card-link" href="${detailURL}" target="_blank" rel="noopener">
              <img class="sg-img" src="${img}" alt="">
              <div class="sg-card-body">
                <div class="sg-geo">${l.geography || l.location || "—"}</div>
                <div class="sg-line">${details || "—"}</div>
                <div class="sg-ppsm">${ppsm ? `${ppsm} €/m²` : "— €/m²"}</div>
                <div class="sg-meta">${metaBits}</div>
              </div>
            </a>
          `;
        } else {
          return `
            <div class="sg-card-link" style="pointer-events:none; opacity:.75;">
              <img class="sg-img" src="${img}" alt="">
              <div class="sg-card-body">
                <div class="sg-geo">${l.geography || l.location || "—"}</div>
                <div class="sg-line">${details || "—"}</div>
                <div class="sg-ppsm">${ppsm ? `${ppsm} €/m²` : "— €/m²"}</div>
                <div class="sg-meta">${metaBits}</div>
              </div>
            </div>
          `;
        }
      }).join("");
  
      bodyEl.innerHTML = "";
      bodyEl.appendChild(grid);
    }
  
    // ---------- Fetch & Filter ----------
    async function runFilter(showAfter = true) {
      const MIN_PPSM = parseFloat(minInput.value) || 0;
      const MAX_PPSM = parseFloat(maxInput.value) || Infinity;
  
      openModal();
      renderLoading();
  
      let matched = [];
      let perPage = 30;
  
      try {
        for (let i = 0; i < MAX_PAGES_TO_SCAN; i++) {
          const url = withOffset(API_URL, i * perPage);
          const res = await fetch(url, { headers: { "accept": "application/json" } });
          if (!res.ok) { bodyEl.innerHTML = `<div class="sg-empty">Error: HTTP ${res.status}</div>`; break; }
          const json = await res.json();
          perPage = json.pagination?.perPage || perPage;
  
          (json.data || []).forEach(item => {
            const ppsm = calcPpsm(item.price, item.sq_meters);
            if (ppsm !== null && ppsm >= MIN_PPSM && ppsm <= MAX_PPSM) {
              matched.push({ ...item, pricePerSqm: ppsm });
            }
          });
  
          if (json.pagination?.currentPage >= json.pagination?.lastPage) break;
          await sleep(100);
        }
      } catch (err) {
        bodyEl.innerHTML = `<div class="sg-empty">Error loading data.</div>`;
        console.error(err);
        return;
      }
  
      matched.sort((a, b) => (a.pricePerSqm ?? 0) - (b.pricePerSqm ?? 0));
      renderCards(matched);
  
      countBadge.textContent = `${matched.length} match${matched.length === 1 ? "" : "es"}`;
      titleEl.textContent = `Filtered apartments — ${minInput.value || "Any"}–${maxInput.value || "Any"} €/m² (${matched.length})`;
    }
  
    // ---------- Events ----------
    runBtn.addEventListener("click", () => { closePopover(); runFilter(true); });
  })();