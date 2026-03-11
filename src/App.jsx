import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const EVENT_DATE = new Date("2026-04-11T20:00:00+05:30");
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=KSR+Palace+Chikkabanavara+Bangalore";
const CALENDAR_LINK =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Valima%20-%20Ubaid%20Uz%20Zaman%20and%20Heena%20Mehak%20Banagar&dates=20260411T143000Z%2F20260411T183000Z&details=Nikah%20at%2012%3A30%20PM%20(Masjid-E-Mahboobiyah)%20and%20Valima%20at%208%3A00%20PM%20(KSR%20Palace%2C%20Chikkabanavara%2C%20Bangalore).&location=KSR%20Palace%2C%20Chikkabanavara%2C%20Bangalore";
const QR_LINK = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(MAP_LINK)}`;

const EVENT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Nikah & Valima of Ubaid Uz Zaman and Heena Mehak Banagar",
  description:
    "Wedding invitation for the Nikah and Valima of Ubaid Uz Zaman and Heena Mehak Banagar on April 11, 2026 in Bangalore.",
  startDate: "2026-04-11T12:30:00+05:30",
  endDate: "2026-04-11T23:30:00+05:30",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  inLanguage: "en-IN",
  image: ["/og-cover.jpg"],
  location: {
    "@type": "Place",
    name: "KSR Palace",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chikkabanavara",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  },
};

function getCountdown() {
  const diff = EVENT_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return {
      complete: true,
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    complete: false,
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function StructuredData() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "wedding-event-schema";
    script.text = JSON.stringify(EVENT_SCHEMA);
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return null;
}

function CountdownUnit({ value, label }) {
  return (
    <div className="timer-unit" aria-label={`${label} ${value}`}>
      <span>{value}</span>
      <small>{label}</small>
    </div>
  );
}

export default function App() {
  const [countdown, setCountdown] = useState(getCountdown);
  const reducedMotion = useReducedMotion();
  const heroRef = useRef(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springX = useSpring(pointerX, { stiffness: 220, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 220, damping: 22 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const shineX = useTransform(springX, [-0.5, 0.5], [20, 80]);
  const shineY = useTransform(springY, [-0.5, 0.5], [10, 90]);

  const shineLayer = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 232, 184, 0.34), transparent 42%)`;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const revealY = useTransform(scrollYProgress, [0, 0.9], [76, -220]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  function onHeroMove(event) {
    if (reducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(x);
    pointerY.set(y);
  }

  function onHeroLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div className="app-shell">
      <StructuredData />

      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      <main>
        <section
          className="hero"
          ref={heroRef}
          onPointerMove={onHeroMove}
          onPointerLeave={onHeroLeave}
        >
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="kicker">Nikah &amp; Valima Invitation</p>
              <p className="arabic">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
              <h2>Mr. & Mrs. Mohammed Salahuddin Mansoor (Maaz)</h2>
              <h3>Of Hubli</h3>
              <h3>Solicit your gracious presence</h3>
              <h1>
                Ubaid Uz Zaman <span>&amp;</span> Heena Mehak Banagar
              </h1>

              {/* <p className="hero-text">
                A modern cinematic retelling of your matte black and gold invitation,
                crafted with depth, motion, and an interactive reveal.
              </p> */}

              <div className="hero-pills">
                <span>Saturday, April 11, 2026</span>
                <span>Bengaluru, Karnataka</span>
              </div>

              <div className="hero-actions">
                <a className="btn solid" href="#details">
                  View Details
                </a>
                <a
                  className="btn"
                  href={CALENDAR_LINK}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Add to Calendar
                </a>
              </div>
            </div>

            <div className="invitation-stage">
              <motion.div
                className="invite-card-shell"
                style={{
                  rotateX: reducedMotion ? 0 : rotateX,
                  rotateY: reducedMotion ? 0 : rotateY,
                  scale: cardScale,
                }}
              >
                <motion.div
                  className="invite-card"
                  style={{ backgroundImage: shineLayer }}
                >
                  <p className="card-ar">مَاشَاءَ ٱللَّٰهُ</p>
                  <h2>U M</h2>
                  <p className="card-date">11.04.2026</p>
                  <span className="semi-notch" />
                  <span className="tassel-string" />
                  <span className="tassel-top" />
                  <span className="tassel" />
                </motion.div>

                <motion.article
                  className="invite-insert"
                  style={{ y: reducedMotion ? 0 : revealY }}
                >
                  <p className="insert-ar">
                    بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </p>
                  <p className="insert-intro">
                    MR. &amp; MRS. MD. SALAHUDDIN MANSOOR (MAAZ)
                  </p>
                  <p className="insert-intro">
                    Of Hubli Solicit your gracious presence to bless the union
                    of their beloved son
                  </p>
                  <h3>Ubaid Uz Zaman</h3>
                  <p className="insert-join">weds</p>
                  <h3>Heena Mehak Banagar</h3>
                  <div className="insert-date-row">
                    <span>APRIL</span>
                    <strong>11</strong>
                    <span>2026</span>
                  </div>
                </motion.article>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="details" id="details">
          <div className="details-grid">
            <article className="panel timer-panel">
              <p className="kicker">Countdown</p>
              <h2>
                {countdown.complete
                  ? "Celebration in Progress"
                  : "Until Valima at 8:00 PM"}
              </h2>
              <div className="timer-grid" role="timer" aria-live="polite">
                <CountdownUnit value={countdown.days} label="Days" />
                <CountdownUnit value={countdown.hours} label="Hours" />
                <CountdownUnit value={countdown.minutes} label="Minutes" />
                <CountdownUnit value={countdown.seconds} label="Seconds" />
              </div>
            </article>

            <article className="panel schedule-panel">
              <p className="kicker">Ceremony Timeline</p>
              <h2>Saturday, April 11, 2026</h2>

              <div className="timeline-row">
                <div>
                  <h3>Nikah</h3>
                  <p>Masjid-E-Mahboobiyah, Bangalore</p>
                </div>
                <strong>12:30 PM</strong>
              </div>

              <div className="timeline-row">
                <div>
                  <h3>Valima</h3>
                  <p>KSR Palace, Chikkabanavara, Bangalore</p>
                </div>
                <strong>8:00 PM</strong>
              </div>
            </article>
          </div>
        </section>

        <section className="location">
          <article className="panel location-panel">
            <div className="location-copy">
              <p className="kicker">Location</p>
              <h2>KSR Palace, Chikkabanavara</h2>
              <p>
                Scan for location or open navigation directly in Google Maps.
              </p>

              <div className="hero-actions">
                <a
                  className="btn solid"
                  href={MAP_LINK}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Open Google Maps
                </a>
                <a
                  className="btn"
                  href={CALENDAR_LINK}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Save Event
                </a>
              </div>
            </div>

            <figure className="qr-wrap">
              <img
                src={QR_LINK}
                alt="QR code for wedding location"
                loading="lazy"
              />
              <figcaption>Scan for Location</figcaption>
            </figure>
          </article>
        </section>

        <section className="blessing">
          <article className="panel blessing-panel">
            <p className="kicker">With Best Compliments</p>
            <h2>Your Presence Is Our Honor</h2>
            <p>With warm regards from families, relatives, and friends.</p>
          </article>
        </section>
      </main>

      <footer className="site-footer">
        <p>Nikah &amp; Valima · Ubaid Uz Zaman · Heena Mehak Banagar</p>
      </footer>
    </div>
  );
}
