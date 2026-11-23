
import { useState, useEffect } from 'react'
import MissionOne from './MissionOne'
import MissionTwo from './MissionTwo'
import './App.css'
import { jsPDF } from 'jspdf'

function loadProgress() {
  try {
    const saved = localStorage.getItem('missione-bilancio-progress')
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}
function downloadCertificate(student, missionOneResult, missionTwoResult) {
  const doc = new jsPDF()

  const totalScore = missionOneResult.score + missionTwoResult.score
  const totalQuestions = missionOneResult.total + missionTwoResult.total
  const percentage = Math.round((totalScore / totalQuestions) * 100)

  const date = new Date().toLocaleDateString('it-IT')

  // Sfondo
  doc.setFillColor(245, 248, 250)
  doc.rect(0, 0, 210, 297, 'F')

  // Cornice
  doc.setDrawColor(25, 65, 85)
  doc.setLineWidth(1.5)
  doc.rect(12, 12, 186, 273)

  // Titolo
  doc.setTextColor(25, 65, 85)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(25)
  doc.text('ATTESTATO DI PARTECIPAZIONE', 105, 48, { align: 'center' })

  doc.setFontSize(13)
  doc.setFont('helvetica', 'normal')
  doc.text('LABORATORIO DI ECONOMIA AZIENDALE', 105, 62, { align: 'center' })

  // Nome studente
  doc.setTextColor(40, 50, 60)
  doc.setFontSize(14)
  doc.text('Si attesta che', 105, 95, { align: 'center' })

  doc.setTextColor(25, 65, 85)
  doc.setFontSize(23)
  doc.setFont('helvetica', 'bold')
  doc.text(`${student.name} ${student.surname}`, 105, 113, { align: 'center' })

  doc.setFontSize(13)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(40, 50, 60)
  doc.text(`Classe: ${student.className}`, 105, 125, { align: 'center' })

  doc.text('ha completato con successo le due missioni del laboratorio,', 105, 148, { align: 'center' })
  doc.text('dimostrando capacità di analisi e classificazione contabile.', 105, 157, { align: 'center' })

  // Risultati
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(25, 65, 85)
  doc.text('RISULTATI OTTENUTI', 105, 183, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(13)
  doc.setTextColor(40, 50, 60)
  doc.text(`Missione 1 - Riclassificazione: ${missionOneResult.score}/${missionOneResult.total}`, 105, 198, { align: 'center' })
  doc.text(`Missione 2 - Individuazione errori: ${missionTwoResult.score}/${missionTwoResult.total}`, 105, 209, { align: 'center' })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(17)
  doc.setTextColor(25, 65, 85)
  doc.text(`PUNTEGGIO FINALE: ${totalScore}/${totalQuestions} (${percentage}%)`, 105, 232, { align: 'center' })

  // Data
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  doc.setTextColor(70, 80, 90)
  doc.text(`Data di completamento: ${date}`, 105, 258, { align: 'center' })

  doc.save(`Attestato_${student.surname}_${student.name}.pdf`)
}
function App() {
const [student, setStudent] = useState(() =>
  loadProgress().student || {
    name: '',
    surname: '',
    className: '',
  }
)

const [started, setStarted] = useState(() =>
  Boolean(loadProgress().started)
)

const [activeMission, setActiveMission] = useState(null)

const [missionOneResult, setMissionOneResult] = useState(() =>
  loadProgress().missionOneResult || null
)

const [missionTwoResult, setMissionTwoResult] = useState(() =>
  loadProgress().missionTwoResult || null
)
useEffect(() => {
  localStorage.setItem(
    'missione-bilancio-progress',
    JSON.stringify({
      student,
      started,
      missionOneResult,
      missionTwoResult,
    })
  )
}, [student, started, missionOneResult, missionTwoResult])
  function handleChange(e) {
    const { name, value } = e.target
    setStudent(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (
      student.name.trim() &&
      student.surname.trim() &&
      student.className.trim()
    ) {
      setStarted(true)
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Missione Bilancio">
          <span className="brand-icon">MB</span>
          <span>MISSIONE <strong>BILANCIO</strong></span>
        </a>
        <span className="topbar-label">LABORATORIO DI ECONOMIA AZIENDALE</span>
      </header>

      {!started ? (
        <main>
          <section className="hero">
            <div className="hero-content">
              <span className="eyebrow">
                <span className="eyebrow-dot"></span>
                LABORATORIO INTERATTIVO · QUINTA SIA
              </span>

              <h1>
                Missione
                <span>Bilancio.</span>
              </h1>

              <p className="hero-description">
                Un'azienda, un bilancio da sistemare e alcuni errori da
                scoprire. Mettiti alla prova e dimostra le tue competenze
                di economia aziendale.
              </p>

              <div className="hero-tags">
                <span>01 · Riclassificazione</span>
                <span>02 · Caccia agli errori</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-card visual-card-back">
                <span className="visual-small">REPORT AZIENDALE</span>
                <div className="fake-lines">
                  <i></i><i></i><i></i><i></i>
                </div>
              </div>
              <div className="visual-card visual-card-front">
                <div className="document-top">
                  <span className="document-icon">▤</span>
                  <span>DOCUMENTO RISERVATO</span>
                </div>
                <div className="document-title">ROSSI S.r.l.</div>
                <div className="document-subtitle">
                  Bilancio d'esercizio 2025
                </div>
                <div className="document-divider"></div>
                <div className="document-row">
                  <span>Totale attivo</span>
                  <strong>500.000 €</strong>
                </div>
                <div className="document-row">
                  <span>Totale fonti</span>
                  <strong>500.000 €</strong>
                </div>
                <div className="document-row">
                  <span>Utile d'esercizio</span>
                  <strong className="gold-text">22.000 €</strong>
                </div>
                <div className="document-stamp">DA VERIFICARE</div>
              </div>
              <div className="floating-number">01 / 02</div>
            </div>
          </section>

          <section className="intro-section">
            <div className="section-heading">
              <span className="section-kicker">IL TUO INCARICO</span>
              <h2>Sei pronto a diventare un consulente?</h2>
              <p>
                La Rossi S.r.l. ha affidato al tuo studio di consulenza
                un incarico importante. Prima di presentare il bilancio
                alla banca, occorre verificarlo e riclassificarlo.
              </p>
            </div>

            <div className="mission-preview">
              <article className="mission-card">
                <div className="mission-icon blue">01</div>
                <div>
                  <span className="card-label">PRIMA MISSIONE</span>
                  <h3>Riclassifica il bilancio</h3>
                  <p>
                    Sistema lo Stato patrimoniale e il Conto economico
                    nelle rispettive categorie.
                  </p>
                </div>
              </article>

              <article className="mission-card">
                <div className="mission-icon gold">02</div>
                <div>
                  <span className="card-label">SECONDA MISSIONE</span>
                  <h3>Trova gli errori</h3>
                  <p>
                    Controlla il lavoro di un collega e correggi
                    le classificazioni sbagliate.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="student-section">
            <div className="student-panel">
              <div className="student-heading">
                <span className="section-kicker">PRIMA DI INIZIARE</span>
                <h2>Identificati, consulente.</h2>
                <p>
                  Inserisci i tuoi dati per personalizzare il tuo
                  percorso e l'attestato finale.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="student-form">
                <div className="form-field">
                  <label htmlFor="name">Nome</label>
                  <input
                    id="name"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    placeholder="Il tuo nome"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="surname">Cognome</label>
                  <input
                    id="surname"
                    name="surname"
                    value={student.surname}
                    onChange={handleChange}
                    placeholder="Il tuo cognome"
                    required
                  />
                </div>

                <div className="form-field full-field">
                  <label htmlFor="className">Classe</label>
                  <input
                    id="className"
                    name="className"
                    value={student.className}
                    onChange={handleChange}
                    placeholder="Es. 5 A SIA"
                    required
                  />
                </div>

                <button className="start-button" type="submit">
                  INIZIA LA MISSIONE <span>→</span>
                </button>
              </form>
            </div>
          </section>
        </main>
      ) : activeMission === 1 ? (
  <MissionOne
    onExit={() => setActiveMission(null)}
    onComplete={(score, total) => {
      if (!missionOneResult) {
        setMissionOneResult({ score, total })
      }
    }}
  />
) : activeMission === 2 ? (
  <MissionTwo
    onExit={() => setActiveMission(null)}
    onComplete={(score, total) => {
      if (!missionTwoResult) {
        setMissionTwoResult({ score, total })
      }
    }}
  />
) : (
        <main className="dashboard">
          <div className="welcome-panel">
            <span className="section-kicker">AREA PERSONALE</span>
            <h1>
              Benvenuto, {student.name}!
            </h1>
            <p>
              {student.surname} · Classe {student.className}
            </p>
            <p className="dashboard-description">
              Il tuo incarico presso lo studio di consulenza
              Rossi S.r.l. sta per iniziare.
            </p>
          </div>

{missionOneResult && missionTwoResult && (
  <div className="certificate-section">
    <h2>Hai completato entrambe le missioni!</h2>
    <p>
      Il tuo punteggio complessivo è{' '}
      {missionOneResult.score + missionTwoResult.score}/
      {missionOneResult.total + missionTwoResult.total}.
    </p>
    <button
      className="primary-button"
      onClick={() =>
        downloadCertificate(student, missionOneResult, missionTwoResult)
      }
    >
      Scarica il tuo attestato PDF
    </button>
  </div>
)}
<h2>Le tue missioni</h2>

<div className="dashboard-missions">
  <article
    className="mission-card dashboard-card"
    onClick={() => setActiveMission(1)}
    style={{ cursor: 'pointer' }}
  >
    <div className="mission-icon blue">01</div>
    <div>
      <span className="card-label">PRIMA MISSIONE</span>
      <h3>Riclassifica il bilancio</h3>
      <p>Stato patrimoniale e Conto economico.</p>

      {missionOneResult ? (
        <span className="coming-soon">
          COMPLETATA · {missionOneResult.score}/{missionOneResult.total} RISPOSTE CORRETTE
        </span>
      ) : (
        <span className="coming-soon">INIZIA LA MISSIONE →</span>
      )}
    </div>
  </article>

  <article
    className="mission-card dashboard-card"
    onClick={() => setActiveMission(2)}
    style={{ cursor: 'pointer' }}
  >
    <div className="mission-icon gold">02</div>
    <div>
      <span className="card-label">SECONDA MISSIONE</span>
      <h3>Trova gli errori</h3>
      <p>Individua e correggi le classificazioni errate.</p>

      {missionTwoResult ? (
        <span className="coming-soon">
          COMPLETATA · {missionTwoResult.score}/{missionTwoResult.total} RISPOSTE CORRETTE
        </span>
      ) : (
        <span className="coming-soon">INIZIA LA MISSIONE →</span>
      )}
    </div>
  </article>
</div>

        </main>
      )}

      <footer className="footer">
        <span>MISSIONE BILANCIO</span>
        <span>LABORATORIO DI ECONOMIA AZIENDALE · QUINTA SIA</span>
      </footer>
    </div>
  )
}

export default App
