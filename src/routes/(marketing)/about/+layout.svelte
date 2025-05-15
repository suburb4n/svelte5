<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/state';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	console.log(page);
</script>

<div class="border-3 bg-purple-700 p-4">
	<h1 class="mb-2 text-3xl">About Layout</h1>
	<div class="flex gap-4">
		<div class="w-[200px] bg-amber-700">
			<nav class="p-2">
				<ul>
					<li class:underline={page.url.pathname === '/about'}><a href="/about">About</a></li>
					<li class:underline={page.url.pathname === '/about/team'}>
						<a href="/about/team">Team</a>
					</li>
				</ul>
			</nav>
		</div>
		<div class="flex-1">
			{@render children()}
		</div>
	</div>
</div>
