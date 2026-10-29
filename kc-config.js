/* ============================================================
   CONFIG: edit prices, contact details and projects here only.
   ============================================================ */
const CONFIG = {
  whatsapp: '2347011780057',          // country code first, digits only
  email: '',                          // add your business email here to show it on the site
  location: 'Uyo, Akwa Ibom, Nigeria',
  socials: {},                        // e.g. { Instagram: 'https://instagram.com/yourpage' }
  currencies: {
    USD: { locale: 'en-US', name: 'US Dollar' },
    EUR: { locale: 'en-IE', name: 'Euro' },
    GBP: { locale: 'en-GB', name: 'British Pound' },
    NGN: { locale: 'en-NG', name: 'Nigerian Naira' }
  },
  packages: [
    { id: 'starter', name: 'Starter Website', tagline: 'A focused site to get your business online.',
      price: { USD: 150, EUR: 130, GBP: 110, NGN: 200000 }, delivery: 'Estimated delivery: 5–10 working days', cta: 'Choose Starter',
      features: ['Up to 3 pages', 'Responsive design', 'Contact information', 'WhatsApp integration', 'Contact form', 'Basic SEO setup', 'Google Maps integration where relevant', '2 revision rounds', '14 days of post-launch support'] },
    { id: 'business', name: 'Business Website', tagline: 'A custom-designed site for growing businesses.', popular: true,
      price: { USD: 350, EUR: 300, GBP: 260, NGN: 450000 }, delivery: 'Estimated delivery: 10–15 working days', cta: 'Choose Business',
      features: ['Up to 7 pages', 'Custom website design', 'Responsive development', 'WhatsApp integration', 'Contact and enquiry forms', 'Basic SEO setup', 'Google Analytics setup where appropriate', 'Google Maps integration where relevant', 'Testimonials section when content is supplied', 'Optional blog if included in the agreed scope', '3 revision rounds', '30 days of post-launch support'] },
    { id: 'premium', name: 'Premium Website', tagline: 'A fully custom build with advanced features.',
      price: { USD: 750, EUR: 650, GBP: 550, NGN: 1000000 }, delivery: 'Estimated delivery: 3–5 weeks', cta: 'Choose Premium',
      features: ['Up to 12 pages', 'Custom UI design', 'Responsive development', 'Advanced forms where required', 'Booking integration when agreed', 'Payment integration when agreed', 'SEO setup', 'Analytics setup', 'Performance optimization', 'Third-party integrations within the agreed scope', '3 revision rounds', '30 days of post-launch support'] },
    { id: 'custom', name: 'Custom Development', tagline: 'Priced according to scope and complexity.',
      price: null, delivery: 'Timeline agreed after scoping', cta: 'Discuss Your Project',
      features: ['Booking platforms', 'Customer portals', 'Membership websites', 'Custom dashboards', 'Advanced payment integrations', 'Complex web applications'] }
  ],
  care: [
    { id: 'care-basic', name: 'Basic Care', price: { USD: 20, EUR: 18, GBP: 15, NGN: 25000 },
      features: ['Routine monthly website check', 'Up to 2 small content changes a month', 'Backups where supported', 'Support by email or WhatsApp'] },
    { id: 'care-business', name: 'Business Care', price: { USD: 40, EUR: 35, GBP: 30, NGN: 50000 },
      features: ['Everything in Basic Care', 'Up to 4 small content changes a month', 'Updates within the agreed scope', 'Standard priority response'] },
    { id: 'care-priority', name: 'Priority Care', price: { USD: 80, EUR: 70, GBP: 60, NGN: 100000 },
      features: ['Everything in Business Care', 'Up to 8 content changes a month', 'Priority response for support requests', 'Backups where supported'] }
  ],
  addon: { id: 'ai', name: 'AI Chat Assistant', demo: 'https://ai-assistant-h4ge.onrender.com/demo/oakline-realty',
    price: { USD: 200, EUR: 175, GBP: 150, NGN: 270000 }, monthly: { USD: 30, EUR: 27, GBP: 23, NGN: 40000 },
    features: ['Answers visitors using your own services, prices, hours and FAQs', 'Replies at any hour, including nights and weekends', 'Hands requests over to you when it cannot answer', 'Added to your KobyCode website'] },
  // Add real client projects here when you have them, in this format:
  // { id: 'name', title: '', category: '', image: 'screenshot.jpg', url: 'https://...', desc: '', tech: ['HTML'], problem: '', solution: '', design: [''], features: [''], results: '' }
  projects: [],
  testimonials: []   // add real ones as { name: '', role: '', quote: '' } and the section will appear
};
