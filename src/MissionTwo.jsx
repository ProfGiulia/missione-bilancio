
import { useState } from 'react'
import { missionTwoErrors } from './missionTwoData'
import { balanceCategories, incomeCategories } from './data'
import './MissionTwo.css'
function shuffleArray(array) {
  const shuffled = [...array]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}
function formatEuro(value) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

function MissionTwo({ onComplete, onExit }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const total = missionTwoErrors.length
  const score = missionTwoErrors.filter(
    error => answers[error.id] === error.correctCategory
  ).length

  const allCategories = [
    ...balanceCategories.assets,
    ...balanceCategories.liabilities,
    ...incomeCategories,
  ]
  const shuffledCategories = useState(() =>
    shuffleArray(allCategories)
  )[0]

  function handleAnswer(id, value) {
    if (submitted) return

    setAnswers(prev => ({
      ...prev,
      [id]: value,
    }))
  }

  function handleSubmit() {
    if (Object.keys(answers).length !== total) return

    setSubmitted(true)
    onComplete?.(score, total)
  }

  function resetPractice() {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <main className="mission-two-page">
      <button
        type="button"
        className="secondary-mission-button"
        onClick={onExit}
      >
        ← Torna alle missioni
      </button>

      <div className="mission-two-header">
        <span className="mission-kicker">
          MISSIONE 02 · CACCIA AGLI ERRORI
        </span>

        <h1>Il bilancio sotto esame</h1>

        <p>
          Un collega ha già riclassificato il bilancio della Rossi S.r.l.,
          ma ha commesso 10 errori. Controlla ogni voce e individua
          la categoria corretta.
        </p>
      </div>

      <div className="mission-two-progress">
        <div className="progress-info">
          <strong>Il tuo controllo</strong>
          <span>{Object.keys(answers).length} / {total} errori esaminati</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${(Object.keys(answers).length / total) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="error-list">
        {missionTwoErrors.map((error, index) => {
          const correct = submitted &&
            answers[error.id] === error.correctCategory

          const category = allCategories.find(
            item => item.id === error.correctCategory
          )

          return (
            <article className="error-card" key={error.id}>
              <div className="error-card-heading">
                <span className="error-number">
                  ERRORE {String(index + 1).padStart(2, '0')}
                </span>
                <span className="error-statement">
                  {error.statement}
                </span>
              </div>

              <div className="error-item">
                <div>
                  <h3>{error.label}</h3>
                  <strong>{formatEuro(error.amount)}</strong>
                </div>

                <div className="wrong-category">
                  <span>Categoria assegnata dal collega</span>
                  <strong>
                    {allCategories.find(
                      item => item.id === error.wrongCategory
                    )?.label}
                  </strong>
                </div>
              </div>

              <label
                className="error-select-label"
                htmlFor={`answer-${error.id}`}
              >
                La tua correzione
              </label>

              <select
                id={`answer-${error.id}`}
                value={answers[error.id] || ''}
                disabled={submitted}
                onChange={e => handleAnswer(error.id, e.target.value)}
              >
                <option value="">Seleziona la categoria corretta</option>

                {shuffledCategories
                  .filter(item =>
                    error.statement === 'Stato patrimoniale'
                      ? item.id !== 'valore_produzione' &&
                      item.id !== 'costi_esterni' &&
                      item.id !== 'costo_personale' &&
                      item.id !== 'ammortamenti' &&
                      item.id !== 'gestione_finanziaria' &&
                      item.id !== 'imposte'
                      : incomeCategories.some(
                        category => category.id === item.id
                      )
                  )
                  .map(item => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
              </select>

              {submitted && (
                <div className={`error-feedback ${correct ? 'correct' : 'incorrect'}`}>
                  <strong>
                    {correct ? '✓ Risposta corretta' : '✕ Risposta errata'}
                  </strong>

                  {!correct && (
                    <p>
                      Categoria corretta: {category?.label}
                    </p>
                  )}

                  <p>{error.explanation}</p>
                </div>
              )}
            </article>
          )
        })}
      </div>

      {!submitted ? (
        <div className="mission-two-submit">
          <button
            type="button"
            className="primary-mission-button"
            disabled={Object.keys(answers).length !== total}
            onClick={handleSubmit}
          >
            Consegna il controllo
          </button>

          <p className="completion-hint">
            Devi esaminare tutti e 10 gli errori prima di consegnare.
          </p>
        </div>
      ) : (
        <section className="correction-panel">
          <span className="mission-kicker">ESITO DELLA MISSIONE</span>

          <h2>
            Hai individuato {score} errori su {total}.
          </h2>

          <p>
            Punteggio: {Math.round((score / total) * 100)}%
          </p>

          <button
            type="button"
            className="primary-mission-button"
            onClick={resetPractice}
          >
            Riprova per esercitarti
          </button>
        </section>
      )}
    </main>
  )
}

export default MissionTwo
