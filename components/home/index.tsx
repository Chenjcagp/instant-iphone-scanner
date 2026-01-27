import Hero from "@/components/home/Hero";
import { useTranslations } from "next-intl";

export default function HomeComponent() {
  // 1. 初始化翻译钩子，读取 "Home" 下的内容
  const t = useTranslations("Home");

  return (
    <>
      <Hero />

      {/* 2. Features Section (使用 t('Features.xxx')) */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-4">
              {t("Features.title")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
              {t("Features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">{t("Features.f1_title")}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed pl-[4rem] md:pl-0 text-sm md:text-base">
                {t("Features.f1_desc")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">{t("Features.f2_title")}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed pl-[4rem] md:pl-0 text-sm md:text-base">
                {t("Features.f2_desc")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">{t("Features.f3_title")}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed pl-[4rem] md:pl-0 text-sm md:text-base">
                {t("Features.f3_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How it Works (使用 t('HowTo.xxx')) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12 md:mb-16">
            {t("HowTo.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>

            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">{t("HowTo.step1_title")}</h3>
              <p className="text-sm text-slate-500 max-w-[200px]">{t("HowTo.step1_desc")}</p>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-white border-2 border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 group-hover:border-blue-300 transition-colors duration-300">
                2
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">{t("HowTo.step2_title")}</h3>
              <p className="text-sm text-slate-500 max-w-[200px]">{t("HowTo.step2_desc")}</p>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-white border-2 border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 group-hover:border-blue-300 transition-colors duration-300">
                3
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">{t("HowTo.step3_title")}</h3>
              <p className="text-sm text-slate-500 max-w-[200px]">{t("HowTo.step3_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Wall of Love (使用 t('Testimonials.xxx')) */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-xs mb-2 block">{t("Testimonials.wall_of_love")}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t("Testimonials.title")}</h2>
            <p className="text-slate-500">{t("Testimonials.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Review 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className="flex text-yellow-400 mb-3 text-sm">★★★★★</div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                "Saved my life during finals! I needed to submit handwritten notes and my scanner app wanted $10/month. This worked instantly."
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Sarah J.</div>
                  <div className="text-slate-500">Student</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className="flex text-yellow-400 mb-3 text-sm">★★★★★</div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                "I love that there are no watermarks. It looks professional enough to send to my clients. Highly recommended."
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Mike" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Mike R.</div>
                  <div className="text-slate-500">Freelancer</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className="flex text-yellow-400 mb-3 text-sm">★★★★★</div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                "Finally, a tool that respects privacy. I checked the network requests, images really don't leave the browser. Great job."
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="David" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">David L.</div>
                  <div className="text-slate-500">Developer</div>
                </div>
              </div>
            </div>

            {/* Review 4 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className="flex text-yellow-400 mb-3 text-sm">★★★★★</div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                "Simple, fast, effective. I use it to scan receipts for my expense reports. No bloatware, just does the job."
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Emily" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Emily W.</div>
                  <div className="text-slate-500">Realtor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section (使用 t('FAQ.xxx')) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
            {t("FAQ.title")}
          </h2>

          <div className="grid gap-4">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 text-base md:text-lg mb-2 flex items-center gap-2">
                <span className="text-blue-600">Q:</span> {t("FAQ.q1")}
              </h3>
              <p className="text-sm md:text-base text-slate-600 pl-6">
                {t("FAQ.a1")}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 text-base md:text-lg mb-2 flex items-center gap-2">
                <span className="text-blue-600">Q:</span> {t("FAQ.q2")}
              </h3>
              <p className="text-sm md:text-base text-slate-600 pl-6">
                {t("FAQ.a2")}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 text-base md:text-lg mb-2 flex items-center gap-2">
                <span className="text-blue-600">Q:</span> {t("FAQ.q3")}
              </h3>
              <p className="text-sm md:text-base text-slate-600 pl-6">
                {t("FAQ.a3")}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 text-base md:text-lg mb-2 flex items-center gap-2">
                <span className="text-blue-600">Q:</span> {t("FAQ.q4")}
              </h3>
              <p className="text-sm md:text-base text-slate-600 pl-6">
                {t("FAQ.a4")}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 text-base md:text-lg mb-2 flex items-center gap-2">
                <span className="text-blue-600">Q:</span> {t("FAQ.q5")}
              </h3>
              <p className="text-sm md:text-base text-slate-600 pl-6">
                {t("FAQ.a5")}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 text-base md:text-lg mb-2 flex items-center gap-2">
                <span className="text-blue-600">Q:</span> {t("FAQ.q6")}
              </h3>
              <p className="text-sm md:text-base text-slate-600 pl-6">
                {t("FAQ.a6")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SEO Footer Text (保持不动，SEO 内容通常不建议频繁翻译变动，或者后续再做) */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">About Instant Scanner</h3>
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Instant iPhone Scanner is a free, privacy-first browser utility designed to replace native scanner apps.
            Optimized for iOS Safari, it allows students, professionals, and everyone to digitize receipts, homework, contracts, and documents into high-quality PDF format
            without installing heavy applications or registering accounts.
          </p>
          <p className="text-xs text-slate-300 mt-8">
            &copy; {new Date().getFullYear()} Instant iPhone Scanner. All rights reserved.
          </p>
        </div>
      </section>
    </>
  );
}