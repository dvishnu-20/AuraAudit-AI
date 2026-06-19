import { VendorTable } from "@/components/app/VendorTable";
import { Building2 } from "lucide-react";

export default function VendorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Building2 className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Vendor Registry</h1>
          <p className="text-sm text-slate-500">Manage and monitor all vendor compliance profiles across regions.</p>
        </div>
      </div>
      <VendorTable />
    </div>
  );
}
