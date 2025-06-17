<script lang="ts">
	import { page } from '$app/state';
	import { CircleCheck, CircleX } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import FormMessage from '$components/FormMessage.svelte';

	let { data, form }: PageProps = $props();
</script>

<div class="p-5">
	<div class="card bg-base-200 prose border-base-300 w-full rounded-md border-1">
		<div class="card-body">
			{#if form?.message}
				<FormMessage message={form.message} />
			{/if}
			<form method="POST" action="?/createWorkspace">
				<label for="ws-name">Name</label>
				<input
					id="ws-name"
					value={form?.name}
					name="name"
					class="input bg-base-200 w-full rounded-md"
					type="text"
				/>
				<button class="btn btn-primary mt-4 w-full rounded-md" type="submit">Submit</button>
			</form>
		</div>
	</div>
</div>
