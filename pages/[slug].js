import ReactMarkdown from "react-markdown";
import getPosts from "../lib/posts";
import remarkGfm from 'remark-gfm'

const Post = ({ title, date, markdown }) => (
  <article className="space-y-5 pt-5">
    <div className="flex flex-col items-center justify-center space-y-1">
      <h1 className="text-xl font-bold border-b-2 border-secondary">{title}</h1>
      <time className="font-extralight text-xs text-gray-500">{date}</time>
    </div>
    <div className="p-5 prose lg:proxe-xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown}
        components={{
          table: props => {
            return (
              <div className="overflow-x-auto flex flex-col items-center justify-center mb-5 mt-5">
                <table className="table-normal max-w-screen">
                  <thead>
                    <tr>
                      {props.children[0].props.children[0].props.children.map((th, i) => (


                        <td key={i} className="p-5 text-sm font-normal">{th.props.children}</td>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {props.children[1].props.children.map((tr) => (
                      <tr key={tr.key} className="hover:bg-secondary text-sm">
                        {tr.props.children.map((td, i) => (
                          <td key={i} className="">{td.props.children}</td>
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
