import { Trophy, Star, Lock, Zap } from "lucide-react";
import Card from "@/components/ui/Card";
import { loadAchievements, getUserLevel, getUnlockedAchievements } from "@/data/achievements";

export default function Achievements() {
 const achievements = loadAchievements();
 const level = getUserLevel();
 const unlocked = getUnlockedAchievements();
 
 const progressPercent = (level.xp / level.nextLevelXp) * 100;
 
 return (
 <div className="space-y-6">
  <div>
  <h1 className="text-xl md:text-2xl font-bold tracking-tight">Conquistas</h1>
  <p className="text-sm text-muted-foreground">Seu progresso gamificado</p>
  </div>
  
  {/* Level card */}
  <div ><Card className="p-6 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white border-0 ">
  <div className="flex items-start justify-between">
   <div>
   <div className="flex items-center gap-2">
    <div className="rounded-full bg-white/20 p-2">
    <Star className="h-5 w-5" />
    </div>
    <div>
    <p className="text-sm opacity-80">Nível</p>
    <p className="text-3xl font-bold">{level.level}</p>
    </div>
   </div>
   <p className="mt-3 text-sm opacity-90">{level.totalXp} XP total</p>
   </div>
   <div className="text-right">
   <p className="text-sm opacity-80">Próximo nível</p>
   <p className="text-lg font-medium">{level.xp} / {level.nextLevelXp} XP</p>
   </div>
  </div>
  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/20">
   <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progressPercent}%` }} />
  </div>
  </Card></div>
  
  {/* Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
  <Card className="p-4 text-center">
   <p className="text-xl md:text-2xl font-bold">{unlocked.length}</p>
   <p className="text-xs text-muted-foreground">Desbloqueadas</p>
  </Card>
  <Card className="p-4 text-center">
   <p className="text-xl md:text-2xl font-bold">{achievements.length - unlocked.length}</p>
   <p className="text-xs text-muted-foreground">Bloqueadas</p>
  </Card>
  <Card className="p-4 text-center">
   <p className="text-xl md:text-2xl font-bold">{level.totalXp}</p>
   <p className="text-xs text-muted-foreground">XP total</p>
  </Card>
  </div>
  
  {/* Achievements grid */}
  <div className="grid gap-3 sm:grid-cols-2">
  {achievements.map(ach => {
   const isUnlocked = !!ach.unlockedAt;
   const progress = Math.min((ach.progress / ach.total) * 100, 100);
   
   return (
   <Card key={ach.id} className={`p-4 transition-all ${isUnlocked ? "bg-violet-500/5 ring-1 ring-violet-500/20" : "opacity-60"}`}>
    <div className="flex gap-3">
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${isUnlocked ? "bg-violet-500 text-white" : "bg-muted"}`}>
     {isUnlocked ? ach.icon : <Lock className="h-4 w-4" />}
    </div>
    <div className="min-w-0 flex-1">
     <div className="flex items-center gap-2">
     <p className="truncate text-sm font-medium">{ach.title}</p>
     {isUnlocked && <Trophy className="h-3 w-3 text-amber-500" />}
     </div>
     <p className="mt-0.5 text-xs text-muted-foreground">{ach.description}</p>
     
     <div className="mt-2 flex items-center gap-2">
     <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
      <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${progress}%` }} />
     </div>
     <span className="text-[11px] text-muted-foreground">{ach.progress}/{ach.total}</span>
     </div>
     
     <div className="mt-1 flex items-center gap-1 text-[11px] text-violet-600">
     <Zap className="h-3 w-3" />
     {ach.xp} XP
     </div>
    </div>
    </div>
   </Card>
   );
  })}
  </div>
 </div>
 );
}
