import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit3, FiSave, FiBookOpen, FiCalendar, FiTrash2 } from "react-icons/fi";
import { useJournal } from "../hooks/useJournal";

export default function JournalFeature() {
  const { t } = useTranslation();
  const [entryText, setEntryText] = useState("");
  const { entries, addEntry, isAdding, deleteEntry } = useJournal();

  const handleSave = (e) => {
    e.preventDefault();
    if (!entryText.trim()) return;

    addEntry(entryText, {
      onSuccess: () => setEntryText(""),
    });
  };

  const handleDelete = (id) => {
    if (window.confirm(t("journal.confirm_delete", "Are you sure you want to delete this entry?"))) {
      deleteEntry(id);
    }
  };

  // تنسيق التاريخ بشكل جميل
  const formatDate = (isoString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* ترويسة الصفحة */}
      <header>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <FiBookOpen className="text-teal-600 dark:text-teal-400" />
          {t("journal.title", "My Journal")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          {t("journal.subtitle", "Write down your thoughts, feelings, and reflections.")}
        </p>
      </header>

      {/* قسم كتابة يومية جديدة */}
      <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all focus-within:ring-1 focus-within:ring-teal-500/30">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <FiEdit3 className="text-teal-600 dark:text-teal-400" />
          {t("journal.new_entry", "New Entry")}
        </h2>
        <form onSubmit={handleSave} className="space-y-4">
          <textarea
            value={entryText}
            onChange={(e) => setEntryText(e.target.value)}
            placeholder={t("journal.placeholder", "What's on your mind today?")}
            className="w-full min-h-[150px] p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all resize-y placeholder:text-slate-400"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!entryText.trim() || isAdding}
              className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-medium rounded-xl transition-colors shadow-sm"
            >
              <FiSave size={18} />
              {isAdding ? t("journal.saving", "Saving...") : t("journal.save", "Save Entry")}
            </button>
          </div>
        </form>
      </section>

      {/* قسم سجل اليوميات السابقة */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 px-2">
          {t("journal.history", "Past Entries")}
        </h2>
        
        {entries.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
            <p className="text-slate-500 dark:text-slate-400">
              {t("journal.empty", "Your journal is empty. Start writing your first entry above.")}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {entries.map(entry => (
              <div key={entry.id} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                    <FiCalendar size={14} className="text-teal-600 dark:text-teal-400" />
                  <span>{formatDate(entry.created_at)}</span>
                  </div>
                  <button 
                    onClick={() => handleDelete(entry.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100"
                    title={t("journal.delete", "Delete entry")}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed text-base">
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}