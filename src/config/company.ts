export const COMPANY_INFO = {
  name: 'CodiumZen IT',
  legalName: 'CodiumZen IT Solutions',
  tagline: 'Building Digital Products. Engineering Intelligent Solutions.',
  description: 'We build innovative software products and scalable digital solutions that help businesses transform ideas into powerful technology.',
  website: 'https://codiumzenit.com',
  officialEmail: 'codiumzenit@gmail.com',
  email: 'codiumzenit@gmail.com',
  supportEmail: 'codiumzenit@gmail.com',
  phone: '+8801747498166',
  whatsapp: '+8801747498166',
  country: 'Bangladesh',
  address: {
    street: '',
    city: 'Dhaka',
    country: 'Bangladesh',
    full: 'Dhaka, Bangladesh',
    toString() {
      return 'Dhaka, Bangladesh';
    }
  },
  social: {
    facebook: 'https://www.facebook.com/share/1A62Cr1ZLt',
    github: 'https://github.com/juyel66',
    linkedin: 'https://www.linkedin.com/in/md-juyel-rana-5ba0003bb/'
  },
  founder: {
    name: 'Md Juyel Rana',
    role: 'Founder & Chief Executive Officer',
    designation: 'Founder & Chief Executive Officer',
    profession: 'Full Stack Software Engineer',
    email: 'codiumzenit@gmail.com',
    phone: '+8801747498166',
    bio: 'Experienced software architect and full-stack engineer with deep expertise in scalable cloud architectures, high-concurrency browser automation, and modern web application development. Driving product innovation and digital excellence at CodiumZen IT.',
    github: 'https://github.com/juyel66',
    linkedin: 'https://www.linkedin.com/in/md-juyel-rana-5ba0003bb/'
  },
  products: [
    {
      name: 'IVAC Assistant',
      slug: 'ivac-assistant',
      tagline: 'High-speed automated visa appointment & telemetry suite',
      url: 'https://ivac-assistant.codiumzenit.com',
      status: 'Live & Operational'
    },
    {
      name: 'Indian Visa Auto fill',
      slug: 'indian-visa-auto-fill',
      tagline: 'Intelligent automated form filling for visa submissions',
      url: null, // Coming soon / unconfirmed
      status: 'In Development'
    }
  ]
};
