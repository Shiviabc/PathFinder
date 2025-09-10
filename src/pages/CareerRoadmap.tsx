import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, GraduationCap, Briefcase, Star, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CareerPath {
  id: string;
  stream: string;
  degree: string;
  duration: string;
  jobs: {
    title: string;
    salary: string;
    demand: 'High' | 'Medium' | 'Low';
    skills: string[];
  }[];
}

const careerPaths: CareerPath[] = [
  {
    id: "1",
    stream: "Science - PCM",
    degree: "Computer Science Engineering",
    duration: "4 years",
    jobs: [
      {
        title: "Software Developer",
        salary: "₹8-25 LPA",
        demand: "High",
        skills: ["Programming", "Problem Solving", "Team Work"]
      },
      {
        title: "Data Scientist",
        salary: "₹12-35 LPA", 
        demand: "High",
        skills: ["Python", "Machine Learning", "Statistics"]
      },
      {
        title: "DevOps Engineer",
        salary: "₹10-30 LPA",
        demand: "High",
        skills: ["Cloud Computing", "Automation", "System Administration"]
      }
    ]
  },
  {
    id: "2",
    stream: "Commerce",
    degree: "Bachelor of Commerce",
    duration: "3 years",
    jobs: [
      {
        title: "Chartered Accountant",
        salary: "₹6-20 LPA",
        demand: "High",
        skills: ["Accounting", "Taxation", "Financial Analysis"]
      },
      {
        title: "Financial Analyst",
        salary: "₹5-15 LPA",
        demand: "Medium",
        skills: ["Excel", "Financial Modeling", "Market Analysis"]
      },
      {
        title: "Business Analyst",
        salary: "₹7-18 LPA",
        demand: "High",
        skills: ["Business Intelligence", "SQL", "Communication"]
      }
    ]
  },
  {
    id: "3",
    stream: "Arts - Humanities",
    degree: "Bachelor of Arts",
    duration: "3 years",
    jobs: [
      {
        title: "Content Writer",
        salary: "₹3-12 LPA",
        demand: "Medium",
        skills: ["Writing", "Research", "SEO"]
      },
      {
        title: "UX Designer",
        salary: "₹6-20 LPA",
        demand: "High",
        skills: ["Design Thinking", "Prototyping", "User Research"]
      },
      {
        title: "Digital Marketer",
        salary: "₹4-15 LPA",
        demand: "High",
        skills: ["Social Media", "Analytics", "Campaign Management"]
      }
    ]
  }
];

export default function CareerRoadmap() {
  const [selectedStream, setSelectedStream] = useState("all");

  const filteredPaths = selectedStream === "all" 
    ? careerPaths 
    : careerPaths.filter(path => path.stream.toLowerCase().includes(selectedStream.toLowerCase()));

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "High": return "text-success bg-success/10";
      case "Medium": return "text-warning bg-warning/10";
      case "Low": return "text-destructive bg-destructive/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Career Roadmap</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Explore career paths from your stream to your dream job
        </p>
      </div>

      {/* Filter Section */}
      <Card className="shadow-medium mb-8">
        <CardHeader>
          <CardTitle>Filter by Stream</CardTitle>
          <CardDescription>
            Select a stream to see relevant career paths
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedStream} onValueChange={setSelectedStream}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Select Stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Streams</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="commerce">Commerce</SelectItem>
              <SelectItem value="arts">Arts & Humanities</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Career Paths */}
      <div className="space-y-8">
        {filteredPaths.map((path) => (
          <Card key={path.id} className="shadow-strong border-l-4 border-l-primary">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-foreground flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    {path.degree}
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    <Badge variant="outline" className="mr-2">{path.stream}</Badge>
                    <span className="text-muted-foreground">Duration: {path.duration}</span>
                  </CardDescription>
                </div>
                <Button variant="outline">
                  View Colleges
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-secondary" />
                  Career Opportunities
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {path.jobs.map((job, index) => (
                  <Card key={index} className="hover:shadow-medium transition-shadow border border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-foreground">{job.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getDemandColor(job.demand)}>
                          {job.demand} Demand
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-3">
                        <span className="text-sm font-medium text-foreground mb-2 block">
                          Key Skills Required:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {job.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Roadmap Timeline */}
              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  Your Roadmap Timeline
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-primary rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">1</span>
                    </div>
                    <div className="text-sm font-medium text-foreground">Complete 12th Grade</div>
                    <div className="text-xs text-muted-foreground">Current Stage</div>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-secondary rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-secondary-foreground font-bold text-sm">2</span>
                    </div>
                    <div className="text-sm font-medium text-foreground">Entrance Exams</div>
                    <div className="text-xs text-muted-foreground">Next 6 months</div>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-accent-foreground font-bold text-sm">3</span>
                    </div>
                    <div className="text-sm font-medium text-foreground">College Admission</div>
                    <div className="text-xs text-muted-foreground">1 year</div>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-muted-foreground rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-background font-bold text-sm">4</span>
                    </div>
                    <div className="text-sm font-medium text-foreground">Career Start</div>
                    <div className="text-xs text-muted-foreground">{parseInt(path.duration) + 1} years</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPaths.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-xl text-foreground mb-2">No career paths found</CardTitle>
            <CardDescription>
              Try selecting a different stream or view all available paths
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
}