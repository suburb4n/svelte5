<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';

	let { children } = $props();
</script>

<div class="border-3 bg-pink-900 p-4">
	<h1 class="text-3xl">Root Layout</h1>

	{@render children()}
</div>
