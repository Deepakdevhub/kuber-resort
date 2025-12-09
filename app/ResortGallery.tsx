'use client'; // This command enables clicks and animations

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

// 1. Setup Sanity Image Optimizer
const builder = imageUrlBuilder(client);

// This function forces Sanity to convert images to WebP and resize them to max 1200px width
// This solves your 5MB -> 50KB requirement!
function urlFor(source: any) {
  return builder.image(source).width(1200).auto('format').url();
}

export default function ResortGallery({ sections }: { sections: any[] }) {
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState<any[]>([]);

  // Function to open the lightbox with specific images
  const handleOpenGallery = (sanityImages: any[]) => {
    if (!sanityImages) return;
    // Convert Sanity image objects to simple URLs for the lightbox
    const gallerySlides = sanityImages.map((img: any) => ({ src: urlFor(img) }));
    setSlides(gallerySlides);
    setOpen(true);
  };

  if (!sections || sections.length === 0) {
    return <div className="text-center py-20 text-gray-500">Loading Sections...</div>;
  }

  return (
    <div className="space-y-24">
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;
        const images = section.images || [];
        
        // Generate optimized URLs for the preview cards (smaller size for speed)
        const previewImages = images.map((img: any) => 
          builder.image(img).width(600).auto('format').url()
        );

        return (
          <motion.div 
            key={section._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 px-6 lg:px-20 overflow-hidden`}
          >
            {/* Text Area */}
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-serif text-emerald-950 font-medium">
                {section.title}
              </h2>
              <div className="h-1 w-24 bg-amber-500 rounded-full"></div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {section.description}
              </p>
              <button 
                onClick={() => handleOpenGallery(images)}
                className="group flex items-center gap-2 text-emerald-800 font-bold hover:text-amber-600 transition-colors uppercase tracking-widest text-sm"
              >
                View Gallery <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Image Grid Area (Clickable) */}
            <div 
              className="flex-1 w-full grid grid-cols-2 gap-4 h-96 relative cursor-pointer group"
              onClick={() => handleOpenGallery(images)}
            >
              {previewImages[0] ? (
                <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl row-span-2 border-4 border-white">
                  <Image 
                     src={previewImages[0]} 
                     alt={section.title} 
                     fill 
                     className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ) : (
                <div className="bg-gray-200 rounded-2xl row-span-2 flex items-center justify-center text-gray-400">Add Image in CMS</div>
              )}

              <div className="flex flex-col gap-4 h-full">
                 {previewImages[1] && (
                   <div className="relative flex-1 rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                     <Image src={previewImages[1]} alt="Gallery 2" fill className="object-cover" />
                   </div>
                 )}
                 
                 <div className="relative flex-1 rounded-2xl overflow-hidden shadow-xl bg-emerald-50 border-2 border-white">
                   {previewImages[2] && <Image src={previewImages[2]} alt="Gallery 3" fill className="object-cover" />}
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center text-white font-bold backdrop-blur-[1px]">
                     + Photos
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* The Popup Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
      />
    </div>
  );
}