import { notifyLocalChange } from "@/lib/syncBus";

export type TopicNote = {
  topicId: string;
  content: string;
  updatedAt: string;
};

function notesKey(subjectId: string): string {
  return `vesttrack:notes:${subjectId}`;
}

export function loadNotes(subjectId: string): Record<string, TopicNote> {
  try {
    const raw = localStorage.getItem(notesKey(subjectId));
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, TopicNote>;
      if (parsed && typeof parsed === "object") return parsed;
    }
  } catch {}
  return {};
}

export function saveNotes(subjectId: string, notes: Record<string, TopicNote>) {
  try {
    localStorage.setItem(notesKey(subjectId), JSON.stringify(notes));
  } catch {}
  notifyLocalChange("topics", subjectId);
}

export function getNote(notes: Record<string, TopicNote>, topicId: string): string {
  return notes[topicId]?.content ?? "";
}

export function setNoteContent(
  subjectId: string,
  topicId: string,
  content: string,
) {
  const all = loadNotes(subjectId);
  if (content.trim() === "") {
    delete all[topicId];
  } else {
    all[topicId] = {
      topicId,
      content: content.trim(),
      updatedAt: new Date().toISOString(),
    };
  }
  saveNotes(subjectId, all);
  return all;
}
