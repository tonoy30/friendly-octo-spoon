/* eslint-disable @next/next/no-img-element */
import { urlFor } from 'lib/sanity';
import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { Post } from 'typing';

interface Props {
	post: Post;
}
const Post: NextPage<Props> = ({ post }: Props) => {
	return (
		<Link href={`/posts/${post.slug}`} passHref>
			<div className='border rounded-lg group cursor-pointer overflow-hidden'>
				{post.coverImage && (
					<img
						className='h-60 w-full object-cover object-center group-hover:scale-105 transition-transform duration-200 ease-in-out'
						src={urlFor(post.coverImage).url()}
						alt={post.slug}
					/>
				)}
				<div className='flex justify-between p-5 bg-white'>
					<div>
						<p className='text-lg font-bold'>{post.title}</p>
						<p className='text-xs'>
							{post.description} by {post.author.name}
						</p>
					</div>
					<img
						className='h-12 w-12 rounded-full'
						src={post.author.picture}
						alt={post.author.name}
					/>
				</div>
			</div>
		</Link>
	);
};

export default Post;
