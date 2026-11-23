
export const balanceSheet = {
  assets: [
    {
      id: 'a1',
      label: 'Costi di sviluppo e altre immobilizzazioni immateriali',
      amount: 18000,
      category: 'immobilizzazioni_immateriali',
    },
    {
      id: 'a2',
      label: 'Impianti e macchinari',
      amount: 150000,
      category: 'immobilizzazioni_materiali',
    },
    {
      id: 'a3',
      label: 'Attrezzature industriali e commerciali',
      amount: 60000,
      category: 'immobilizzazioni_materiali',
    },
    {
      id: 'a4',
      label: 'Partecipazioni detenute durevolmente',
      amount: 12000,
      category: 'immobilizzazioni_finanziarie',
    },
    {
      id: 'a5',
      label: 'Rimanenze di merci',
      amount: 95000,
      category: 'rimanenze',
    },
    {
      id: 'a6',
      label: 'Crediti verso clienti esigibili entro 12 mesi',
      amount: 130000,
      category: 'liquidita_differite',
    },
    {
      id: 'a7',
      label: 'Crediti tributari esigibili entro 12 mesi',
      amount: 8000,
      category: 'liquidita_differite',
    },
    {
      id: 'a8',
      label: 'Denaro in cassa e disponibilità bancarie',
      amount: 22000,
      category: 'liquidita_immediate',
    },
    {
      id: 'a9',
      label: 'Ratei e risconti attivi entro 12 mesi',
      amount: 5000,
      category: 'ratei_risconti_attivi',
    },
  ],

  liabilities: [
    {
      id: 'p1',
      label: 'Capitale sociale',
      amount: 150000,
      category: 'patrimonio_netto',
    },
    {
      id: 'p2',
      label: 'Riserve',
      amount: 38000,
      category: 'patrimonio_netto',
    },
    {
      id: 'p3',
      label: 'Utile d’esercizio',
      amount: 22000,
      category: 'patrimonio_netto',
    },
    {
      id: 'p4',
      label: 'Trattamento di fine rapporto',
      amount: 30000,
      category: 'passivita_consolidate',
    },
    {
      id: 'p5',
      label: 'Mutui bancari esigibili oltre 12 mesi',
      amount: 125000,
      category: 'passivita_consolidate',
    },
    {
      id: 'p6',
      label: 'Mutui bancari esigibili entro 12 mesi',
      amount: 35000,
      category: 'passivita_correnti',
    },
    {
      id: 'p7',
      label: 'Debiti verso fornitori',
      amount: 72000,
      category: 'passivita_correnti',
    },
    {
      id: 'p8',
      label: 'Debiti tributari',
      amount: 8000,
      category: 'passivita_correnti',
    },
    {
      id: 'p9',
      label: 'Debiti verso istituti previdenziali',
      amount: 5000,
      category: 'passivita_correnti',
    },
    {
      id: 'p10',
      label: 'Debiti bancari a breve termine',
      amount: 5000,
      category: 'passivita_correnti',
    },
    {
      id: 'p11',
      label: 'Altri debiti esigibili entro 12 mesi',
      amount: 5000,
      category: 'passivita_correnti',
    },
    {
      id: 'p12',
      label: 'Ratei e risconti passivi entro 12 mesi',
      amount: 5000,
      category: 'ratei_risconti_passivi',
    },
  ],
}

export const balanceCategories = {
  assets: [
    { id: 'immobilizzazioni_immateriali', label: 'Immobilizzazioni immateriali' },
    { id: 'immobilizzazioni_materiali', label: 'Immobilizzazioni materiali' },
    { id: 'immobilizzazioni_finanziarie', label: 'Immobilizzazioni finanziarie' },
    { id: 'rimanenze', label: 'Rimanenze' },
    { id: 'liquidita_differite', label: 'Liquidità differite' },
    { id: 'liquidita_immediate', label: 'Liquidità immediate' },
    { id: 'ratei_risconti_attivi', label: 'Ratei e risconti attivi' },
  ],

  liabilities: [
    { id: 'patrimonio_netto', label: 'Patrimonio netto' },
    { id: 'passivita_consolidate', label: 'Passività consolidate' },
    { id: 'passivita_correnti', label: 'Passività correnti' },
    { id: 'ratei_risconti_passivi', label: 'Ratei e risconti passivi' },
  ],
}

export const incomeStatement = [
  {
    id: 'c1',
    label: 'Ricavi delle vendite',
    amount: 620000,
    category: 'valore_produzione',
  },
  {
    id: 'c2',
    label: 'Altri ricavi e proventi',
    amount: 8000,
    category: 'valore_produzione',
  },
  {
    id: 'c3',
    label: 'Acquisti di merci',
    amount: 400000,
    category: 'costi_esterni',
  },
  {
    id: 'c4',
    label: 'Incremento delle rimanenze di merci',
    amount: -15000,
    category: 'costi_esterni',
  },
  {
    id: 'c5',
    label: 'Costi per servizi',
    amount: 62000,
    category: 'costi_esterni',
  },
  {
    id: 'c6',
    label: 'Costi per godimento di beni di terzi',
    amount: 18000,
    category: 'costi_esterni',
  },
  {
    id: 'c7',
    label: 'Costi del personale',
    amount: 95000,
    category: 'costo_personale',
  },
  {
    id: 'c8',
    label: 'Ammortamenti',
    amount: 24000,
    category: 'ammortamenti',
  },
  {
    id: 'c9',
    label: 'Altri oneri di gestione',
    amount: 7000,
    category: 'costi_esterni',
  },
  {
    id: 'c10',
    label: 'Proventi finanziari',
    amount: 1000,
    category: 'gestione_finanziaria',
  },
  {
    id: 'c11',
    label: 'Interessi passivi',
    amount: 12000,
    category: 'gestione_finanziaria',
  },
  {
    id: 'c12',
    label: 'Imposte sul reddito',
    amount: 4000,
    category: 'imposte',
  },
]

export const incomeCategories = [
  { id: 'valore_produzione', label: 'Valore della produzione' },
  { id: 'costi_esterni', label: 'Costi esterni' },
  { id: 'costo_personale', label: 'Costo del personale' },
  { id: 'ammortamenti', label: 'Ammortamenti' },
  { id: 'gestione_finanziaria', label: 'Gestione finanziaria' },
  { id: 'imposte', label: 'Imposte sul reddito' },
]
