
import Button from "../components/Button";
import DashboardLayout from "../components/DashboardLayout";
import ActionCard from "../components/ActionCard";
import QuickStats from "../components/QuickStats";
import { Link } from "react-router-dom";

    export default function DashboardContainer() {
        const username = "Nnamdi"
        
        return (
        <DashboardLayout>
            <div className="px-4 lg:px-8">
            <h2 className="mt-14 text-3xl font-semibold text-gray-800">Welcome back, {username}!</h2>
            <p className="my-3 font-medium text-gray-700">How are you feeling today? Let's check on your health.</p>
            <Link to="/dashboard/symptoms">
                <Button>Start New Health Check</Button>
            </Link>
            </div>

            <ActionCard />

            <QuickStats />

        </DashboardLayout>
    )
}