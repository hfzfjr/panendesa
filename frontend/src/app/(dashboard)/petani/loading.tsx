export default function LoadingPetani() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
      <div className="h-8 w-1/3 bg-gray-200 rounded-lg mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded-lg mb-8"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 h-32 rounded-2xl border border-gray-50"></div>
        <div className="bg-gray-100 h-32 rounded-2xl border border-gray-50"></div>
        <div className="bg-gray-100 h-32 rounded-2xl border border-gray-50"></div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="bg-gray-100 h-40 rounded-2xl border border-gray-50"></div>
        <div className="bg-gray-100 h-40 rounded-2xl border border-gray-50"></div>
      </div>
    </div>
  );
}
