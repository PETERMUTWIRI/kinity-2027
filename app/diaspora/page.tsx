// app/diaspora/page.tsx - Diaspora Engagement Page
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaWhatsapp, 
  FaGlobe, 
  FaHandshake, 
  FaHeart, 
  FaUsers,
  FaFlag,
  FaArrowRight,
  FaEnvelope,
  FaCalendarAlt
} from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Diaspora | National Vision Party',
  description: 'Kenyans abroad - your voice, your vote, your Kenya matters. Join the National Vision Party movement from anywhere in the world.',
  openGraph: {
    title: 'Kenyans in Diaspora: The Future is in Your Hands',
    description: 'You left Kenya seeking opportunity. Now help us build the Kenya you always dreamed of.',
    type: 'article',
  },
};

const diasporaRegions = [
  { region: 'North America', countries: 'USA, Canada', members: '2,500+', icon: '🌎' },
  { region: 'Europe', countries: 'UK, Germany, Netherlands', members: '1,800+', icon: '🌍' },
  { region: 'Middle East', countries: 'UAE, Qatar, Saudi', members: '3,200+', icon: '🌏' },
  { region: 'Australia', countries: 'Australia, New Zealand', members: '900+', icon: '🇦🇺' },
];

const waysToHelp = [
  {
    title: 'Adopt a Polling Station',
    description: 'Fund election monitoring and voter education in a specific constituency back home.',
    icon: FaFlag,
    action: 'Learn More',
    link: '#adopt-station'
  },
  {
    title: 'Virtual Campaigner',
    description: 'Use your networks to spread Dr. Kinity\'s message. We provide the content, you provide the voice.',
    icon: FaUsers,
    action: 'Join Network',
    link: 'https://wa.me/254713064026?text=I%20want%20to%20be%20a%20virtual%20campaigner'
  },
  {
    title: 'Diaspora Champion',
    description: 'Organize fellow Kenyans in your city. Host meetups, fundraise, and build the National Vision Party movement locally.',
    icon: FaHandshake,
    action: 'Become Champion',
    link: 'https://wa.me/254713064026?text=I%20want%20to%20be%20a%20Diaspora%20Champion%20in%20[Your%20City]'
  },
  {
    title: 'Family Support Fund',
    description: 'Directly support families of activists and organizers on the ground in Kenya.',
    icon: FaHeart,
    action: 'Contribute',
    link: '/support'
  },
];

const shareMessage = encodeURIComponent(
  `🇰🇪 *To My Fellow Kenyans Abroad*

You left seeking opportunity. Now help us build the Kenya we always dreamed of.

The National Vision Party is not a collection of politicians. We are servants of the people. Dr. Isaac Newton Kinity has pledged to dismantle corruption in 2 years, not 20.

🗳️ You can vote from abroad
💰 You can fund change
📢 You can amplify truth

Your family at home is counting on you.

Join us: https://www.nationalvisionparty.com/diaspora

WhatsApp: 0713064026

#KenyasHope2027 #DiasporaPower`
);

export default function DiasporaPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0F172A] py-24 lg:py-32 overflow-hidden">
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A017]/20 text-[#D4A017] text-sm font-semibold mb-6">
                <FaGlobe className="w-4 h-4" />
                Kenyans Abroad
              </span>
              
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                You Left Kenya Seeking <span className="text-[#D4A017]">Opportunity</span>
              </h1>
              
              <p className="text-xl text-white/80 mb-4">
                Now Help Us Build the Kenya You Always Dreamed Of
              </p>
              
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
                Distance does not diminish your stake in Kenya&apos;s future. Your vote, your voice, and your resources can dismantle the corruption that drove you away.
              </p>

              {/* WhatsApp CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href={`https://wa.me/254713064026?text=I%20am%20in%20the%20Diaspora%20and%20I%20want%20to%20help%20from%20[Your%20Country]`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-bold text-lg hover:bg-[#128C7E] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <FaWhatsapp className="w-6 h-6" />
                  Join WhatsApp Channel
                </a>
                
                <a
                  href={`https://wa.me/?text=${shareMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Share with Kenyans Abroad
                </a>
              </div>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-4">
              {diasporaRegions.map((region) => (
                <div 
                  key={region.region}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <div className="text-4xl mb-3">{region.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-1">{region.region}</h3>
                  <p className="text-white/60 text-sm mb-2">{region.countries}</p>
                  <p className="text-[#D4A017] font-semibold">{region.members}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Dr. Kinity's Message */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-l-4 border-[#D4A017]">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-[#D4A017]/20">
                <Image
                  src="/images/Dr.png"
                  alt="Dr. Isaac Newton Kinity"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg">A Message from Dr. Kinity</h3>
                <p className="text-slate-500 text-sm">Presidential Candidate, National Vision Party</p>
              </div>
            </div>
            
            <blockquote className="text-xl md:text-2xl text-slate-700 leading-relaxed italic mb-6">
              &ldquo;My brothers and sisters in the diaspora—I know why you left. You left because corruption made opportunity impossible. You left because the system failed you. 
              <br /><br />
              But hear me now: <span className="text-[#1E3A8A] font-semibold not-italic">You did not stop being Kenyan.</span> Your mother still lives in the village. Your children still ask about &apos;home.&apos; And come 2027, your vote will count—whether you are in Nairobi or New York.
              <br /><br />
              I am not asking you to return. I am asking you to help us build a Kenya worth returning to.&rdquo;
            </blockquote>

            <div className="flex items-center gap-2 text-[#D4A017] font-semibold">
              <FaFlag className="w-5 h-5" />
              <span>Kenya&apos;s Hope 2027</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl text-[#0F172A] mb-4">
              How You Can Help from <span className="text-[#D4A017]">Anywhere</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              You don&apos;t need to be in Kenya to be part of this revolution. Here are four ways to make impact:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {waysToHelp.map((way) => (
              <div 
                key={way.title}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-[#1E3A8A]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center mb-4">
                  <way.icon className="w-6 h-6 text-[#1E3A8A]" />
                </div>
                <h3 className="font-bold text-[#0F172A] text-lg mb-2">{way.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{way.description}</p>
                <Link 
                  href={way.link}
                  className="inline-flex items-center gap-2 text-[#1E3A8A] font-semibold text-sm hover:text-[#D4A017] transition-colors"
                >
                  {way.action}
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voting from Abroad */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-[#D4A017]/10 text-[#D4A017] text-sm font-semibold mb-4">
                <FaCalendarAlt className="w-4 h-4 inline mr-2" />
                August 9, 2027
              </span>
              <h2 className="font-headline text-3xl md:text-4xl text-[#0F172A] mb-6">
                Your Vote Counts—<span className="text-[#D4A017]">Even from Abroad</span>
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  The Independent Electoral and Boundaries Commission (IEBC) allows Kenyans abroad to vote in presidential elections. 
                </p>
                <p>
                  We are organizing registration drives in major cities worldwide. If you have a valid Kenyan passport, you can vote.
                </p>
                <div className="bg-[#1E3A8A]/5 rounded-xl p-6 mt-6">
                  <h4 className="font-bold text-[#0F172A] mb-3">Required Documents:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#D4A017]" />
                      Valid Kenyan Passport
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#D4A017]" />
                      Proof of residence abroad
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#D4A017]" />
                      Registration with Kenyan Embassy
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-3xl p-8 text-white">
              <h3 className="font-bold text-2xl mb-6">Get Voting Updates</h3>
              <p className="text-white/80 mb-6">
                We will alert you when registration opens in your country, where to go, and what to bring.
              </p>
              <a
                href={`https://wa.me/254713064026?text=I%20want%20to%20register%20to%20vote%20from%20abroad.%20My%20country%20is:%20`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
                Get WhatsApp Alerts
              </a>
              <p className="text-white/50 text-sm text-center mt-4">
                Or email: <a href="mailto:diaspora@nationalvisionparty.com" className="text-[#D4A017] hover:underline">diaspora@nationalvisionparty.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-headline text-3xl md:text-4xl text-white mb-6">
            The Time for <span className="text-[#D4A017]">Waiting is Over</span>
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Every generation of Kenyans has hoped for change. We are done hoping. We are building. And we need you—wherever you are.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/254713064026?text=I%20am%20ready%20to%20join%20the%20movement%20from%20the%20diaspora`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#DC2626] text-white font-bold text-lg hover:bg-[#B91C1C] transition-all duration-300 shadow-lg"
            >
              <FaHandshake className="w-5 h-5" />
              Join the Movement
            </a>
            
            <a
              href={`https://wa.me/?text=${shareMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/20 transition-all duration-300"
            >
              <FaHeart className="w-5 h-5" />
              Share with Your Network
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-white/50 text-sm">
              WhatsApp: <span className="text-[#D4A017]">0713 064 026</span> | Email: diaspora@nationalvisionparty.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
