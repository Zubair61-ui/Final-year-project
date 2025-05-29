"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { GOOGLE_AUTH_URL } from "@/lib/constants";
import { useUser } from "@/lib/store/user";
import { useCreateCourse } from "@/hooks/useCreateCourse";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCourseAction = () => {
    if (session?.user) {
      router.push("/create");
    } else {
      window.location.href = GOOGLE_AUTH_URL;
    }
  };

  const footerLinks = {
    product: [
      {
        name: session?.user ? "Create Course" : "Start Creating",
        component: (
          <button
            onClick={handleCourseAction}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {session?.user ? "Create Course" : "Start Creating"}
          </button>
        )
      },
      { name: "Gallery", href: "/course/gallery" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
    ],
  };

  const handleCreateButton = () => {
    if (!session?.user) {
      window.location.href = GOOGLE_AUTH_URL;
    } else {
      router.push("/create");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">AI Course Generator</h3>
            <p className="text-sm text-muted-foreground">
              Transform your expertise into engaging courses with the power of AI.
            </p>
            <Button 
              className="mt-2"
              onClick={handleCreateButton}
            >
              {session?.user ? "Create Course" : "Start Creating"}
            </Button>
          </div>

          {/* Product Links - Centered */}
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-center">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  {link.component ? (
                    link.component
                  ) : (
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} AI Course Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;