
import type React from "react";
import Card from "./Card";

type StatCardProps={
    title:string;
    value:React.ReactNode;
    description: string;
    icon: React.ReactNode

}
function StatCard({title, value, description, icon}:StatCardProps){
    return(
        <Card title={title}>
                <div className="mb-4 text-blue-600 h-8 w-8">
                {icon}
                </div>
                <h3 className="text-4xl font-bold">{value}</h3>
                <p className="text-slate-500" >{description}</p>
        </Card>
    )
}
export default StatCard