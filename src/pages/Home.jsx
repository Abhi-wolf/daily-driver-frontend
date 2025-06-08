import { useState, useEffect } from "react";
import {
  CheckCircle,
  FolderKanban,
  DollarSign,
  Music,
  Calendar,
  FileText,
  ArrowRight,
  ChevronRight,
  Bookmark,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store";

export default function Home() {
  const { user, removeUser } = useUserStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center space-x-2 z-50">
            <div className="relative w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TM</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent">
              TaskMaster
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-gray-600 hover:text-gray-600 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-gray-600 hover:text-gray-600 transition-colors cursor-pointer"
            >
              About
            </button>
            {!user?.email && (
              <Link to="/login">
                <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  Log in
                </button>
              </Link>
            )}

            {!user?.email ? (
              <Link to="/signup">
                <button className="px-4 py-2 text-sm font-medium  bg-gray-600 rounded-md hover:bg-gray-700 transition-colors">
                  Sign up
                </button>
              </Link>
            ) : (
              <button
                onClick={() => removeUser()}
                className="px-4 py-2 text-sm font-medium  bg-red-500 rounded-md hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-sm font-medium text-gray-600 hover:text-gray-600 transition-colors text-left"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm font-medium text-gray-600 hover:text-gray-600 transition-colors text-left"
              >
                About
              </button>
              <div className="flex flex-row gap-4">
                {!user?.email && (
                  <Link to="/login" className="flex-1">
                    <button className="w-full px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      Log in
                    </button>
                  </Link>
                )}

                {!user?.email ? (
                  <Link to="/signup" className="flex-1">
                    <button className="w-full px-4 py-2 text-sm font-medium  bg-gray-600 rounded-md hover:bg-gray-700 transition-colors">
                      Sign up
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => removeUser()}
                    className="flex-1 px-4 py-2 text-sm font-medium  bg-red-500 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-indigo-50 -z-10" />
          <div className="absolute inset-0 -z-20">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="mb-4 inline-block px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
                  Simplify your workflow
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Manage Your Life, All in One Place
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Tasks, projects, expenses, music, events, and notes -
                  organized and simplified for maximum productivity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/login">
                    <button className="group px-6 py-3  bg-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="px-6 py-3 text-gray-600 border border-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Explore Features
                  </button>
                </div>
              </div>

              <div className="md:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                  <div className="absolute inset-0 bg-gradient-to-tr from-gray-500/20 to-transparent z-10 pointer-events-none" />
                  <div className="p-8">
                    <div className="bg-gray-100 rounded-lg p-6 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Today's Tasks</h3>
                        <span className="text-sm text-gray-500">
                          3 of 5 done
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="line-through">
                            Review project proposal
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="line-through">
                            Update client presentation
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                          <span>Schedule team meeting</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <DollarSign className="h-6 w-6 text-gray-600 mb-2" />
                        <p className="text-sm text-gray-600">Monthly Budget</p>
                        <p className="text-lg font-semibold">$2,340</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <FolderKanban className="h-6 w-6 text-green-600 mb-2" />
                        <p className="text-sm text-gray-600">Active Projects</p>
                        <p className="text-lg font-semibold">7</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-block px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
                Features
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need, In One App
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Streamline your workflow with our comprehensive suite of tools
                designed to boost your productivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-gray-600" />}
                title="Task Management"
                description="Organize and track your tasks with ease. Set priorities, deadlines, and never miss a beat."
              />
              <FeatureCard
                icon={<FolderKanban className="h-10 w-10 text-gray-600" />}
                title="Project Tracking"
                description="Manage complex projects with our intuitive project management tools."
              />
              <FeatureCard
                icon={<DollarSign className="h-10 w-10 text-gray-600" />}
                title="Expense Tracking"
                description="Keep your finances in check. Log expenses and generate insightful reports."
              />
              <FeatureCard
                icon={<Music className="h-10 w-10 text-gray-600" />}
                title="Music Library"
                description="Upload, organize, and listen to your favorite tunes, all within the app."
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-gray-600" />}
                title="Event Scheduling"
                description="Plan your days with our powerful calendar. Schedule events and get reminders."
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-gray-600" />}
                title="Note Taking"
                description="Capture your thoughts with our file explorer-like note-taking system."
              />
              <FeatureCard
                icon={<Bookmark className="h-10 w-10 text-gray-600" />}
                title="Bookmarks"
                description="Bookmark links to view them later directly using the custom chrome extension."
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="mb-4 inline-block px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
                  Our Story
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  About TaskMaster
                </h2>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-8">
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    TaskMaster was born from a simple idea: to create a single
                    platform that helps you manage every aspect of your life. We
                    believe that when you have the right tools, you can achieve
                    more, stress less, and live better.
                  </p>
                  <hr className="my-6 border-gray-200" />
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Our mission is to empower individuals and teams to take
                    control of their tasks, projects, finances, and personal
                    development. With TaskMaster, you're not just organizing
                    your life - you're optimizing it.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/signup">
                      <button className="group px-6 py-3 text-gray-600 border border-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                        Learn More
                        <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </Link>

                    <Link to="/signup">
                      <button className="group px-6 py-3  bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                        Join Our Community
                        <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gray-600 -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)] -z-10" />

          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 ">
              Ready to Get Organized?
            </h2>
            <p className="text-xl mb-8  max-w-2xl mx-auto">
              Join thousands of users who have transformed their productivity
              with TaskMaster.
            </p>

            <Link to="/login">
              <button className="group px-8 py-4 text-gray-600 bg-gray-400 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center mx-auto">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900  py-12">
        <div className="container mx-auto px-4 flex justify-between items-center flex-col">
          <div className="pt-4 border-t border-gray-800 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <a href="#" className="flex items-center space-x-2">
                <div className="relative w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                  <span className=" font-bold text-xs">TM</span>
                </div>
                <span className="text-xl font-bold text-gray-400">
                  TaskMaster
                </span>
              </a>
            </div>
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-1 text-muted-foreground text-sm">
            Made with ❤️ by{" "}
            <a
              href="https://portfolio-ruby-rho-64.vercel.app/"
              className="text-blue-500 hover:underline ml-1"
              target="_blank"
            >
              {" "}
              @Abhijeet
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`h-full transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm transform ${
        isHovered ? "shadow-lg -translate-y-1" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-gray-50">{icon}</div>
          <h3 className="text-xl font-semibold ml-4">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
