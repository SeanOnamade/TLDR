import React from 'react';

function About() {
  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-4xl mx-auto rounded-2xl">
        <h1 className="text-4xl font-black text-center text-white mb-6">ABOUT US</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">Our Mission</h2>
          <p className="mt-2 text-gray-300">
            At Focus Feed, we believe that information is power — but only when it's accessible, reliable, and tailored to you. Our mission is to cut through the noise of the digital world, delivering concise, validated news summaries from trusted sources, all in one place.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">What We Do</h2>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li><strong>Summarize Topics:</strong> Using advanced AI models like LLAMA 3.1, we distill complex news stories into digestible summaries.</li>
            <li><strong>Validate Information:</strong> Our multi-source verification ensures the news you read is accurate and credible.</li>
            <li><strong>Personalize Content:</strong> Get news tailored to your interests with personalized newsletters and recommendations.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">How It Works</h2>
          <ol className="list-decimal list-inside mt-2 text-gray-300">
            <li><strong>Web Scraping:</strong> We collect news from top outlets like Wired, AP, Vogue, and more.</li>
            <li><strong>AI-Powered Summarization:</strong> Sophisticated AI models provide concise, easy-to-read summaries.</li>
            <li><strong>Customizable Experience:</strong> Adjust preferences, subscribe to newsletters, and see friend recommendations.</li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">Meet the Team</h2>
          <p className="mt-2 text-gray-300">
            Focus Feed is crafted by a passionate team dedicated to revolutionizing news consumption through technology and innovation.
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li>Aidan Wendorf</li>
            <li>Zander Raycraft</li>
            <li>Brandon Chandler</li>
            <li>Jane Sun</li>
            <li>Sean Onamade</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">Technologies We Use</h2>
          <p className="mt-2 text-gray-300">
            We utilize cutting-edge technologies like Next.js, Tailwind CSS, LLAMA 3.1, PyTorch, Firebase, and Vercel to bring Focus Feed to life.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#F51555]">Join Us on This Journey</h2>
          <p className="mt-2 text-gray-300">
            Focus Feed isn't just a news platform; it's a movement towards smarter, more efficient information consumption. Stay connected, stay informed, and let's reshape the future of news together.
          </p>
          <p className="mt-4 text-center text-[#F51555] font-bold">Your news. Your way. Every day.</p>
        </section>
      </div>
    </div>
);
}

export default About;