<template>
	<div>
		<Nav />
		<main>
			<article
				class="lg:pt-20 pt-10 relative flex items-start lg:space-x-10 px-[5%] lg:px-[10%]"
			>
				<div
					v-if="blog.excerpt"
					class="w-[300px] p-5 sticky top-3 border rounded-md bg-white hidden lg:block"
				>
					<h2 class="text-sm font-bold mb-4">Table Of Contents</h2>
					<ul class="space-y-2">
						<template v-for="(t, k) in toc" :key="`toc-item-${k}`">
							<li>
								<NuxtLink
									:class="{
										'text-sm ml-4': t.depth == 2,
										'text-[13px] ml-6': t.depth > 2,
									}"
									class="capitalize"
									:to="`#${t.id}`"
									>{{ t.title }}</NuxtLink
								>
							</li>
						</template>
					</ul>
				</div>
				<ClientOnly>
					<ContentRenderer
						class="prose lg:prose-base prose-sm prose-slate blog-link pr-7 max-w-none"
						:value="blog"
					>
						<template #empty>
							<p>No content found.</p>
						</template>
					</ContentRenderer>
				</ClientOnly>
			</article>
		</main>
	</div>
</template>

<script setup>
	const slug = useRoute().params.slug.toString().replace(/,/g, "/");
	const { data: blog } = await useAsyncData(slug, () => {
		return queryContent(slug).findOne();
	});

	const toc = computed(() => {
		if (!blog.value) return [];
		const items = blog.value.excerpt?.children;
		if (!items) return [];
		const toc = [];
		const tags = ["h2", "h3", "h4", "h5", "h6"];
		items.forEach((item) => {
			if (tags.includes(item.tag)) {
				toc.push({
					id: item.props.id,
					title: item.props.id.toString().replace(/-/g, " "),
					depth: Number(item.tag.replace(/h/g, "")),
				});
			}
		});
		return toc;
	});

	useHead({
		title: `${blog.value.title}`,
	});
</script>

<style scoped>
	.blog-link {
		@apply prose-a:text-primary before:prose-headings:content-['#'] before:prose-headings:mr-1 before:prose-headings:text-primary before:prose-h1:content-[''];
	}
</style>
