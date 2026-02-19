import NewDashboardLayout from "@/components/dashboard/DashboardLayout";
import { getUserPlan } from "@/lib/subscription";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userPlan = await getUserPlan();

    return (
        <NewDashboardLayout userPlan={userPlan}>
            {children}
        </NewDashboardLayout>
    );
}
