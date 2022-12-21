import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import Container from '../components/Container';
import Link from 'next/link';
import Image from 'next/image';
import Time from '../components/Time';
import { BlogPostType } from 'lib/types';

export default function Blog({ posts }: BlogPostType) {
  return (
    <Container title="Blog - MW">
      <article className="[ wrapper ] [ margin-block-start-700 margin-block-end-800 ]">
        <h1>Blog</h1>
        <div className="margin-block-start-700">
          <ol className="auto-grid" role="list" data-layout="blog">
            {posts.map((post, index) => {
              return (
                post.frontmatter.card == undefined && (
                  <li
                    className="[ card ] [ focusable ]"
                    key={index + 1}
                    tabIndex={0}
                  >
                    <article className="flow" style={{ maxWidth: '561px' }}>
                      <Image
                        src={post.frontmatter.banner}
                        width={561}
                        height={300}
                        alt=""
                        className="card__image"
                      />
                      <h3 className="fs-600">{post.frontmatter.title}</h3>
                      <div className="[ card__data ] [ flex-wrap ] [ gap-200 ]">
                        <Time time={post.frontmatter.date} />
                        <div className="flex-row gap-100">
                          {post.frontmatter.tags.map((tag) => (
                            <div key={tag} className="pill">
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="fs-300 line-clamp">
                        {post.frontmatter.description}
                      </p>
                      <Link href={`/blog/${post.slug}`} className="button">
                        Read More
                      </Link>
                    </article>
                  </li>
                )
              );
            })}
          </ol>
        </div>
      </article>
    </Container>
  );
}

export async function getStaticProps() {
  const files = readdirSync('data/posts');
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.mdx', '');
    const markdownWithMeta = readFileSync(
      join('data/posts', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return { slug, frontmatter };
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
}
