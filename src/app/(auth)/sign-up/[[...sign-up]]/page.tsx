import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center gradient-bg">
            <div className="absolute inset-0 dot-pattern opacity-30" />
            <div className="relative z-10">
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "bg-card border border-border shadow-2xl",
                        },
                    }}
                />
            </div>
        </div>
    );
}
