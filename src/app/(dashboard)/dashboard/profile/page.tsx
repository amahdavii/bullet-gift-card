"use client";

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {/* Sales Overview Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Sales Overview</h2>
          <button className="flex items-center gap-1 border rounded-lg px-3 py-1 text-sm">
            x<span>July 24 - Aug 25</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard
            title="Total Purchase"
            value="$1,500"
            change="+8.2%"
            changeColor="text-green-600"
            desc="last 7 days"
          />
          <StatCard
            title="Total Activated"
            value="560 Cards"
            change="+2.2%"
            changeColor="text-green-600"
            desc="last 7 days"
          />
          <StatCard
            title="Total Scans"
            value="560 Scans"
            change="+5.1%"
            changeColor="text-green-600"
            desc="last 7 days"
          />
          <StatCard
            title="Average Card Value"
            value="$100"
            change="-1.2%"
            changeColor="text-red-600"
            desc="last 7 days"
          />
        </div>

        {/* Top Gift Cards */}
        <h3 className="text-lg font-semibold mb-3">Top Gift Cards</h3>
        <div className="grid grid-cols-2 gap-4">
          <GiftCard
            img="https://seeklogo.com/images/U/uber-logo-2BB8EC4342-seeklogo.com.png"
            name="Uber"
          />
          <GiftCard
            img="https://cdn-icons-png.flaticon.com/512/2111/2111320.png"
            name="Airbnb"
          />
          <GiftCard
            img="https://1000logos.net/wp-content/uploads/2021/04/GAP-logo.png"
            name="GAP"
          />
          <GiftCard
            img="https://cdn.worldvectorlogo.com/logos/hulu-2.svg"
            name="Hulu"
          />
          <GiftCard
            img="https://1000logos.net/wp-content/uploads/2021/05/Under-Armour-logo.png"
            name="Under Armour"
          />
          <GiftCard
            img="https://i.ibb.co/6FvyTds/starbucks.png"
            name="Starbucks"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-between items-center px-8 py-3">
        <NavItem icon={"<Home size={24} />"} label="Home" active />
        <NavItem icon={"<ShoppingBag size={24} />"} label="Orders" />
        <div className="relative -top-8">
          <button className="bg-amber-400 text-white rounded-full p-4 shadow-lg">
            x
          </button>
        </div>
        <NavItem icon={"<User size={24} />"} label="Profile" />
        <NavItem icon={"<Calendar size={24} />"} label="Reports" />
      </div>
    </div>
  );
}

/* -------- Components ---------- */
function StatCard({
  title,
  value,
  change,
  changeColor,
  desc,
}: {
  title: string;
  value: string;
  change: string;
  changeColor: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-xl font-bold mt-1">{value}</p>
      <p className={`text-xs mt-2 ${changeColor}`}>
        {change} <span className="text-gray-500">{desc}</span>
      </p>
    </div>
  );
}

function GiftCard({ img, name }: { img: string; name: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm flex flex-col items-center justify-center p-4">
      <img src={img} alt={name} className="h-12 object-contain mb-2" />
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex flex-col items-center text-xs ${
        active ? "text-black" : "text-gray-400"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
