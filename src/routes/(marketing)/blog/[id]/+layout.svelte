<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="border-3 bg-blue-950 p-4">
	<h1 class="text-3xl">(blog/[id]) Layout</h1>

	{@render children()}
</div>
