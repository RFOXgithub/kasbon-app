import { Search } from "lucide-react";

export type StatusFilter = "all" | "unsettled" | "settled";
export type TypeFilter = "all" | "owed_to_me" | "i_owe";
export type SortOrder = "newest" | "oldest" | "amount-high" | "amount-low";

type DebtFiltersProps = {
  search: string;
  status: StatusFilter;
  type: TypeFilter;
  sort: SortOrder;
  onSearch: (value: string) => void;
  onStatus: (value: StatusFilter) => void;
  onType: (value: TypeFilter) => void;
  onSort: (value: SortOrder) => void;
};

const selectClass = "min-h-11 w-full rounded-xl border border-forest/15 bg-surface px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-focus";

export function DebtFilters({ search, status, type, sort, onSearch, onStatus, onType, onSort }: DebtFiltersProps) {
  return (
    <div className="mb-5 grid gap-3 rounded-2xl bg-surface p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]" role="group" aria-label="Cari dan filter catatan">
      <label className="relative block">
        <span className="mb-1 block text-xs font-medium text-muted">Cari nama</span>
        <Search aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 text-muted" size={18} />
        <input className={`${selectClass} pl-10`} onChange={(event) => onSearch(event.target.value)} placeholder="Nama orang" type="search" value={search} />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted">Status</span>
        <select className={selectClass} onChange={(event) => onStatus(event.target.value as StatusFilter)} value={status}>
          <option value="all">Semua status</option>
          <option value="unsettled">Belum lunas</option>
          <option value="settled">Lunas</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted">Tipe</span>
        <select className={selectClass} onChange={(event) => onType(event.target.value as TypeFilter)} value={type}>
          <option value="all">Semua tipe</option>
          <option value="owed_to_me">Saya dihutang</option>
          <option value="i_owe">Saya hutang</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted">Urutkan</span>
        <select className={selectClass} onChange={(event) => onSort(event.target.value as SortOrder)} value={sort}>
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
          <option value="amount-high">Jumlah terbesar</option>
          <option value="amount-low">Jumlah terkecil</option>
        </select>
      </label>
    </div>
  );
}
