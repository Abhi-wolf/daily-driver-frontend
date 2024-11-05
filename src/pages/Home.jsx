/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  FolderKanban,
  DollarSign,
  Music,
  Calendar,
  FileText,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/main" className="flex items-center space-x-2">
            <image
              src="/placeholder.svg"
              alt="TaskMaster Logo"
              width={32}
              height={32}
            />
            <span className="text-2xl font-bold text-primary">TaskMaster</span>
          </a>
          <nav className="space-x-4">
            <a
              href="#features"
              className="hidden md:inline-block text-sm font-medium text-gray-600 hover:text-primary"
            >
              Features
            </a>
            <a
              href="#about"
              className="hidden md:inline-block text-sm font-medium text-gray-600 hover:text-primary"
            >
              About
            </a>
            <Link to="/login">
              <Button variant="outline">Log in</Button>
            </Link>

            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Manage Your Life, All in One Place
              </h1>
              <p className="text-xl mb-8">
                Tasks, projects, expenses, music, events, and notes - organized
                and simplified.
              </p>
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <image
                src="/placeholder.svg"
                alt="TaskMaster Dashboard"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything You Need, In One App
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-primary" />}
                title="Task Management"
                description="Organize and track your tasks with ease. Set priorities, deadlines, and never miss a beat."
              />
              <FeatureCard
                icon={<FolderKanban className="h-10 w-10 text-primary" />}
                title="Project Tracking"
                description="Manage complex projects with our intuitive project management tools."
              />
              <FeatureCard
                icon={<DollarSign className="h-10 w-10 text-primary" />}
                title="Expense Tracking"
                description="Keep your finances in check. Log expenses and generate insightful reports."
              />
              <FeatureCard
                icon={<Music className="h-10 w-10 text-primary" />}
                title="Music Library"
                description="Upload, organize, and listen to your favorite tunes, all within the app."
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-primary" />}
                title="Event Scheduling"
                description="Plan your days with our powerful calendar. Schedule events and get reminders."
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="Note Taking"
                description="Capture your thoughts with our file explorer-like note-taking system."
              />
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">About TaskMaster</h2>
              <p className="text-xl text-gray-600 mb-8">
                TaskMaster was born from a simple idea: to create a single
                platform that helps you manage every aspect of your life. We
                believe that when you have the right tools, you can achieve
                more, stress less, and live better.
              </p>
              <p className="text-xl text-gray-600 mb-8">
                Our mission is to empower individuals and teams to take control
                of their tasks, projects, finances, and personal development.
                With TaskMaster, you&apos;re not just organizing your life -
                you&apos;re optimizing it.
              </p>
              <div className="flex justify-center space-x-4 flex-wrap gap-4">
                <Link to="/main">
                  <Button variant="outline" size="lg">
                    Learn More
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg">
                    Join Our Community
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Organized?</h2>
            <p className="text-xl mb-8">
              Join thousands of users who have transformed their productivity
              with TaskMaster.
            </p>
            <Link to="/login">
              <Button size="lg" variant="secondary">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>
              &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-4">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
