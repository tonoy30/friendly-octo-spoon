/* eslint-disable @next/next/no-img-element */
import Header from 'components/Header';
import { sanityClient, urlFor } from 'lib/sanity';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import PortableText from 'react-portable-text';
import { Post } from 'typing';
interface Props {
	post: Post;
}
const PostDetail = ({ post }: Props) => {
	return (
		<main>
			<Header />
			<img
				className='w-full h-40 object-cover'
				src={urlFor(post.coverImage).url()}
				alt={post.slug}
			/>
			<article className='max-w-3xl mx-auto'>
				<h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
				<h2 className='text-xl font-light text-gray-500'>
					{post.description}
				</h2>
				<div className='flex items-center space-x-2'>
					<img
						className='w-12 h-12 rounded-full'
						src={post.author.picture}
						alt={post.author.name}
					/>
					<p className='font-extralight text-sm'>
						Blog post by{' '}
						<span className='text-green-600'>
							{post.author.name}
						</span>{' '}
						at {new Date(post.date).toLocaleDateString()}
					</p>
				</div>
				<div className='mt-10'>
					<PortableText
						className=''
						dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
						projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
						content={post.body}
						serializers={{
							h1: (props: any) => (
								<h1
									className='text-2xl font-bold my-5'
									{...props}
								/>
							),
							h2: (props: any) => (
								<h2
									className='text-xl font-bold my-5'
									{...props}
								/>
							),
							li: ({ children }: any) => (
								<li className='ml-4 list-disc'>{children}</li>
							),
							link: ({ href, children }: any) => (
								<a
									className='text-blue-500 hover:underline'
									href={href}
									target='_blank'
									rel='noreferrer'
								>
									{children}
								</a>
							),
						}}
					/>
				</div>
			</article>
			<hr className='max-w-lg my-5 mx-auto border border-yellow-500' />
		</main>
	);
};

export default PostDetail;

export const getStaticPaths: GetStaticPaths = async () => {
	const query = `*[_type=="post" ] {
	_id,
	'slug': slug.current
	}`;
	const posts = await sanityClient.fetch(query);
	const paths = posts.map((post: Post) => ({
		params: { slug: post.slug },
	}));
	return {
		paths,
		fallback: 'blocking',
	};
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc)[0] {
	_id,
	body,
	title,
	description,
	'date': publishedAt,
	'slug': slug.current,
	'coverImage': mainImage,
	'author': author->{name, 'picture': image.asset->url},
	}`;
	const post = await sanityClient.fetch(query, { slug: params!.slug });
	if (!post) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			post,
		},
		revalidate: 60,
	};
};
