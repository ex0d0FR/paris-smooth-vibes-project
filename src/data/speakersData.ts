export interface Speaker {
  id: number;
  name: string;
  role: string;
  roleKey: string;
  company: string;
  image: string;
}

export const speakersData: Speaker[] = [
  {
    id: 1,
    name: 'David Bogosian',
    role: 'President/CEO',
    roleKey: 'president_ceo',
    company: 'Christian Aid Mission',
    image: '/speakers/David_Bogosian.png',
  },
  {
    id: 2,
    name: 'Gabriel Barau',
    role: 'Executive Director',
    roleKey: 'executive_director',
    company: 'Go International',
    image: '/speakers/Gabriel_Barau.png',
  },
  {
    id: 3,
    name: 'Enoch Nyador',
    role: 'Executive Member',
    roleKey: 'executive_member',
    company: 'Africa Missions Association',
    image: '/speakers/Enoch_Nyador.png',
  },
  {
    id: 4,
    name: 'Eliseo Soto',
    role: 'Pastor',
    roleKey: 'pastor',
    company: 'Kerygma Church',
    image: '/speakers/Eliseo_Soto.png',
  },
  {
    id: 5,
    name: 'Joshua Lingel',
    role: 'President',
    roleKey: 'president',
    company: 'I2 Ministries',
    image: '/speakers/Joshua_Lingel.png',
  },
  {
    id: 6,
    name: 'Yong Cho',
    role: 'General Secretary',
    roleKey: 'general_secretary',
    company: 'Korean World Mission Council for Christ',
    image: '/speakers/Yong_Cho.png',
  },
  {
    id: 7,
    name: 'Lalano Badoy',
    role: 'National Director',
    roleKey: 'national_director',
    company: 'Philippine Missions Association',
    image: '/speakers/Lalano_Badoy.png',
  },
  {
    id: 8,
    name: 'Obed Alvarez',
    role: 'President',
    roleKey: 'president',
    company: 'New World Missions Association',
    image: '/speakers/Obed_Alvarez.png',
  },
  {
    id: 9,
    name: 'Gbile Akanni',
    role: 'Director',
    roleKey: 'director',
    company: 'The Ministry in Living Seed',
    image: '/speakers/Gbile_Akanni.png',
  },
  {
    id: 10,
    name: 'Wagih Abdelmassih',
    role: 'Pastor',
    roleKey: 'pastor',
    company: 'London Arabic Evangelical Church',
    image: '/speakers/Wagih_Abdelmassih.png',
  },
  {
    id: 11,
    name: 'Hisham Kamel',
    role: 'President',
    roleKey: 'president',
    company: 'Arabic Communication Center',
    image: '/speakers/Hisham_Kamel.png',
  },
  {
    id: 12,
    name: 'Noel Anderson',
    role: 'Pastor',
    roleKey: 'pastor',
    company: 'First Presbyterian Church',
    image: '/speakers/Noel_Anderson.png',
  },
  {
    id: 13,
    name: 'Sunday Adelaja',
    role: 'Founder',
    roleKey: 'founder',
    company: 'Embassy of God Church',
    image: '/speakers/Sunday_Adelaja.png',
  },
  {
    id: 14,
    name: 'Eric Nyamekye',
    role: 'Chairman',
    roleKey: 'chairman',
    company: 'The Church of Pentecost',
    image: '/speakers/Eric_Nyamekye.png',
  },
  {
        id: 15,
        name: 'Said Oujibou',
        role: 'Evangelist',
        roleKey: 'evangelist',
        company: 'Médiateur socioreligieux, Paris',
        image: '/speakers/Said_Oujibou.png',
    },
];
