import BrochureHeader from "@/components/admin/brochure/BrochureHeader";
import SearchBar from "@/components/admin/brochure/SearchBar";
import BrochureTable from "@/components/admin/brochure/BrochureTable";

export default function BrochureCatalogView() {
  return (
    <>
      <BrochureHeader />

      <SearchBar />

      <BrochureTable />
    </>
  );
}