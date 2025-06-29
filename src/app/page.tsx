import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import SearchFlight from "@/components/ui/search-flight";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto py-12">
        <div className="bg-white shadow-md rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Busque seu voo
          </h1>
          <SearchFlight />
        </div>
      </div>
    </div>
  );
}
