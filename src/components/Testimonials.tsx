"use client";

import { motion } from "framer-motion";

const testimonials = [
	{
		quote: "This AI course generator has transformed how I create educational content. What used to take weeks now takes minutes.",
		author: "Sarah Johnson",
		title: "Education Consultant",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
	},
	{
		quote: "The quality of generated content and quizzes is impressive. It's like having an expert course designer on demand.",
		author: "Michael Chen",
		title: "Online Instructor",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
	},
	{
		quote: "Game-changer for course creation. The AI understands context and generates relevant, engaging content every time.",
		author: "Emma Davis",
		title: "Learning Specialist",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
	},
];

export default function Testimonials() {
	return (
		<section className="w-full mt-24 mb-16">
			<div className="max-w-7xl mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					What Our Users Say
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="bg-card p-6 rounded-lg shadow-md border border-border"
						>
							<div className="flex flex-col h-full justify-between">
								<div>
									<p className="text-card-foreground mb-4">
										"{testimonial.quote}"
									</p>
								</div>
								<div className="flex items-center mt-4">
									<img
										src={testimonial.avatar}
										alt={testimonial.author}
										className="w-12 h-12 rounded-full"
									/>
									<div className="ml-4">
										<p className="font-semibold text-foreground">
											{testimonial.author}
										</p>
										<p className="text-sm text-muted-foreground">
											{testimonial.title}
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

function TestimonialCard({
	name,
	role,
	content,
}: {
	name: string;
	role: string;
	content: string;
}) {
	return (
		<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
			<p className="text-gray-600 dark:text-gray-300 mb-4">{content}</p>
			<div className="font-medium">
				<p className="text-gray-900 dark:text-white">{name}</p>
				<p className="text-gray-500 dark:text-gray-400">{role}</p>
			</div>
		</div>
	);
}