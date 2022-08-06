import ReactMarkdown from "react-markdown";
import getPosts from "../lib/posts";
import remarkGfm from 'remark-gfm'

const Post = ({ title, date, markdown }) => (
  <article className="flex flex-col items-center justify-center space-y-5 pt-5">
    <div>
      <h1 className="text-xl font-bold border-b-2 border-secondary">{title}</h1>
      <time className="font-extralight text-xs tracking-wider text-gray-500">{date}</time>
    </div>
    <div className="p-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown}
        components={{
          table: props => {
            return (
              <div className="overflow-x-auto m-10">
                <table className="table w-full">
                  <thead>
                    <tr>
                      {props.children[0].props.children[0].props.children.map((th, i) => (


                        <td key={i} className="m-48 p-5 text-base font-normal">{th.props.children}</td>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {props.children[1].props.children.map((tr) => (
                      <tr key={tr.key} className="hover text-sm font-extralight m-0">
                        {tr.props.children.map((td, i) => (
                          <td key={i} className="m-32">{td.props.children}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        }
      }
  />
  </div>
  </article>
);

export const getStaticPaths = async () => {
  const posts = await getPosts();

  return {
    paths: posts.map((post) => `/${post.slug}`),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === slug);

  return { props: post };
};

export default Post;
