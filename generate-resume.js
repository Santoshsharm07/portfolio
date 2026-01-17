const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Create a document
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, right: 50, bottom: 50, left: 50 }
});

// Pipe its output somewhere, like to a file or HTTP response
const outputPath = path.join(__dirname, 'public', 'YOUR_NAME_Resume.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Draw some text
const name = 'Santosh Sharma';
const role = 'Software Engineer / Data Anslyst / Data Science';

// Header
const gradient = doc.linearGradient(0, 0, doc.page.width, 0);
gradient.stop(0, '#3b82f6');
gradient.stop(1, '#8b5cf6');

doc.fillColor(gradient)
   .fontSize(30)
   .font('Helvetica-Bold')
   .text(name, { align: 'center' });

doc.fillColor('#6b7280')
   .fontSize(18)
   .font('Helvetica')
   .text(role, { align: 'center' })
   .moveDown(2);

// Contact Information
doc.fillColor('#374151')
   .fontSize(12)
   .font('Helvetica-Bold')
   .text('CONTACT INFORMATION', { underline: true })
   .moveDown(0.5);

doc.fillColor('#4b5563')
   .font('Helvetica')
   .text('Email: your.email@example.com', 50, doc.y)
   .text('Phone: +1 (123) 456-7890', 250, doc.y)
   .moveDown(1);

doc.text('LinkedIn: https://www.linkedin.com/in/santosh-sharma-a57026220/', 50, doc.y)
   .text('GitHub: https://github.com/Santoshsharm07', 250, doc.y)
   .moveDown(2);

// Professional Summary
doc.fillColor('#374151')
   .fontSize(12)
   .font('Helvetica-Bold')
   .text('PROFESSIONAL SUMMARY', { underline: true })
   .moveDown(0.5);

doc.fillColor('#4b5563')
   .font('Helvetica')
   .fontSize(11)
   .text('Passionate software engineer with expertise in building modern web applications. Proficient in React, Next.js, TypeScript, and cloud technologies. Strong foundation in computer science principles and years of industry experience creating scalable, maintainable, and user-centric solutions.', {
     align: 'justify',
     indent: 20
   })
   .moveDown(2);

// Skills
doc.fillColor('#374151')
   .fontSize(12)
   .font('Helvetica-Bold')
   .text('SKILLS', { underline: true })
   .moveDown(0.5);

doc.fillColor('#4b5563')
   .font('Helvetica')
   .fontSize(11);

const skills = [
  'JavaScript, TypeScript, Python, Java',
  'React, Next.js, Node.js, Express',
  'MongoDB, PostgreSQL, MySQL, Firebase',
  'Tailwind CSS, Bootstrap, Material UI',
  'Git, AWS, Docker, Vercel',
  'RESTful APIs, GraphQL, WebSockets',
  'Agile Development, CI/CD, TDD'
];

skills.forEach((skill, index) => {
  doc.text(`• ${skill}`, { indent: 20 });
});

doc.moveDown(2);

// Experience
doc.fillColor('#374151')
   .fontSize(12)
   .font('Helvetica-Bold')
   .text('EXPERIENCE', { underline: true })
   .moveDown(0.5);

doc.fillColor('#4b5563')
   .font('Helvetica')
   .fontSize(11);

// Experience 1
const experience1 = {
  role: 'Software Engineer',
  company: 'Company Name',
  period: 'Jan 2023 - Present',
  location: 'San Francisco, CA',
  responsibilities: [
    'Developed and maintained React/Next.js applications for enterprise clients',
    'Implemented RESTful APIs using Node.js and Express, handling millions of requests daily',
    'Optimized application performance, reducing load times by 40% through code optimization and caching strategies',
    'Collaborated with designers and product managers to create responsive UI components and improve user experience',
    'Led a team of 3 developers in delivering a major product feature on time and within budget'
  ]
};

doc.font('Helvetica-Bold').text(experience1.role)
   .font('Helvetica').text(`${experience1.company} | ${experience1.period} | ${experience1.location}`)
   .moveDown(0.5);

experience1.responsibilities.forEach(resp => {
  doc.text(`• ${resp}`, { indent: 20 });
});

doc.moveDown(1.5);

// Experience 2
const experience2 = {
  role: 'Junior Developer',
  company: 'Another Company',
  period: 'Jun 2021 - Dec 2022',
  location: 'Remote',
  responsibilities: [
    'Built UI components using React and Tailwind CSS, ensuring cross-browser compatibility',
    'Fixed bugs and implemented new features based on user feedback',
    'Wrote and maintained unit tests, improving test coverage by 30%',
    'Participated in code reviews, providing constructive feedback to team members',
    'Assisted in the migration of legacy code to modern JavaScript frameworks'
  ]
};

doc.font('Helvetica-Bold').text(experience2.role)
   .font('Helvetica').text(`${experience2.company} | ${experience2.period} | ${experience2.location}`)
   .moveDown(0.5);

experience2.responsibilities.forEach(resp => {
  doc.text(`• ${resp}`, { indent: 20 });
});

doc.moveDown(2);

// Education
doc.fillColor('#374151')
   .fontSize(12)
   .font('Helvetica-Bold')
   .text('EDUCATION', { underline: true })
   .moveDown(0.5);

doc.fillColor('#4b5563')
   .font('Helvetica')
   .fontSize(11);

const education = {
  degree: 'Bachelor of Science in Computer Science',
  university: 'University Name',
  period: 'Aug 2017 - May 2021',
  location: 'City, State',
  gpa: 'GPA: 3.8/4.0'
};

doc.font('Helvetica-Bold').text(education.degree)
   .font('Helvetica').text(`${education.university} | ${education.period} | ${education.location}`)
   .text(education.gpa)
   .moveDown(2);

// Projects
doc.fillColor('#374151')
   .fontSize(12)
   .font('Helvetica-Bold')
   .text('PROJECTS', { underline: true })
   .moveDown(0.5);

doc.fillColor('#4b5563')
   .font('Helvetica')
   .fontSize(11);

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.',
    tech: 'React, Node.js, MongoDB, Stripe API'
  },
  {
    title: 'Task Management App',
    description: 'Developed a collaborative task management application with real-time updates using WebSockets. Users can create, assign, and track tasks in real-time.',
    tech: 'Next.js, TypeScript, Firebase, Socket.io'
  },
  {
    title: 'Portfolio Website',
    description: 'Designed and developed a responsive personal portfolio website to showcase projects and skills. Features dark/light mode toggle and smooth animations.',
    tech: 'React, Tailwind CSS, Framer Motion'
  }
];

projects.forEach((project, index) => {
  doc.font('Helvetica-Bold').text(project.title)
     .font('Helvetica').text(project.description, { indent: 20 })
     .text(`Tech Stack: ${project.tech}`, { indent: 20 })
     .moveDown(1);
});

// Final touches
doc.end();

console.log(`Resume generated successfully at: ${outputPath}`);
