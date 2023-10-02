"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Palash",
    avatar: "A",
    title: "Software Engineer",
    description: "This is the best app I've ever used!",
  },
  {
    name: "Balaji",
    avatar: "B",
    title: "Trainee",
    description: "Don't Think just use!",
  },
  {
    name: "Tejas",
    avatar: "T",
    title: "CEO",
    description:
      "We use this app in our compnay all the time, best user experience, really glad that palash provided us with this app",
  },
  {
    name: "Sangmeshwar",
    avatar: "S",
    title: "Associate Developer",
    description:
      "Very impressive, although I would've developed it better as i am pro hehe",
  },
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl font-extrabold text-white mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
            <Card key={item.description} className="bg-[#192339] border-none text-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-x-2">
                        <div>
                            <p className="text-lg">
                                {item.name}
                            </p>
                            <p className="text-sm text-zinc-400">
                                {item.title}
                            </p>
                        </div>

                    </CardTitle>
                    <CardContent className="pt-4 px-0">
                        {item.description}
                    </CardContent>
                </CardHeader>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
