<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="p-5">
	<div class="card bg-base-200 prose border-base-300 w-full rounded-md border-1">
		<div class="card-body">
			<form method="POST" action="?/createWorkspace">
				<label for="ws-name">Name</label>
				<input id="ws-name" name="name" class="input bg-base-200 w-full rounded-md" type="text" />
				<button class="btn btn-primary mt-4 w-full rounded-md" type="submit">Submit</button>
			</form>
		</div>
	</div>
</div>
