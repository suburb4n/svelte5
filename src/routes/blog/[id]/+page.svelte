<script>
	import { page } from '$app/state';

	let pageId = $derived(page.params.id);
</script>

<h1 class="text-4xl">Single Blog: {pageId}</h1>
<a href="/blog/123">Another Text</a>
