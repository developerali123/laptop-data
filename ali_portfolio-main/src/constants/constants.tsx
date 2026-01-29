//@ts-nocheck
import { CiTimer } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import { MdFlightTakeoff } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 5,
    },
  },
};

export const carouselimages = [
  "https://creativelayers.net/themes/viatours-html/img/hero/1/1.png",
  "https://wallpapers.com/images/featured/travel-ibk7fgrvtvhs7qzg.jpg",
];

export const siderStyle = {
  height: "100vh",
  overflow: "auto",
  position: "fixed",
  left: 0,
  zIndex: 2,
};

export const links = [
  {
    id: 1,
    name: "MegaMenu",
    submenu: true,
    sublinks: [
      {
        id: 1,
        Head: "Visa Drop Box",
        sublink: [
          { id: 1, name: "Malaysia Drop Box", link: "/" },
          { id: 2, name: "Vietnam Drop Box", link: "/" },
          { id: 3, name: "Indonesia Drop Box", link: "/" },
        ],
      },
      {
        id: 2,
        Head: "Visa",
        sublink: [
          { id: 1, name: "Malaysia Visa", link: "/" },
          { id: 2, name: "Thailand Visa", link: "/" },
          { id: 3, name: "Indonesia Visa", link: "/" },
          { id: 4, name: "Vietnam Visa", link: "/" },
          { id: 5, name: "Nepal Visa", link: "/" },
          { id: 6, name: "Sri Lanka Visa", link: "/" },
          { id: 7, name: "Singapore Visa", link: "/" },
          { id: 8, name: "Cambodia Visa", link: "/" },
          { id: 9, name: "Egypt Visa", link: "/" },
          { id: 10, name: "Azerbaijan Visa", link: "/" },
          { id: 11, name: "Tajikistan Visa", link: "/" },
          { id: 12, name: "Uzbekistan Visa", link: "/" },
          { id: 13, name: "Jordan Visa", link: "/" },
          { id: 14, name: "Philippine Visa", link: "/" },
          { id: 15, name: "Kenya Visa", link: "/" },
          { id: 16, name: "Turkey Visa", link: "/" },
          { id: 17, name: "Dubai Visa", link: "/" },
        ],
      },
      {
        id: 3,
        Head: "File Processing",
        sublink: [
          { id: 1, name: "Schengen File Processing", link: "/" },
          { id: 2, name: "USA File Processing", link: "/" },
          { id: 3, name: "Canada File Processing", link: "/" },
          { id: 4, name: "UK File Processing", link: "/" },
        ],
      },
      {
        id: 4,
        Head: "Packages",
        sublink: [{ id: 1, name: "Umrah Packages", link: "/" }],
      },
      {
        id: 5,
        Head: "Services",
        sublink: [
          { id: 1, name: "Air Tickets", link: "/" },
          { id: 2, name: "Hajj & Umrah", link: "/" },
          { id: 3, name: "Tours & Holidays", link: "/" },
          { id: 4, name: "Travel Insurance", link: "/" },
          { id: 5, name: "Rent A Car", link: "/" },
        ],
      },
    ],
  },
];

export const services = [
  {
    title: "Web Development",
    description:
      "Designing and developing responsive websites using modern technologies such as HTML5, CSS3, JavaScript, and frameworks like React, Angular, or Vue.js.",
  },
  {
    title: "Backend Development",
    description:
      "Building scalable and secure server-side applications using languages like Node.js, Python, or Java, along with frameworks like Express.js, Flask, or Spring Boot.",
  },
  {
    title: "Database Management",
    description:
      "Designing and implementing database solutions using SQL (e.g., MySQL, PostgreSQL) or NoSQL (e.g., MongoDB, Firebase) databases, including database architecture, optimization, and maintenance.",
  },
  {
    title: "API Development",
    description:
      "Creating RESTful or GraphQL APIs to enable communication between frontend and backend systems, ensuring efficient data exchange and integration.",
  },
  {
    title: "Cloud Services",
    description:
      "Deploying applications and services on cloud platforms like AWS, Azure, or Google Cloud, including setting up and managing infrastructure, monitoring, and scaling.",
  },
  {
    title: "DevOps Practices",
    description:
      "Implementing CI/CD pipelines, automated testing, and deployment strategies to streamline development workflows and ensure code quality.",
  },
  {
    title: "Security Best Practices",
    description:
      "Implementing security measures to protect applications from common threats, such as XSS, CSRF, and SQL injection, including encryption, authentication, and authorization mechanisms.",
  },
  {
    title: "Version Control",
    description:
      "Using version control systems like Git to manage code repositories, collaborate with team members, and track changes efficiently.",
  },
  {
    title: "Performance Optimization",
    description:
      "Optimizing frontend and backend performance to ensure fast loading times, smooth user experience, and efficient resource utilization.",
  },
  {
    title: "Agile Methodologies",
    description:
      "Working in agile environments, collaborating with cross-functional teams, and following agile practices like Scrum or Kanban to deliver projects on time and within scope.",
  },
];

export const blogs = [
  {
    date: "Dec 22, 2023",
    CardTitle: "Meet AutoManage, the best AI management tools",
    CardDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "https://i.ibb.co/Cnwd4q6/image-01.jpg",
  },
  {
    date: "Dec 22, 2023",
    CardTitle: "Meet AutoManage, the best AI management tools",
    CardDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "https://i.ibb.co/Y23YC07/image-02.jpg",
  },
  {
    date: "Dec 22, 2023",
    CardTitle: "Meet AutoManage, the best AI management tools",
    CardDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "https://i.ibb.co/7jdcnwn/image-03.jpg",
  },
  {
    date: "Dec 22, 2023",
    CardTitle: "Meet AutoManage, the best AI management tools",
    CardDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "https://i.ibb.co/7jdcnwn/image-03.jpg",
  },
];

export const features = [
  {
    icon: <CiTimer size={40} />,
    title: "EMERGENCY SERVICES",
    description:
      "We are available to serve our clients 24/7 for any emergency travel needs, accessible via mobile.",
  },
  {
    icon: <MdFlightTakeoff size={40} />,
    title: "CHARTERED AIR FLIGHTS",
    description:
      "Crown International Aviation, in partnership with its affiliates, offers air ambulance and small plane services.",
  },
  {
    icon: <FaUsers size={40} />,
    title: "B2B SERVICES",
    description:
      "We offer competitive airfares for worldwide destinations, empowering travel agents to increase profitability.",
  },
  {
    icon: <TbWorld size={40} />,
    title: "World Wide Tours",
    description:
      "At Crown International, we specialize in designing holiday and tour packages tailored to our clients’ needs and preferences.",
  },
];

export const teams = [
  {
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    alt: "Bonnie Avatar",
    title: "Bonnie Green",
    description: "CEO/Co-founder",
  },
  {
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png",
    alt: "Helene Avatar",
    title: "Helene Engel",
    description: "CTO/Co-founder",
  },
  {
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
    alt: "Jese Avatar",
    title: "Jese Leos",
    description: "SEO & Marketing",
  },
  {
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png",
    alt: "Joseph Avatar",
    title: "Joseph Mcfall",
    description: "Sales",
  },
  {
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png",
    alt: "Sofia Avatar",
    title: "Lana Byrd",
    description: "Web Designer",
  },
  {
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png",
    alt: "Leslie Avatar",
    title: "Leslie Livingston",
    description: "Graphic Designer",
  },
  {
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png",
    alt: "Joseph Avatar",
    title: "Joseph Mcfall",
    description: "Sales",
  },
  {
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png",
    alt: "Neil Avatar",
    title: "Neil Sims",
    description: "Vue.js Developer",
  },
];

export const testinominal = [
  {
    title: "Stayin Alive",
    description:
      "No, Rose, they are not breathing. And they have no arms or legs … Where are they? You know what? If we come across somebody with no arms or legs, do we bother resuscitating them? I mean, what quality of life do we have there?",
    author: "Michael Scott",
  },
  {
    title: "Stayin Alive",
    description:
      "No, Rose, they are not breathing. And they have no arms or legs … Where are they? You know what? If we come across somebody with no arms or legs, do we bother resuscitating them? I mean, what quality of life do we have there?",
    author: "Michael Scott",
  },
  {
    title: "Stayin Alive",
    description:
      "No, Rose, they are not breathing. And they have no arms or legs … Where are they? You know what? If we come across somebody with no arms or legs, do we bother resuscitating them? I mean, what quality of life do we have there?",
    author: "Michael Scott",
  },
];

export const projects = [
  {
    name: "Ali book franchise",
    image: "/images/14.PNG",
    demoLink: "",
    sourceCodeLink: "",
  },
  {
    name: "travel agency website",
    image: "/images/15.PNG",
    demoLink: "",
    sourceCodeLink: "",
  },
  {
    name: "random quote generator",
    image: "/images/11.PNG",
    demoLink: "",
    sourceCodeLink: "",
  },
  {
    name: "digital stopwatch",
    image: "/images/12.PNG",
    demoLink: "",
    sourceCodeLink: "",
  },
  {
    name: "currency converter",
    image: "/images/5.PNG",
    demoLink: "",
    sourceCodeLink: "",
  },
  {
    name: "digital clock",
    image: "/images/6.PNG",
    demoLink: "",
    sourceCodeLink: "",
  },
  // Add more projects as needed
];

export const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: "linear",
  className: "px-5",
  centerMode: true,
  centerPadding: "60px",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
  ],
  appendDots: dots => (
    <div>
      <ul style={{ margin: "20px 0" }}>{dots}</ul>
    </div>
  ),
};

export const FaqItem = ({ question, answer }) => {
  return (
    <div className="py-5 mb-3">
      <details className="group">
        <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
          <span>{question}</span>
          <span className="transition group-open:rotate-180 mb-5 mt-5">
            <svg
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </span>
        </summary>
        <p className="mt-3 group-open:animate-fadeIn">{answer}</p>
      </details>
    </div>
  );
};

export const faqs = [
  {
    question: "What is MERN stack?",
    answer:
      "MERN stack is a full-stack JavaScript framework that is used for building dynamic web applications. It consists of MongoDB, Express.js, React, and Node.js.",
  },
  {
    question: "What is the difference between MongoDB and SQL databases?",
    answer:
      "MongoDB is a NoSQL database, while SQL databases are relational databases. MongoDB stores data in JSON-like documents, making it more flexible than SQL databases.",
  },
  {
    question: "How does Node.js work with the MERN stack?",
    answer:
      "Node.js is used as the backend runtime environment in the MERN stack. It allows you to run JavaScript code on the server side, enabling you to build full-stack applications using JavaScript.",
  },
  {
    question: "What are the advantages of using React in the MERN stack?",
    answer:
      "React is a powerful JavaScript library for building user interfaces. It allows you to create reusable UI components, which makes your code more modular and easier to maintain. React also provides a virtual DOM, which improves the performance of your web applications.",
  },
  {
    question: "How can I deploy a MERN stack application?",
    answer:
      "You can deploy a MERN stack application to a cloud hosting provider such as Heroku, AWS, or Azure. These platforms provide tools and services for deploying and managing web applications.",
  },
  {
    question: "What are some common challenges when working with the MERN stack?",
    answer:
      "Some common challenges include managing state in large React applications, securing your Node.js backend against security threats, and optimizing the performance of your MongoDB database.",
  },
];