import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">Tweeter
            <br className="max-md:hidden" />
            <span className="blue_gradient text-center">a project for sending tweets, just like twitter!</span>
        </h1>
        <p className="desc text-center">This is a next.js project where I have implemented create, read, update, delete capability.</p>

        <Feed />
    </section>
  )
}

export default Home