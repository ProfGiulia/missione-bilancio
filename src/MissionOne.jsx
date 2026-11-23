
import { useMemo, useState } from 'react'
import {
  balanceSheet,
  balanceCategories,
  incomeStatement,
  incomeCategories,
} from './data'
import './MissionOne.css'

function formatEuro(value) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

function ClassificationSection({
  title,
  description,
  items,
  categories,
  answers,
  onAnswer,
  disabled,
}) {
  const [draggedId, setDraggedId] = useState(null)

  const assignedItems = useMemo(() => {
    return categories.map(category => ({
      ...category,
      items: items.filter(item => answers[item.id] === category.id),
    }))
  }, [items, categories, answers])

  const unassigned = items.filter(item => !answers[item.id])

  function handleDrop(categoryId) {
    if (!draggedId || disabled) return
    onAnswer(draggedId, categoryId)
    setDraggedId(null)
  }

  return (
    <section className="classification-section">
      <div className="classification-heading">
        <div>
          <span className="mission-kicker">CLASSIFICAZIONE</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className="item-count">
          {items.length} voci
        </span>
      </div>

      <div className="classification-workspace">
        <div className="source-column">
          <h3>Voci da classificare</h3>
          <p className="column-hint">
            Trascina le voci nella categoria corretta oppure usa il menu.
          </p>

          <div className="source-list">
            {unassigned.map(item => (
              <article
                key={item.id}
                className="source-item"
                draggable={!disabled}
                onDragStart={() => setDraggedId(item.id)}
                onDragEnd={() => setDraggedId(null)}
              >
                <div>
                  <strong>{item.label}</strong>
                  <span>{formatEuro(item.amount)}</span>
                </div>
                <select
                  aria-label={`Categoria per ${item.label}`}
                  value=""
                  disabled={disabled}
                  onChange={e => onAnswer(item.id, e.target.value)}
                >
                  <option value="">Scegli categoria</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </article>
            ))}
            {unassigned.length === 0 && (
              <p className="all-assigned">
                Tutte le voci sono state assegnate.
              </p>
            )}
          </div>
        </div>

        <div className="target-column">
          <h3>Le tue categorie</h3>
          <p className="column-hint">
            Puoi spostare una voce in un'altra categoria in qualsiasi momento.
          </p>

          <div className="category-list">
            {assignedItems.map(category => (
              <div
                key={category.id}
                className="category-box"
                onDragOver={e => {
                  if (!disabled) e.preventDefault()
                }}
                onDrop={() => handleDrop(category.id)}
              >
                <div className="category-title">
                  <strong>{category.label}</strong>
                  <span>{category.items.length}</span>
                </div>

                {category.items.length === 0 ? (
                  <div className="empty-category">
                    Trascina qui le voci
                  </div>
                ) : (
                  category.items.map(item => (
                    <div key={item.id} className="assigned-item">
                      <div>
                        <strong>{item.label}</strong>
                        <span>{formatEuro(item.amount)}</span>
                      </div>
                      <button
                        type="button"
                        className="remove-assignment"
                        disabled={disabled}
                        onClick={() => onAnswer(item.id, '')}
                        aria-label={`Rimuovi ${item.label}`}
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MissionOne({ onComplete, onExit }) {
const [step, setStep] = useState('assets')
  const [assetAnswers, setAssetAnswers] = useState({})
  const [liabilityAnswers, setLiabilityAnswers] = useState({})
  const [incomeAnswers, setIncomeAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showCorrection, setShowCorrection] = useState(false)

  const sections = [
    { id: 'assets', label: 'Attivo' },
    { id: 'liabilities', label: 'Passivo e patrimonio netto' },
    { id: 'income', label: 'Conto economico' },
  ]

  const currentItems =
    step === 'assets'
      ? balanceSheet.assets
      : step === 'liabilities'
        ? balanceSheet.liabilities
        : incomeStatement

  const currentCategories =
    step === 'assets'
      ? balanceCategories.assets
      : step === 'liabilities'
        ? balanceCategories.liabilities
        : incomeCategories

  const currentAnswers =
    step === 'assets'
      ? assetAnswers
      : step === 'liabilities'
        ? liabilityAnswers
        : incomeAnswers

  const currentSetter =
    step === 'assets'
      ? setAssetAnswers
      : step === 'liabilities'
        ? setLiabilityAnswers
        : setIncomeAnswers

  const totalItems =
    balanceSheet.assets.length +
    balanceSheet.liabilities.length +
    incomeStatement.length

  const answeredCount =
    Object.keys(assetAnswers).length +
    Object.keys(liabilityAnswers).length +
    Object.keys(incomeAnswers).length

  const isComplete = answeredCount === totalItems

  const allItems = [
    ...balanceSheet.assets,
    ...balanceSheet.liabilities,
    ...incomeStatement,
  ]

  const allAnswers = {
    ...assetAnswers,
    ...liabilityAnswers,
    ...incomeAnswers,
  }

  const score = allItems.reduce((total, item) => {
    return total + (allAnswers[item.id] === item.category ? 1 : 0)
  }, 0)

  function handleAnswer(id, categoryId) {
    if (submitted) return
    currentSetter(prev => {
      const next = { ...prev }
      if (categoryId) next[id] = categoryId
      else delete next[id]
      return next
    })
  }

  function handleSubmit() {
    if (!isComplete) return
    setSubmitted(true)
    setShowCorrection(true)
    onComplete?.(score, totalItems)
  }

  function resetPractice() {
    setAssetAnswers({})
    setLiabilityAnswers({})
    setIncomeAnswers({})
    setSubmitted(false)
    setShowCorrection(false)
    setStep('assets')
  }

  return (
    <main className="mission-one-page">
        <button
  type="button"
  className="secondary-mission-button"
  onClick={onExit}
>
  ← Torna alle missioni
</button>
      <div className="mission-one-header">
        <span className="mission-kicker">MISSIONE 01 · RICLASSIFICAZIONE</span>
        <h1>Metti ordine nel bilancio</h1>
        <p>
          La Rossi S.r.l. ti ha affidato il compito di riclassificare
          il bilancio dell'esercizio 2025. Assegna ogni voce alla
          categoria corretta.
        </p>
      </div>

      <div className="mission-progress">
        <div className="progress-info">
          <strong>Il tuo lavoro</strong>
          <span>{answeredCount} / {totalItems} voci assegnate</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${(answeredCount / totalItems) * 100}%` }}
          />
        </div>
      </div>

      <nav className="mission-tabs">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            className={step === section.id ? 'active' : ''}
            onClick={() => setStep(section.id)}
          >
            <span>0{index + 1}</span>
            {section.label}
          </button>
        ))}
      </nav>

      <ClassificationSection
        title={
          step === 'assets'
            ? 'Attivo'
            : step === 'liabilities'
              ? 'Passivo e patrimonio netto'
              : 'Conto economico a valore aggiunto'
        }
        description={
          step === 'assets'
            ? 'Classifica gli impieghi secondo il criterio finanziario.'
            : step === 'liabilities'
              ? 'Classifica le fonti in base alla loro natura e scadenza.'
              : 'Ricostruisci lo schema a valore aggiunto.'
        }
        items={currentItems}
        categories={currentCategories}
        answers={currentAnswers}
        onAnswer={handleAnswer}
        disabled={submitted}
      />

      <div className="mission-navigation">
        <button
          type="button"
          className="secondary-mission-button"
          disabled={step === 'assets'}
          onClick={() => setStep(sections[sections.findIndex(s => s.id === step) - 1].id)}
        >
          ← Indietro
        </button>

        {step !== 'income' ? (
          <button
            type="button"
            className="primary-mission-button"
            onClick={() => setStep(sections[sections.findIndex(s => s.id === step) + 1].id)}
          >
            Continua →
          </button>
        ) : (
          <button
            type="button"
            className="primary-mission-button"
            disabled={!isComplete || submitted}
            onClick={handleSubmit}
          >
            Consegna il lavoro
          </button>
        )}
      </div>

      {!isComplete && !submitted && (
        <p className="completion-hint">
          Per consegnare devi assegnare tutte le {totalItems} voci.
        </p>
      )}
{showCorrection && (
  <section className="correction-panel">
    <span className="mission-kicker">SOLUZIONE · CONTO ECONOMICO</span>
    <h2>Il prospetto a valore aggiunto</h2>
    <p>Ecco come si ricostruisce il risultato economico della Rossi S.r.l.</p>

    <div className="correction-list">
      <div className="correction-item">
        <div>
          <strong>Ricavi delle vendite</strong>
          <p>620.000 €</p>
        </div>
      </div>

      <div className="correction-item">
        <div>
          <strong>Altri ricavi e proventi</strong>
          <p>8.000 €</p>
        </div>
      </div>

      <div className="correction-item correct">
        <div>
          <strong>Valore della produzione</strong>
          <p>628.000 €</p>
        </div>
      </div>

      <div className="correction-item">
        <div>
          <strong>Acquisti di merci</strong>
          <p>−400.000 €</p>
        </div>
      </div>

      <div className="correction-item">
        <div>
          <strong>Incremento delle rimanenze di merci</strong>
          <p>+15.000 €</p>
        </div>
      </div>

      <div className="correction-item">
        <div>
          <strong>Costi per servizi</strong>
          <p>−62.000 €</p>
        </div>
      </div>

      <div className="correction-item">
        <div>
          <strong>Costi per godimento di beni di terzi</strong>
          <p>−18.000 €</p>
        </div>
      </div>

      <div className="correction-item">
        <div>
          <strong>Altri oneri di gestione</strong>
          <p>−7.000 €</p>
        </div>
      </div>

      <div className="correction-item correct">
        <div>
          <strong>Valore aggiunto</strong>
          <p>156.000 €</p>
        </div>
      </div>

      <div className="correction-item">
        <div>
          <strong>Costo del personale</strong>
          <p>−95.000 €</p>
        </div>
      </div>

      <div className="correction-item correct">
        <div>
          <strong>EBITDA (Margine operativo lordo)</strong>
          <p>61.000 €</p>
        </div>
      </div>

      <div className="correction-item">
        <div>
          <strong>Ammortamenti</strong>
          <p>−24.000 €</p>
        </div>
      </div>

      <div className="correction-item correct">
        <div>
          <strong>Reddito operativo</strong>
          <p>37.000 €</p>
        </div>
      </div>

      <div className="correction-item">
        <div>
          <strong>Proventi finanziari</strong>
          <p>+1.000 €</p>
        </div>
      </div>

      <div className="correction-item">
        <div>
          <strong>Interessi passivi</strong>
          <p>−12.000 €</p>
        </div>
      </div>

      <div className="correction-item correct">
        <div>
          <strong>Risultato prima delle imposte</strong>
          <p>26.000 €</p>
        </div>
      </div>

      <div className="correction-item">
        <div>
          <strong>Imposte sul reddito</strong>
          <p>−4.000 €</p>
        </div>
      </div>

      <div className="correction-item correct">
        <div>
          <strong>Utile d'esercizio</strong>
          <p>22.000 €</p>
        </div>
      </div>
    </div>
  </section>
)}
      {showCorrection && (
        <section className="correction-panel">
          <span className="mission-kicker">ESITO DELLA MISSIONE</span>
          <h2>Hai ottenuto {score} risposte corrette su {totalItems}.</h2>
          <p>
            Punteggio: {Math.round((score / totalItems) * 100)}%
          </p>

          <div className="correction-list">
            {allItems.map(item => {
              const correct = allAnswers[item.id] === item.category
              const category = [
                ...balanceCategories.assets,
                ...balanceCategories.liabilities,
                ...incomeCategories,
              ].find(c => c.id === item.category)

              return (
                <div
                  key={item.id}
                  className={`correction-item ${correct ? 'correct' : 'incorrect'}`}
                >
                  <span>{correct ? '✓' : '✕'}</span>
                  <div>
                    <strong>{item.label}</strong>
                    {!correct && (
                      <p>Categoria corretta: {category?.label}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

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

export default MissionOne
