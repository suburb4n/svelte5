<script>
	import { invalidate, invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
</script>

<h1>+error.svelte in blog/[id]</h1>
<p>{page.status}: {page.error?.message}</p>
<p>Code: {page.error?.code}</p>

<button
	onclick={() => {
		// invalidateAll();
		invalidate('blog:single_page');
		invalidate('blog:single_page_layout');
	}}
	class="btn mb-6 rounded-md bg-orange-600 text-white">Reload</button
>
