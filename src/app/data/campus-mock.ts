export interface CampusActivity {
  id: string;
  year: 1 | 2 | 3 | 4;
  title: string;
  category: "Tech" | "Leadership" | "Creative" | "Research";
  status: "verified" | "unverified" | "milestone";
  date: string;
  description: string;
}

export const CAMPUS_ACTIVITIES: CampusActivity[] = [
  // Year 1: Fresh Start
  {
    id: "a1",
    year: 1,
    title: "Joined Open Source & Web Club",
    category: "Tech",
    status: "verified",
    date: "Sep 2023",
    description: "Attended orientation, set up Linux workstation, pushed first Git commit."
  },
  {
    id: "a2",
    year: 1,
    title: "Design Sprint Volunteer",
    category: "Creative",
    status: "milestone",
    date: "Nov 2023",
    description: "Assisted the annual design sprint team with visual flyers and stage setups."
  },

  // Year 2: Hands-on & Early Competitions
  {
    id: "a3",
    year: 2,
    title: "Built First Vision Model in HackDelhi",
    category: "Tech",
    status: "verified",
    date: "Mar 2024",
    description: "Team project with 3 peers. Added to Achievement Vault with repository verification."
  },
  {
    id: "a4",
    year: 2,
    title: "Appointed Tech Lead for College Fest",
    category: "Leadership",
    status: "milestone",
    date: "Oct 2024",
    description: "Managed a sub-team of 6 developers to maintain the festival ticketing portal."
  },

  // Year 3: Specialization & Internships
  {
    id: "a5",
    year: 3,
    title: "Undergrad Research Fellow in Lab 3",
    category: "Research",
    status: "verified",
    date: "Feb 2025",
    description: "Co-authored an internal whitepaper on localized edge AI inference."
  },
  {
    id: "a6",
    year: 3,
    title: "Summer SDE Internship Offer",
    category: "Tech",
    status: "milestone",
    date: "May 2025",
    description: "Completed 3 technical interview rounds and cleared system design evaluation."
  },

  // Year 4: Capstone & Transition
  {
    id: "a7",
    year: 4,
    title: "Published Final Capstone Architecture",
    category: "Research",
    status: "verified",
    date: "Dec 2025",
    description: "Presented distributed microservices pipeline to faculty committee."
  },
  {
    id: "a8",
    year: 4,
    title: "Full-Time Return Offer Accepted",
    category: "Leadership",
    status: "milestone",
    date: "Feb 2026",
    description: "Converted summer internship to permanent junior engineer position."
  }
];