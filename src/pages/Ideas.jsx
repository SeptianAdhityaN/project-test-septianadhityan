import Header from "../components/Header";
import Banner from '../components/Banner';
import PostList from "../components/PostList";

const IdeasPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Banner />
      <PostList />
    </div>
  );
}

export default IdeasPage