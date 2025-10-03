import TransactionsTable from "@/components/shared/admin-panel/TransactionsTable";

const TransactionsPage = () => {
  return (
    <div>
      <TransactionsTable hasPagination={true} />
    </div>
  );
};

export default TransactionsPage;
