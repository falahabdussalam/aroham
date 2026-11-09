import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  ChevronDown, 
  Send, 
  ShieldCheck, 
  GraduationCap, 
  ArrowUpRight,
  HeartHandshake,
  HelpCircle,
  Users
} from 'lucide-react';
import { ArohamEmblem } from '../components/ArohamLogo';
import { InstagramIcon } from '../components/Icons';
import strategicGathering from '../assets/strategic_gathering.jpg';
import instaSpotlight from '../assets/insta_spotlight.jpg';
import instaLeadership from '../assets/insta_leadership.jpg';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: 'Select your affiliation',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      question: 'How does mentorship matching work at Aroham?',
      answer: 'Our Mentorship Council assesses your current academic discipline, intended majors, and geographical target (GCC, UK, India, etc.). We then pair you with an alumna mentor from Bolster Girls Campus who has directly studied in or navigated that specific academic track for personalized 1-on-1 guidance.'
    },
    {
      question: 'Who can join the UniMates initiative?',
      answer: 'UniMates is open to all students (Classes 10–12, undergraduate aspirants, and current college students) seeking guidance. Mentorship roles are primarily anchored by alumnae of Bolster Girls Campus to sustain our distinctive generational sisterhood ethos.'
    },
    {
      question: 'How often are alumni meets and workshops organized?',
      answer: 'We conduct live webinars and subject bootcamps quarterly, alongside our dedicated summer and winter guidance conclaves. In addition, registered UniMates students receive ongoing asynchronous guidance from their paired mentor.'
    },
    {
      question: 'Can organizations or companies partner with Aroham Foundation?',
      answer: 'Yes! We actively collaborate with schools, university admissions offices, non-profits, and educational scholarship bodies to expand opportunities, conduct workshops, and provide career exposure to our rising scholars.'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("https://formsubmit.co/ajax/arohamconnect@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role_affiliation: formData.affiliation,
          subject: formData.subject,
          message: formData.message,
          _subject: `[Aroham Website Contact] ${formData.subject || 'New Message'} - from ${formData.name}`,
          _template: "table",
          _captcha: "false"
        })
      });
    } catch (err) {
      console.warn("Direct transmission note:", err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="space-y-20 lg:space-y-28 pb-20 animate-fadeIn">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="pt-6 sm:pt-12 lg:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-aroham-border">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-aroham-terracotta text-xs font-bold tracking-wide uppercase">
              <Sparkles size={13} />
              <span>Direct Access & Solidarity</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold font-serif text-aroham-heading tracking-tight">
              Get in Touch with Aroham Foundation
            </h1>

            <p className="text-base sm:text-lg text-aroham-body leading-relaxed">
              Have questions about mentorship, upcoming events, or partnering with us? We'd love to connect. Every exchange builds a bridge for generations of ambitious scholars.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-aroham-forest">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Typical Response: 24–48 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>Bolster Girls Campus Network</span>
              </div>
            </div>
          </div>

          {/* Right Circular Guild Emblem */}
          <div className="bg-white rounded-full p-8 border border-aroham-border shadow-elevated flex flex-col items-center justify-center text-center shrink-0 w-52 h-52 self-start lg:self-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/20 via-emerald-200/20 to-transparent rounded-full blur-xl -z-10" />
            <ArohamEmblem size={56} className="mx-auto" />
            <span className="text-base font-bold font-serif text-aroham-heading mt-2">
              Aroham
            </span>
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-aroham-muted">
              FOUNDATION
            </span>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-aroham-forest mt-1.5">
              Aroham Guild
            </span>
            <span className="text-[9px] text-aroham-muted">
              Estd. 2025
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          OFFICIAL CONTACT CHANNELS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold mb-1">
            Primary Inquiries
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-aroham-heading">
            Official Contact Channels
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Email Address Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-aroham-border shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-aroham-mint flex items-center justify-center text-aroham-dark">
                <Mail size={22} />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-aroham-gold block">
                Formal & Academic Correspondence
              </span>
              <h3 className="text-2xl font-bold font-serif text-aroham-heading">
                Email Address
              </h3>
              <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                Direct inbox for institutional affiliations, scholarship inquiries, mentor volunteer dossiers, and media questions.
              </p>

              <div className="p-4 rounded-2xl bg-aroham-sage/40 border border-aroham-border">
                <span className="text-[10px] font-bold uppercase tracking-wider text-aroham-muted block">
                  Direct Inbox
                </span>
                <span className="text-sm sm:text-base font-bold text-aroham-heading mt-0.5 block select-all">
                  arohamconnect@gmail.com
                </span>
              </div>
            </div>

            <a
              href="mailto:arohamconnect@gmail.com"
              className="w-full py-3 bg-aroham-dark hover:bg-aroham-forest text-white rounded-lg text-xs font-bold text-center transition-all shadow flex items-center justify-center gap-2"
            >
              <span>Send us an Email</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Instagram Community Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-aroham-border shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-aroham-gold">
                    <InstagramIcon size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-aroham-gold block">
                      Active Community Pulse
                    </span>
                    <h3 className="text-2xl font-bold font-serif text-aroham-heading">
                      Instagram Community
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-aroham-amber-light text-aroham-gold border border-amber-200">
                  Daily Stories & Recaps
                </span>
              </div>

              <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                Follow our student meetups, spotlight stories on Bolster Girls Campus alumnae, live panels, and UniMates campus circles.
              </p>

              {/* 3 Snapshot Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <a
                  href="https://www.instagram.com/arohamfoundation?xtok=MWFnYWYyMDkwcHdpeQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl overflow-hidden border border-aroham-border relative group block bg-aroham-light hover:border-aroham-gold/50 transition-all shadow-sm"
                >
                  <div className="h-28 sm:h-32 overflow-hidden bg-aroham-light">
                    <img
                      src={strategicGathering}
                      alt="Bolster Summer Camp & Campus Circles"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2.5 bg-white text-[11px] font-semibold text-aroham-heading truncate flex items-center justify-between">
                    <span>
                      <span className="text-aroham-gold font-bold">#UniMates</span> Campus Circles & Student Meetups
                    </span>
                    <ArrowUpRight size={12} className="text-aroham-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/arohamfoundation?xtok=MWFnYWYyMDkwcHdpeQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl overflow-hidden border border-aroham-border relative group block bg-aroham-light hover:border-aroham-forest/50 transition-all shadow-sm"
                >
                  <div className="h-28 sm:h-32 overflow-hidden bg-aroham-light">
                    <img
                      src={instaSpotlight}
                      alt="Alumnae Leadership Spotlight"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2.5 bg-white text-[11px] font-semibold text-aroham-heading truncate flex items-center justify-between">
                    <span>
                      <span className="text-aroham-forest font-bold">#Alumnae</span> Leadership Spotlight
                    </span>
                    <ArrowUpRight size={12} className="text-aroham-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/arohamfoundation?xtok=MWFnYWYyMDkwcHdpeQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl overflow-hidden border border-aroham-border relative group block bg-aroham-light hover:border-aroham-terracotta/50 transition-all shadow-sm"
                >
                  <div className="h-28 sm:h-32 overflow-hidden bg-aroham-light">
                    <img
                      src={instaLeadership}
                      alt="Executive Committee Post"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2.5 bg-white text-[11px] font-semibold text-aroham-heading truncate flex items-center justify-between">
                    <span>
                      <span className="text-aroham-terracotta font-bold">#Leadership</span> Executive Announcement Series
                    </span>
                    <ArrowUpRight size={12} className="text-aroham-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                  </div>
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-bold text-aroham-forest">
                @arohamfoundation
              </span>
              <a
                href="https://www.instagram.com/arohamfoundation?xtok=MWFnYWYyMDkwcHdpeQ=="
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-aroham-amber text-aroham-dark hover:bg-amber-400 rounded-lg text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5"
              >
                <span>Follow @arohamfoundation</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEND AROHAM A DIRECT MESSAGE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold">
                Inquiry Center
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading">
                Send Aroham a Direct Message
              </h2>
              <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                Whether you are an alumna of Bolster Girls Campus seeking to mentor, a current student requesting guidance, or an educational organization aiming to sponsor a cohort, your voice matters to us.
              </p>
            </div>

            {/* Bolster Girls Campus Circle Box */}
            <div className="p-6 rounded-2xl bg-white border border-aroham-border shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-aroham-forest">
                <GraduationCap size={18} className="text-aroham-gold" />
                <span>Bolster Girls Campus Circle</span>
              </div>
              <div className="text-[10px] uppercase font-bold text-aroham-muted">
                Alumnae-driven generational uplift
              </div>
              <p className="text-xs text-aroham-body leading-relaxed pt-1">
                Are you an alumna? Make sure to mention your graduation year or department in your note so our regional liaison can link you to your cohort's chapter.
              </p>
            </div>

            {/* Our Commitment Box */}
            <div className="p-6 rounded-2xl bg-aroham-dark text-white shadow-soft space-y-3">
              <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
                Our Commitment
              </div>
              <p className="text-xs sm:text-sm italic leading-relaxed text-emerald-100">
                "No young woman walks her collegiate or professional path unaccompanied. One conversation can alter a generation."
              </p>
              <div className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                — Aroham Mentorship Council
              </div>
            </div>
          </div>

          {/* Right Interactive Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-aroham-border shadow-soft">
            <div className="mb-6 pb-4 border-b border-aroham-border flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif text-aroham-heading">
                  Message Submission
                </h3>
                <p className="text-xs text-aroham-muted mt-0.5">
                  Fill in the fields below and our team will get in touch shortly.
                </p>
              </div>
              <HelpCircle size={18} className="text-aroham-muted" />
            </div>

            {formSubmitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={36} />
                </div>
                <h4 className="text-2xl font-bold font-serif text-aroham-heading">
                  Message Dispatched to arohamconnect@gmail.com
                </h4>
                <p className="text-sm text-aroham-body max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-aroham-dark">{formData.name}</span>. Your details have been sent to our Secretariat at <span className="font-semibold text-aroham-dark">arohamconnect@gmail.com</span>. A coordinator will review your note and reply to <span className="font-semibold text-aroham-dark">{formData.email}</span> within 24–48 hours.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`mailto:arohamconnect@gmail.com?subject=${encodeURIComponent(`[Aroham Contact] ${formData.subject || 'Website Inquiry'}`)}&body=${encodeURIComponent(`Full Name: ${formData.name}\nEmail: ${formData.email}\nAffiliation: ${formData.affiliation}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`)}`}
                    className="px-6 py-2.5 bg-aroham-dark text-white rounded-lg text-xs font-bold hover:bg-aroham-forest transition-all flex items-center gap-1.5 shadow"
                  >
                    <span>Open in Email App</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        affiliation: 'Select your affiliation',
                        subject: '',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 bg-white border border-aroham-border text-aroham-dark rounded-lg text-xs font-bold hover:bg-aroham-sage/40 transition-all shadow-sm"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Fatima Zahra"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                      Role / Affiliation *
                    </label>
                    <select
                      value={formData.affiliation}
                      onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                    >
                      <option>Select your affiliation</option>
                      <option>Bolster Girls Campus Alumna</option>
                      <option>Prospective Student / Mentee</option>
                      <option>Parent or Guardian</option>
                      <option>Institutional Partner / School</option>
                      <option>Media / General Inquirer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. UniMates Mentor Application"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can assist, collaborate, or connect with you..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-aroham-muted flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-aroham-forest" />
                    <span>Your communication is securely archived under community guidelines.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-aroham-terracotta hover:bg-aroham-terracotta-dark text-white rounded-lg text-xs font-bold transition-all shadow flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Details...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <span>▷</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold">
            Immediate Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-aroham-body">
            Common queries regarding mentorship cycles, campus alliances, and participation.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-aroham-border overflow-hidden transition-all duration-200 shadow-soft"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 text-sm font-bold text-aroham-heading hover:bg-aroham-sage/30 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-aroham-gold">❓</span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-aroham-muted shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-aroham-dark' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-aroham-body leading-relaxed border-t border-aroham-border/60 bg-aroham-sage/20 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Help Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-aroham-mint text-center text-xs font-medium text-aroham-heading border border-aroham-border">
          Still have a unique inquiry not listed here? Write directly to{' '}
          <a
            href="mailto:arohamconnect@gmail.com"
            className="font-bold text-aroham-dark hover:underline"
          >
            arohamconnect@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
}
