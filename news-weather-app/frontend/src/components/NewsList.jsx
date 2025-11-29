import ArticleCard from './ArticleCard';

const NewsList = ({ articles }) => {
    if (!articles || articles.length === 0) {
        return <div className="text-center text-dark-muted py-10">No news found.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
                <ArticleCard key={index} article={article} />
            ))}
        </div>
    );
};

export default NewsList;
