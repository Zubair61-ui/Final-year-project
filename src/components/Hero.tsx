"use client";

import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { GOOGLE_AUTH_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Sparkles, Timer } from "lucide-react";

const Hero = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session?.user) {
      router.push("/create");
    } else {
      window.location.href = GOOGLE_AUTH_URL;
    }
  };

  return (
    <div className="bg-background min-h-[80vh] flex items-center justify-center pt-40 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8" // Increased vertical spacing between sections
        >
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Create AI-Powered Courses <br />
            <span className="text-muted-foreground">In Minutes, Not Hours</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Transform your knowledge into structured courses with AI assistance
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="text-lg px-8"
            >
              {session?.user ? "Create Course" : "Get Started Free"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => router.push("/course/gallery")}
              className="text-lg px-8"
            >
              View Gallery
            </Button>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center p-6 rounded-lg border bg-card"
            >
              <Brain className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Learning</h3>
              <p className="text-muted-foreground text-center">
                Advanced AI algorithms create personalized course content
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center p-6 rounded-lg border bg-card"
            >
              <Timer className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Quick Generation</h3>
              <p className="text-muted-foreground text-center">
                Create comprehensive courses in minutes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center p-6 rounded-lg border bg-card"
            >
              <Sparkles className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Quality Content</h3>
              <p className="text-muted-foreground text-center">
                Well-structured and engaging learning materials
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;