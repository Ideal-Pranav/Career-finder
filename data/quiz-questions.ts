
export interface QuizQuestion {
  id: string
  category: 'interests' | 'skills' | 'preferences' | 'lifestyle'
  question: string
  options: QuizOption[]
}

export interface QuizOption {
  text: string
  weights: {
    [careerId: string]: number
  }
}

export interface QuizAnswer {
  questionId: string
  selectedOption: number
}

export interface CareerMatch {
  careerId: string
  careerName: string
  matchPercentage: number
  score: {
    interests: number
    skills: number
    preferences: number
    lifestyle: number
  }
}

// Comprehensive Quiz - 168 Careers across 12 Categories
// Engineering & Tech (29) | Medical & Healthcare (23) | Vocational & Others (23) | Science & Research (18) | Law & Humanities (17)
// Finance & Commerce (15) | Design & Arts (15) | Defense & Govt (8) | Agriculture (7) | Aviation & Transport (7) | Education (5) | Railways (1)

export const quizQuestions: QuizQuestion[] = [
  // ============================================
  // INTERESTS - 6 Questions (40% weight)
  // ============================================
  {
    id: 'int-1',
    category: 'interests',
    question: 'Which field genuinely excites and interests you the most?',
    options: [
      {
        text: 'Technology, software & digital innovation',
        weights: {
          'eng-software': 1.0, 'eng-data-science': 1.0, 'eng-ai-ml': 0.95, 'eng-cyber-security': 0.9,
          'eng-it': 0.9, 'eng-blockchain': 0.85, 'eng-cloud-computing': 0.85
        }
      },
      {
        text: 'Healthcare, medicine & patient care',
        weights: {
          'med-mbbs': 1.0, 'med-nursing': 0.95, 'med-dentist': 0.9, 'med-physiotherapy': 0.9,
          'med-pharmacy': 0.85, 'med-veterinary': 0.8, 'med-ayurveda': 0.8
        }
      },
      {
        text: 'Business, finance & management',
        weights: {
          'fin-chartered-accountant': 1.0, 'mgmt-mba': 0.95, 'fin-investment-banking': 0.9,
          'fin-company-secretary': 0.9, 'mgmt-bba': 0.85
        }
      },
      {
        text: 'Creative design, media & arts',
        weights: {
          'des-architecture': 1.0, 'des-interior': 0.95, 'des-fashion': 0.95, 'des-graphic-web': 0.9,
          'des-animation': 0.9, 'des-photography': 0.85, 'des-fine-arts': 0.85
        }
      },
    ]
  },
  {
    id: 'int-2',
    category: 'interests',
    question: 'Which type of work environment appeals to you most?',
    options: [
      {
        text: 'Research labs & scientific institutions',
        weights: {
          'sci-biotechnology': 1.0, 'sci-microbiology': 0.95, 'sci-genetics': 0.9, 'sci-chemistry': 0.9,
          'sci-physics': 0.85, 'sci-marine-biology': 0.85
        }
      },
      {
        text: 'Courtrooms, legal offices & justice system',
        weights: {
          'law-lawyer': 1.0, 'law-corporate': 0.95, 'law-cyber': 0.9, 'law-paralegal': 0.85,
          'law-judge': 0.8
        }
      },
      {
        text: 'Outdoors, fields, farms & nature',
        weights: {
          'agri-scientist': 1.0, 'agri-horticulture': 0.95, 'agri-forestry': 0.9, 'sci-environmental': 0.9,
          'agri-organic-farming': 0.85, 'voc-wildlife': 0.8
        }
      },
      {
        text: 'Corporate offices & modern workplaces',
        weights: {
          'eng-software': 0.9, 'fin-chartered-accountant': 0.9, 'mgmt-mba': 0.9,
          'hum-digital-marketing': 0.85, 'eng-data-science': 0.9
        }
      },
    ]
  },
  {
    id: 'int-3',
    category: 'interests',
    question: 'What kind of problems do you enjoy solving the most?',
    options: [
      {
        text: 'Logical, analytical & numerical problems',
        weights: {
          'fin-actuarial': 1.0, 'sci-statistics': 0.95, 'fin-quant-analyst': 0.9,
          'sci-mathematics': 0.9, 'eng-data-science': 0.85
        }
      },
      {
        text: 'Social issues, policy & governance',
        weights: {
          'def-civil-services': 1.0, 'hum-political-science': 0.9, 'hum-social-work': 0.9,
          'hum-sociology': 0.85, 'hum-public-policy': 0.85
        }
      },
      {
        text: 'Creative expression & storytelling',
        weights: {
          'hum-journalism': 1.0, 'hum-content-writing': 0.95, 'voc-film-direction': 0.9,
          'hum-mass-comm': 0.9, 'hum-public-relations': 0.85
        }
      },
      {
        text: 'Physical challenges & national security',
        weights: {
          'def-army': 1.0, 'def-navy': 0.95, 'def-air-force': 0.95, 'def-police': 0.9,
          'def-coast-guard': 0.85, 'voc-fitness-trainer': 0.7
        }
      },
    ]
  },
  {
    id: 'int-4',
    category: 'interests',
    question: 'Which future-focused area excites you the most?',
    options: [
      {
        text: 'AI, robotics & emerging tech',
        weights: {
          'eng-ai-ml': 1.0, 'eng-robotics': 0.95, 'eng-iot': 0.9, 'eng-blockchain': 0.9,
          'eng-data-science': 0.85, 'eng-cloud-computing': 0.8
        }
      },
      {
        text: 'Sustainability & climate solutions',
        weights: {
          'sci-environmental': 1.0, 'agri-organic-farming': 0.9, 'eng-renewable-energy': 0.9,
          'sci-ecology': 0.85, 'agri-sustainable': 0.8
        }
      },
      {
        text: 'Medical breakthroughs & biotechnology',
        weights: {
          'sci-biotechnology': 1.0, 'sci-genetics': 0.95, 'sci-bioinformatics': 0.9,
          'med-biomedical': 0.9, 'sci-biochemistry': 0.85
        }
      },
      {
        text: 'Space exploration & astrophysics',
        weights: {
          'avi-aerospace': 1.0, 'sci-astrophysics': 0.95, 'avi-aeronautical': 0.9,
          'sci-physics': 0.8, 'eng-aerospace': 0.8
        }
      },
    ]
  },
  {
    id: 'int-5',
    category: 'interests',
    question: 'Which subject cluster do you naturally enjoy the most?',
    options: [
      {
        text: 'Maths, physics & computer science',
        weights: {
          'eng-software': 1.0, 'eng-electrical': 0.9, 'eng-data-science': 0.9,
          'eng-mechanical': 0.85, 'sci-physics': 0.85
        }
      },
      {
        text: 'Biology, chemistry & life sciences',
        weights: {
          'med-mbbs': 1.0, 'sci-biotechnology': 0.95, 'sci-microbiology': 0.95,
          'med-pharmacy': 0.9, 'sci-genetics': 0.9
        }
      },
      {
        text: 'Economics, business & commerce',
        weights: {
          'fin-chartered-accountant': 1.0, 'hum-economics': 0.95, 'fin-investment-banking': 0.9,
          'mgmt-bba': 0.85, 'fin-financial-analyst': 0.9
        }
      },
      {
        text: 'History, languages & humanities',
        weights: {
          'hum-history': 1.0, 'hum-english-literature': 0.95, 'hum-foreign-languages': 0.9,
          'hum-archaeology': 0.9, 'hum-philosophy': 0.85
        }
      },
    ]
  },
  {
    id: 'int-6',
    category: 'interests',
    question: 'What kind of day-to-day work would you enjoy?',
    options: [
      {
        text: 'Teaching, mentoring & guiding students',
        weights: {
          'edu-teacher': 1.0, 'edu-professor': 0.95, 'edu-special-education': 0.9,
          'edu-corporate-trainer': 0.85, 'edu-education-counselor': 0.85
        }
      },
      {
        text: 'Managing events, people & experiences',
        weights: {
          'voc-event-management': 1.0, 'voc-hotel-management': 0.95, 'voc-travel-tourism': 0.9,
          'voc-flight-attendant': 0.85, 'mgmt-mba': 0.8
        }
      },
      {
        text: 'Designing visuals, products or spaces',
        weights: {
          'des-architecture': 1.0, 'des-interior': 0.95, 'des-fashion': 0.95,
          'des-graphic-web': 0.9, 'des-industrial': 0.85
        }
      },
      {
        text: 'Investigating, researching & writing',
        weights: {
          'hum-journalism': 1.0, 'sci-research-scientist': 0.95, 'law-corporate': 0.9,
          'hum-content-writing': 0.9, 'hum-economics': 0.85
        }
      },
    ]
  },

  // ============================================
  // SKILLS - 4 Questions (30% weight)
  // ============================================
  {
    id: 'skill-1',
    category: 'skills',
    question: 'Which describes your strongest natural skill?',
    options: [
      {
        text: 'Coding, technical problem solving & debugging',
        weights: {
          'eng-software': 1.0, 'eng-full-stack': 0.95, 'eng-mobile-app': 0.9,
          'eng-game-dev': 0.9, 'eng-devops': 0.85
        }
      },
      {
        text: 'Communication, persuasion & public speaking',
        weights: {
          'law-lawyer': 1.0, 'hum-journalism': 0.95, 'mgmt-mba': 0.9,
          'hum-public-relations': 0.9, 'voc-anchor': 0.85
        }
      },
      {
        text: 'Visual creativity & design sense',
        weights: {
          'des-graphic-web': 1.0, 'des-ux-ui': 0.95, 'des-fashion': 0.9,
          'des-interior': 0.9, 'des-photography': 0.85
        }
      },
      {
        text: 'Empathy, patience & emotional understanding',
        weights: {
          'hum-psychology': 1.0, 'hum-counseling': 0.95, 'hum-social-work': 0.95,
          'med-nursing': 0.9, 'edu-special-education': 0.9
        }
      },
    ]
  },
  {
    id: 'skill-2',
    category: 'skills',
    question: 'How would you rate your mathematical ability?',
    options: [
      {
        text: 'Excellent - love complex calculations & data',
        weights: {
          'fin-actuarial': 1.0, 'sci-statistics': 0.95, 'fin-quant-analyst': 0.9,
          'sci-mathematics': 0.9, 'eng-data-science': 0.85
        }
      },
      {
        text: 'Good - comfortable with numbers',
        weights: {
          'fin-chartered-accountant': 0.9, 'eng-software': 0.8, 'sci-physics': 0.8,
          'fin-investment-banking': 0.75, 'eng-electrical': 0.75
        }
      },
      {
        text: 'Average - can manage basic math',
        weights: {
          'mgmt-bba': 0.7, 'hum-journalism': 0.5, 'des-architecture': 0.6,
          'med-nursing': 0.5, 'hum-psychology': 0.5
        }
      },
      {
        text: 'Not my strength',
        weights: {
          'des-fashion': 0.4, 'des-fine-arts': 0.3, 'voc-acting': 0.3,
          'voc-music': 0.3, 'hum-history': 0.4
        }
      },
    ]
  },
  {
    id: 'skill-3',
    category: 'skills',
    question: 'How comfortable are you with science & lab work?',
    options: [
      {
        text: 'Very comfortable - love experiments & lab work',
        weights: {
          'sci-chemistry': 1.0, 'sci-biotechnology': 0.95, 'sci-microbiology': 0.95,
          'sci-biochemistry': 0.9, 'med-pharmacy': 0.85
        }
      },
      {
        text: 'Comfortable - enjoy science concepts',
        weights: {
          'sci-physics': 0.9, 'med-mbbs': 0.8, 'eng-biomedical': 0.8,
          'sci-environmental': 0.75, 'sci-geology': 0.75
        }
      },
      {
        text: 'Basic understanding only',
        weights: {
          'eng-software': 0.5, 'fin-chartered-accountant': 0.4, 'mgmt-mba': 0.4,
          'law-lawyer': 0.3, 'hum-journalism': 0.4
        }
      },
      {
        text: 'Prefer non-science work',
        weights: {
          'des-fashion': 0.3, 'voc-acting': 0.2, 'hum-history': 0.3,
          'des-fine-arts': 0.2, 'voc-music': 0.2
        }
      },
    ]
  },
  {
    id: 'skill-4',
    category: 'skills',
    question: 'How physically fit & active are you?',
    options: [
      {
        text: 'Very fit - excellent stamina & strength',
        weights: {
          'def-army': 1.0, 'def-navy': 0.95, 'def-air-force': 0.95,
          'voc-fitness-trainer': 0.9, 'voc-sports': 0.9, 'voc-yoga': 0.8
        }
      },
      {
        text: 'Good - regular exercise',
        weights: {
          'med-physiotherapy': 0.8, 'voc-dance': 0.8, 'avi-pilot': 0.7,
          'def-police': 0.8, 'voc-adventure-sports': 0.8
        }
      },
      {
        text: 'Average fitness',
        weights: {
          'med-mbbs': 0.6, 'med-nursing': 0.6, 'eng-civil': 0.6,
          'agri-scientist': 0.6, 'edu-teacher': 0.5
        }
      },
      {
        text: 'Prefer desk work',
        weights: {
          'eng-software': 0.7, 'fin-chartered-accountant': 0.7, 'law-lawyer': 0.6,
          'des-graphic-web': 0.7, 'hum-content-writing': 0.7
        }
      },
    ]
  },

  // ============================================
  // PREFERENCES - 4 Questions (20% weight)
  // ============================================
  {
    id: 'pref-1',
    category: 'preferences',
    question: 'How important is job security to you?',
    options: [
      {
        text: 'Very important - strongly prefer government roles',
        weights: {
          'def-civil-services': 1.0, 'rail-railway-services': 0.95, 'def-army': 0.9,
          'def-police': 0.9, 'edu-government-teacher': 0.85
        }
      },
      {
        text: 'Important - want a stable profession',
        weights: {
          'fin-chartered-accountant': 0.9, 'med-mbbs': 0.85, 'law-lawyer': 0.8,
          'eng-software': 0.75, 'edu-teacher': 0.8
        }
      },
      {
        text: 'Moderately important - open to some risk',
        weights: {
          'mgmt-mba': 0.8, 'des-architecture': 0.7, 'voc-event-management': 0.8,
          'voc-chef': 0.7, 'hum-digital-marketing': 0.7
        }
      },
      {
        text: 'Not a priority - okay with high risk',
        weights: {
          'des-fine-arts': 0.9, 'voc-acting': 0.95, 'voc-music': 0.9,
          'des-fashion': 0.8, 'voc-photographer': 0.8
        }
      },
    ]
  },
  {
    id: 'pref-2',
    category: 'preferences',
    question: 'How much work-life balance do you want?',
    options: [
      {
        text: 'Very high - want regular hours',
        weights: {
          'edu-teacher': 0.9, 'fin-bank-po': 0.85, 'rail-railway-services': 0.85,
          'def-civil-services': 0.8, 'edu-professor': 0.8
        }
      },
      {
        text: 'Important but flexible',
        weights: {
          'eng-software': 0.7, 'fin-chartered-accountant': 0.7, 'des-graphic-web': 0.7,
          'hum-content-writing': 0.75, 'sci-research-scientist': 0.7
        }
      },
      {
        text: 'Can work long hours if needed',
        weights: {
          'med-mbbs': 0.9, 'law-lawyer': 0.85, 'fin-investment-banking': 0.9,
          'mgmt-mba': 0.8, 'avi-pilot': 0.8
        }
      },
      {
        text: 'Not a concern - passion over balance',
        weights: {
          'des-fine-arts': 1.0, 'voc-acting': 0.95, 'hum-journalism': 0.9,
          'voc-film-direction': 0.9, 'des-fashion': 0.85
        }
      },
    ]
  },
  {
    id: 'pref-3',
    category: 'preferences',
    question: 'How much travel would you like in your career?',
    options: [
      {
        text: 'A lot - want frequent travel',
        weights: {
          'avi-pilot': 1.0, 'voc-flight-attendant': 0.95, 'avi-marine': 0.9,
          'voc-travel-tourism': 0.9, 'def-navy': 0.8
        }
      },
      {
        text: 'Some - occasional trips are fine',
        weights: {
          'mgmt-mba': 0.8, 'fin-investment-banking': 0.8, 'eng-software': 0.7,
          'voc-event-management': 0.75, 'hum-journalism': 0.7
        }
      },
      {
        text: 'Minimal - mostly stay in one place',
        weights: {
          'edu-teacher': 0.7, 'med-mbbs': 0.7, 'fin-chartered-accountant': 0.7,
          'law-lawyer': 0.7, 'agri-scientist': 0.7
        }
      },
      {
        text: 'None - prefer fully local work',
        weights: {
          'rail-railway-services': 0.8, 'def-police': 0.8, 'agri-organic-farming': 0.8,
          'voc-carpentry': 0.7, 'voc-local-shop': 0.9
        }
      },
    ]
  },
  {
    id: 'pref-4',
    category: 'preferences',
    question: 'How do you feel about hands-on manual work?',
    options: [
      {
        text: 'Love it - prefer very practical work',
        weights: {
          'voc-chef': 1.0, 'voc-carpentry': 0.95, 'voc-electrician': 0.95,
          'voc-plumbing': 0.95, 'eng-mechanical': 0.8, 'voc-makeup': 0.9
        }
      },
      {
        text: 'Open to it - enjoy some hands-on tasks',
        weights: {
          'med-dentist': 0.9, 'med-surgeon': 0.85, 'des-sculpture': 0.9,
          'eng-automobile': 0.8, 'agri-horticulture': 0.8
        }
      },
      {
        text: 'Prefer mostly mental/desk work',
        weights: {
          'eng-software': 0.6, 'fin-chartered-accountant': 0.5, 'law-lawyer': 0.5,
          'hum-journalism': 0.6, 'mgmt-mba': 0.5
        }
      },
      {
        text: 'Want purely intellectual work',
        weights: {
          'eng-data-science': 0.7, 'fin-actuarial': 0.8, 'sci-mathematics': 0.8,
          'hum-philosophy': 0.9, 'sci-theoretical-physics': 0.9
        }
      },
    ]
  },

  // ============================================
  // LIFESTYLE - 3 Questions (10% weight)
  // ============================================
  {
    id: 'life-1',
    category: 'lifestyle',
    question: 'How important is a very high salary to you?',
    options: [
      {
        text: 'Top priority - want maximum earnings',
        weights: {
          'fin-investment-banking': 1.0, 'avi-pilot': 0.95, 'eng-software': 0.9,
          'med-surgeon': 0.9, 'fin-actuarial': 0.85
        }
      },
      {
        text: 'Important - need good compensation',
        weights: {
          'fin-chartered-accountant': 0.9, 'eng-data-science': 0.85, 'law-lawyer': 0.85,
          'mgmt-mba': 0.85, 'med-mbbs': 0.8
        }
      },
      {
        text: 'Moderate - decent salary is enough',
        weights: {
          'edu-teacher': 0.7, 'hum-journalism': 0.65, 'des-graphic-web': 0.7,
          'med-nursing': 0.7, 'eng-civil': 0.7
        }
      },
      {
        text: 'Not a priority - passion over money',
        weights: {
          'des-fine-arts': 0.9, 'hum-social-work': 0.9, 'voc-ngo': 0.95,
          'hum-philosophy': 0.85, 'voc-artist': 0.9
        }
      },
    ]
  },
  {
    id: 'life-2',
    category: 'lifestyle',
    question: 'How comfortable are you with high-pressure situations?',
    options: [
      {
        text: 'Thrive in high-pressure environments',
        weights: {
          'med-surgeon': 1.0, 'def-army': 0.95, 'avi-pilot': 0.95,
          'fin-investment-banking': 0.9, 'def-air-force': 0.9
        }
      },
      {
        text: 'Can handle pressure when required',
        weights: {
          'med-mbbs': 0.85, 'law-lawyer': 0.85, 'mgmt-mba': 0.8,
          'eng-cyber-security': 0.8, 'hum-journalism': 0.8
        }
      },
      {
        text: 'Prefer moderate stress levels',
        weights: {
          'eng-software': 0.7, 'des-architecture': 0.7, 'fin-chartered-accountant': 0.7,
          'edu-teacher': 0.7, 'sci-research-scientist': 0.7
        }
      },
      {
        text: 'Prefer low-stress work',
        weights: {
          'edu-librarian': 0.9, 'hum-content-writing': 0.8, 'agri-organic-farming': 0.8,
          'des-graphic-web': 0.7, 'sci-botany': 0.8
        }
      },
    ]
  },
  {
    id: 'life-3',
    category: 'lifestyle',
    question: 'How important is making a social impact to you?',
    options: [
      {
        text: 'Extremely important - want to change society',
        weights: {
          'hum-social-work': 1.0, 'def-civil-services': 0.95, 'edu-teacher': 0.9,
          'med-mbbs': 0.85, 'hum-ngo': 0.95
        }
      },
      {
        text: 'Important - want meaningful work',
        weights: {
          'med-nursing': 0.85, 'law-lawyer': 0.8, 'sci-environmental': 0.85,
          'hum-journalism': 0.8, 'edu-special-education': 0.85
        }
      },
      {
        text: 'Nice to have but not essential',
        weights: {
          'eng-software': 0.6, 'fin-chartered-accountant': 0.5, 'des-architecture': 0.65,
          'mgmt-bba': 0.6, 'des-fashion': 0.5
        }
      },
      {
        text: 'Not a priority - focus on personal growth',
        weights: {
          'fin-investment-banking': 0.5, 'voc-acting': 0.6, 'des-fine-arts': 0.7,
          'voc-music': 0.7, 'des-photography': 0.6
        }
      },
    ]
  },
]
