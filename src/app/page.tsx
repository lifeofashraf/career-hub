"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowDown,
  LayoutDashboard,
  FileEdit,
  Download,
  Star,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col font-sans text-black overflow-x-hidden bg-white selection:bg-black selection:text-white">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b-4 border-black">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center px-6 py-12 lg:px-12 lg:py-24 bg-white">
              <div className="inline-flex w-fit items-center gap-2 border-2 border-black bg-gray-100 px-3 py-1 mb-6 brutalist-shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">AI-Powered Engine v2.0</span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
                Build Your <br />
                <span className="italic bg-black text-white px-2">Legacy.</span>
              </h1>
              <p className="text-lg font-medium leading-relaxed max-w-lg mb-10 border-l-4 border-black pl-4">
                Construct a professional resume with raw efficiency. 20+ ATS-compliant structural frameworks. No fluff. Just impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/dashboard" className="flex items-center justify-center h-14 px-8 border-2 border-black bg-black text-white text-lg font-black uppercase tracking-wider brutalist-shadow transition-all brutalist-shadow-hover brutalist-shadow-active">
                  Create Resume
                </Link>
                <a href="#frameworks" className="flex items-center justify-center h-14 px-8 border-2 border-black bg-white text-black text-lg font-black uppercase tracking-wider brutalist-shadow-sm hover:bg-gray-100 transition-colors">
                  View Samples
                </a>
              </div>
              <div className="flex items-center gap-4 mt-12 pt-6 border-t-2 border-dashed border-gray-300">
                <div className="flex -space-x-4">
                  <div className="size-10 border-2 border-black bg-gray-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5hMN2t_siuNf0TwJmVzmIkBcs5WyTJeKB28lHA7zr2tD4SPsUMrxQF15R99cM9_zqNbi1gw1zV_a1Bs-9dLeh6EgnVtCc4uTaSlRLfJ373w41-vlrJoUzkt1HIWsdnJY9O7_qMgfUJ33GKoaH6CUyDA8eCvdweRgiYKUvb43KlnY6NRwEG2h4iOFBcgh9uMVRdv2zpRZKamxY93mNMN20XKrnazQZcnGB2YJ2AKn7EGJlNNsMMzKKZ5vgUIbZeWpkL8RjEAPrmpk")' }}></div>
                  <div className="size-10 border-2 border-black bg-gray-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjsNtu4Cb7YmDtMIpyhNrMjS5dJ1MpqAhUBkMaKylmNG51YCHgDDTU18D8SLuxPlVwzgTGJrg-kdxMU5Mta3hW2PYMuEu5N_ZgOsI_zezcJOrBWW_e4agpXrHZDZIBOjJAdI9UlZ29h6hSKIZxt5o-O13IbtfUnO83LwpB4mewPVAPOEwYuDqFsZJEXn5rkAF6scfo5_F2AeGaQBnezA9Up_5OQS0q2NfUjvC86PbDk7OytFcfC-2WEKepobH_D5-QRhZLEwQKKRI")' }}></div>
                  <div className="size-10 border-2 border-black bg-gray-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBsZxGLhuJntx5g8fD5q2naf-U-V3TY3MjOKANr3ovEX79PfHWWgMHGPR6LgGHYAsheNL449mrvBdY8sX7n2E21rsjgS3uJc30n5mNPhLJGVLo2r8PbqHjEe5HB_q03wlJj6rX3Eddu2eceB_FLv2U7DN10P9MYHjSzrLI7EooVDzkw2Y4evbuC8LtKSa-rzvBfFn3rPtYyrqodAeuaXOAmYuI4FtbQlJnZs2QvVKFLR3mENSXXUVR_B6mesn_0PkWDfgbhGHqwbNk")' }}></div>
                </div>
                <p className="font-bold text-sm uppercase tracking-wide">Joined by 10k+ Builders</p>
              </div>
            </div>
            <div className="relative border-l-0 lg:border-l-4 border-t-4 lg:border-t-0 border-black bg-gray-100 flex items-center justify-center p-8 lg:p-12 overflow-hidden">
              <div className="absolute top-10 right-10 w-24 h-24 border-4 border-black bg-white z-0"></div>
              <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full border-4 border-black bg-black z-0"></div>
              <div className="relative z-10 w-full max-w-md border-4 border-black bg-white p-2 brutalist-shadow rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="border-2 border-black overflow-hidden bg-white">
                  <img alt="Resume builder dashboard interface" className="w-full h-auto object-cover grayscale contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZnOL6e2DbPYHdZsG2EnnBR15EfYkQDtc2T_aDhJp-ifmHbZGwC0IV2F14rqgEZyH4fJg784wfDQxqxjYp6BVN5eZ8Pcmj6M2QQvD9NT43hbZRQefJzxiSKOdlUkj9DQuGc0LigpCL52r2NsIkYj2f2El4mIYB7zRpMKBmclBsdo7JBhYC4H8l0uU6rgyfEN8Sce_sd1JeLy_P1yfPISCikZHmmuiBURFfJiemAvzJij-RbHXztEJM6vl0URkug1l9I-8fMCgLaR4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frameworks Section */}
        <section id="frameworks" className="py-20 px-6 lg:px-12 border-b-4 border-black bg-white">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Select <br />Framework</h2>
              <p className="text-xl font-bold max-w-md border-l-4 border-black pl-4">
                Professionally engineered. ATS-optimized. Brutally effective.
              </p>
            </div>
            <div className="hidden lg:block">
              <ArrowDown className="size-16 rotate-45" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Executive */}
            <div className="group relative">
              <div className="relative aspect-[3/4] border-4 border-black bg-white p-2 transition-all duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 brutalist-shadow group-hover:shadow-none">
                <div className="w-full h-full border-2 border-black overflow-hidden relative">
                  <div className="absolute inset-0 bg-cover bg-top grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDvx157rMhUTkAOLZWKfrup07AF0jojd4Kvts7FlZhlDWD1Jt-oXIgwHQh-zTbrbS3ABfHx70KWpcTWZlHdq8uXqjpgvHShHPHQuk-1zkhECqvsOHQsUOGnbs1Rd1JF0_lSSo3FovLREzllTTJO0sjTyAO8eklbJVxqzqhlntAFfm4yTjQ3wRa7dC4r6zg3md5jqGFRNP1ArAFpH0PUP9sH1dTZv31ImEyx48rsMaI74h0rUaydo33i2xmdNb_IcktmdDriDr35wA")' }}></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-black border-2 border-white text-white font-bold uppercase tracking-wider py-3 px-6 hover:bg-white hover:text-black hover:border-black transition-colors">Select</button>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold uppercase px-2 py-1 border-2 border-white">ATS Ready</div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-black uppercase">Model: Executive</h3>
                <p className="text-sm font-bold text-gray-500">Corporate / Management</p>
              </div>
            </div>
            {/* Creator */}
            <div className="group relative">
              <div className="relative aspect-[3/4] border-4 border-black bg-white p-2 transition-all duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 brutalist-shadow group-hover:shadow-none">
                <div className="w-full h-full border-2 border-black overflow-hidden relative">
                  <div className="absolute inset-0 bg-cover bg-top grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmR5WiGMCeZBxGL-8pCnrpi6_z2qCjiH9kTS9tXvE3I7K-AJpV5s18_HaknUkDWE1z9OP4OFh3zCv5OYRffUkArxpUQzPPvU75B-OCgKCiSpg6ODJzqpXxtSF02sTz0lUWETUefpYiEwsBBDnXAoMVnARxelUVQyoCBaAeYahclxe0RLClWaYRlPwbhkRK-7EYGa_qg2EZHdh33HanhvpfLeX7zattT8JNlw6dCLsP7ZHYywZVEN3v7q0l95U6b6UaeJ36OnC6ruU")' }}></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-black border-2 border-white text-white font-bold uppercase tracking-wider py-3 px-6 hover:bg-white hover:text-black hover:border-black transition-colors">Select</button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-black uppercase">Model: Creator</h3>
                <p className="text-sm font-bold text-gray-500">Design / Arts</p>
              </div>
            </div>
            {/* Minimalist */}
            <div className="group relative">
              <div className="relative aspect-[3/4] border-4 border-black bg-white p-2 transition-all duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 brutalist-shadow group-hover:shadow-none">
                <div className="w-full h-full border-2 border-black overflow-hidden relative">
                  <div className="absolute inset-0 bg-cover bg-top grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrtmGXwjGis7PfGQeNtMbMOh4Na6Xh6V5spgIlrZ9AeaHoCjZDo9VjZu2s1qrLnkCv8YCMlXrdT5kg8VwJX8pt-xZbVHpw55TPIWj0M1ncpTUXrk1J4HMhq1NdyotvOYevQnB0ava0oeVBFCwh2ZZDoy-lK1lZ2j0B-BwGSl_3RgXCdknJrVKARUVQR1ElCkVk5k6ZsUs0usIUZUvfptWoG90V1USWcnGuZ_38Wh4l6AKxz7zpIPE3mLqXajpxE8UWmUH21biuQU8")' }}></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-black border-2 border-white text-white font-bold uppercase tracking-wider py-3 px-6 hover:bg-white hover:text-black hover:border-black transition-colors">Select</button>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold uppercase px-2 py-1 border-2 border-black">Trending</div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-black uppercase">Model: Minimalist</h3>
                <p className="text-sm font-bold text-gray-500">Professional / Clean</p>
              </div>
            </div>
          </div>
        </section>

        {/* Operation Protocol */}
        <section id="process" className="border-b-4 border-black bg-black text-white py-20 px-6 lg:px-12 overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-20 text-center border-b-2 border-white/30 pb-8 inline-block w-full">Operation Protocol</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="flex flex-col gap-6 relative group">
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-black text-transparent stroke-text" style={{ WebkitTextStroke: '2px white' }}>01</span>
                  <div className="h-1 flex-1 bg-white"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold uppercase mb-2">Configure</h3>
                  <p className="text-gray-400 font-mono text-sm leading-relaxed">Select a structural framework from our archive. Match your industry specifications.</p>
                </div>
                <div className="size-16 border-2 border-white flex items-center justify-center mt-auto self-start">
                  <LayoutDashboard className="w-8 h-8" />
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col gap-6 relative group">
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-black text-transparent stroke-text" style={{ WebkitTextStroke: '2px white' }}>02</span>
                  <div className="h-1 flex-1 bg-white"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold uppercase mb-2">Input Data</h3>
                  <p className="text-gray-400 font-mono text-sm leading-relaxed">Deploy your professional history. Use manual entry or import via LinkedIn API.</p>
                </div>
                <div className="size-16 border-2 border-white flex items-center justify-center mt-auto self-start">
                  <FileEdit className="w-8 h-8" />
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col gap-6 relative group">
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-black text-transparent stroke-text" style={{ WebkitTextStroke: '2px white' }}>03</span>
                  <div className="h-1 flex-1 bg-white"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold uppercase mb-2">Execute</h3>
                  <p className="text-gray-400 font-mono text-sm leading-relaxed">Export high-fidelity PDF document. Initiate job application sequence.</p>
                </div>
                <div className="size-16 border-2 border-white flex items-center justify-center mt-auto self-start">
                  <Download className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Field Reports */}
        <section className="py-20 px-6 lg:px-12 border-b-4 border-black bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b-4 border-black pb-6">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Field Reports</h2>
                <p className="font-bold text-gray-500 uppercase tracking-wide">User Feedback / Status: Positive</p>
              </div>
              <div className="flex items-center border-2 border-black px-4 py-2 bg-black text-white">
                <div className="flex gap-1 text-white mr-4">
                  <Star className="w-4 h-4 fill-white" />
                  <Star className="w-4 h-4 fill-white" />
                  <Star className="w-4 h-4 fill-white" />
                  <Star className="w-4 h-4 fill-white" />
                  <Star className="w-4 h-4 fill-white" />
                </div>
                <span className="font-mono font-bold text-sm">RATING: 4.9</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 border-4 border-black bg-white brutalist-shadow">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-black border-dashed">
                  <div className="size-12 border-2 border-black bg-cover bg-center grayscale" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDGAbtOHEVObucphFtszPM53Ma8F1JRvsvxG7sfUHmTKpfqg_0rlt1JJWEYZYJHBaZP9QwAUoCKe_ty6GSu6bKIw_JLdkH0GvDBFTP5Fo19XIxWygyAjWMsgukAzKqmILMZIU7pIsrRY9d1h0ZdBa1TZK55M7DaOKQObVwrTu01pWsHk59sUusADNWUymaVPnTMh2cIL1L19cg4Ac_812VUeVDJrUjiitn1RVKnr7-JpWUKSpQnRScNNx-v-jZepcNYYZGuVyRKcvU")' }}></div>
                  <div>
                    <h4 className="font-black uppercase text-lg">Sarah J.</h4>
                    <p className="text-xs font-mono font-bold bg-black text-white inline-block px-1">Product Mgr @ Google</p>
                  </div>
                </div>
                <p className="font-medium text-lg italic">"I got hired at Google. The templates are brutally clean. ATS checker is legitimate."</p>
              </div>
              <div className="p-6 border-4 border-black bg-white brutalist-shadow">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-black border-dashed">
                  <div className="size-12 border-2 border-black bg-cover bg-center grayscale" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA86yLYucRJyntztnGKhMX0WYxpgbIuwaOQPsYK_92YfGUIbI7MWc0V3gRnoZcnUdqojFnu1hPvShlhjh8qsGcVUpDIOslnxrcefVBM4AHOiMylFFzXBIJUz-ok6zCKgbbNfAB6Ybn7EGEuTVh2_y6C8l-esv7Z6lOjBHuzr0cgfQ3JStA2vOyAt5-LrOsu5ARiDrBptIV-W4leihfnKNwuzsFuNvjhse95IVWw3pV7lcKn3ctotf2hDlcEI2PV5j1ykZTG1NYMqBI")' }}></div>
                  <div>
                    <h4 className="font-black uppercase text-lg">Michael C.</h4>
                    <p className="text-xs font-mono font-bold bg-black text-white inline-block px-1">Software Eng.</p>
                  </div>
                </div>
                <p className="font-medium text-lg italic">"AI suggestions fixed my writing block. This tool made my experience sound heavy."</p>
              </div>
              <div className="p-6 border-4 border-black bg-white brutalist-shadow hidden lg:block">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-black border-dashed">
                  <div className="size-12 border-2 border-black bg-cover bg-center grayscale" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkvuc3Mj9NjBrlv30m4BNrycl6hCRdrnTRjcytwbl8vkXZhDUf8xuoodl4h5Eahg23Dv9tnAyyOJLksQwFifd-cCM9UXrUXHFl-4-vmBwBrDvpNufpD3TgVqmtcd_BxAwsxTJkD1dCQcy51xXAukOMBwliO0DUDhJh39J9mpvUY6X-Cpi8gyBBdba3bW8muANzWlr-P7QjBGEjU4gm-0QF25mAK9AOD0z6igYlRl1RK9sbV4Z51MlhjyRiuT9RB7pimjK0GwKmNtw")' }}></div>
                  <div>
                    <h4 className="font-black uppercase text-lg">Jessica R.</h4>
                    <p className="text-xs font-mono font-bold bg-black text-white inline-block px-1">Marketing Dir.</p>
                  </div>
                </div>
                <p className="font-medium text-lg italic">"Three versions. One hour. Effective. Highly recommended for serious applicants."</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center bg-gray-100">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 border-4 border-black p-12 bg-white brutalist-shadow">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Ready to <br />
              <span className="bg-black text-white px-4">Dominate?</span>
            </h2>
            <p className="text-xl font-bold max-w-xl">Join the ranks of professionals who have upgraded their career infrastructure.</p>
            <Link href="/dashboard" className="flex w-full md:w-auto items-center justify-center h-16 px-12 bg-black text-white text-xl font-black uppercase tracking-wider border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors brutalist-shadow-sm">
              Start Building
            </Link>
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mt-4 border-t border-gray-300 pt-4 w-full">No credit card required for basic access</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* Footer */}
      <Footer />
    </div>
  );
}
