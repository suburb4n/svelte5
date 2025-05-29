<script>
	import { page } from '$app/state';
</script>

<h1>+error.svelte in blog/[id]</h1>
<p>{page.status}: {page.error?.message}</p>
<p>Code: {page.error?.code}</p>
