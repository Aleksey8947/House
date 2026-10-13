import React, { useState, useEffect, useRef } from 'react';
import {
  Building2, Home, Key, MapPin, Search, Star, Check, ChevronDown,
  Menu, X, ArrowRight, Sparkles, Shield, TrendingUp, Eye, 
  Phone, Mail, Send, Award,
} from 'lucide-react';

/* Brand icons — lucide removed third-party brand logos in newer versions,
   so we ship small inline SVG components with the same API (size prop). */
const IconGithub = ({ size = 18, ...p }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...p}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
  </svg>
);
const IconTwitter = ({ size = 18, ...p }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...p}>
    <path d="M18.9 2.1h3.6l-7.9 9 9.3 12.3h-6.1l-4.8-6.3-5.5 6.3H3.9l8.4-9.6L3.3 2.1h6.2l4.4 5.8 5-5.8zm-1.2 18.5h2L6.4 4.1H4.3l13.4 16.5z"/>
  </svg>
);
const IconLinkedin = ({ size = 18, ...p }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.96V21h-4V9z"/>
  </svg>
);
const IconInstagram = ({ size = 18, ...p }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
);

/* ============================================================
   AURUM ESTATES — premium real estate landing page
   Single self-contained component. React + lucide-react only.
   Tailwind core utility classes + embedded CSS keyframes.
   ============================================================ */

const css = `
:root{
  --bg-primary:#08080f;
  --accent-from:#f5c14c;
  --accent-mid:#e8a838;
  --accent-to:#b8860b;
  --card-bg:rgba(255,255,255,0.04);
  --border:rgba(255,255,255,0.10);
}
html{scroll-behavior:smooth;}
body{background:var(--bg-primary);}

@keyframes fadeInUp{
  from{opacity:0;transform:translateY(36px);}
  to{opacity:1;transform:translateY(0);}
}
@keyframes blobFloat{
  0%,100%{transform:translate(0,0) scale(1);}
  33%{transform:translate(40px,-60px) scale(1.12);}
  66%{transform:translate(-30px,30px) scale(0.94);}
}
@keyframes pulseSoft{
  0%,100%{opacity:.55;}
  50%{opacity:1;}
}
@keyframes gridDrift{
  from{background-position:0 0;}
  to{background-position:60px 60px;}
}
@keyframes spinSlow{
  from{transform:rotate(0deg);}
  to{transform:rotate(360deg);}
}
@keyframes shimmer{
  0%{background-position:-200% center;}
  100%{background-position:200% center;}
}
@keyframes drawerIn{
  from{opacity:0;transform:translateY(-12px);}
  to{opacity:1;transform:translateY(0);}
}

.fade-in-up{animation:fadeInUp .9s cubic-bezier(.22,.61,.36,1) both;}

.reveal{opacity:0;transform:translateY(44px);transition:opacity .8s ease,transform .8s cubic-bezier(.22,.61,.36,1);}
.reveal.is-visible{opacity:1;transform:translateY(0);}

.gradient-text{
  background:linear-gradient(120deg,#f7d488 0%,#f5c14c 35%,#fff3d6 55%,#e8a838 75%,#f5c14c 100%);
  background-size:200% auto;
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
  animation:shimmer 6s linear infinite;
}
.gradient-bg{
  background:linear-gradient(135deg,var(--accent-from),var(--accent-mid) 50%,var(--accent-to));
}
.glass{
  background:var(--card-bg);
  backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);
  border:1px solid var(--border);
}
.card-hover{transition:transform .35s cubic-bezier(.22,.61,.36,1),box-shadow .35s ease,border-color .35s ease;}
.card-hover:hover{
  transform:scale(1.03) translateY(-4px);
  border-color:rgba(245,193,76,.45);
  box-shadow:0 18px 50px -12px rgba(245,193,76,.25),0 0 0 1px rgba(245,193,76,.15);
}
.btn-glow{transition:transform .3s ease,box-shadow .3s ease;}
.btn-glow:hover{
  transform:scale(1.05);
  box-shadow:0 0 28px rgba(245,193,76,.55),0 8px 30px -8px rgba(232,168,56,.6);
}
.btn-ghost{transition:transform .3s ease,background .3s ease,border-color .3s ease;}
.btn-ghost:hover{
  transform:scale(1.05);
  background:rgba(245,193,76,.08);
  border-color:rgba(245,193,76,.5);
}
.blob{position:absolute;border-radius:9999px;filter:blur(90px);pointer-events:none;}

.faq-panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.22,.61,.36,1);}
.faq-panel.open{grid-template-rows:1fr;}
.faq-panel > div{overflow:hidden;}

.nav-scrolled{background:rgba(8,8,15,.72);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,.08);}

.grid-bg{
  background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);
  background-size:60px 60px;
  animation:gridDrift 8s linear infinite;
  mask-image:radial-gradient(ellipse 80% 60% at 50% 40%,black 30%,transparent 75%);
  -webkit-mask-image:radial-gradient(ellipse 80% 60% at 50% 40%,black 30%,transparent 75%);
}
.scroll-x::-webkit-scrollbar{height:6px;}
.scroll-x::-webkit-scrollbar-thumb{background:rgba(245,193,76,.3);border-radius:9999px;}
`;

/* ---------- hooks ---------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Counter({ end, suffix = '', prefix = '', decimals = 0 }) {
  const [ref, visible] = useReveal();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const duration = 2000;
    const interval = 40;
    const steps = duration / interval;
    const increment = end / steps;
    let current = 0;
    const id = setInterval(() => {
      current += increment;
      if (current >= end) {
        setValue(end);
        clearInterval(id);
      } else {
        setValue(current);
      }
    }, interval);
    return () => clearInterval(id);
  }, [visible, end]);
  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('ru-RU');
  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ---------- data ---------- */

const NAV_LINKS = [
  { label: 'Преимущества', href: '#features' },
  { label: 'Как это работает', href: '#how' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const FEATURES = [
  { icon: Search, title: 'Умный подбор объектов', text: 'Алгоритмы анализируют более 40 параметров и подбирают квартиры и виллы, которые совпадают с вашим образом жизни.' },
  { icon: Shield, title: 'Юридическая чистота', text: 'Полная проверка истории объекта, собственников и обременений до сделки. Гарантия безопасности каждой инвестиции.' },
  { icon: TrendingUp, title: 'Инвестиционный анализ', text: 'Прогноз доходности, сравнение районов и аналитика рынка в реальном времени — вы покупаете на основе данных.' },
  { icon: Eye, title: '3D-туры и VR-показы', text: 'Осматривайте объекты удалённо: фотореалистичные туры, планировки и видеообзоры от наших экспертов.' },
  { icon: Key, title: 'Ключи за 14 дней', text: 'Собственный юридический отдел и ипотечные партнёры сокращают срок сделки до двух недель.' },
  { icon: Award, title: 'Эксклюзивные объекты', text: '30% нашей базы недоступны на публичных площадках — закрытые продажи и партнёрские новостройки.' },
];

const STATS = [
  { end: 12400, suffix: '+', label: 'объектов в закрытой базе' },
  { end: 98, suffix: '%', label: 'довольных клиентов' },
  { end: 15, suffix: ' лет', label: 'на рынке элитной недвижимости' },
  { end: 2.4, suffix: ' млрд ₽', label: 'объём сделок за 2025 год', decimals: 1 },
];

const STEPS = [
  { icon: MapPin, title: 'Расскажите о себе', text: 'Заполните короткую анкету: район, бюджет, цели — покупка или инвестиция.' },
  { icon: Search, title: 'Получите подборку', text: 'В течение 24 часов персональный эксперт пришлёт 5–7 объектов, отфильтрованных по вашим критериям.' },
  { icon: Key, title: 'Отметьте новоселье', text: 'Мы сопровождаем показы, переговоры, ипотеку и сделку — до момента передачи ключей.' },
];

const TESTIMONIALS = [
  { name: 'Анна Соколова', role: 'Основатель бренда одежды', initials: 'АС', color: 'from-amber-400 to-orange-600', rating: 5, text: 'Искали пентхаус с террасой три месяца сами — ничего стоящего. Aurum Estates подобрали идеальный вариант за неделю и провели сделку без единого нервного дня.' },
  { name: 'Дмитрий Верховцев', role: 'Инвестор, портфель 12 объектов', initials: 'ДВ', color: 'from-sky-400 to-indigo-600', rating: 5, text: 'Аналитика доходности по районам — то, чего не даёт ни один агент на рынке. Купили две студии под аренду с прогнозом 11% годовых, цифры сошлись.' },
  { name: 'Мария и Олег Ткаченко', role: 'Семья, переехали в загородный дом', initials: 'МТ', color: 'from-emerald-400 to-teal-600', rating: 5, text: 'Юристы нашли обременение, которое скрыл продавец, и отменили сделку. Потом подобрали дом лучше и дешевле. За это им доверяешь деньги целиком.' },
];

const PLANS = [
  {
    name: 'Базовый',
    priceM: 4990,
    priceY: 3990,
    tagline: 'Для первого знакомства с рынком',
    features: ['Подбор до 5 объектов', 'Онлайн-показы и 3D-туры', 'Базовая проверка документов', 'Консультации в чате', 'Гарантия возврата депозита'],
    popular: false,
  },
  {
    name: 'Про',
    priceM: 12900,
    priceY: 9900,
    tagline: 'Полное сопровождение сделки',
    features: ['Безлимитный подбор объектов', 'Персональный эксперт 24/7', 'Глубокий юридический аудит', 'Переговоры о цене и торг', 'Ипотека и одобрение банков', 'Инвестиционный анализ районов', 'Помощь с ремонтом и переездом'],
    popular: true,
  },
  {
    name: 'Энтерпрайз',
    priceM: 34900,
    priceY: 27900,
    tagline: 'Для инвесторов и крупных покупок',
    features: ['Всё из тарифа Про', 'Закрытая база эксклюзивов', 'Управление портфелем недвижимости', 'Налоговое и валютное планирование', 'Выделенная команда из 5 специалистов', 'Приоритетные предпродажи'],
    popular: false,
  },
];

const FAQS = [
  { q: 'Работаете ли вы с вторичным рынком и заграницей?', a: 'Да. Мы ведём сделки по новостройкам, вторичному жилью и зарубежной недвижимости (Турция, ОАЭ, Таиланд, Кипр). Для зарубежных объектов у нас есть локальные партнёры-юристы.' },
  { q: 'Сколько стоит услуга подбора?', a: 'Подбор на тарифе Базовый — 4 990 ₽/мес, полное сопровождение — от 12 900 ₽/мес. При покупке объекта стоимость услуг частично вычитается из агентской комиссии. Первичная консультация бесплатна.' },
  { q: 'Как проходит проверка юридической чистоты?', a: 'Мы проверяем историю владения, судебные споры, обременения, долги по ЖКХ, маткапитал и дееспособность собственников — более 30 пунктов по чек-листу, отчёт предоставляется до выхода на сделку.' },
  { q: 'Можно ли смотреть объекты дистанционно?', a: 'Да, мы проводим live-показы по видеосвязи и предоставляем 3D-туры с замерами. Более 40% наших сделок закрываются полностью удалённо.' },
  { q: 'Помогаете ли с ипотекой?', a: 'Мы аккредитованы в 14 банках-партнёрах: подаём заявки сразу во все, сравниваем ставки и сопровождаем одобрение. Средняя экономия ставки для наших клиентов — 1,2 п.п.' },
  { q: 'Что если объект мне не подойдёт?', a: 'Подбор продолжается без ограничений по количеству вариантов, пока вы не скажете «да». Если за 60 дней объект не найден — возвращаем оплату за подписку полностью.' },
];

const FOOTER_COLS = [
  { title: 'Компания', links: ['О нас', 'Команда', 'Карьера', 'Пресса'] },
  { title: 'Услуги', links: ['Покупка', 'Продажа', 'Аренда', 'Инвестиции'] },
  { title: 'Ресурсы', links: ['Блог о рынке', 'Аналитика', 'Ипотечный калькулятор', 'Гайды'] },
  { title: 'Контакты', links: ['Москва, Пресненская наб., 12', '+7 (495) 120-40-60', 'hello@aurum-estates.ru'] },
];

/* ---------- components ---------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || open ? 'nav-scrolled py-3' : 'py-5 bg-transparent'}`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Building2 size={20} className="text-[#08080f]" strokeWidth={2.5} />
          </span>
          <span className="text-white font-bold text-lg tracking-wide">
            AURUM<span className="text-amber-400">.</span>ESTATES
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-300 hover:text-amber-300 transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            href="#cta"
            className="btn-glow gradient-bg text-[#08080f] font-semibold text-sm px-6 py-3 rounded-full inline-flex items-center gap-2 min-h-[44px]"
          >
            Подобрать объект <ArrowRight size={16} />
          </a>
        </div>

        <button
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl glass text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div
          className="lg:hidden glass mx-4 mt-3 rounded-2xl p-5 flex flex-col gap-1"
          style={{ animation: 'drawerIn .35s ease both' }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-gray-200 hover:text-amber-300 py-3 px-3 rounded-lg hover:bg-white/5 transition-colors min-h-[44px] flex items-center"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="gradient-bg text-[#08080f] font-semibold px-5 py-3.5 rounded-full mt-3 text-center min-h-[44px] flex items-center justify-center gap-2"
          >
            Подобрать объект <ArrowRight size={16} />
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
      {/* background layers */}
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="blob w-[520px] h-[520px] top-[-120px] left-[-120px] bg-amber-500/25" style={{ animation: 'blobFloat 14s ease-in-out infinite' }} />
      <div className="blob w-[420px] h-[420px] bottom-[-80px] right-[-60px] bg-yellow-600/20" style={{ animation: 'blobFloat 18s ease-in-out infinite reverse' }} />
      <div className="blob w-[300px] h-[300px] top-1/3 right-1/4 bg-orange-500/10" style={{ animation: 'pulseSoft 7s ease-in-out infinite' }} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#08080f]" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 w-full text-center">
        <div className="fade-in-up inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 text-sm text-amber-200 mb-8" style={{ animationDelay: '0.05s' }}>
          <Sparkles size={15} className="text-amber-400" />
          №1 в рейтинге агентств элитной недвижимости 2025
        </div>

        <h1
          className="fade-in-up text-white font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-6xl lg:text-7xl xl:text-[86px] max-w-5xl mx-auto"
          style={{ animationDelay: '0.2s' }}
        >
          Дом, который вы <br className="hidden sm:block" />
          <span className="gradient-text">заслуживаете</span>
        </h1>

        <p
          className="fade-in-up text-gray-300/90 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mt-7 leading-relaxed"
          style={{ animationDelay: '0.4s' }}
        >
          Закрытая база из 12 000+ объектов, персональные эксперты и полный юридический
          контроль. Находим недвижимость вашей мечты — от городской квартиры до виллы у моря.
        </p>

        <div className="fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4 mt-10" style={{ animationDelay: '0.6s' }}>
          <a
            href="#cta"
            className="btn-glow gradient-bg text-[#08080f] font-bold px-9 py-4 rounded-full inline-flex items-center gap-2 text-base min-h-[48px]"
          >
            Начать подбор <ArrowRight size={18} />
          </a>
          <a
            href="#how"
            className="btn-ghost glass text-white font-semibold px-9 py-4 rounded-full inline-flex items-center gap-2 text-base min-h-[48px]"
          >
            Как это работает
          </a>
        </div>

        <div className="fade-in-up flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-14 text-sm text-gray-400" style={{ animationDelay: '0.8s' }}>
          <span className="inline-flex items-center gap-2"><Check size={16} className="text-amber-400" /> Бесплатная консультация</span>
          <span className="inline-flex items-center gap-2"><Check size={16} className="text-amber-400" /> Гарантия возврата</span>
          <span className="inline-flex items-center gap-2"><Check size={16} className="text-amber-400" /> Сделки под ключ за 14 дней</span>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <Reveal className="text-center max-w-3xl mx-auto mb-16">
      <span className="text-amber-400 uppercase tracking-[0.25em] text-xs font-bold">{eyebrow}</span>
      <h2 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl mt-4 tracking-tight">{title}</h2>
      {sub && <p className="text-gray-400 mt-5 text-base sm:text-lg leading-relaxed">{sub}</p>}
    </Reveal>
  );
}

function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="blob w-[400px] h-[400px] top-20 left-[-150px] bg-amber-600/10" style={{ animation: 'blobFloat 16s ease-in-out infinite' }} />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <SectionHeading
          eyebrow="Преимущества"
          title="Почему клиенты выбирают нас"
          sub="Мы объединили данные, технологии и 15-летний опыт команды, чтобы покупка недвижимости стала приятной, а не стрессовой."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 120}>
              <div className="glass card-hover rounded-3xl p-7 md:p-8 h-full">
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-lg shadow-amber-500/25">
                  <f.icon size={26} className="text-[#08080f]" strokeWidth={2.2} />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed text-[15px]">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mb-16" />
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 text-center">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold gradient-text tracking-tight">
                  <Counter end={s.end} suffix={s.suffix} decimals={s.decimals || 0} />
                </div>
                <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-[220px] mx-auto">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mt-16" />
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="relative py-24 md:py-32">
      <div className="blob w-[420px] h-[420px] bottom-0 right-[-150px] bg-yellow-500/10" style={{ animation: 'blobFloat 15s ease-in-out infinite reverse' }} />
      <div className="max-w-6xl mx-auto px-5 md:px-8 relative">
        <SectionHeading
          eyebrow="Как это работает"
          title="Три шага до новоселья"
          sub="Прозрачный процесс без сюрпризов: от анкеты до ключей вас ведёт один персональный эксперт."
        />
        <div className="relative">
          {/* connector line — desktop */}
          <div className="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-amber-400/10 via-amber-400/50 to-amber-400/10" />
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 160}>
                <div className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-0">
                  <div className="relative z-10 flex flex-col items-center md:mb-7 shrink-0">
                    <div className="w-[104px] h-[104px] rounded-full glass flex items-center justify-center relative">
                      <div
                        className="absolute inset-0 rounded-full gradient-bg opacity-90 blur-[2px]"
                        style={{ maskImage: 'radial-gradient(circle, transparent 62%, black 64%)', WebkitMaskImage: 'radial-gradient(circle, transparent 62%, black 64%)' }}
                      />
                      <s.icon size={38} className="text-amber-300 relative z-10" strokeWidth={1.8} />
                      <span className="absolute -top-1 -right-1 w-9 h-9 rounded-full gradient-bg text-[#08080f] font-extrabold text-sm flex items-center justify-center shadow-lg shadow-amber-500/40 ring-4 ring-[#08080f]">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  <div className="md:text-center md:px-4">
                    <h3 className="text-white text-xl font-bold mb-3">{s.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-[15px]">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Отзывы"
          title="Истории счастливых новосёлов"
          sub="Более 3 800 семей и инвесторов уже доверили нам свои ключи. Вот что они говорят."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 140}>
              <figure className="glass card-hover rounded-3xl p-7 md:p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} size={17} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-gray-200 leading-relaxed text-[15px] flex-1">
                  «{t.text}»
                </blockquote>
                <figcaption className="flex items-center gap-4 mt-7 pt-6 border-t border-white/10">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0 ring-2 ring-white/15`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-[15px]">{t.name}</div>
                    <div className="text-gray-400 text-sm">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="blob w-[460px] h-[460px] top-10 left-1/2 -translate-x-1/2 bg-amber-500/10" style={{ animation: 'pulseSoft 8s ease-in-out infinite' }} />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <SectionHeading
          eyebrow="Тарифы"
          title="Выберите свой формат работы"
          sub="Прозрачные подписки без скрытых комиссий. Оплата списывается только после начала подбора."
        />

        <Reveal className="flex items-center justify-center gap-4 mb-14">
          <span className={`text-sm font-medium transition-colors ${!yearly ? 'text-white' : 'text-gray-500'}`}>Месяц</span>
          <button
            aria-label="Переключить период оплаты"
            onClick={() => setYearly((v) => !v)}
            className={`relative w-16 h-9 rounded-full transition-colors duration-300 ${yearly ? 'gradient-bg' : 'bg-white/15'}`}
          >
            <span
              className={`absolute top-1 left-1 w-7 h-7 rounded-full bg-white shadow-md transition-transform duration-300 ${yearly ? 'translate-x-7' : ''}`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${yearly ? 'text-white' : 'text-gray-500'}`}>
            Год
            <span className="ml-2 text-xs font-bold text-emerald-300 bg-emerald-400/10 border border-emerald-400/30 rounded-full px-2.5 py-1">−20%</span>
          </span>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 items-stretch">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 130}>
              <div
                className={`relative h-full rounded-3xl p-7 md:p-8 flex flex-col card-hover ${
                  p.popular
                    ? 'gradient-bg text-[#08080f] shadow-2xl shadow-amber-500/30 md:scale-[1.04]'
                    : 'glass'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#08080f] text-amber-300 text-xs font-bold tracking-wider uppercase rounded-full px-5 py-2 ring-1 ring-amber-400/40 whitespace-nowrap">
                    ★ Популярный
                  </span>
                )}
                <h3 className={`text-xl font-extrabold ${p.popular ? '' : 'text-white'}`}>{p.name}</h3>
                <p className={`text-sm mt-1.5 ${p.popular ? 'text-[#08080f]/70' : 'text-gray-400'}`}>{p.tagline}</p>
                <div className="mt-6 mb-7">
                  <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${p.popular ? '' : 'text-white'}`}>
                    {(yearly ? p.priceY : p.priceM).toLocaleString('ru-RU')} ₽
                  </span>
                  <span className={`text-sm ml-1.5 ${p.popular ? 'text-[#08080f]/70' : 'text-gray-400'}`}>/ мес</span>
                  {yearly && <div className={`text-xs mt-1 ${p.popular ? 'text-[#08080f]/60' : 'text-emerald-300'}`}>при оплате за год</div>}
                </div>
                <ul className="space-y-3.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px]">
                      <Check size={18} className={`mt-0.5 shrink-0 ${p.popular ? 'text-[#08080f]' : 'text-amber-400'}`} strokeWidth={3} />
                      <span className={p.popular ? 'text-[#08080f]/90' : 'text-gray-300'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  className={`mt-8 min-h-[48px] rounded-full font-bold text-center py-3.5 px-6 inline-flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-[1.03] ${
                    p.popular
                      ? 'bg-[#08080f] text-amber-300 shadow-lg'
                      : 'btn-ghost glass text-white'
                  }`}
                >
                  Выбрать {p.name} <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a, isOpen, onToggle, delay }) {
  return (
    <Reveal delay={delay}>
      <div className={`glass rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-amber-400/40' : ''}`}>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 min-h-[56px]"
        >
          <span className="text-white font-semibold text-[15px] sm:text-base">{q}</span>
          <ChevronDown
            size={20}
            className={`text-amber-400 shrink-0 transition-transform duration-400 ${isOpen ? 'rotate-180' : ''}`}
            style={{ transitionDuration: '400ms' }}
          />
        </button>
        <div className={`faq-panel ${isOpen ? 'open' : ''}`}>
          <div>
            <p className="px-6 pb-6 text-gray-400 leading-relaxed text-[15px]">{a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const half = Math.ceil(FAQS.length / 2);
  const cols = [FAQS.slice(0, half), FAQS.slice(half)];
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Частые вопросы"
          sub="Не нашли ответ? Напишите нам — эксперт перезвонит в течение 15 минут."
        />
        <div className="grid md:grid-cols-2 gap-5 items-start">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-4">
              {col.map((f) => {
                const idx = FAQS.indexOf(f);
                return (
                  <FaqItem
                    key={f.q}
                    q={f.q}
                    a={f.a}
                    delay={idx * 90}
                    isOpen={openIdx === idx}
                    onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };
  return (
    <section id="cta" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] gradient-bg px-6 sm:px-12 md:px-16 py-16 md:py-24 text-center">
            {/* decorative */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/20 blur-3xl" style={{ animation: 'pulseSoft 6s ease-in-out infinite' }} />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#08080f]/25 blur-3xl" style={{ animation: 'pulseSoft 8s ease-in-out infinite reverse' }} />
            <div className="absolute top-8 left-10 hidden md:block text-[#08080f]/25" style={{ animation: 'spinSlow 22s linear infinite' }}>
              <Sparkles size={44} />
            </div>
            <div className="absolute bottom-10 right-12 hidden md:block text-[#08080f]/25" style={{ animation: 'floaty 5s ease-in-out infinite', animationName: 'pulseSoft' }}>
              <Home size={48} />
            </div>

            <div className="relative max-w-2xl mx-auto">
              <h2 className="text-[#08080f] font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                Готовы найти дом мечты?
              </h2>
              <p className="text-[#08080f]/75 mt-5 text-base sm:text-lg leading-relaxed">
                Оставьте email — пришлём подборку объектов под ваш бюджет и запрос в течение 24 часов. Это бесплатно и без обязательств.
              </p>
              {sent ? (
                <div className="mt-9 inline-flex items-center gap-3 bg-[#08080f] text-amber-300 font-semibold rounded-full px-8 py-4">
                  <Check size={20} strokeWidth={3} /> Заявка принята! Скоро свяжемся с вами.
                </div>
              ) : (
                <form onSubmit={submit} className="mt-9 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ваш email"
                    className="flex-1 min-h-[52px] rounded-full bg-white/90 focus:bg-white outline-none px-6 text-[#08080f] placeholder-[#08080f]/45 font-medium ring-2 ring-transparent focus:ring-[#08080f]/20 transition"
                  />
                  <button
                    type="submit"
                    className="min-h-[52px] rounded-full bg-[#08080f] text-amber-300 font-bold px-8 inline-flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(8,8,15,0.45)]"
                  >
                    Получить подборку <Send size={17} />
                  </button>
                </form>
              )}
              <p className="text-[#08080f]/55 text-xs mt-5">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const socials = [IconGithub, IconTwitter, IconLinkedin, IconInstagram];
  return (
    <footer className="relative border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Building2 size={20} className="text-[#08080f]" strokeWidth={2.5} />
              </span>
              <span className="text-white font-bold text-lg tracking-wide">
                AURUM<span className="text-amber-400">.</span>ESTATES
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mt-5 max-w-xs">
              Агентство элитной недвижимости полного цикла. Подбор, проверка, сделки
              и управление активами — с 2010 года.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#top"
                  aria-label="Социальная сеть"
                  className="w-11 h-11 rounded-xl glass flex items-center justify-center text-gray-300 hover:text-amber-300 hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#top" className="text-gray-400 hover:text-amber-300 text-sm transition-colors inline-flex items-center gap-1.5 min-h-[32px]">
                      {link.startsWith('+7') ? <Phone size={13} className="text-amber-400/70" /> : null}
                      {link.includes('@') ? <Mail size={13} className="text-amber-400/70" /> : null}
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Aurum Estates. Все права защищены.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#top" className="hover:text-amber-300 transition-colors">Политика конфиденциальности</a>
            <a href="#top" className="hover:text-amber-300 transition-colors">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#08080f] text-white antialiased selection:bg-amber-400/30" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}>
      <style>{css}</style>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
