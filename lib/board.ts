export interface BoardMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
  fullBio: string;
  image?: string;
  highlights: string[];
}

export const boardMembers: BoardMember[] = [
  {
    id: 'chairperson',
    slug: 'chairperson',
    name: 'Dr. Isaac Newton Kinity',
    role: 'Party Leader & Chairperson',
    initials: 'IK',
    bio: 'Founder and visionary leader with over 20 years of public service experience.',
    fullBio:
      'Dr. Isaac Newton Kinity is the founder and Party Leader of the National Vision Party. With over 40 years of activism, union leadership, and governance advocacy, he has dedicated his life to fighting corruption and standing up for the rights of all Kenyans. He brings decades of experience in public service, business leadership, and community development. His journey from humble beginnings to becoming one of Kenya\'s most respected voices is a testament to his dedication and vision.',
    image: '/images/president.jpeg',
    highlights: [
      '40+ years of activism and union leadership',
      'Survived assassination attempts for opposing graft',
      'Pledged to eliminate corruption within 2 years or resign',
      'Founded the National Vision Party to transform Kenya',
    ],
  },
  {
    id: 'deputy-chair',
    slug: 'deputy-chair',
    name: 'James Mwangi',
    role: 'Deputy Chairperson',
    initials: 'JM',
    bio: 'Strategic advisor focused on grassroots mobilization and county coordination.',
    fullBio:
      'James Mwangi serves as Deputy Chairperson of the National Vision Party. He is a strategic advisor with deep expertise in grassroots mobilization and county-level coordination, ensuring the party\'s message reaches every corner of Kenya. His leadership strengthens the connection between the national vision and local action.',
    highlights: [
      'Expert in grassroots political mobilization',
      'Coordinates outreach across all 47 counties',
      'Strategic planning and campaign operations',
    ],
  },
  {
    id: 'secretary',
    slug: 'secretary',
    name: 'Grace Achieng',
    role: 'Secretary General',
    initials: 'GA',
    bio: 'Governance expert ensuring transparent operations and policy implementation.',
    fullBio:
      'Grace Achieng is the Secretary General of the National Vision Party. A governance expert, she ensures transparent party operations and drives the implementation of policies that align with the party\'s vision for Kenya. Her commitment to accountability and process excellence keeps the party true to its founding principles.',
    highlights: [
      'Governance and policy implementation specialist',
      'Ensures transparent party operations',
      'Oversees internal democracy and compliance',
    ],
  },
  {
    id: 'treasurer',
    slug: 'treasurer',
    name: 'Peter Ochieng',
    role: 'Treasurer',
    initials: 'PO',
    bio: 'Financial steward overseeing campaign resources and fiscal accountability.',
    fullBio:
      'Peter Ochieng serves as Treasurer of the National Vision Party. As the party\'s financial steward, he oversees campaign resources and ensures fiscal accountability, maintaining the highest standards of financial integrity. His prudent management ensures every shilling is spent in service of the Kenyan people.',
    highlights: [
      'Financial management and accountability expert',
      'Oversees campaign resource allocation',
      'Maintains highest standards of fiscal integrity',
    ],
  },
];
