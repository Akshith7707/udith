// Learning resources organized by category
export const RESOURCES = {
  courses: [
    { id: 1, title: 'Complete Python Developer', platform: 'Udemy', duration: '40 hours', difficulty: 'Beginner', rating: 4.7, free: false, icon: '🐍', url: 'https://www.udemy.com/course/complete-python-developer-zero-to-mastery/' },
    { id: 2, title: 'CS50: Introduction to Computer Science', platform: 'Harvard/edX', duration: '12 weeks', difficulty: 'Beginner', rating: 4.9, free: true, icon: '🎓', url: 'https://cs50.harvard.edu/x/' },
    { id: 3, title: 'Machine Learning Specialization', platform: 'Coursera', duration: '3 months', difficulty: 'Intermediate', rating: 4.8, free: false, icon: '🤖', url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
    { id: 4, title: 'Google UX Design Certificate', platform: 'Coursera', duration: '6 months', difficulty: 'Beginner', rating: 4.8, free: false, icon: '🎨', url: 'https://www.coursera.org/professional-certificates/google-ux-design' },
    { id: 5, title: 'Full Stack Web Development', platform: 'freeCodeCamp', duration: '300 hours', difficulty: 'Intermediate', rating: 4.6, free: true, icon: '🌐', url: 'https://www.freecodecamp.org/' },
    { id: 6, title: 'AWS Solutions Architect', platform: 'A Cloud Guru', duration: '50 hours', difficulty: 'Advanced', rating: 4.7, free: false, icon: '☁️', url: 'https://acloudguru.com/' },
  ],
  books: [
    { id: 1, title: 'Clean Code', platform: 'Robert C. Martin', duration: '464 pages', difficulty: 'Intermediate', rating: 4.7, free: false, icon: '📕', url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882' },
    { id: 2, title: 'Cracking the Coding Interview', platform: 'Gayle McDowell', duration: '687 pages', difficulty: 'Intermediate', rating: 4.8, free: false, icon: '📘', url: 'https://www.crackingthecodinginterview.com/' },
    { id: 3, title: 'The Lean Startup', platform: 'Eric Ries', duration: '336 pages', difficulty: 'Beginner', rating: 4.5, free: false, icon: '📗', url: 'https://theleanstartup.com/' },
    { id: 4, title: 'Design of Everyday Things', platform: 'Don Norman', duration: '368 pages', difficulty: 'Beginner', rating: 4.6, free: false, icon: '📙', url: 'https://jnd.org/books/' },
    { id: 5, title: 'Zero to One', platform: 'Peter Thiel', duration: '224 pages', difficulty: 'Beginner', rating: 4.5, free: false, icon: '📕', url: 'https://www.penguinrandomhouse.com/books/234099/zero-to-one-by-peter-thiel/' },
    { id: 6, title: 'Atomic Habits', platform: 'James Clear', duration: '320 pages', difficulty: 'Beginner', rating: 4.8, free: false, icon: '📘', url: 'https://jamesclear.com/atomic-habits' },
  ],
  certifications: [
    { id: 1, title: 'AWS Certified Solutions Architect', platform: 'Amazon', duration: '3-6 months', difficulty: 'Advanced', rating: 4.8, free: false, icon: '🏆', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/' },
    { id: 2, title: 'Google Cloud Professional', platform: 'Google', duration: '3-6 months', difficulty: 'Advanced', rating: 4.7, free: false, icon: '🏆', url: 'https://cloud.google.com/certification/cloud-architect' },
    { id: 3, title: 'PMP Certification', platform: 'PMI', duration: '3-6 months', difficulty: 'Advanced', rating: 4.6, free: false, icon: '🏆', url: 'https://www.pmi.org/certifications/project-management-pmp' },
    { id: 4, title: 'Certified Scrum Master', platform: 'Scrum Alliance', duration: '2-4 weeks', difficulty: 'Intermediate', rating: 4.5, free: false, icon: '🏆', url: 'https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster' },
    { id: 5, title: 'Meta Front-End Developer', platform: 'Meta/Coursera', duration: '7 months', difficulty: 'Intermediate', rating: 4.7, free: false, icon: '🏆', url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer' },
    { id: 6, title: 'TensorFlow Developer', platform: 'Google', duration: '2-3 months', difficulty: 'Advanced', rating: 4.6, free: false, icon: '🏆', url: 'https://www.tensorflow.org/certificate' },
  ],
  youtube: [
    { id: 1, title: 'Fireship', platform: 'YouTube', duration: '100+ videos', difficulty: 'All Levels', rating: 4.9, free: true, icon: '🔥', url: 'https://www.youtube.com/@Fireship' },
    { id: 2, title: 'Traversy Media', platform: 'YouTube', duration: '500+ videos', difficulty: 'All Levels', rating: 4.8, free: true, icon: '📺', url: 'https://www.youtube.com/@TraversyMedia' },
    { id: 3, title: 'CS Dojo', platform: 'YouTube', duration: '100+ videos', difficulty: 'Beginner', rating: 4.7, free: true, icon: '🥋', url: 'https://www.youtube.com/@CSDojo' },
    { id: 4, title: 'TechLead', platform: 'YouTube', duration: '300+ videos', difficulty: 'All Levels', rating: 4.5, free: true, icon: '👨‍💻', url: 'https://www.youtube.com/@TechLead' },
    { id: 5, title: '3Blue1Brown', platform: 'YouTube', duration: '100+ videos', difficulty: 'Intermediate', rating: 4.9, free: true, icon: '📐', url: 'https://www.youtube.com/@3blue1brown' },
    { id: 6, title: 'CodeWithHarry', platform: 'YouTube', duration: '1000+ videos', difficulty: 'All Levels', rating: 4.8, free: true, icon: '🇮🇳', url: 'https://www.youtube.com/@CodeWithHarry' },
  ],
  communities: [
    { id: 1, title: 'r/cscareerquestions', platform: 'Reddit', duration: '2M+ members', difficulty: 'All Levels', rating: 4.5, free: true, icon: '🤝', url: 'https://www.reddit.com/r/cscareerquestions/' },
    { id: 2, title: 'Dev.to', platform: 'Web', duration: '1M+ members', difficulty: 'All Levels', rating: 4.6, free: true, icon: '💻', url: 'https://dev.to/' },
    { id: 3, title: 'Hashnode', platform: 'Web', duration: '500K+ members', difficulty: 'All Levels', rating: 4.5, free: true, icon: '✍️', url: 'https://hashnode.com/' },
    { id: 4, title: 'Discord: Reactiflux', platform: 'Discord', duration: '200K+ members', difficulty: 'Intermediate', rating: 4.7, free: true, icon: '⚛️', url: 'https://www.reactiflux.com/' },
    { id: 5, title: 'LinkedIn Tech Groups', platform: 'LinkedIn', duration: '5M+ members', difficulty: 'All Levels', rating: 4.4, free: true, icon: '💼', url: 'https://www.linkedin.com/groups/' },
    { id: 6, title: 'Stack Overflow', platform: 'Web', duration: '20M+ users', difficulty: 'All Levels', rating: 4.8, free: true, icon: '📚', url: 'https://stackoverflow.com/' },
  ],
};

// Chat bot responses
export const CHAT_RESPONSES = {
  default: "Hello! I'm NexusAI, your career intelligence assistant. I can help you with career guidance, skill recommendations, and job market insights. What would you like to know?",
  career: "Based on current market trends, the most in-demand careers in India are: Software Engineering, Data Science, Product Management, Cloud Architecture, and AI/ML Engineering. Would you like me to analyze which suits your profile best?",
  salary: "Tech salaries in India have grown 15-20% YoY. Entry-level SWE: ₹6-15L, Mid-level: ₹15-35L, Senior: ₹35-70L+. FAANG companies and top startups pay premium packages. Want specific insights for your target role?",
  skills: "The top skills to learn in 2024 are: 1) AI/ML & LLMs, 2) Cloud (AWS/GCP/Azure), 3) Full-stack development, 4) System Design, 5) Data Engineering. I can create a personalized learning path based on your goals!",
};
