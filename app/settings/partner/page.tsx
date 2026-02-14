import { Wallet, Stethoscope, Store, CheckCircle, ArrowRight } from "lucide-react";

export default function BecomePartnerPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pl-64">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-900 text-white rounded-b-3xl md:rounded-3xl md:m-4 p-8 md:p-12 relative overflow-hidden shadow-xl mb-12">
        <div className="relative z-10 max-w-2xl mx-auto text-center">
            <span className="bg-white/10 backdrop-blur-md text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-wider mb-6 inline-block border border-white/10">Partner with Olex</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">Grow Your Business with India's Largest Livestock Network</h1>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed max-w-xl mx-auto">
                Connect directly with thousands of farmers. Sell feed, offer veterinary services, or supply equipment with zero commission.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg text-lg flex items-center justify-center gap-2 group">
                    Register Now
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                </button>
                <button className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-all">
                    Learn More
                </button>
            </div>
        </div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -ml-20 -mt-20"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl -mr-10 -mb-10"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Choose Your Role</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Card 1: Vendor */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                    <Store size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Product Vendor</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                    Sell cattle feed, mineral mixtures, milking machines, and farm equipment directly to farmers.
                </p>
                <ul className="space-y-3 mb-8">
                    {['Unlimited Product Listings', 'Direct Chat with Buyers', 'Sales Analytics'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                            <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
                <button className="w-full py-3 border-2 border-orange-100 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors">
                    Join as Vendor
                </button>
            </div>

            {/* Card 2: Vet */}
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                    <Stethoscope size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Veterinary Doctor</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                    Offer consultation, vaccination, and AI services. Build your digital reputation.
                </p>
                <ul className="space-y-3 mb-8">
                    {['Verified Doctor Badge', 'Appointment Management', 'Emergency Hero Status'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                            <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
                <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                    Join as Doctor
                </button>
            </div>

             {/* Card 3: Finance */}
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                    <Wallet size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Finance Agent</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                    Help farmers with livestock loans, insurance, and government subsidy applications.
                </p>
                <ul className="space-y-3 mb-8">
                    {['Lead Generation', 'Document Management', 'Commission Tracking'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                            <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
                <button className="w-full py-3 border-2 border-green-100 text-green-600 font-bold rounded-xl hover:bg-green-50 transition-colors">
                    Join as Agent
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
