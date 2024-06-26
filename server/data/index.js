// Import packages
import mongoose from "mongoose";

export const jobs = [
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Software Engineer",
      postedTime: new Date(),
      company: "Tech Corp",
      salary: "$120,000 - $150,000",
      currency: "USD",
      country: "California",
      city: "San Francisco",
      isRemote: false,
      description:
        "We are looking for a skilled software engineer to join our team. You will work on various projects and collaborate with other developers. The ideal candidate should have experience with React and Node.js.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Data Scientist",
      postedTime: new Date(),
      company: "Data Solutions",
      salary: "$110,000 - $130,000",
      currency: "USD",
      country: "New York",
      city: "New York",
      isRemote: true,
      description:
        "We are seeking a data scientist with expertise in machine learning and statistical modeling. Experience with Python and R is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Product Manager",
      postedTime: new Date(),
      company: "Innovatech",
      salary: "$100,000 - $120,000",
      currency: "USD",
      country: "Massachusetts",
      city: "Boston",
      isRemote: false,
      description:
        "We need a product manager to lead our software development team. You will work closely with developers and designers to create innovative products.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "UX/UI Designer",
      postedTime: new Date(),
      company: "Design Studio",
      salary: "$90,000 - $110,000",
      currency: "USD",
      country: "California",
      city: "Los Angeles",
      isRemote: true,
      description:
        "We are looking for a creative UX/UI designer to design user-friendly interfaces for our clients. Proficiency in Adobe XD and Figma is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Marketing Specialist",
      postedTime: new Date(),
      company: "MarketPros",
      salary: "$70,000 - $90,000",
      currency: "USD",
      country: "Illinois",
      city: "Chicago",
      isRemote: false,
      description:
        "Join our marketing team to develop and implement marketing strategies. Experience with digital marketing and SEO is a plus.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "DevOps Engineer",
      postedTime: new Date(),
      company: "CloudOps",
      salary: "$120,000 - $140,000",
      currency: "USD",
      country: "Texas",
      city: "Austin",
      isRemote: true,
      description:
        "We are looking for a DevOps engineer to manage our cloud infrastructure. Experience with AWS and Docker is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Graphic Designer",
      postedTime: new Date(),
      company: "CreativeWorks",
      salary: "$60,000 - $80,000",
      currency: "USD",
      country: "Florida",
      city: "Miami",
      isRemote: true,
      description:
        "We need a graphic designer to create visual content for our clients. Proficiency in Adobe Creative Suite is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Frontend Developer",
      postedTime: new Date(),
      company: "Webify",
      salary: "$100,000 - $120,000",
      currency: "USD",
      country: "Washington",
      city: "Seattle",
      isRemote: false,
      description:
        "Join our team as a frontend developer. Experience with React and CSS is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Backend Developer",
      postedTime: new Date(),
      company: "TechCore",
      salary: "$110,000 - $130,000",
      currency: "USD",
      country: "California",
      city: "San Jose",
      isRemote: true,
      description:
        "We need a backend developer with expertise in Node.js and MongoDB. You will work on building robust APIs.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "QA Engineer",
      postedTime: new Date(),
      company: "QualityFirst",
      salary: "$80,000 - $100,000",
      currency: "USD",
      country: "Colorado",
      city: "Denver",
      isRemote: false,
      description:
        "We are looking for a QA engineer to ensure the quality of our software products. Experience with automated testing tools is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "HR Manager",
      postedTime: new Date(),
      company: "HR Solutions",
      salary: "$70,000 - $90,000",
      currency: "USD",
      country: "Georgia",
      city: "Atlanta",
      isRemote: true,
      description:
        "We need an HR manager to oversee our recruitment and employee relations. Experience in HR management is a plus.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Systems Administrator",
      postedTime: new Date(),
      company: "NetSecure",
      salary: "$90,000 - $110,000",
      currency: "USD",
      country: "Virginia",
      city: "Arlington",
      isRemote: false,
      description:
        "Join our team as a systems administrator. Experience with Linux and network security is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Business Analyst",
      postedTime: new Date(),
      company: "BizTech",
      salary: "$75,000 - $95,000",
      currency: "USD",
      country: "Ohio",
      city: "Columbus",
      isRemote: true,
      description:
        "We are looking for a business analyst to analyze business processes and provide insights. Experience with data analysis tools is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Project Manager",
      postedTime: new Date(),
      company: "PM Solutions",
      salary: "$85,000 - $105,000",
      currency: "USD",
      country: "North Carolina",
      city: "Charlotte",
      isRemote: false,
      description:
        "We need a project manager to oversee project planning and execution. PMP certification is a plus.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Cybersecurity Analyst",
      postedTime: new Date(),
      company: "SecureTech",
      salary: "$100,000 - $120,000",
      currency: "USD",
      country: "Maryland",
      city: "Baltimore",
      isRemote: true,
      description:
        "We are seeking a cybersecurity analyst to monitor and protect our systems. Experience with SIEM tools is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "AI Engineer",
      postedTime: new Date(),
      company: "AI Innovations",
      salary: "$120,000 - $150,000",
      currency: "USD",
      country: "New York",
      city: "New York",
      isRemote: false,
      description:
        "Join our team as an AI engineer. Experience with machine learning frameworks like TensorFlow and PyTorch is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Content Writer",
      postedTime: new Date(),
      company: "WriteNow",
      salary: "$50,000 - $70,000",
      currency: "USD",
      country: "Texas",
      city: "Dallas",
      isRemote: true,
      description:
        "We need a content writer to create engaging content for our blog and social media. Experience with SEO is a plus.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Mobile App Developer",
      postedTime: new Date(),
      company: "AppWorld",
      salary: "$110,000 - $130,000",
      currency: "USD",
      country: "California",
      city: "San Diego",
      isRemote: false,
      description:
        "We are looking for a mobile app developer with experience in iOS and Android development. Proficiency in Swift and Kotlin is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Technical Support Specialist",
      postedTime: new Date(),
      company: "SupportPro",
      salary: "$50,000 - $70,000",
      currency: "USD",
      country: "Arizona",
      city: "Phoenix",
      isRemote: true,
      description:
        "Join our support team to provide technical assistance to our customers. Experience with customer support tools is a plus.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Sales Manager",
      postedTime: new Date(),
      company: "SalesForce",
      salary: "$80,000 - $100,000",
      currency: "USD",
      country: "Michigan",
      city: "Detroit",
      isRemote: false,
      description:
        "We need a sales manager to lead our sales team and develop sales strategies. Experience in B2B sales is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "IT Support Specialist",
      postedTime: new Date(),
      company: "IT Solutions",
      salary: "$55,000 - $75,000",
      currency: "USD",
      country: "Nevada",
      city: "Las Vegas",
      isRemote: true,
      description:
        "We are looking for an IT support specialist to assist with technical issues. Experience with Windows and macOS is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Cloud Architect",
      postedTime: new Date(),
      company: "CloudNet",
      salary: "$130,000 - $160,000",
      currency: "USD",
      country: "Oregon",
      city: "Portland",
      isRemote: false,
      description:
        "Join our team as a cloud architect to design and implement cloud solutions. Experience with AWS and Azure is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Full Stack Developer",
      postedTime: new Date(),
      company: "DevWorks",
      salary: "$100,000 - $130,000",
      currency: "USD",
      country: "Utah",
      city: "Salt Lake City",
      isRemote: true,
      description:
        "We are looking for a full stack developer with experience in both frontend and backend development. Proficiency in React and Node.js is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "SEO Specialist",
      postedTime: new Date(),
      company: "SEO Masters",
      salary: "$60,000 - $80,000",
      currency: "USD",
      country: "North Carolina",
      city: "Raleigh",
      isRemote: false,
      description:
        "Join our marketing team as an SEO specialist. Experience with Google Analytics and SEO tools is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Customer Service Representative",
      postedTime: new Date(),
      company: "CustomerFirst",
      salary: "$40,000 - $60,000",
      currency: "USD",
      country: "Ohio",
      city: "Cleveland",
      isRemote: true,
      description:
        "We need a customer service representative to assist our customers with inquiries and issues. Excellent communication skills are required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Social Media Manager",
      postedTime: new Date(),
      company: "SocialBuzz",
      salary: "$70,000 - $90,000",
      currency: "USD",
      country: "Florida",
      city: "Orlando",
      isRemote: false,
      description:
        "We are looking for a social media manager to manage our social media accounts and create engaging content. Experience with social media platforms is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Network Engineer",
      postedTime: new Date(),
      company: "NetWorkz",
      salary: "$90,000 - $110,000",
      currency: "USD",
      country: "Pennsylvania",
      city: "Philadelphia",
      isRemote: true,
      description:
        "We need a network engineer to manage and troubleshoot our network infrastructure. Experience with Cisco and Juniper is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Blockchain Developer",
      postedTime: new Date(),
      company: "BlockChain Inc.",
      salary: "$120,000 - $140,000",
      currency: "USD",
      country: "New York",
      city: "New York",
      isRemote: false,
      description:
        "Join our team as a blockchain developer. Experience with Ethereum and Solidity is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Financial Analyst",
      postedTime: new Date(),
      company: "FinancePros",
      salary: "$80,000 - $100,000",
      currency: "USD",
      country: "Massachusetts",
      city: "Boston",
      isRemote: true,
      description:
        "We are seeking a financial analyst to analyze financial data and provide insights. Experience with financial modeling and Excel is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Operations Manager",
      postedTime: new Date(),
      company: "OpsTeam",
      salary: "$90,000 - $110,000",
      currency: "USD",
      country: "Illinois",
      city: "Chicago",
      isRemote: false,
      description:
        "We need an operations manager to oversee our business operations. Experience in operations management is required.",
      link: "https://www.example.com/apply",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      title: "Web Developer",
      postedTime: new Date(),
      company: "WebDev Inc.",
      salary: "$90,000 - $110,000",
      currency: "USD",
      country: "California",
      city: "San Francisco",
      isRemote: true,
      description:
        "We are looking for a web developer to build and maintain our website. Experience with HTML, CSS, and JavaScript is required.",
      link: "https://www.example.com/apply",
    },
  ];
  