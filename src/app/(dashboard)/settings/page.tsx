"use client";

import { useState, useEffect } from "react";
import { User, Settings, CreditCard, Bell, Shield, LogOut } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useTheme } from "next-themes";

type TabType = "profile" | "billing" | "notifications" | "preferences";

export default function SettingsPage() {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const [activeTab, setActiveTab] = useState<TabType>("profile");
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for save logic
        alert("Settings saved successfully!");
    };

    if (!isLoaded) {
        return <div className="p-8 text-center font-mono">Loading settings...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-black text-black uppercase tracking-tight mb-8">Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="md:col-span-1 space-y-2">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`w-full flex items-center gap-3 px-4 py-3 font-bold uppercase text-sm border-2 transition-all ${activeTab === "profile"
                            ? "bg-black text-white border-black shadow-[4px_4px_0_0_#000000]"
                            : "bg-white text-black border-transparent hover:border-black"
                            }`}
                    >
                        <User className="w-4 h-4" /> Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("billing")}
                        className={`w-full flex items-center gap-3 px-4 py-3 font-bold uppercase text-sm border-2 transition-all ${activeTab === "billing"
                            ? "bg-black text-white border-black shadow-[4px_4px_0_0_#000000]"
                            : "bg-white text-black border-transparent hover:border-black"
                            }`}
                    >
                        <CreditCard className="w-4 h-4" /> Billing
                    </button>
                    <button
                        onClick={() => setActiveTab("notifications")}
                        className={`w-full flex items-center gap-3 px-4 py-3 font-bold uppercase text-sm border-2 transition-all ${activeTab === "notifications"
                            ? "bg-black text-white border-black shadow-[4px_4px_0_0_#000000]"
                            : "bg-white text-black border-transparent hover:border-black"
                            }`}
                    >
                        <Bell className="w-4 h-4" /> Notifications
                    </button>
                    <button
                        onClick={() => setActiveTab("preferences")}
                        className={`w-full flex items-center gap-3 px-4 py-3 font-bold uppercase text-sm border-2 transition-all ${activeTab === "preferences"
                            ? "bg-black text-white border-black shadow-[4px_4px_0_0_#000000]"
                            : "bg-white text-black border-transparent hover:border-black"
                            }`}
                    >
                        <Settings className="w-4 h-4" /> Preferences
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-3 space-y-6">
                    {/* Profile Tab */}
                    {activeTab === "profile" && (
                        <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000000]">
                            <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-4 mb-6 flex items-center gap-2">
                                <User className="w-5 h-5" /> Public Profile
                            </h2>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-16 w-16 bg-gray-200 border-2 border-black overflow-hidden relative">
                                        {user?.imageUrl ? (
                                            <img src={user.imageUrl} alt="Profile" className="object-cover w-full h-full" />
                                        ) : (
                                            <User className="w-full h-full p-2 text-gray-500" />
                                        )}
                                    </div>
                                    <div>
                                        <button type="button" className="btn-brutal bg-white text-black px-4 py-2 text-sm">
                                            Change Avatar
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={user?.fullName || ""}
                                        className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0_0_#000000] transition-shadow"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Email</label>
                                    <input
                                        type="email"
                                        defaultValue={user?.primaryEmailAddress?.emailAddress || ""}
                                        disabled
                                        className="w-full border-2 border-black bg-gray-100 p-3 font-mono text-sm text-gray-500 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Email is managed by Auth provider.</p>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Bio</label>
                                    <textarea
                                        rows={4}
                                        className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0_0_#000000] transition-shadow"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button type="submit" className="btn-brutal bg-black text-white px-6 py-3 hover:bg-white hover:text-black">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Billing Tab */}
                    {activeTab === "billing" && (
                        <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000000]">
                            <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-4 mb-6 flex items-center gap-2">
                                <CreditCard className="w-5 h-5" /> Billing & Plan
                            </h2>
                            <div className="bg-gray-50 border-2 border-black p-4 mb-6">
                                <p className="text-sm font-bold uppercase text-gray-500 mb-1">Current Plan</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-3xl font-black uppercase">Free</p>
                                    <span className="bg-black text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">Active</span>
                                </div>
                            </div>
                            <button className="w-full btn-brutal bg-[#a6ff00] text-black px-6 py-4 text-lg hover:bg-black hover:text-[#a6ff00]">
                                Upgrade to Pro
                            </button>
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === "notifications" && (
                        <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000000]">
                            <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-4 mb-6 flex items-center gap-2">
                                <Bell className="w-5 h-5" /> Notifications
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { title: "Product Updates", desc: "Receive updates about new features." },
                                    { title: "Marketing Emails", desc: "Tips, tricks, and promotional offers." },
                                    { title: "Security Alerts", desc: "Important notifications about your account.", locked: true }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between border-2 border-gray-200 p-4">
                                        <div>
                                            <p className="font-bold uppercase text-sm">{item.title}</p>
                                            <p className="text-xs text-gray-500">{item.desc}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                defaultChecked={item.locked || i === 0}
                                                disabled={item.locked}
                                                className="w-5 h-5 accent-black"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Preferences Tab */}
                    {activeTab === "preferences" && (
                        <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000000]">
                            <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-4 mb-6 flex items-center gap-2">
                                <Settings className="w-5 h-5" /> Preferences
                            </h2>
                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Theme</label>
                                    {mounted ? (
                                        <select
                                            value={theme}
                                            onChange={(e) => setTheme(e.target.value)}
                                            className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0_0_#000000] dark:bg-zinc-800 dark:text-white dark:border-white dark:focus:shadow-[4px_4px_0_0_#ffffff]"
                                        >
                                            <option value="light">Light (Brutalist)</option>
                                            <option value="dark">Dark (Capslock)</option>
                                            <option value="system">System Default</option>
                                        </select>
                                    ) : (
                                        <div className="w-full border-2 border-black p-3 font-mono text-sm bg-gray-100 dark:bg-zinc-900 h-12"></div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Timezone</label>
                                    <select className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0_0_#000000]">
                                        <option>UTC-08:00 Pacific Time</option>
                                        <option>UTC+00:00 London</option>
                                        <option>UTC+08:00 Kuala Lumpur</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Danger Zone (Available everywhere or just Profile/Preferences) */}
                    {(activeTab === "profile" || activeTab === "preferences") && (
                        <div className="border-4 border-red-500 bg-red-50 p-6">
                            <h2 className="text-xl font-bold uppercase text-red-600 mb-2 flex items-center gap-2">
                                <Shield className="w-5 h-5" /> Danger Zone
                            </h2>
                            <p className="text-sm text-red-600/80 mb-4">Account management and deletion.</p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => signOut()}
                                    className="border-2 border-black bg-black text-white font-bold uppercase text-xs px-4 py-3 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                                <button className="border-2 border-red-600 text-red-600 font-bold uppercase text-xs px-4 py-3 hover:bg-red-600 hover:text-white transition-colors">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
