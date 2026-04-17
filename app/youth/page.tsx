// app/youth/page.tsx - GenZ & Youth Page
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaWhatsapp, 
  FaHeart, 
  FaFistRaised, 
  FaGraduationCap,
  FaBriefcase,
  FaShareAlt,
  FaArrowRight,
  FaUsers,
  FaHandshake,
  FaMonument
} from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'GenZ & Youth | National Vision Party',
  description: 'Dr. Kinity honors the fallen heroes of 2024. Your voice matters. Your future is not for sale.',
  openGraph: {
    title: 'To GenZ: Your Sacrifice Will Not Be in Vain',
    description: 'Dr. Kinity pledges to honor the fallen heroes and build the Kenya you fought for.',
    type: 'article',
  },
};

const youthPriorities = [
  {
    icon: FaGraduationCap,
    title: 'Education Revolution',
    description: 'Student debt relief, modern skills training, and startup grants for young innovators.',
  },
  {
    icon: FaBriefcase,
    title: 'Jobs First',
    description: '500,000 jobs in year one. Local manufacturing. Tech hubs in every county.',
  },
  {
    icon: FaFistRaised,
    title: 'Zero Corruption',
    description: 'The old guard stole your future. The National Vision Party will recover what is yours—and jail the thieves.',
  },
  {
    icon: FaUsers,
    title: 'Youth & Women Empowerment',
    description: 'Innovation hubs in every county, zero-interest startup loans, and 50% women leadership in public appointments.',
  },
];

const shareMessage = encodeURIComponent(
  `💔 *To My Fellow GenZ*

They called us "keyboard warriors." Then they shot us in the streets.

June 2024. We stood up. Some never came home.

The National Vision Party has made a sacred pledge:
✅ Build a national monument for our fallen brothers & sisters
✅ Compensate every family that lost a loved one
✅ Dismantle the corruption that made them kill us

"I will not be a president who forgets the blood of the youth. I will be a president who honors it." — Dr. Isaac Newton Kinity, National Vision Party Presidential Candidate

This is not about politics. This is about justice.

🔗 https://www.nationalvisionparty.com/youth
📱 WhatsApp: +1 (203) 675-9354

#GenZPower #JusticeForFallenHeroes #KenyasHope2027`
);

export default function YouthPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Honoring the Fallen */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/genz1.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1E3A8A 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Candle light effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1E3A8A]/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC2626]/20 border border-[#DC2626]/30 mb-8">
            <FaMonument className="w-4 h-4 text-[#DC2626]" />
            <span className="text-[#DC2626] text-sm font-semibold">A Sacred Pledge</span>
          </div>
          
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-[#0F172A] mb-6 leading-tight">
            To the Heroes of <span className="text-[#1E3A8A]">June 2024</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#0F172A]/90 mb-6 font-light">
            &ldquo;I will build a monument at Parliament. I will compensate every family. <br className="hidden md:block"/>
            <span className="text-[#1E3A8A] font-semibold">Your sacrifice will not be forgotten.</span>&rdquo;
          </p>
          
          <p className="text-[#0F172A]/60 text-lg mb-8">
            — Dr. Isaac Newton Kinity, pledging to honor GenZ protesters who gave their lives
          </p>

          {/* Memorial Card */}
          <div className="bg-[#0F172A]/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#0F172A]/10 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-1">21+</div>
                <div className="text-[#0F172A]/60 text-sm">Lives Lost</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-1">∞</div>
                <div className="text-[#0F172A]/60 text-sm">Memories</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-1">1</div>
                <div className="text-[#0F172A]/60 text-sm">Promise Kept</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href={`https://wa.me/12036759354?text=I%20am%20GenZ%20and%20I%20want%20justice%20for%20our%20fallen%20heroes`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#1E3A8A] text-white font-bold text-lg hover:bg-[#1E40AF] transition-all duration-300 shadow-lg"
            >
              <FaWhatsapp className="w-6 h-6" />
              Join GenZ WhatsApp Channel
            </a>
            
            <a
              href={`https://wa.me/?text=${shareMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0F172A]/10 backdrop-blur-sm border border-[#0F172A]/30 text-[#0F172A] font-semibold hover:bg-[#0F172A]/20 transition-all duration-300"
            >
              <FaShareAlt className="w-5 h-5" />
              Share the Pledge
            </a>
          </div>
        </div>
      </section>

      {/* Dr. Kinity's Full Statement */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/genz1.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Header with image */}
            <div className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#1E3A8A]">
                  <Image
                    src="/images/Dr.png"
                    alt="Dr. Isaac Newton Kinity"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-white font-bold text-2xl mb-2">Dr. Isaac Newton Kinity</h2>
                  <p className="text-white/70">Presidential Candidate, National Vision Party</p>
                  <div className="flex items-center gap-2 text-[#1E3A8A] mt-2">
                    <FaFistRaised className="w-4 h-4" />
                    <span className="text-sm font-semibold">Solidarity with GenZ</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Statement Content */}
            <div className="p-8 md:p-12">
              <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed space-y-6">
                <p className="font-semibold text-[#0F172A] text-xl md:text-2xl">
                  &ldquo;I vow to honor all GenZs who lost their lives during the 2024 protests.&rdquo;
                </p>
                
                <p>
                  They were not thugs. They were not criminals. They were young Kenyans who looked at their country and said, <span className="text-[#1E3A8A] font-semibold">&ldquo;Enough.&rdquo;</span>
                </p>
                
                <p>
                  They stood against corruption. They stood against a system that steals from the poor to feed the rich. And for that, they paid the ultimate price.
                </p>
                
                <div className="bg-[#1E3A8A]/10 rounded-xl p-6 my-6 border-l-4 border-[#1E3A8A]">
                  <p className="font-semibold text-[#0F172A] mb-2">My pledge to you:</p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-3">
                      <FaMonument className="w-5 h-5 text-[#1E3A8A] mt-1 flex-shrink-0" />
                      <span>I will construct a <strong>national monument at Parliament</strong> to honor every life lost in the fight for justice</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaHandshake className="w-5 h-5 text-[#1E3A8A] mt-1 flex-shrink-0" />
                      <span>I will ensure <strong>every family is compensated</strong> for their immeasurable loss</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaFistRaised className="w-5 h-5 text-[#1E3A8A] mt-1 flex-shrink-0" />
                      <span>I will <strong>dismantle the corruption</strong> that made their sacrifice necessary</span>
                    </li>
                  </ul>
                </div>
                
                <p className="italic">
                  To the GenZ of Kenya: I see you. I hear you. And I will not betray you like those who came before.
                </p>
                
                <p className="font-semibold text-[#1E3A8A]">
                  Your future is not for sale. Your voice cannot be silenced. And your vote will be the thunder that changes this nation.
                </p>
              </blockquote>
              
              <div className="mt-8 pt-8 border-t border-slate-200 flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  Published: March 2026
                </div>
                <a
                  href={`https://wa.me/?text=${shareMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1E3A8A] font-semibold hover:text-[#1E40AF] transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Share on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What GenZ Gets */}
      <section className="py-16 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/genz2.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] text-sm font-semibold mb-4">
              Your Future, Your Terms
            </span>
            <h2 className="heading-editorial mb-4">
              What GenZ Gets with <span className="heading-accent-gold">Dr. Kinity</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Not promises. Not handouts. Real change that puts your generation first.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {youthPriorities.map((priority, index) => (
              <div 
                key={priority.title}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#1E3A8A]"
              >
                <div className="w-14 h-14 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center mb-6">
                  <priority.icon className="w-7 h-7 text-[#1E3A8A]" />
                </div>
                <h3 className="font-bold text-[#0F172A] text-xl mb-3">{priority.title}</h3>
                <p className="text-slate-600">{priority.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Call - Dr. Kinity Encourages Youth */}
      <section className="py-16 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/genz3.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-3xl p-8 md:p-12 text-center md:text-left overflow-hidden relative">
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E3A8A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A8A]/20 border border-[#1E3A8A]/30 mb-6">
                    <FaFistRaised className="w-4 h-4 text-[#1E3A8A]" />
                    <span className="text-[#1E3A8A] text-sm font-semibold">A Call to Courage</span>
                  </div>
                  
                  <h2 className="heading-editorial !text-white mb-4 leading-tight">
                    Step Forward. Lead Kenya. <span className="heading-accent-gold">Your Time Is Now.</span>
                  </h2>
                  
                  <p className="text-white/90 text-lg mb-4 leading-relaxed">
                    Dr. Kinity sees the fire in this generation. If you have the leadership skills, the vision, and the unshakable solidarity for Kenya, do not let anything hold you back. 
                  </p>
                  
                  <p className="text-white/80 text-lg mb-6 leading-relaxed">
                    <span className="text-[#1E3A8A] font-semibold">Campaign money is not a barrier.</span> Courage is. The National Vision Party stands ready to back young leaders who put Kenya first. Whether you are Gen Z or a young professional, you are not just included—you are <span className="font-semibold text-white">essential</span> to the future we are building.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A8A] text-[#0F172A] font-bold hover:bg-[#3B82F6] transition-colors"
                    >
                      Reach Out Today
                      <FaArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/join-us"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/20 transition-colors"
                    >
                      Join the Movement
                    </Link>
                  </div>
                </div>
                
                <div className="hidden md:block flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-[#1E3A8A]/20 flex items-center justify-center border-4 border-[#1E3A8A]/30">
                    <FaUsers className="w-14 h-14 text-[#1E3A8A]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Youth Manifesto Quick Link */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] rounded-3xl p-8 md:p-12 text-center md:text-left">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="heading-editorial !text-white mb-4 text-2xl md:text-3xl">
                  Read the Full <span className="heading-accent-gold">Youth Manifesto</span>
                </h3>
                <p className="text-white/70 mb-6">
                  47 pages of concrete plans for education, employment, digital rights, and climate action. This is your blueprint.
                </p>
                <Link 
                  href="/about/manifesto"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A8A] text-white font-bold hover:bg-[#3B82F6] transition-colors"
                >
                  Download Manifesto
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="relative w-48 h-64 bg-white/10 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center">
                  <div className="text-center">
                    <FaGraduationCap className="w-12 h-12 text-[#1E3A8A] mx-auto mb-2" />
                    <span className="text-white/60 text-sm">47 Pages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Movement */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/genz3.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-white/85" />
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1E3A8A 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#1E3A8A]/20 mb-6">
            <FaUsers className="w-10 h-10 text-[#1E3A8A]" />
          </div>
          
          <h2 className="heading-editorial mb-4">
            The Power is in <span className="heading-accent-gold">Your Hands</span>
          </h2>
          
          <p className="text-[#0F172A]/80 text-lg mb-8 max-w-2xl mx-auto">
            You are not &ldquo;the future.&rdquo; You are the NOW. And in 2027, you will outnumber every other voting bloc. 
            <span className="font-bold text-[#1E3A8A]">Use that power.</span>
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <a
              href={`https://wa.me/12036759354?text=I%20am%20GenZ%20and%20I%20want%20to%20join%20the%20movement`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#1E3A8A] text-white font-bold text-lg hover:bg-[#1E40AF] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <FaWhatsapp className="w-5 h-5" />
              Join on WhatsApp
            </a>
            
            <a
              href={`https://wa.me/?text=${shareMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0F172A]/10 backdrop-blur-sm border border-[#0F172A]/30 text-[#0F172A] font-semibold hover:bg-[#0F172A]/20 transition-all duration-300"
            >
              <FaShareAlt className="w-5 h-5" />
              Share with Squad
            </a>
          </div>
          
          <div className="mt-8 pt-8 border-t border-[#0F172A]/10">
            <p className="text-[#0F172A]/50 text-sm">
              WhatsApp: <span className="text-[#1E3A8A] font-semibold">+1 (203) 675-9354</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/40 text-sm">
            To the families of those we lost: We see you. We honor you. And we will not rest until justice is served.
          </p>
        </div>
      </section>
    </div>
  );
}
