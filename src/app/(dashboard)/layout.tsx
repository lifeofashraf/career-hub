import NewDashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <NewDashboardLayout>
            {children}
        </NewDashboardLayout>
    );
}
