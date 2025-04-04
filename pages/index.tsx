import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X } from "lucide-react";

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  //start nav bar action
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = ["home", "about", "projects", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      let currentSection = "home"; // Default section
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 100; // Adjust for navbar height
          const offsetBottom = offsetTop + element.clientHeight;
          if (window.scrollY >= offsetTop && window.scrollY < offsetBottom) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  //end nav bar action

  //start project action
  const experience = [
    {
      id: 1,
      project: "Booking Seat",
      description: "Book seats and Alert to Telegram BOT",
    },
    {
      id: 2,
      project: "Tutorial MVC",
      description: "Research and Teach about modal, view and controller",
    },
    {
      id: 3,
      project: "Project HR System",
      description: "CRUD Employees, Payroll 1st & 2nd salary, Manage role user",
    },
  ];
  //end project action
  
  //contact action
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Head>
        <title>My Portfolio</title>
      </Head>
      
      {/* <header className="p-6 bg-gray-100 text-center text-3xl font-bold shadow-lg uppercase tracking-wider">
        My Portfolio
      </header> */}
      
      <nav className={`fixed w-full top-0 left-0 z-20 transition-all duration-300 ${ isScrolled ? "bg-white shadow-md" : "bg-transparent" }`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <a href="#home" className="text-2xl font-bold text-blue-600">
            Srun Chanmetheavy
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 text-lg font-semibold">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={`hover:text-blue-500 transition duration-300 ${
                    activeSection === section ? "border-b-2 border-blue-500 text-blue-500" : ""
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden flex flex-col items-center space-y-6 py-4 bg-white shadow-md">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={`text-lg font-semibold transition ${
                    activeSection === section ? "text-blue-500 font-bold" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
      
      <section id="home" className="h-screen flex flex-col justify-center items-center text-center bg-gray-50">
        <div className="max-w-3xl px-6">
          {/* Animated Introduction */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Hello, I'm <span className="text-blue-500">Srun Chanmetheavy</span>
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-gray-600">
            A passionate developer specializing in <span className="text-blue-500 font-semibold">modern web technologies</span>
          </p>

          {/* Call-to-Action Buttons */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <a
              href="#projects"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-600 transition"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-500 hover:text-white transition"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
      
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center">
          {/* Profile Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <Image src="/aboutme3.jpg" layout="fill" objectFit="cover" alt="Srun Chanmetheavy" className="rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* About Content */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
            <h2 className="text-5xl font-extrabold text-blue-600">About Me</h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Hi! I'm <span className="text-blue-500 font-semibold">Srun Chanmetheavy</span>, a passionate web developer
              specializing in modern technologies like <span className="font-semibold">Next.js, Spring Boot, and Node.js</span>.
              I love creating intuitive and high-performing web applications.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              With a strong focus on **clean code, user experience, and problem-solving**, I strive to build impactful digital solutions.
            </p>
            
            {/* Call-to-Action Button */}
            <div className="mt-6">
              <a href="#contact" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-600 transition">Let's Connect</a>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="h-200 py-15 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 mt-25 text-center">
          <h2 className="text-5xl font-bold text-blue-500">My Projects</h2>
          <p className="text-gray-600 mt-3 text-lg">
            A collection of my most exciting and innovative projects.
          </p>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-12">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-white p-6 rounded-2xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl">
                <div className="overflow-hidden rounded-lg">
                  <Image src={`/project${exp.id}.jpg`} width={350} height={250} alt={exp.project} className="rounded-lg transition-transform duration-300 hover:scale-110"/>
                </div>
                <h3 className="text-2xl font-semibold mt-4 text-gray-800">{exp.project}</h3>
                <p className="mt-2 text-gray-600">{exp.description}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="h-220 flex flex-col justify-center items-center bg-gray-50">
        <div className="max-w-6xl w-full p-12 bg-white rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-center text-blue-600">Get in Touch</h2>
          <p className="text-center text-gray-600 mt-2">
            Feel free to reach out for collaborations or just a friendly chat.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-500">Contact Information</h3>
              <p className="text-gray-600 mt-3">
                I'd love to hear from you! Reach out via phone, email, or visit me.
              </p>
              <div className="mt-4 space-y-3">
                <p className="flex items-center space-x-2">
                  📞 <span className="text-gray-800">+885 69 210 110 / +885 88 420 6661</span>
                </p>
                <p className="flex items-center space-x-2">
                  📧 <span className="text-gray-800">meathvy@gmail.com</span>
                </p>
                <p className="flex items-center space-x-2">
                  📍 <span className="text-gray-800">#09A, St. Boeng Chhouk, Phnom Penh</span>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-500">Send a Message</h3>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone (Optional)"
                    className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Type your message..."
                  value={formData.message}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
                  rows={4}
                  required
                ></textarea>
                {status && (
                  <p className={`mt-3 font-bold text-center ${status.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                    {status}
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-3 px-6 rounded-lg w-full hover:bg-blue-600 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
