'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source).width(1200).auto('format').url();
}

export default function ResortGallery({ sections }: { sections: any[] }) {
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState<any[]>([]);

  const handleOpenGallery = (sanityImages: any[]) => {
    if (!sanityImages) return;
    const gallerySlides = sanityImages.map((img: any) => ({ src: urlFor(img) }));
    setSlides(gallerySlides);
    setOpen(true);
  };

  if (!sections || sections.length === 0) {
    return <div className="text-center py-20 text-gray-500">Loading Sections...</div>;
  }

  return (
    <div className="space-y-16 lg:space-y-32">
      {sections.map((section, index) => {
        // Desktop Alternating Logic: Even = Image Left, Odd = Image Right
        const isEven = index % 2 === 0;
        const images = section.images || [];
        
        const previewImages = images.map((img: any) => 
          builder.image(img).width(800).auto('format').url()
        );

        return (
          <motion.div 
            key={section._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            // MOBILE: Standard Column (Image top, Text bottom)
            // DESKTOP: Row (Side by side)
            className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-16 px-6 lg:px-20 overflow-hidden`}
          >
            
            {/* 1. IMAGE AREA (Placed First for Mobile) */}
            {/* Desktop: We use 'order-last' css class to swap it to the right side if needed */}
            <div 
              className={`w-full lg:w-1/2 h-64 lg:h-[450px] relative cursor-pointer group shadow-xl rounded-2xl overflow-hidden bg-stone-200 ${isEven ? 'lg:order-last' : ''}`}
              onClick={() => handleOpenGallery(images)}
            >
               {/* Desktop Grid (Hidden on Mobile) */}
               <div className="hidden lg:grid grid-cols-2 gap-2 h-full">
                  <div className="relative h-full w-full row-span-2">
                     {previewImages[0] && <Image src={previewImages[0]} alt="Main" fill className="object-cover" />}
                  </div>
                  <div className="flex flex-col gap-2 h-full">
                     <div className="relative flex-1 bg-stone-300">
                         {previewImages[1] && <Image src={previewImages[1]} alt="Sub 1" fill className="object-cover" />}
                     </div>
                     <div className="relative flex-1 bg-stone-300">
                          {previewImages[2] && <Image src={previewImages[2]} alt="Sub 2" fill className="object-cover" />}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white font-bold backdrop-blur-[1px]">
                             + More
                          </div>
                     </div>
                  </div>
               </div>

               {/* Mobile Single Image (Visible only on Mobile) */}
               <div className="lg:hidden relative w-full h-full">
                  {previewImages[0] ? (
                     <>
                       <Image 
                         src={previewImages[0]} 
                         alt={section.title} 
                         fill 
                         className="object-cover"
                       />
                       <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                         +{images.length} Photos
                       </div>
                     </>
                  ) : (
                     <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                  )}
               </div>
            </div>

            {/* 2. TEXT AREA (Placed Second for Mobile) */}
            <div className="w-full lg:w-1/2 space-y-3 lg:space-y-6">
              <h2 className="text-3xl lg:text-5xl font-serif text-emerald-950 font-medium">
                {section.title}
              </h2>
              <div className="h-1 w-16 lg:w-24 bg-amber-500 rounded-full"></div>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-lg">
                {section.description}
              </p>
              <button 
                onClick={() => handleOpenGallery(images)}
                className="group flex items-center gap-2 text-emerald-800 font-bold hover:text-amber-600 transition-colors uppercase tracking-widest text-xs lg:text-sm pt-2"
              >
                View Gallery <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

          </motion.div>
        );
      })}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
      />
    </div>
  );
}
