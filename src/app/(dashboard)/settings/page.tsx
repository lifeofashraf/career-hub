"use client";

import { User, Settings, CreditCard, Bell } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-black text-black uppercase tracking-tight mb-8">Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Navigation */}
                <div className="md:col-span-1 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-black text-white font-bold uppercase text-sm border-2 border-black shadow-[4px_4px_0_0_#000000]">
                        <User className="w-4 h-4" /> Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-black font-bold uppercase text-sm border-2 border-transparent hover:border-black transition-all">
                        <CreditCard className="w-4 h-4" /> Billing
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-black font-bold uppercase text-sm border-2 border-transparent hover:border-black transition-all">
                        <Bell className="w-4 h-4" /> Notifications
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-black font-bold uppercase text-sm border-2 border-transparent hover:border-black transition-all">
                        <Settings className="w-4 h-4" /> Preferences
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-2 space-y-6">
                    {/* Profile Section */}
                    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000000]">
                        <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-4 mb-6 flex items-center gap-2">
                            <User className="w-5 h-5" /> Public Profile
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Display Name</label>
                                <input
                                    type="text"
                                    defaultValue="Ashraf Mazlan"
                                    className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0_0_#000000] transition-shadow"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Email</label>
                                <input
                                    type="email"
                                    defaultValue="ashraf@example.com"
                                    disabled
                                    className="w-full border-2 border-black bg-gray-100 p-3 font-mono text-sm text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Bio</label>
                                <textarea
                                    rows={4}
                                    className="w-full border-2 border-black p-3 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0_0_#000000] transition-shadow"
                                    defaultValue="Full Stack Developer building cool things."
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button className="btn-brutal bg-black text-white px-6 py-3 hover:bg-white hover:text-black">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="border-4 border-red-500 bg-red-50 p-6">
                        <h2 className="text-xl font-bold uppercase text-red-600 mb-2">Danger Zone</h2>
                        <p className="text-sm text-red-600/80 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                        <button className="border-2 border-red-600 text-red-600 font-bold uppercase text-xs px-4 py-2 hover:bg-red-600 hover:text-white transition-colors">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
