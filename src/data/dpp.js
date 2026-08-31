// ============================================================
// DPP THEME DATA
// ============================================================

export const dppThemes = [
  {
    tenure: '2026-27',
    theme: 'ONE',
    description: "One Vision, One Purpose, One Impact\n\nEvery meaningful change begins with a single step. ONE represents the collective power of individuals, clubs, and communities coming together with a shared purpose to create meaningful and lasting impact. Through ONE, Rotaractors are encouraged to transform ideas into action, strengthen community connections, and contribute towards a unified vision of service.\n\nTogether, these three pillars encourage Rotaract clubs to innovate, collaborate, and serve with purpose. ONE reminds us that when individual efforts unite, they can create a greater collective impact and build a more inclusive, aware, and compassionate community.",
    image: '',
    acronyms: [
      { letter: 'O', title: 'Open Community & Gen Z Engagement', description: 'Building inclusive platforms that bring communities together, encourage active participation, empower Gen Z, and strengthen meaningful social connections.' },
      { letter: 'N', title: 'Navigating Road Safety & Traffic Mobility', description: 'Promoting road safety awareness, responsible civic behaviour, emergency preparedness, and safer mobility for everyone in the community.' },
      { letter: 'E', title: 'Embracing Every Ability', description: 'Creating an inclusive society by supporting persons with disabilities and the elderly, promoting accessibility, and ensuring equal opportunities for every individual.' },
    ]
  },
  {
    tenure: '2025-26',
    theme: 'DREAM',
    description: "Each year, a theme will be assigned by the district for the avenue of DPP and that theme will have a social cause for upliftment. All the events and services that come under the theme will be considered as a DPP project. The Roar year had a DPP theme of BLOSSOM containing five categories and our Roar board did marvelous projects under the theme. Meanwhile this year, the Vision years DPP theme is going to be a fascinating one which is DREAM. Yes, we are going to travel with this effective theme for the upcoming year. Let us see what the theme actually depicts.",
    image: '', // Optional: if there's an image in the future
    acronyms: [
      { letter: 'D', title: 'Daughter', description: 'Empowering the girl child by promoting education, safety, and equal opportunities. It encourages Rotaractors to support initiatives that uplift and inspire young girls to dream big and lead with confidence.' },
      { letter: 'R', title: 'Reachout', description: 'Focusing on uplifting communities and individuals who are often overlooked. This includes outreach programs for the underprivileged, differently-abled, and marginalized groups to ensure inclusivity and equal support.' },
      { letter: 'E', title: 'Embrace', description: 'Advocating for animal welfare through awareness campaigns, rescue efforts, and responsible adoption drives. It aims to build compassion and care for all living beings in the community.' },
      { letter: 'A', title: 'Annapoorani', description: 'Tackling hunger by organizing food drives, zero-waste campaigns, and collaborations with shelters and communities in need. It envisions a world where no one sleeps hungry.' },
      { letter: 'M', title: 'Mann Shakthi', description: 'Prioritizing emotional and mental wellness by encouraging open conversations, stress-relief sessions, and awareness on mental health. It aims to create safe spaces and empower individuals to seek help without hesitation.' },
    ]
  },
  {
    tenure: '2024-25',
    theme: 'BLOSSOM',
    description: "Each year, a theme will be assigned by the district for the avenue of DPP and that theme will have a social cause for upliftment. All the events and services that comes under the theme will be consider as a DPP project. The Elevate year had a DPP theme of 'SMILE' containing five categories and our Elevate board did marvelous projects under the theme. Meanwhile this year, The ROAR year's DPP theme is going to be a fascinating one which is 'BLOSSOM'. Let us see what the theme actually depicts.",
    image: '',
    acronyms: [
      { letter: 'B', title: 'Basic education & Literacy', description: "It aims to provide the support that is to be given for the student's education. Furthermore, it motivates the rotaractors to share their knowledge with the students and people." },
      { letter: 'L', title: 'Learning apps & Library', description: "It highlights the significance of raising awareness about learning apps and AI tools within the educational community. Additionally, it encourages Rotaractors to donate books to libraries to enhance learning." },
      { letter: 'O', title: 'Oldage care & Organic farming', description: "It focuses on lending the helping hand and support of rotaractors to the old-age homes. On the other hand, it seeks attention for standing up for organic farming and spreading awareness about the chemicals that are consumed in modern days due to inorganic farming." },
      { letter: 'S', title: 'Safe drinking water & Shelter', description: "It calls attention to setting the focus to promote clean water and conserving practices through rainwater harvesting and preventing wastage of water by any means." },
      { letter: 'S', title: 'Sport talent promotion & Smart classsroom', description: "It promotes activities such as organizing sports days and supplying essential sports kits to athletes or academies. Additionally, it aims to enhance education by upgrading to smart classrooms." },
      { letter: 'O', title: 'Ophthalmic care ( Eye care )', description: "It emphasizes the growing issue of eye damage in today’s digital world and the need for organizing eye camps for all age groups, as well as providing essential assistance to elderly individuals with vision impairment." },
      { letter: 'M', title: 'Menstrual hygiene management', description: "It underscores the importance of raising awareness about safe menstrual hygiene management and the critical support Rotaractors must provide in ensuring it. Rotaractors can organize awareness campaigns, distribute hygiene products, and implement MHM programs in schools." },
    ]
  },
];

export const dppTenures = ['2026-27', '2025-26', '2024-25'];

export const getDppThemeByTenure = (tenure) => {
  return dppThemes.find(dpp => dpp.tenure === tenure) || null;
};
