import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { QuickInfoBar } from "@/components/QuickInfoBar";
import { WelcomeSection } from "@/components/WelcomeSection";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { ProcessSection } from "@/components/ProcessSection";
import { BookingForm } from "@/components/BookingForm";
import { AftercareGuide } from "@/components/AftercareGuide";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\",\"name\":\"Tattoos by Jake Llewellyn\",\"description\":\"At Tattoos by jakellewellyn, I offer a range of services to cater to your individual tattoo needs. I specialise in custom designs, client-specified artwork, and cover-ups (depending on the existing design). All tattoo styles are welcome, ensuring your body art is exactly as you envision it.\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"6A Gwerthonor Place Gilfach Bargoed CF81 8JQ\"},\"url\":\"https://tattoos-by-jake-llewellyn-97aa7a.duckbyte.co\"}" }} />
      <Navbar />
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <QuickInfoBar />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <WelcomeSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <PortfolioGallery />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <BookingForm />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <AftercareGuide />
      </Suspense>
      <Suspense fallback={<div className="min-h-[30vh]" />}>
        <ContactSection />
      </Suspense>
      <Footer />
    </main>
  );
}
