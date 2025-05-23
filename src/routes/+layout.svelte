<script lang="ts">
	import { page } from '$app/state';
	import { BProgress } from '@bprogress/core';
	import '@bprogress/core/css';
	import '../app.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	BProgress.configure({ showSpinner: false });
	let { children } = $props();

	let loadingTimeout: number;

	beforeNavigate(() => {
		loadingTimeout = setTimeout(() => {
			BProgress.start();
		}, 500);
	});
	afterNavigate(() => {
		clearTimeout(loadingTimeout);
		BProgress.done();
	});
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
