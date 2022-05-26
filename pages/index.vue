<template>
	<div class="min-h-screen">
		<Nav />
		<main>
			<section class="lg:px-[15%] px-[5%] pt-20">
				<h1
					class="lg:text-5xl text-2xl leading-normal font-semibold text-center"
				>
					Check Out Our Latest Blog Posts
				</h1>
				<h1
					class="lg:text-6xl text-4xl text-center leading-normal font-bold rainbow-text"
				>
					Learn. Share. Grow.
				</h1>
			</section>
			<section class="lg:px-[15%] px-[5%] lg:pt-20 pt-14">
				<p
					class="text-center uppercase font-medium tracking-wider mb-10 text-gray-500"
				>
					Blog Posts
				</p>
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
					<template
						v-for="(b, i) in blogNav[0].children"
						:key="`blogNavItem-${b._path}-${i}`"
					>
						<div class="px-7 py-5 rounded-lg border-2">
							<h2 class="text-lg font-semibold rainbow-text">
								{{ b.title }}
							</h2>
							<!-- Loop over files inside the content dir -->
							<ul
								v-if="b.children"
								class="list-disc list-inside mt-4 pl-2 space-y-3"
							>
								<template
									v-for="(child, k) in b.children"
									:key="`childNav-${child._path}-${k}-${i}`"
								>
									<li
										class="list-item text-sm text-gray-600 hover:text-primary-900 underline underline-offset-4 decoration-wavy decoration-primary/40 hover:decoration-primary transition-all"
									>
										<NuxtLink :to="`/blog${child._path}`">
											{{ child.title }}
										</NuxtLink>
									</li>
								</template>
							</ul>
							<ul v-else class="list-disc list-inside mt-4 pl-2 space-y-3">
								<li
									class="list-item text-sm text-gray-600 hover:text-primary-900 underline underline-offset-4 decoration-wavy decoration-primary/40 hover:decoration-primary transition-all"
								>
									<NuxtLink :to="`/blog${b._path}`"> Get Started </NuxtLink>
								</li>
							</ul>
						</div>
					</template>
				</div>
			</section>
		</main>
	</div>
</template>

<script setup>
	const { data: blogNav } = await useAsyncData("navigation", () => {
		return fetchContentNavigation(queryContent("blog"));
	});
	useHead({
		title: "Content Blog",
	});
</script>
