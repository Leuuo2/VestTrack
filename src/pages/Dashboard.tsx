import { BookOpen, Target, Clock, ClipboardList } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
function Dashboard(){
    const stats = [
  {
    title: "Matérias",
    value: 8,
    description: "cadastradas",
    icon: <BookOpen />
  },
  {
    title: "Simulados",
    value: 12,
    description: "realizados",
    icon: <Target />
  },
  {
    title: "Meta da Semana",
    value: "75%",
    description: "concluída",
    icon: <Clock/>
  },
  {
    title: "Estudo Hoje",
    value: "3h",
    description: "hoje",
    icon: <ClipboardList/>
  },
];
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Bem-vindo ao VestTrack 👋</p>
            <div className="grid grid-cols-2 gap-6 mt-8">
                {stats.map((stat) => (
                <StatCard
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                 />
                ))}
              
            </div>
        </div>
    )
}
export default Dashboard;