
export const missionTwoErrors = [
  {
    id: 'e1',
    statement: 'Stato patrimoniale',
    label: 'Impianti e macchinari',
    amount: 150000,
    wrongCategory: 'immobilizzazioni_immateriali',
    correctCategory: 'immobilizzazioni_materiali',
    explanation:
      'Gli impianti e i macchinari sono beni materiali destinati a essere utilizzati durevolmente nell’attività aziendale.'
  },
  {
    id: 'e2',
    statement: 'Stato patrimoniale',
    label: 'Partecipazioni detenute durevolmente',
    amount: 12000,
    wrongCategory: 'liquidita_differite',
    correctCategory: 'immobilizzazioni_finanziarie',
    explanation:
      'Le partecipazioni detenute durevolmente costituiscono immobilizzazioni finanziarie, perché sono investimenti destinati a permanere nell’impresa.'
  },
  {
    id: 'e3',
    statement: 'Stato patrimoniale',
    label: 'Rimanenze di merci',
    amount: 95000,
    wrongCategory: 'liquidita_immediate',
    correctCategory: 'rimanenze',
    explanation:
      'Le merci in magazzino sono rimanenze e non liquidità: devono ancora essere vendute per trasformarsi in denaro.'
  },
  {
    id: 'e4',
    statement: 'Stato patrimoniale',
    label: 'Crediti verso clienti esigibili entro 12 mesi',
    amount: 130000,
    wrongCategory: 'rimanenze',
    correctCategory: 'liquidita_differite',
    explanation:
      'I crediti verso clienti rappresentano somme da incassare e costituiscono liquidità differite.'
  },
  {
    id: 'e5',
    statement: 'Stato patrimoniale',
    label: 'Mutui bancari esigibili oltre 12 mesi',
    amount: 125000,
    wrongCategory: 'passivita_correnti',
    correctCategory: 'passivita_consolidate',
    explanation:
      'I debiti con scadenza oltre i 12 mesi sono passività consolidate, perché rappresentano fonti di finanziamento a medio-lungo termine.'
  },
  {
    id: 'e6',
    statement: 'Conto economico',
    label: 'Ricavi delle vendite',
    amount: 620000,
    wrongCategory: 'costi_esterni',
    correctCategory: 'valore_produzione',
    explanation:
      'I ricavi delle vendite sono componenti positivi del valore della produzione.'
  },
  {
    id: 'e7',
    statement: 'Conto economico',
    label: 'Acquisti di merci',
    amount: 400000,
    wrongCategory: 'valore_produzione',
    correctCategory: 'costi_esterni',
    explanation:
      'Gli acquisti di merci sono costi esterni della gestione caratteristica.'
  },
  {
    id: 'e8',
    statement: 'Conto economico',
    label: 'Costi del personale',
    amount: 95000,
    wrongCategory: 'costi_esterni',
    correctCategory: 'costo_personale',
    explanation:
      'I costi del personale costituiscono una categoria autonoma nel conto economico riclassificato a valore aggiunto.'
  },
  {
    id: 'e9',
    statement: 'Conto economico',
    label: 'Ammortamenti',
    amount: 24000,
    wrongCategory: 'costi_esterni',
    correctCategory: 'ammortamenti',
    explanation:
      'Gli ammortamenti rappresentano costi relativi all’utilizzo dei beni strumentali e sono evidenziati separatamente.'
  },
  {
    id: 'e10',
    statement: 'Conto economico',
    label: 'Interessi passivi',
    amount: 12000,
    wrongCategory: 'imposte',
    correctCategory: 'gestione_finanziaria',
    explanation:
      'Gli interessi passivi sono oneri finanziari e appartengono alla gestione finanziaria, non alle imposte sul reddito.'
  }
]
