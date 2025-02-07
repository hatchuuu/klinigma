import { articlesArray } from '@/utils/arrayDashboard';
import React from 'react'

const Articles = () => {
    return (
        <section className="w-full py-16">
            <div className="container mx-auto max-w-screen-lg px-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                    Artikel Terbaru
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articlesArray.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden"
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    e.target.src =
                                        "https://via.placeholder.com/400x300?text=No+Image"; // Placeholder jika gambar gagal dimuat
                                }}
                            />
                            <div className="p-4">
                                <p className="text-sm text-gray-500">{article.date}</p>
                                <h3 className="text-lg font-semibold text-gray-800 mt-2">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                    {article.description.length > 200
                                        ? `${article.description.substring(0, 200)}...`
                                        : article.description}
                                </p>
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block text-sm text-purple-600 font-medium hover:underline"
                                >
                                    See More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Articles