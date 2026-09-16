import SubjectCard from "@/components/ui/SubjectCard";
import { Sigma, Compass, ScrollText, Orbit } from "lucide-react";
function Subjects() {
  const subs = [
    {
      title: "Matemática",
      icon: Sigma,
      tasks: 12,
      mockTests: 5,
      progress: 85,
    },
    {
      title: "Geográfia",
      icon: Compass,
      tasks: 12,
      mockTests: 5,
      progress: 100,
    },
    {
      title: "História",
      icon: ScrollText,
      tasks: 12,
      mockTests: 5,
      progress: 27,
    },
    {
      title: "Física",
      icon: Orbit,
      tasks: 12,
      mockTests: 5,
      progress: 50,
    },
  ];
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Matérias</h1>

        <p className="text-muted-foreground">
          Acompanhe suas tarefas e simulados por matéria.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {subs.map((sub) => (
          <SubjectCard
            key={sub.title}
            title={sub.title}
            icon={sub.icon}
            tasks={sub.tasks}
            progress={sub.progress}
            mockTests={sub.mockTests}
          />
        ))}
      </div>
    </>
  );
}

export default Subjects;
