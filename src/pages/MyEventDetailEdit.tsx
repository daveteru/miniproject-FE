import FormText, { FormDate } from "../components/FormComponent";

export default function MyEventDetailEdit() {
  return (
    <div>
      <form>
        {/* Top section: fields + thumbnail */}
        <div className="flex gap-8 mb-6">
          {/* Left column — inputs */}
          <div className="flex-1 space-y-4">
            <FormText label="EVENT NAME" formFunction={() => {}} value="" />
            <FormText label="Artist Name" formFunction={() => {}} value="" />
            <div className="grid grid-cols-3 gap-4">
              <FormText label="Category" formFunction={() => {}} value="" />
              <FormDate label="START DATE" formFunction={() => {}} value="" />
              <FormDate label="END DATE" formFunction={() => {}} value="" />
            </div>
            <div className="flex gap-5">
              <FormText label="City" formFunction={() => {}} value="" />
              <FormText label="Location" formFunction={() => {}} value="" />
            </div>
          </div>

          {/* Thumbnail upload */}
          <div className="shrink-0">
            <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
              Thumbnail
            </label>
            <div
              onClick={() => {}}
              className="w-48 h-40 rounded-lg border border-neutral-300 bg-neutral-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-neutral-300 transition-shadow flex items-center justify-center"
            ></div>
            <input
              type="file"
              accept="image/*"
              onChange={() => {}}
              className="hidden"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-10">
          <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-2">
            Description
          </label>
          <textarea
            value=""
            onChange={() => {}}
            rows={8}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-500 transition-colors resize-none"
          />
        </div>

        <div className="flex items-center gap-6">
          <button
            type="submit"
            className={`bg-[#d4f531] hover:bg-[#c5e620] text-neutral-900 font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-xl transition-colors`}
          >
            Submit Changes
          </button>
        </div>
      </form>
    </div>
  );
}
