import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO at TechCorp',
    content: 'Fusion AI has transformed how we handle automation. The visual workflow builder is incredibly intuitive.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    content: 'The AI-powered features save us hours every week. Best automation tool we\'ve ever used.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Operations Lead',
    content: 'Implementation was seamless and the results were immediate. Highly recommend to any team.',
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 relative" id="testimonials">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Loved by Teams Worldwide
          </h2>
          <p className="text-base text-gray-400 leading-relaxed">
            See what our customers have to say
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-3xl border border-white/10 bg-card/50 backdrop-blur-sm p-8"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm text-foreground mb-6 leading-relaxed">{testimonial.content}</p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary" />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};