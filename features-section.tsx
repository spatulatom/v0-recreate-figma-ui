import { ArrowRight, FileText, Users, Lock, Bell, BarChart, Zap } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-foreground text-4xl font-bold mb-4">Our Features</h2>
          <div className="h-2 w-64 bg-[#ffe492] mx-auto mb-6"></div>
          <p className="text-foreground max-w-2xl mx-auto">
            Powerful features to help you manage, share, and process information with ease.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#c4defd] rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-[#4f9cf9]" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Document Collaboration</h3>
            <p className="text-muted-foreground mb-4">
              Work together on documents in real-time. Add comments, suggestions, and edits.
            </p>
            <a href="#" className="text-[#4f9cf9] font-medium flex items-center gap-1 hover:underline">
              Learn more <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature 2 */}
          <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#ffe492] rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#212529]" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Team Workspaces</h3>
            <p className="text-muted-foreground mb-4">
              Create dedicated spaces for your teams to organize and share relevant documents.
            </p>
            <a href="#" className="text-[#4f9cf9] font-medium flex items-center gap-1 hover:underline">
              Learn more <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature 3 */}
          <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#00ca75] rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Advanced Security</h3>
            <p className="text-muted-foreground mb-4">
              Enterprise-grade security with encryption, access controls, and compliance features.
            </p>
            <a href="#" className="text-[#4f9cf9] font-medium flex items-center gap-1 hover:underline">
              Learn more <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature 4 */}
          <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#ff5758] rounded-lg flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Smart Notifications</h3>
            <p className="text-muted-foreground mb-4">
              Stay updated with customizable notifications for comments, mentions, and document changes.
            </p>
            <a href="#" className="text-[#4f9cf9] font-medium flex items-center gap-1 hover:underline">
              Learn more <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature 5 */}
          <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#4f9cf9] rounded-lg flex items-center justify-center mb-4">
              <BarChart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Analytics Dashboard</h3>
            <p className="text-muted-foreground mb-4">
              Gain insights into document engagement, team collaboration, and productivity metrics.
            </p>
            <a href="#" className="text-[#4f9cf9] font-medium flex items-center gap-1 hover:underline">
              Learn more <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature 6 */}
          <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#ffbf60] rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Automation Tools</h3>
            <p className="text-muted-foreground mb-4">
              Automate repetitive tasks with customizable workflows, templates, and integrations.
            </p>
            <a href="#" className="text-[#4f9cf9] font-medium flex items-center gap-1 hover:underline">
              Learn more <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <button className="bg-[#4f9cf9] text-white px-8 py-4 rounded-md flex items-center gap-2 mx-auto hover:bg-[#37a3ff] transition-colors">
            Explore all features <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
