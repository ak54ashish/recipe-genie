import { Leaf, Drumstick, Cookie } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { DietFilter } from "@/utils/dietFilter";

interface FilterButtonsProps {
  active: DietFilter;
  onChange: (filter: DietFilter) => void;
}

const filters: { key: DietFilter; icon: typeof Leaf }[] = [
  { key: "all", icon: Cookie },
  { key: "veg", icon: Leaf },
  { key: "non-veg", icon: Drumstick },
  { key: "snacks", icon: Cookie },
];

const FilterButtons = ({ active, onChange }: FilterButtonsProps) => {
  const { t } = useLanguage();

  const labelMap: Record<DietFilter, string> = {
    all: t.filters.all,
    veg: t.filters.veg,
    "non-veg": t.filters.nonVeg,
    snacks: t.filters.snacks,
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ key, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
            active === key
              ? key === "veg"
                ? "bg-emerald-600 text-white shadow-md"
                : key === "non-veg"
                ? "bg-red-600 text-white shadow-md"
                : "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          <Icon className="w-4 h-4" />
          {labelMap[key]}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
