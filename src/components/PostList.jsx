import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("size") || "10", 10);
  const sortOrder = searchParams.get("sort") || "-published_at";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://suitmedia-backend.suitdev.com/api/ideas",
          {
            params: {
              "page[number]": currentPage,
              "page[size]": perPage,
              sort: sortOrder,
              append: ["small_image", "medium_image"],
            },
          }
        );

        const meta = response.data.meta;

        setPosts(response.data.data || []);
        setTotalPages(meta?.last_page || 1);
        setFrom(meta?.from || 0);
        setTo(meta?.to || 0);
        setTotal(meta?.total || 0);
      } catch (error) {
        console.error("❌ Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [currentPage, perPage, sortOrder]);

  const updateParams = (newParams) => {
    const updatedParams = {
      page: newParams.page ?? currentPage,
      size: newParams.size ?? perPage,
      sort: newParams.sort ?? sortOrder,
    };
    setSearchParams(updatedParams);
  };

  const getPageNumbers = () => {
    const delta = 2;
    let start = Math.max(currentPage - delta, 1);
    let end = Math.min(currentPage + delta, totalPages);

    if (end - start < delta * 2) {
      start = Math.max(1, end - delta * 2);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="space-y-8 px-[10%] py-5">
      {/* Sort & Size Controls */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            Menampilkan <span className="font-medium">{from}</span> -{" "}
            <span className="font-medium">{to}</span> dari{" "}
            <span className="font-medium">{total}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="mr-2 font-medium">Urutkan:</label>
            <select
              value={sortOrder}
              onChange={(e) =>
                updateParams({ sort: e.target.value, page: 1 })
              }
              className="border border-gray-300 px-3 py-1 rounded shadow-sm"
            >
              <option value="-published_at">Terbaru</option>
              <option value="published_at">Terlama</option>
            </select>
          </div>

          <div>
            <label className="mr-2 font-medium">Tampilkan:</label>
            <select
              value={perPage}
              onChange={(e) =>
                updateParams({ size: parseInt(e.target.value, 10), page: 1 })
              }
              className="border border-gray-300 px-3 py-1 rounded shadow-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* List Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-1 flex-wrap mt-6">
        <button
          onClick={() => updateParams({ page: 1 })}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          &laquo;
        </button>
        <button
          onClick={() => updateParams({ page: currentPage - 1 })}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          &lt;
        </button>

        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => updateParams({ page: pageNum })}
            className={`px-3 py-1 border rounded ${
              pageNum === currentPage
                ? "bg-orange-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => updateParams({ page: currentPage + 1 })}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          &gt;
        </button>
        <button
          onClick={() => updateParams({ page: totalPages })}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default PostList;
