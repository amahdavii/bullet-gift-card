const CategoryDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h2>Category Detail Page {params.id}</h2>
    </div>
  );
};

export default CategoryDetailPage;
