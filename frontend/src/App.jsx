import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Simple components defined inline for speed, can be extracted later
const Section = ({ title, children, className = "" }) => (
  <section className={`section ${className}`}>
    <div className="container">
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
          style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}
        >
          {title}
        </motion.h2>
      )}
      {children}
    </div>
  </section>
);

const dressCodeColors = [
  { name: 'Navy', value: '#2F5578' },
  { name: 'Dusty Blue', value: '#C4D5D9' },
  { name: 'Dusty Rose', value: '#D9A1A2' },
  { name: 'Blush', value: '#D9C0BC' },
  { name: 'Taupe', value: '#D2BCA4' },
  { name: 'Sage', value: '#A8B89C' },
];



const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/likes')
      .then(res => res.json())
      .then(data => setLikes(data.likes))
      .catch(err => console.error('Error fetching likes:', err));
  }, []);

  const handleLike = () => {
    if (loading) return;
    setLoading(true);
    fetch('/api/likes', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setLikes(data.likes);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error liking:', err);
        setLoading(false);
      });
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
      <motion.button
        onClick={handleLike}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          background: 'var(--color-accent)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}
      >
        ❤️
        <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{likes}</span>
      </motion.button>
    </div>
  );
};

function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('/photos.json')
      .then(res => res.json())
      .then(data => {
        const shuffled = [...data.photos].sort(() => Math.random() - 0.5);
        setPhotos(shuffled.slice(0, 30));
      })
      .catch(err => console.error('Error fetching photos:', err));
  }, []);

  return (
    <div className="app">
      {/* Hero Section */}
      <header style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/photos/DSC04155.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 65%',
        color: '#fff'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: '5rem', color: 'var(--color-primary)' }}>Adrian & Winnie</h1>
          <p style={{ fontSize: '1.5rem', marginTop: '1rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            August 23, 2026
          </p>
          <div style={{ marginTop: '2rem' }}>
            <span style={{ margin: '0 1rem', display: 'block', fontSize: '1.5rem' }}>Saratoga Springs Events & Weddings</span>
            <span style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>Long Bridge</span>
          </div>
        </motion.div>
      </header>

      {/* Intro Section */}
      <Section title="Our Story">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong>2023:</strong> We matched on Hinge.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong>The Journey:</strong> From West Coast sunsets to East Coast springs, and coffee in Hanoi to vintage wine in Porto. We’ve spent three years collecting miles, discovering hidden gems, and curating the perfect travel playlist.
          </p>
          <p>
            <strong>2026:</strong> We drop a pin on our most important destination yet: our wedding.
          </p>
        </div>
      </Section>

      {/* Event Details */}
      <Section title="The Wedding" className="bg-light">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--color-accent)' }}>Ceremony & Reception</h3>
            <p style={{ fontSize: '1.2rem' }}>Sunday, August 23, 2026</p>
            <p>10:00 AM - 3:00 PM PST</p>
            <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Saratoga Springs Events & Weddings</p>
            <p>Long Bridge Area</p>
            <p>22801 Big Basin Wy, Saratoga, CA 95070</p>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}><a href="https://maps.app.goo.gl/MdzD5KugmAnK3pfJ6" target="_blank" style={{ textDecoration: 'underline' }}>Open in Maps</a></p>
          </div>

          <div style={{ padding: '2rem', border: '1px solid var(--color-primary)', borderRadius: '8px' }}>
            <h3 style={{ color: 'var(--color-secondary)' }}>Logistics</h3>
            <p style={{ marginBottom: '1rem' }}><strong>Getting There:</strong></p>
            <ul style={{ listStyle: 'none', marginBottom: '1.5rem', textAlign: 'left', paddingLeft: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>🚗 <strong>From SFO:</strong> ~40-50 mins (36 miles) via US-101 S and CA-85 S.</li>
              <li style={{ marginBottom: '0.5rem' }}>✈️ <strong>From SJC Airport:</strong> ~20 mins (12 miles) via CA-85 N.</li>
            </ul>

            <div style={{ width: '100%', height: '300px', marginBottom: '2rem', borderRadius: '4px', overflow: 'hidden' }}>
              <iframe
                src="https://maps.google.com/maps?q=Saratoga+Springs+Events+%26+Weddings+22801+Big+Basin+Wy,+Saratoga,+CA+95070&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy">
              </iframe>
            </div>

            <h3 style={{ color: 'var(--color-secondary)', marginTop: '2rem' }}>Where to Stay</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>

              <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h4 style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>Saratoga Oaks Lodge</h4>
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Peaceful lodge setting, very close to the venue (2.8 km).</p>
                <a href="https://www.saratogaoakslodge.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>View Website &rarr;</a>
              </div>

              <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h4 style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>The Inn at Saratoga</h4>
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Boutique hotel in downtown Saratoga. Central to festivities.</p>
                <a href="https://www.innatsaratoga.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>View Website &rarr;</a>
              </div>

              <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h4 style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>Juniper Hotel</h4>
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Curio Collection by Hilton. Modern amenities in nearby Cupertino.</p>
                <a href="https://www.hilton.com/en/hotels/sjcccqq-juniper-hotel-cupertino/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>View Website &rarr;</a>
              </div>

            </div>
          </div>
        </div>
      </Section>

      {/* Dress Code */}
      <Section title="Dress Code">
        <div className="dress-code">
          <p>We kindly request Formal Attire ✨</p>
          <p>
            Also invite our guests to join us in our color story by wearing
            shades as shown below 🎨
          </p>
          <div className="dress-code-palette" aria-label="Suggested color palette">
            {dressCodeColors.map((color) => (
              <div className="dress-code-swatch-wrap" key={color.name}>
                <span
                  className="dress-code-swatch"
                  style={{ backgroundColor: color.value }}
                  aria-label={color.name}
                />
                <span>{color.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Highlights */}
      <Section title="What to Expect">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={{ padding: '2rem', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h4 style={{ color: 'var(--color-accent)' }}>Taiwanese Catering</h4>
            <p>Authentic flavors brought directly to your table.</p>
          </div>
          <div style={{ padding: '2rem', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h4 style={{ color: 'var(--color-accent)' }}>Taiwanese Toys</h4>
            <p>Nostalgic fun for everyone.</p>
          </div>
          <div style={{ padding: '2rem', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h4 style={{ color: 'var(--color-accent)' }}>Taiwanese Boba Tea</h4>
            <p>No more over-sweetened US boba tea. Try out the authentic ones.</p>
          </div>
          <div style={{ padding: '2rem', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h4 style={{ color: 'var(--color-accent)' }}>Taiwanese Wedding Cake</h4>
            <p>Brought from Taiwan, our hometown memories.</p>
          </div>
        </div>
      </Section>

      {/* RSVP */}
      <Section title="RSVP">
        <div style={{ textAlign: 'center', padding: '4rem', background: '#eee' }}>
          <p style={{ marginBottom: '2rem' }}>
            Please let us know if you can celebrate with us.
          </p>
          <a
            className="btn"
            href="https://forms.gle/xsU4gJGTKHa4YL1H8"
            target="_blank"
            rel="noreferrer"
          >
            RSVP Form
          </a>
        </div>
      </Section>

      {/* Honeymoon Fund */}
      <Section title="Honeymoon Fund">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ marginBottom: '2rem' }}>
            If you'd like to contribute to our honeymoon adventures, you can do so via Zelle. We will be using the funds to cover our wedding/honeymoon expenses.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', minWidth: '200px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Adrian Hsu</h4>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>213-618-2606</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Zelle</p>
            </div>
            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', minWidth: '200px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Winnie Tsay</h4>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>949-527-8416</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Zelle</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section title="Memories">
        <div style={{ columns: '3 200px', gap: '1rem' }}>
          {photos.length > 0 ? photos.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt="Gallery"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ width: '100%', marginBottom: '1rem', borderRadius: '4px' }}
            />
          )) : (
            <p style={{ textAlign: 'center' }}>Loading beautiful photos...</p>
          )}
        </div>
      </Section>

      {/* RSVP Placeholder */}


      <LikeButton />

      <footer style={{ padding: '2rem', textAlign: 'center', fontSize: '0.9rem', opacity: 0.6 }}>
        <p>&copy; 2026 Adrian & Winnie. Built with Vercel + React + Fast API</p>
      </footer>
    </div>
  );
}

export default App;
