// src/pages/About.jsx
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext'; // Adjust the path as needed

function About() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen p-4 ${isDark ? "bg-[#1f1d1e]" : "bg-white"}`}>
      <div className="max-w-4xl mx-auto rounded-2xl p-8">
        <h1 
          className={`text-4xl font-black text-center mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          ABOUT US
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-[#F51555]">Our Mission</h2>
          <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
            At Focus Feed, we believe that information is power — but only when it's accessible, reliable, and tailored to you. Our mission is to cut through the digital noise and deliver concise, verified news summaries from trusted sources, all in one place.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-[#F51555]">What We Do</h2>
          <ul className={`list-disc list-inside mt-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <li>
              <strong>Summarize Topics:</strong> Using advanced AI models such as LLAMA 3.1, we distill complex news stories into easy-to-digest summaries.
            </li>
            <li>
              <strong>Validate Information:</strong> Our multi-source verification ensures that the news you receive is both accurate and credible.
            </li>
            <li>
              <strong>Personalize Content:</strong> Enjoy tailored news experiences with personalized newsletters and recommendations.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-[#F51555]">How It Works</h2>
          <ol className={`list-decimal list-inside mt-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <li>
              <strong>Web Scraping:</strong> We gather news from top sources such as Wired, AP, Vogue, and more.
            </li>
            <li>
              <strong>AI-Powered Summarization:</strong> Sophisticated AI models provide brief, easy-to-read summaries.
            </li>
            <li>
              <strong>Customizable Experience:</strong> Adjust your preferences, subscribe or unsubscribe to our newsletters, and receive recommendations.
            </li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-[#F51555]">Meet the Team</h2>
          <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Focus Feed is brought to you by a dedicated team committed to transforming news consumption through innovation and smart technology.
          </p>
          <ul className={`list-disc list-inside mt-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <li>Aidan Wendorf</li>
            <li>Zander Raycraft</li>
            <li>Brandon Chandler</li>
            <li>Jane Sun</li>
            <li>Sean Onamade</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-[#F51555]">Technologies We Use</h2>
          <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
            We use cutting-edge technologies including Next.js, Tailwind CSS, LLAMA 3.1, PyTorch, Firebase, and Vercel to power Focus Feed.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-[#F51555]">Join Us on This Journey</h2>
          <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Focus Feed isn’t just a news platform; it’s a movement toward smarter, more efficient information consumption. Stay connected, informed, and join us as we reshape the future of news.
          </p>
          <p className="mt-4 text-center text-[#F51555] font-bold">
            Your news. Your way. Every day.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
