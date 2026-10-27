

function App() {
  // Número de WhatsApp del hotel (formato internacional sin espacios ni +)
  const whatsappNumber = '50370000000'; // Ajusta con el número real del hotel
  const whatsappMessage = encodeURIComponent(
    '¡Hola! Me gustaría consultar disponibilidad de habitaciones en Flowers Hotel Inn.'
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {/* 1. BARRA DE NAVEGACIÓN */}
      <header style={{ background: '#1e293b', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Flowers Hotel Inn</h2>
        <nav>
          <a href="#inicio" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Inicio</a>
          <a href="#habitaciones" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Habitaciones</a>
          <a href="/login" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>Acceso Personal</a>
        </nav>
      </header>

      {/* 2. HERO / BANNER PRINCIPAL */}
      <section id="inicio" style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#f1f5f9' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Bienvenido a Flowers Hotel Inn</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Tu descanso ideal con el mejor confort y atención.</p>
        
        {/* BOTÓN DIRECTO A WHATSAPP */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#25D366',
            color: 'white',
            padding: '0.8rem 1.5rem',
            borderRadius: '25px',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          📱 Reservar por WhatsApp
        </a>
      </section>

      {/* 3. CATÁLOGO DE HABITACIONES */}
      <section id="habitaciones" style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Nuestras Habitaciones</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Tarjeta Habitación 1 */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>Habitación Individual</h3>
            <p>Ideal para viajes de negocios o descanso personal.</p>
            <p><strong>Desde $35.00 / noche</strong></p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola, deseo información sobre la Habitación Individual.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#25D366', fontWeight: 'bold', textDecoration: 'none' }}
            >
              Consultar Disponibilidad →
            </a>
          </div>

          {/* Tarjeta Habitación 2 */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>Habitación Doble / Matrimonial</h3>
            <p>Espaciosa, con aire acondicionado y TV por cable.</p>
            <p><strong>Desde $50.00 / noche</strong></p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola, deseo información sobre la Habitación Doble.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#25D366', fontWeight: 'bold', textDecoration: 'none' }}
            >
              Consultar Disponibilidad →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;