import React, { useEffect, useState } from 'react';

const event = {
  date: '2026 年 12 月 27 日',
  weekday: '星期日',
  venue: '台北漢來大飯店 B 廳',
  address: '115 台北市南港區經貿一路 168 號',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=台北漢來大飯店',
  email: 'aw33neihu@gmail.com',
};

const Section = ({ id, eyebrow, title, children, className = '' }) => (
  <section id={id} className={`section ${className}`}>
    <div className="container">
      {(eyebrow || title) && (
        <div className="section-heading">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {title && <h2 className="section-title">{title}</h2>}
        </div>
      )}
      {children}
    </div>
  </section>
);

const ArrowLink = ({ href, children, external = false }) => (
  <a
    className="text-link"
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noreferrer' : undefined}
  >
    {children} <span aria-hidden="true">↗</span>
  </a>
);

const ContactButton = () => {
  const [copied, setCopied] = useState(false);
  const subject = encodeURIComponent('婚宴問題｜許秉鈞與蔡禹玟');

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(event.email);
      setCopied(true);
    } catch {
      // Clipboard access is optional; the mail link below still works.
    }
    window.location.href = `mailto:${event.email}?subject=${subject}`;
  };

  return (
    <>
      <button className="button button-light" type="button" onClick={handleClick}>
        {copied ? '信箱已複製' : '聯絡新人'}
      </button>
      <a className="contact-email" href={`mailto:${event.email}`}>{event.email}</a>
    </>
  );
};

function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('/photos.json')
      .then((res) => res.json())
      .then((data) => setPhotos(data.photos || []))
      .catch((error) => console.error('無法載入照片：', error));
  }, []);

  return (
    <div className="app">
      <nav className="site-nav" aria-label="主要導覽">
        <a className="nav-mark" href="#top" aria-label="回到首頁">A&nbsp; × &nbsp;W</a>
        <div className="nav-links">
          <a href="#event">婚宴資訊</a>
          <a href="#gallery">照片</a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-kicker">許府 &amp; 蔡府婚宴</p>
          <h1>許秉鈞 <span>&amp;</span> 蔡禹玟</h1>
          <p className="hero-date">{event.date} · {event.weekday} · 中午 12 點</p>
          <p className="hero-venue">台北漢來大飯店 · B 廳</p>
          <a className="hero-scroll" href="#event">查看婚宴資訊 <span>↓</span></a>
        </div>
      </header>

      <main>
        <Section eyebrow="親愛的家人與朋友" title="謝謝你來到這裡">
          <div className="intro-copy">
            <p>
              從在美國加州的相遇，到一起把日常過成值得記住的片段，
              我們很幸運在茫茫人海中遇見彼此。
            </p>
            <p>
              想邀請你在這一天來到台北內湖，我們的家鄉，和我們一起吃頓飯、聊聊天，
              見證我們成為家人的時刻。
            </p>
          </div>
        </Section>

        <Section id="event" eyebrow="請先收藏這一天" title="婚宴資訊" className="section-tint">
          <div className="event-layout">
            <div className="date-card">
              <p className="date-card-label">SAVE THE DATE</p>
              <p className="date-card-month">DEC</p>
              <p className="date-card-day">27</p>
              <p className="date-card-year">2026 · {event.weekday}</p>
            </div>

            <div className="event-details">
              <div className="detail-row">
                <span className="detail-icon" aria-hidden="true">⌖</span>
                <div>
                  <p className="detail-label">地點</p>
                  <h3>{event.venue}</h3>
                  <p>{event.address}</p>
                  <ArrowLink href={event.mapUrl} external>開啟地圖</ArrowLink>
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-icon" aria-hidden="true">◷</span>
                <div>
                  <p className="detail-label">時間</p>
                  <h3>12:00 賓客入席</h3>
                  <p>午宴 · 純宴客</p>
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-icon" aria-hidden="true">✦</span>
                <div>
                  <p className="detail-label">當日安排</p>
                  <h3>西式證婚儀式</h3>
                  <p>詳細流程與儀式時間將於婚期前更新。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="travel-strip">
            <div>
              <p className="detail-label">前往方式</p>
              <p><strong>捷運</strong> 南港展覽館站，步行約 6 分鐘</p>
            </div>
            <div>
              <p className="detail-label">自行開車</p>
              <p>飯店設有地下停車場，抵達後依現場指示即可。</p>
            </div>
            <a className="button button-dark" href={event.mapUrl} target="_blank" rel="noreferrer">規劃路線</a>
          </div>
        </Section>

        <Section eyebrow="一起來吃飯吧" title="我們的家人">
          <div className="family-grid">
            <div className="family-card">
              <p className="detail-label">男方主婚人</p>
              <p>父 許萬寶</p>
              <p>母 尹曉穎</p>
            </div>
            <div className="family-card">
              <p className="detail-label">女方主婚人</p>
              <p>父 蔡有光</p>
              <p>母 王慧芬</p>
            </div>
          </div>
          <p className="family-note">謝謝家人一路上的支持與陪伴，讓我們能放心走向人生的下一站。</p>
        </Section>

        <Section eyebrow="留下一段影像" title="影片" className="section-tint">
          <div className="video-card">
            <div className="video-frame">
              <iframe
                src="https://www.youtube.com/embed/I3sfu55HY64"
                title="許秉鈞與蔡禹玟的婚禮影片"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <a className="video-link" href="https://www.youtube.com/watch?v=I3sfu55HY64" target="_blank" rel="noreferrer">
              在 YouTube 開啟影片 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Section>

        <Section id="gallery" eyebrow="一些我們很喜歡的日子" title="照片">
          <div className="gallery-grid">
            {photos.length > 0 ? photos.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`許秉鈞與蔡禹玟的回憶照片 ${index + 1}`}
              />
            )) : (
              <p className="loading-copy">照片準備中⋯</p>
            )}
          </div>
        </Section>

        <section className="closing-section">
          <div className="container closing-content">
            <p className="eyebrow">2026 · 12 · 27</p>
            <h2>期待在台北見到你</h2>
            <p>如果有任何婚宴相關問題，歡迎來信與我們聯絡。</p>
            <ContactButton />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>許秉鈞 &amp; 蔡禹玟 · 2026</p>
        <p>期待與你分享這一天</p>
      </footer>
    </div>
  );
}

export default App;
