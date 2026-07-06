const fs = require('fs');
const path = require('path');

const FULL_PENSION_WEEKLY = 230.25;
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getSPA(year) {
  if (year < 1960) return 66;
  if (year < 1977) return 67;
  return 68;
}

function getRetirementYear(birthYear, spa) {
  return birthYear + spa;
}

function calcPension(niYears) {
  if (niYears < 10) return 0;
  return Math.min(niYears, 35) / 35 * FULL_PENSION_WEEKLY;
}

for (let year = 1955; year <= 1975; year++) {
  const spa = getSPA(year);
  const retYear = getRetirementYear(year, spa);
  const now = new Date();
  const yearsLeft = retYear - now.getFullYear();
  const pension35 = FULL_PENSION_WEEKLY.toFixed(2);
  const pension30 = calcPension(30).toFixed(2);
  const pension20 = calcPension(20).toFixed(2);
  const slug = `born-${year}`;

  const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>State Pension Age Calculator Born ${year} — When Will I Get My UK State Pension?</title>
<meta name="description" content="Born in ${year}? Your UK state pension age is ${spa}. You will reach state pension age in ${retYear}. Calculate your exact retirement date and estimated weekly pension amount. Free.">
<meta name="keywords" content="state pension age calculator born ${year}, when will i get my state pension born ${year}, uk state pension ${year} birth year, british state pension born ${year}, state pension age ${year}">
<link rel="canonical" href="https://uk-state-pension-calculator.co.uk/born-${year}/">
<meta property="og:title" content="State Pension Age for People Born in ${year} — UK Calculator">
<meta property="og:description" content="Born in ${year}: your state pension age is ${spa}, retirement from ${retYear}. Calculate your estimated weekly pension based on your NI years.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://uk-state-pension-calculator.co.uk/born-${year}/">
<meta name="twitter:card" content="summary_large_image">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "UK State Pension Calculator — Born ${year}",
      "url": "https://uk-state-pension-calculator.co.uk/born-${year}/",
      "description": "State pension age and amount calculator for people born in ${year}.",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "inLanguage": "en-GB",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the state pension age if I was born in ${year}?",
          "acceptedAnswer": { "@type": "Answer", "text": "If you were born in ${year}, your UK state pension age is ${spa}. You will be able to claim your state pension from ${retYear}. ${yearsLeft > 0 ? 'That is approximately ' + yearsLeft + ' years from now.' : 'You may already be eligible to claim.'}" }
        },
        {
          "@type": "Question",
          "name": "How much state pension will I get if I was born in ${year}?",
          "acceptedAnswer": { "@type": "Answer", "text": "If you were born in ${year} and have 35 qualifying National Insurance years, you will receive the full new state pension of £${pension35} per week (£${(parseFloat(pension35)*52).toFixed(0)} per year) at the 2025/26 rate. With 30 NI years you would get £${pension30}/week, and with 20 NI years £${pension20}/week." }
        },
        {
          "@type": "Question",
          "name": "When exactly will I reach state pension age if born in ${year}?",
          "acceptedAnswer": { "@type": "Answer", "text": "If you were born in ${year}, you will reach state pension age (${spa}) in ${retYear}. Your exact retirement date depends on your specific birth month. Use our calculator above to get your precise retirement date based on your birth month." }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://uk-state-pension-calculator.co.uk/" },
        { "@type": "ListItem", "position": 2, "name": "Born ${year}", "item": "https://uk-state-pension-calculator.co.uk/born-${year}/" }
      ]
    }
  ]
}
<\/script>

<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --brand: #1e4d8c; --brand-dark: #0f2d5a; --brand-light: #e8f0fb; --text: #1a1a2e; --muted: #64748b; --border: #e2e8f0; --bg: #f8fafc; --radius: 12px; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: var(--text); background: var(--bg); font-size: 16px; line-height: 1.65; }
  header { background: linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 100%); color: white; padding: 52px 20px 88px; text-align: center; }
  header .badge { display: inline-block; background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.3); border-radius: 20px; padding: 4px 14px; font-size: 0.78rem; font-weight: 600; letter-spacing: .4px; margin-bottom: 16px; }
  header h1 { font-size: clamp(1.4rem, 4vw, 2rem); font-weight: 800; margin-bottom: 12px; }
  header p { color: rgba(255,255,255,.9); font-size: 1rem; max-width: 580px; margin: 0 auto; }
  .container { max-width: 820px; margin: 0 auto; padding: 0 20px; }
  .tool-wrapper { margin: -56px auto 56px; }
  .tool-card { background: white; border-radius: var(--radius); box-shadow: 0 8px 40px rgba(0,0,0,0.12); border: 1px solid var(--border); padding: 32px 28px; }
  .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px; }
  @media (max-width: 480px) { .summary-grid { grid-template-columns: 1fr 1fr; } .tool-card { padding: 20px 16px; } }
  .s-stat { background: var(--brand-light); border-radius: 10px; padding: 18px; text-align: center; }
  .s-stat .sv { font-size: 1.5rem; font-weight: 900; color: var(--brand); }
  .s-stat .sl { font-size: 0.75rem; color: var(--muted); margin-top: 3px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  label { font-size: 0.79rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .5px; }
  select, input[type=number] { border: 2px solid var(--border); border-radius: 8px; padding: 12px 14px; font-size: 1rem; color: var(--text); background: white; width: 100%; }
  select:focus, input[type=number]:focus { outline: none; border-color: var(--brand); }
  .ni-row { display: flex; gap: 12px; align-items: center; }
  .ni-row input[type=range] { flex: 1; accent-color: var(--brand); }
  .ni-val { font-size: 1.4rem; font-weight: 800; color: var(--brand); min-width: 36px; text-align: center; }
  .calc-btn { width: 100%; margin-top: 8px; padding: 16px; background: var(--brand); color: white; border: none; border-radius: 10px; font-size: 1.05rem; font-weight: 700; cursor: pointer; }
  .calc-btn:hover { background: var(--brand-dark); }
  .result { display: none; margin-top: 24px; }
  .result-hero { background: linear-gradient(135deg, var(--brand-dark), var(--brand)); border-radius: 10px; padding: 24px; color: white; text-align: center; }
  .result-hero .rl { font-size: 0.76rem; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; opacity: .8; margin-bottom: 4px; }
  .result-hero .ra { font-size: 2.4rem; font-weight: 900; }
  .result-hero .rs { font-size: 0.88rem; opacity: .85; margin-top: 4px; }
  .r-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 14px; }
  .r-stat { background: var(--brand-light); border-radius: 8px; padding: 12px; text-align: center; }
  .r-stat .sv { font-size: 1.1rem; font-weight: 800; color: var(--brand); }
  .r-stat .sl { font-size: 0.7rem; color: var(--muted); margin-top: 2px; }
  .fca-notice { background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 10px 14px; margin-top: 14px; font-size: 0.78rem; color: #78350f; }
  .content { padding-bottom: 64px; }
  h2 { font-size: 1.2rem; font-weight: 800; margin: 44px 0 14px; }
  p { color: #374151; margin-bottom: 14px; line-height: 1.75; }
  .data-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.88rem; }
  .data-table th { background: var(--brand); color: white; padding: 10px 14px; text-align: left; }
  .data-table td { padding: 10px 14px; border-bottom: 1px solid var(--border); }
  .data-table tr:nth-child(even) td { background: #f8faff; }
  .hl { font-weight: 700; color: var(--brand); }
  .cta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 44px 0; }
  @media (max-width: 560px) { .cta-grid { grid-template-columns: 1fr; } }
  .cta-card { background: #0f2d5a; color: white; border-radius: var(--radius); padding: 24px 20px; }
  .cta-card h3 { color: white; font-size: 1rem; margin-bottom: 8px; }
  .cta-card p { color: rgba(255,255,255,.85); font-size: 0.85rem; margin-bottom: 14px; }
  .cta-btn { display: block; text-align: center; text-decoration: none; padding: 11px 16px; border-radius: 8px; font-weight: 700; font-size: 0.88rem; }
  .cta-btn.white { background: white; color: var(--brand-dark); }
  .cta-btn.gold { background: #f59e0b; color: #1a1a2e; }
  .back-link { display: inline-flex; align-items: center; gap: 6px; color: var(--brand); text-decoration: none; font-weight: 600; font-size: 0.88rem; margin-bottom: 32px; }
  .faq-item { border-bottom: 1px solid var(--border); }
  .faq-q { width: 100%; background: none; border: none; text-align: left; padding: 16px 0; font-size: 0.9rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center; color: var(--text); }
  .faq-q::after { content: '+'; font-size: 1.2rem; color: var(--brand); flex-shrink: 0; margin-left: 12px; }
  .faq-q.open::after { content: '−'; }
  .faq-a { display: none; padding: 0 0 14px; font-size: 0.87rem; color: #4b5563; line-height: 1.75; }
  .faq-a.open { display: block; }
  footer { background: #0f172a; color: #94a3b8; text-align: center; padding: 28px 20px; font-size: 0.78rem; }
  footer p { color: #94a3b8; }
  footer a { color: #cbd5e1; }
  .fca-footer { background: #1e293b; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px; font-size: 0.76rem; color: #94a3b8; }
</style>
</head>
<body>

<header>
  <div class="container">
    <div class="badge">🇬🇧 Born ${year} · State Pension Age: ${spa}</div>
    <h1>State Pension Age Calculator — Born in ${year}</h1>
    <p>If you were born in ${year}, your UK state pension age is <strong>${spa}</strong>. You can claim from <strong>${retYear}</strong>. Enter your NI years below to estimate your weekly amount.</p>
  </div>
</header>

<div class="container">
<div class="tool-wrapper">
  <div class="tool-card">

    <div class="summary-grid">
      <div class="s-stat"><div class="sv">${spa}</div><div class="sl">State Pension Age</div></div>
      <div class="s-stat"><div class="sv">${retYear}</div><div class="sl">Earliest Claim Year</div></div>
      <div class="s-stat"><div class="sv">${yearsLeft > 0 ? yearsLeft + ' yrs' : 'Now'}</div><div class="sl">${yearsLeft > 0 ? 'Years to go' : 'Already eligible'}</div></div>
    </div>

    <div class="form-group">
      <label>Birth Month</label>
      <select id="birthMonth" onchange="calcRetDate()">
        ${MONTHS.map((m,i) => `<option value="${i+1}">${m}</option>`).join('')}
      </select>
    </div>

    <div class="form-group">
      <label>Your NI Qualifying Years</label>
      <div class="ni-row">
        <input type="range" id="niSlider" min="0" max="45" value="20"
          oninput="document.getElementById('niVal').textContent=this.value; document.getElementById('niNum').value=this.value">
        <div class="ni-val" id="niVal">20</div>
      </div>
      <input type="number" id="niNum" min="0" max="45" value="20" placeholder="Or type here"
        oninput="this.value=Math.min(45,Math.max(0,this.value||0)); document.getElementById('niSlider').value=this.value; document.getElementById('niVal').textContent=this.value">
    </div>

    <button class="calc-btn" onclick="calculate()">Calculate My Pension →</button>

    <div class="result" id="result">
      <div class="result-hero">
        <div class="rl">Estimated Weekly State Pension</div>
        <div class="ra" id="r-weekly"></div>
        <div class="rs" id="r-sub"></div>
      </div>
      <div class="r-grid">
        <div class="r-stat"><div class="sv" id="r-monthly"></div><div class="sl">Per month</div></div>
        <div class="r-stat"><div class="sv" id="r-annual"></div><div class="sl">Per year</div></div>
        <div class="r-stat"><div class="sv" id="r-retdate"></div><div class="sl">Retirement date</div></div>
      </div>
      <div class="fca-notice">ℹ️ This tool provides information only and does not constitute financial advice. For your official forecast, visit <a href="https://www.gov.uk/check-state-pension">gov.uk/check-state-pension</a>.</div>
    </div>

  </div>
</div>

<div class="content">
  <a href="/" class="back-link">← Back to main calculator</a>

  <h2>State Pension Facts for People Born in ${year}</h2>
  <p>If you were born in ${year}, you fall into the <strong>state pension age ${spa}</strong> cohort. The earliest you can claim your state pension is in <strong>${retYear}</strong>. ${yearsLeft > 0 ? `That means you have approximately ${yearsLeft} years until retirement.` : `You may already be eligible to claim — check your entitlement at gov.uk.`}</p>

  <p>To receive the <strong>full new state pension of £${pension35} per week</strong>, you need 35 qualifying National Insurance years. If you started work at 21, by ${retYear} you would have accumulated ${retYear - year - 21} potential qualifying years (assuming no gaps).</p>

  <table class="data-table">
    <thead><tr><th>NI Years</th><th>Weekly Pension</th><th>Annual Pension</th><th>vs Full Pension</th></tr></thead>
    <tbody>
      <tr><td>10 years (min)</td><td>£${calcPension(10).toFixed(2)}</td><td>£${Math.round(calcPension(10)*52).toLocaleString()}</td><td>29%</td></tr>
      <tr><td>20 years</td><td>£${calcPension(20).toFixed(2)}</td><td>£${Math.round(calcPension(20)*52).toLocaleString()}</td><td>57%</td></tr>
      <tr><td>25 years</td><td>£${calcPension(25).toFixed(2)}</td><td>£${Math.round(calcPension(25)*52).toLocaleString()}</td><td>71%</td></tr>
      <tr><td>30 years</td><td>£${calcPension(30).toFixed(2)}</td><td>£${Math.round(calcPension(30)*52).toLocaleString()}</td><td>86%</td></tr>
      <tr><td class="hl">35 years (full)</td><td class="hl">£${pension35}</td><td class="hl">£${Math.round(parseFloat(pension35)*52).toLocaleString()}</td><td class="hl">100%</td></tr>
    </tbody>
  </table>

  <div class="cta-grid">
    <div class="cta-card">
      <h3>🐝 Consolidate Your Pensions</h3>
      <p>Have workplace pensions from previous jobs? PensionBee combines them into one clear plan — helping you plan your retirement income alongside your state pension.</p>
      <a href="https://www.pensionbee.com/" class="cta-btn white" target="_blank" rel="noopener sponsored">Find My Lost Pensions →</a>
    </div>
    <div class="cta-card">
      <h3>👔 Get Pension Advice</h3>
      <p>Should you defer your state pension? Buy missing NI years? An FCA-authorised IFA can give personalised guidance for your ${year} birth year situation.</p>
      <a href="https://www.unbiased.co.uk/" class="cta-btn gold" target="_blank" rel="noopener sponsored">Find an IFA Near Me →</a>
    </div>
  </div>

  <h2>Frequently Asked Questions — Born in ${year}</h2>
  <div class="faq-item">
    <button class="faq-q" onclick="toggleFaq(this)">What is the state pension age if I was born in ${year}?</button>
    <div class="faq-a">If you were born in ${year}, your UK state pension age is <strong>${spa}</strong>. You can claim your state pension from <strong>${retYear}</strong>. Your exact date depends on your specific birth month — use the calculator above to find your precise retirement date.</div>
  </div>
  <div class="faq-item">
    <button class="faq-q" onclick="toggleFaq(this)">How much state pension will I get if born in ${year}?</button>
    <div class="faq-a">With 35 qualifying NI years, you will receive the full new state pension of <strong>£${pension35}/week</strong> (£${Math.round(parseFloat(pension35)*52).toLocaleString()}/year) at 2025/26 rates. With 30 years: £${calcPension(30).toFixed(2)}/week. With 20 years: £${calcPension(20).toFixed(2)}/week. You need a minimum of 10 NI years to receive any state pension.</div>
  </div>
  <div class="faq-item">
    <button class="faq-q" onclick="toggleFaq(this)">Can I boost my state pension if I was born in ${year}?</button>
    <div class="faq-a">Yes. If you have gaps in your NI record, you can pay voluntary Class 3 contributions (approximately £923 per year at 2025/26 rates) to fill them. Each year bought adds £342/year to your state pension for life — typically paying off within 2–3 years of retirement. Check your NI record at gov.uk to see which years you can fill.</div>
  </div>
</div>
</div>

<footer>
  <div class="container">
    <div class="fca-footer">This tool provides information only — not financial advice. For your official state pension forecast, visit <a href="https://www.gov.uk/check-state-pension">gov.uk/check-state-pension</a>. Based on 2025/26 DWP rates.</div>
    <p>Born ${year} state pension guide · <a href="/">Main Calculator</a> · <a href="/born-${year-1}/">Born ${year-1}</a> · <a href="/born-${year+1}/">Born ${year+1}</a></p>
    <p style="font-size:.72rem;margin-top:8px;">State Pension calculator is part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.</p>
  </div>
</footer>

<script>
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function calculate() {
  const birthMonth = parseInt(document.getElementById('birthMonth').value);
  const niYears = parseInt(document.getElementById('niNum').value) || 0;
  const spa = ${spa};
  const retYear = ${year} + spa;
  const retDate = MONTHS[birthMonth-1] + ' ' + retYear;
  const pension = niYears < 10 ? 0 : Math.min(niYears, 35) / 35 * 230.25;
  const monthly = pension * 52 / 12;
  const annual = pension * 52;
  document.getElementById('r-weekly').textContent = niYears < 10 ? '£0.00/week' : '£' + pension.toFixed(2) + '/week';
  document.getElementById('r-sub').textContent = niYears < 10 ? 'Need at least 10 NI years' : 'Based on ' + niYears + ' qualifying NI years · 2025/26 rates';
  document.getElementById('r-monthly').textContent = '£' + monthly.toFixed(2);
  document.getElementById('r-annual').textContent = '£' + Math.round(annual).toLocaleString();
  document.getElementById('r-retdate').textContent = retDate;
  document.getElementById('result').style.display = 'block';
  document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function toggleFaq(btn) {
  btn.classList.toggle('open');
  btn.nextElementSibling.classList.toggle('open');
}
</script>
</body>
</html>`;

  const dir = path.join(__dirname, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`✅ Generated: ${slug}/ (SPA: ${spa}, Retirement: ${retYear})`);
}

console.log('\nDone — 21 pages generated.');
