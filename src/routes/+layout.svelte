<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	{#if page.data.post}
		<title>{page.data.post.title}</title>
		<meta property="og:title" content={page.data.post.title} />
		<meta property="og:description" content={page.data.post.body.slice(0, 200)} />
	{:else}
		<title>{page.data.title ? `${page.data.title} | NoteNow` : 'NoteNow'}</title>
		<meta
			property="og:title"
			content={page.data.title ? `${page.data.title} | NoteNow` : 'NoteNow'}
		/>
		{#if page.data.description}
			<meta property="og:description" content={page.data.description} />
			<meta name="description" content={page.data.description} />
		{/if}
	{/if}
</svelte:head>

{@render children()}
