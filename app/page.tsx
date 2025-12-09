import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import ResortGallery from './ResortGallery'; // Importing your new interactive component
import { Phone, MapPin, MessageCircle, Utensils, Star } from 'lucide-react';

// Fetch Data (Server Side)
async function getResortData() {
  const query = `*[_type == "section"] | order(_createdAt asc) {
    _id,
    title,
    description,
    images
  }`;
  return await client.fetch(query);
}

export default async function Home() {
  const sections = await getResortData();

  return (
    <main className="bg-stone-50 min-h-screen">
      
      {/* HERO SECTION */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 opacity-60">
             <Image 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070"
                alt="Kuber Resort"
                fill
                className="object-cover"
             />
        </div>
        
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-6xl md:text-8xl font-serif text-amber-400 mb-6 drop-shadow-lg">
            Kuber Resort
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-widest mb-10 text-stone-200">
            SARDARSHAHAR, RAJASTHAN
          </p>
          <a href="#enquiry" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full hover:bg-amber-500 hover:border-amber-500 hover:text-black transition-all font-bold uppercase text-sm tracking-wider">
            Plan Your Event
          </a>
        </div>
      </section>

      {/* DYNAMIC CMS SECTIONS (Interactive) */}
      <div className="max-w-7xl mx-auto py-20">
         {/* We pass the data to the Client Component here */}
         <ResortGallery sections={sections} />
      </div>

      {/* FOOD MENU SECTION */}
      <section className="bg-emerald-950 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif text-amber-400 mb-4">Culinary Highlights</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Experience the finest pure vegetarian cuisine in Sardarshahar.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
             <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-all group">
                <Utensils className="mx-auto text-amber-500 mb-4 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-bold mb-2 font-serif">Royal Rajasthani</h3>
                <p className="text-gray-400 text-sm">Dal Baati Churma, Ker Sangri & Gatte ki Sabzi.</p>
             </div>
             <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-all group">
                <Star className="mx-auto text-amber-500 mb-4 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-bold mb-2 font-serif">North Indian</h3>
                <p className="text-gray-400 text-sm">Rich Paneer Butter Masala & Garlic Naan.</p>
             </div>
             <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-all group">
                <Utensils className="mx-auto text-amber-500 mb-4 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-bold mb-2 font-serif">Global Flavors</h3>
                <p className="text-gray-400 text-sm">Continental, Chinese & Italian delicacies.</p>
             </div>
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM & MAP */}
      <section id="enquiry" className="py-24 px-6 bg-stone-100">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          <div className="bg-emerald-900 md:w-1/2 relative min-h-[400px]">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.656537751664!2d74.48467267527636!3d28.44805797576595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3914041699999999%3A0x6666666666666666!2sSardarshahar%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
               width="100%" 
               height="100%" 
               style={{border:0}} 
               loading="lazy"
               className="grayscale hover:grayscale-0 transition-all duration-700 absolute inset-0"
             ></iframe>
             <div className="absolute bottom-0 left-0 w-full bg-black/80 p-6 text-white backdrop-blur-sm">
                 <h3 className="font-serif text-amber-400 text-xl mb-2">Visit Us</h3>
                 <p className="flex items-center gap-2 text-sm"><MapPin size={16}/> Mega Highway, Sardarshahar</p>
                 <p className="flex items-center gap-2 text-sm"><Phone size={16}/> +91 987 654 3210</p>
             </div>
          </div>
          
          <div className="p-10 md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Book Your Event</h3>
            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4">
              {/* This hidden input connects to your email */}
              <input type="hidden" name="access_key" value="4998e631-3d03-4ff0-b8d1-aa54a932b5aa" />
              
              {/* Redirect user to a Thank You page (optional, or just reload) */}
              <input type="hidden" name="redirect" value="https://web3forms.com/success" />

              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                <input type="tel" name="phone" placeholder="Phone Number" required className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 {/* Date Picker */}
                 <input type="date" name="date" className="w-full p-3 bg-gray-50 border rounded-lg text-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none" />
                 
                 <select name="event_type" className="w-full p-3 bg-gray-50 border rounded-lg text-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option value="Wedding">Wedding / Marriage</option>
                    <option value="Birthday">Birthday Party</option>
                    <option value="Room Stay">Room Booking</option>
                    <option value="Dining">Restaurant Dining</option>
                 </select>
              </div>
              
              <textarea name="message" placeholder="Specific Requirements (e.g. Guest Count)..." rows={4} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
              
              <button type="submit" className="w-full bg-emerald-900 text-white font-bold py-4 rounded-lg hover:bg-amber-500 hover:text-black transition-colors shadow-lg transform active:scale-95 duration-200">
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/919876543210" target="_blank" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
        <MessageCircle size={28} fill="white" />
      </a>
      
    </main>
  );
}