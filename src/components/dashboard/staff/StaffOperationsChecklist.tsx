import React from "react";
import { Check } from "lucide-react";

export interface TaskItem {
  id: number;
  text: string;
  done: boolean;
}

interface StaffOperationsChecklistProps {
  tasks: TaskItem[];
  toggleTask: (id: number) => void;
}

export function StaffOperationsChecklist({
  tasks,
  toggleTask,
}: StaffOperationsChecklistProps) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
      <div>
        <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
          Daily Floor Operations Checklist
        </h3>
        <p className="text-xs text-muted-foreground">
          Assigned floor tasks for your morning roster
        </p>
      </div>

      <div className="space-y-2.5">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => toggleTask(task.id)}
            className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
              task.done
                ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-800/60"
                : "bg-muted/20 border-border/60 hover:bg-muted/40"
            }`}
          >
            <div
              className={`h-5 w-5 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                task.done
                  ? "bg-emerald-600 text-white"
                  : "border border-muted-foreground/40 bg-card"
              }`}
            >
              {task.done && <Check className="h-3 w-3" />}
            </div>
            <span
              className={`text-xs ${
                task.done ? "line-through text-muted-foreground" : "font-medium text-foreground"
              }`}
            >
              {task.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
