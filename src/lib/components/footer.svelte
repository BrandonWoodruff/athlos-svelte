<script lang="ts">
	import favicon from '$lib/images/favicon.png';
	import { goto } from '$app/navigation';

	function home() {
		goto('/');
	}
	
</script>

<footer class="bg-background p-4 text-foreground shadow-md">
	<div class="container mx-auto flex flex-col items-center justify-center">
		<div class="mb-2 flex items-center">
			<button type="button" on:click={home} class="mr-2 h-8 w-auto p-0 border-none bg-transparent">
				<img src="{favicon}" alt="Logo" class="h-8 w-auto" />
			</button>
			<span class="text-sm">&copy; {new Date().getFullYear()} Athlendar. No rights reserved.</span>
		</div>
		<div class="space-x-2">
			<a href="/privacy-policy" class="text-sm hover:underline">Privacy Policy</a>
			<a href="/terms-of-service" class="text-sm hover:underline">Terms of Service</a>
		</div>
	</div>
</footer>
