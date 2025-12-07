<script lang="ts">
	import { page } from '$app/state';
	import { CircleCheck, CircleX } from '@lucide/svelte';
	let { message }: { message: string } = $props();
</script>

<div
	role="alert"
	class={[
		'alert alert-soft mt-2 rounded-md',
		{
			'alert-success': page.status == 200,
			'alert-error': page.status >= 400
		}
	]}
>
	{#if page.status == 200}<CircleCheck />{/if}
	{#if page.status >= 400}<CircleX />{/if}
	<span>{message}</span>
</div>
