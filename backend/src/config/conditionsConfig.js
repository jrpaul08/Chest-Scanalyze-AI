/**
 * Condition metadata for diagnostic report generation.
 * Maps model output labels to user-facing display names, descriptions, and symptoms.
 * Update this file when adding/removing conditions or changing copy.
 */

export const CONDITIONS_CONFIG = {
  Atelectasis: {
    displayName: 'Atelectasis',
    description: 'Collapse or partial collapse of lung tissue, reducing air exchange',
    symptoms: [
      'Difficulty breathing',
      'Rapid, shallow breathing',
      'Cough',
      'Reduced oxygen levels',
    ],
  },
  Cardiomegaly: {
    displayName: 'Cardiomegaly',
    description: 'Enlarged heart, which may indicate an underlying cardiac condition',
    symptoms: [
      'Shortness of breath',
      'Swelling in legs or abdomen',
      'Fatigue',
      'Irregular heartbeat',
    ],
  },
  Effusion: {
    displayName: 'Pleural Effusion',
    description: 'Fluid accumulation between the layers surrounding the lungs',
    symptoms: [
      'Difficulty breathing',
      'Chest discomfort or pressure',
      'Reduced exercise tolerance',
      'Cough',
    ],
  },
  Infiltration: {
    displayName: 'Infiltration',
    description: 'Presence of abnormal substances (e.g., fluid or cells) in lung tissue',
    symptoms: [
      'May be asymptomatic',
      'Cough',
      'Mild breathing difficulty',
    ],
  },
  Mass: {
    displayName: 'Mass',
    description: 'Abnormal growth or lesion visible in lung tissue',
    symptoms: [
      'Often asymptomatic initially',
      'Cough',
      'Chest pain',
      'Unexplained weight loss',
    ],
  },
  Nodule: {
    displayName: 'Nodule',
    description: 'Small rounded growth or spot in the lung',
    symptoms: [
      'Usually asymptomatic',
      'May present with cough if larger',
    ],
  },
  Pneumonia: {
    displayName: 'Pneumonia',
    description: 'Infection causing inflammation in the lungs',
    symptoms: [
      'Cough (possibly with mucus)',
      'Fever and chills',
      'Shortness of breath',
      'Chest pain when breathing or coughing',
    ],
  },
  Pneumothorax: {
    displayName: 'Pneumothorax',
    description: 'Air trapped between the lung and chest wall, partially collapsing the lung',
    symptoms: [
      'Sudden chest pain',
      'Sharp pain that may worsen with breathing',
      'Shortness of breath',
      'Rapid heart rate',
    ],
  },
  Consolidation: {
    displayName: 'Consolidation',
    description: 'Dense area of lung tissue where air spaces are filled with fluid or other material',
    symptoms: [
      'Cough',
      'Fever',
      'Shortness of breath',
      'Fatigue',
    ],
  },
  Edema: {
    displayName: 'Pulmonary Edema',
    description: 'Excess fluid in the lung tissue and air spaces',
    symptoms: [
      'Severe shortness of breath',
      'Difficulty breathing when lying down',
      'Anxiety or restlessness',
      'Wheezing or gasping',
    ],
  },
  Emphysema: {
    displayName: 'Emphysema',
    description: 'Damage to air sacs in the lungs, reducing their ability to transfer oxygen',
    symptoms: [
      'Shortness of breath',
      'Chronic cough',
      'Reduced exercise tolerance',
      'Wheezing',
    ],
  },
  Fibrosis: {
    displayName: 'Fibrosis',
    description: 'Scarring or thickening of lung tissue that can stiffen the lungs',
    symptoms: [
      'Progressive shortness of breath',
      'Dry cough',
      'Fatigue',
      'Unexplained weight loss',
    ],
  },
  Pleural_Thickening: {
    displayName: 'Pleural Thickening',
    description: 'Thickening of the lining around the lungs, often from prior inflammation or scarring',
    symptoms: [
      'May be asymptomatic',
      'Mild chest discomfort',
      'Shortness of breath with exertion',
    ],
  },
  Hernia: {
    displayName: 'Hernia',
    description: 'Protrusion of abdominal contents into the chest cavity',
    symptoms: [
      'Chest or abdominal discomfort',
      'Difficulty swallowing',
      'Heartburn',
      'May be asymptomatic',
    ],
  },
}

/**
 * Report thresholds - adjust as model improves.
 * Single place to tune report inclusion and likelihood labels.
 */
export const REPORT_THRESHOLD = 0.05

export const LIKELIHOOD_THRESHOLDS = {
  likely: 0.65,
  possible: 0.35,
}

export const SUMMARY_MAX_NAMED = 2
