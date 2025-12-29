import { Header } from "@/components/Header";
import { GlassCard } from "@/components/GlassCard";
import { ArrowLeft, MessageCircle, Book, Video, Mail, Phone, ExternalLink, Search, ChevronDown, Zap, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const faqs = [
  {
    question: "How does Cortex AI predict stock shortages?",
    answer: "Cortex AI analyzes historical consumption patterns, seasonal trends, and real-time usage data from Snowflake Streams. It uses machine learning models trained on millions of data points to predict demand with 94%+ accuracy."
  },
  {
    question: "What triggers an automatic reorder?",
    answer: "Automatic reorders are triggered when stock levels fall below the safety threshold defined for each SKU. The system considers lead times, current burn rate, and predicted demand to optimize order timing."
  },
  {
    question: "How often is the data synchronized?",
    answer: "Data is synchronized in real-time using Snowflake Streams. Any changes in the source systems are reflected within seconds. You can configure the refresh rate in Settings."
  },
  {
    question: "Can I export reports for compliance?",
    answer: "Yes, all reports can be exported in PDF, CSV, or Excel format. Compliance reports are automatically generated and stored in Snowflake for audit purposes."
  },
  {
    question: "How do I add new warehouse locations?",
    answer: "Navigate to Settings > Data & Sync > Warehouse Management. Click 'Add Warehouse' and enter the location details. The new warehouse will be synced automatically."
  },
];

const resources = [
  { icon: Book, title: "Documentation", description: "Complete API and user guides", link: "#" },
  { icon: Video, title: "Video Tutorials", description: "Step-by-step walkthroughs", link: "#" },
  { icon: MessageCircle, title: "Community Forum", description: "Connect with other users", link: "#" },
];

const tickets = [
  { id: "TKT-2847", subject: "Integration with SAP", status: "resolved", date: "2 days ago" },
  { id: "TKT-2831", subject: "Custom alert configuration", status: "in-progress", date: "5 days ago" },
  { id: "TKT-2819", subject: "API rate limit question", status: "resolved", date: "1 week ago" },
];

export default function Support() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ subject: "", message: "" });

  const filteredFaqs = faqs.filter(
    faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = () => {
    if (!contactForm.subject || !contactForm.message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Support ticket submitted!", {
      description: "Our team will respond within 24 hours."
    });
    setContactForm({ subject: "", message: "" });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle2 className="w-4 h-4 text-emerald" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <Link 
              to="/" 
              className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
              <p className="text-muted-foreground">Get help and find answers to your questions</p>
            </div>
          </div>

          {/* Search */}
          <GlassCard className="p-6 mb-8 animate-fade-in" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs, documentation, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg bg-secondary/30 border-border/50"
                />
              </div>
              <Button 
                variant="default" 
                className="h-12 px-6 bg-emerald hover:bg-emerald/90"
                onClick={() => toast.info(`Searching for: ${searchQuery}`)}
              >
                Search
              </Button>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* FAQs */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              {filteredFaqs.map((faq, i) => (
                <GlassCard 
                  key={i} 
                  className="overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${(i + 1) * 50}ms` }}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/20 transition-colors"
                  >
                    <span className="font-medium pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === i ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-5 pb-5 pt-0 text-muted-foreground border-t border-border/50">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}

              {/* Contact Form */}
              <GlassCard className="p-6 mt-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald" />
                  Submit a Ticket
                </h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="bg-secondary/30 border-border/50"
                  />
                  <textarea
                    placeholder="Describe your issue or question..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full h-32 p-4 rounded-lg bg-secondary/30 border border-border/50 resize-none focus:outline-none focus:ring-2 focus:ring-emerald/50"
                  />
                  <Button 
                    onClick={handleSubmitTicket}
                    className="w-full bg-emerald hover:bg-emerald/90"
                  >
                    Submit Ticket
                  </Button>
                </div>
              </GlassCard>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Resources */}
              <GlassCard className="p-5 animate-fade-in" style={{ animationDelay: '150ms' }}>
                <h3 className="text-lg font-semibold mb-4">Quick Resources</h3>
                <div className="space-y-3">
                  {resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.link}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors group"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info(`Opening ${resource.title}...`);
                      }}
                    >
                      <div className="p-2 rounded-lg bg-emerald/10 group-hover:bg-emerald/20 transition-colors">
                        <resource.icon className="w-4 h-4 text-emerald" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{resource.title}</p>
                        <p className="text-xs text-muted-foreground">{resource.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </GlassCard>

              {/* Recent Tickets */}
              <GlassCard className="p-5 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <h3 className="text-lg font-semibold mb-4">Your Recent Tickets</h3>
                <div className="space-y-3">
                  {tickets.map((ticket, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer"
                      onClick={() => toast.info(`Viewing ticket ${ticket.id}`)}
                    >
                      {getStatusIcon(ticket.status)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{ticket.subject}</p>
                        <p className="text-xs text-muted-foreground">{ticket.id} • {ticket.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Contact Info */}
              <GlassCard className="p-5 animate-fade-in" style={{ animationDelay: '250ms' }}>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <div className="space-y-3 text-sm">
                  <a href="mailto:support@vanguard.ai" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="w-4 h-4" />
                    support@vanguard.ai
                  </a>
                  <a href="tel:+1-800-VANGUARD" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="w-4 h-4" />
                    1-800-VANGUARD
                  </a>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-emerald" />
                    <span className="text-muted-foreground">Avg. response time:</span>
                    <span className="font-medium text-emerald">&lt; 2 hours</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
