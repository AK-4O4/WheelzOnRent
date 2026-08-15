// =============================================================================
// components/become-host/PerksGrid.tsx
// "Why host on Ceepii?" perks grid section.
// =============================================================================
import { HOST_PERKS } from "@/data/placeholders/become-host.placeholders";
import { DollarIcon, ShieldIcon, UsersIcon, PhoneIcon } from "@/assets/svg";

const PERK_ICONS: Record<string, React.FC<{ className?: string }>> = {
  MoneyCircleIcon:    ({ className }) => <DollarIcon className={className} size={24} />,
  ShieldCheckIcon:   ({ className }) => <ShieldIcon className={className} size={24} />,
  UsersVerifiedIcon: ({ className }) => <UsersIcon className={className} size={24} />,
  SupportIcon:       ({ className }) => <PhoneIcon className={className} size={24} />,
};

export function PerksGrid() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-normal font-serif text-center mb-14 text-slate-900">
          Why host on <em className="italic font-normal">Ceepii?</em>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOST_PERKS.map((p) => {
            const Icon = PERK_ICONS[p.iconName];
            return (
              <div key={p.title} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <div className={`w-12 h-12 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center mb-5`}>
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
