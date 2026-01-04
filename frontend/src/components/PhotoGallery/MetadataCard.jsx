const formatDateTime = (value) => {
  if (!value) return "Unknown date";
  try {
    const date = value?.toDate ? value.toDate() : value; // 🔥 Firestore timestamp support
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return value;
  }
};

export default function MetadataCard({ photo }) {
  if (!photo) return null;

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
        Photo Details
      </h3>

      <dl className="mt-6 space-y-4 text-sm text-slate-700 dark:text-slate-200">
        <div className="flex items-center justify-between">
          <dt className="font-medium text-slate-500 dark:text-slate-400">
            Uploaded On
          </dt>
          <dd>{formatDateTime(photo.createdAt)}</dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="font-medium text-slate-500 dark:text-slate-400">
            Status
          </dt>
          <dd className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
            {photo.status || "Pending"}
          </dd>
        </div>

        {photo.fullName && (
          <div className="flex items-center justify-between">
            <dt className="font-medium text-slate-500 dark:text-slate-400">
              Uploaded By
            </dt>
            <dd>{photo.fullName}</dd>
          </div>
        )}

        {(photo.latitude || photo.longitude) && (
          <div className="flex items-center justify-between">
            <dt className="font-medium text-slate-500 dark:text-slate-400">
              Coordinates
            </dt>
            <dd className="font-mono text-xs">
              {photo.latitude?.toFixed(5)}, {photo.longitude?.toFixed(5)}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
