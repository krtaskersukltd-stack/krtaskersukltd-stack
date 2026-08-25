export default function DepartmentsPage() {



  const departments = [
    { name: 'Engineering', head: 'Bilal Khan', seats: 5, productivity: 94, budget: '$12,500/mo' },
    { name: 'UI/UX Design', head: 'Husnain Tanveer', seats: 3, productivity: 88, budget: '$7,200/mo' },
    { name: 'Marketing & Sales', head: 'Rizwan Ramzan', seats: 2, productivity: 82, budget: '$4,000/mo' },
    { name: 'Operations', head: 'Admin Account', seats: 1, productivity: 90, budget: '$3,000/mo' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-display text-[#041f24]">Departments</h1>
          <p className="text-xs text-[#6f797c] mt-0.5">Manage organizational units, department leads, and resource allocation</p>
        </div>
        <button className="kr-btn-primary text-xs flex items-center gap-1.5 self-start">
          <span className="material-symbols-outlined text-sm">add</span>
          <span>Create Department</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="kr-card p-5">
          <span className="text-xs font-semibold text-[#6f797c] uppercase">Total Org Units</span>
          <p className="text-2xl font-extrabold font-display text-[#041f24] mt-1 tnum">4</p>
        </div>
        <div className="kr-card p-5">
          <span className="text-xs font-semibold text-[#6f797c] uppercase">Allocated Seats</span>
          <p className="text-2xl font-extrabold font-display text-[#005766] mt-1 tnum">11 / 15</p>
        </div>
        <div className="kr-card p-5">
          <span className="text-xs font-semibold text-[#6f797c] uppercase">Avg Productivity</span>
          <p className="text-2xl font-extrabold font-display text-[#0d7d59] mt-1 tnum">88.5%</p>
        </div>
        <div className="kr-card p-5">
          <span className="text-xs font-semibold text-[#6f797c] uppercase">Monthly Budget</span>
          <p className="text-2xl font-extrabold font-display text-[#5644d0] mt-1 tnum">$26,700</p>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departments.map((dept, i) => (
          <div key={i} className="kr-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#005766] text-xl">domain</span>
                <h3 className="text-base font-bold font-display text-[#041f24]">{dept.name}</h3>
              </div>
              <span className="kr-badge kr-badge-working">
                {dept.seats} Active Seats
              </span>
            </div>

            <div className="space-y-2 bg-[#f0fbff] border border-[#bec8cc] p-3.5 rounded-lg text-xs">
              <div className="flex justify-between">
                <span className="text-[#6f797c] font-medium">Department Head</span>
                <span className="text-[#041f24] font-bold">{dept.head}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6f797c] font-medium">Monthly Allocation</span>
                <span className="text-[#041f24] font-bold tnum">{dept.budget}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6f797c] font-medium">Productivity Rate</span>
                <span className="text-[#0d7d59] font-bold tnum">{dept.productivity}%</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button className="flex-1 kr-btn-secondary text-xs">
                Manage Roles
              </button>
              <button className="flex-1 kr-btn-secondary text-xs">
                Budget Audit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
