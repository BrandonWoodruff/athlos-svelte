<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import favicon from '$lib/images/favicon.png';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { User } from 'lucide-svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// Placeholder for auth state
	let isLoggedIn = false; // Change this to false to see the Login/Sign Up buttons

	// Active link check
	$: currentPath = $page.url.pathname;
</script>

<header class="bg-background p-4 text-foreground shadow-md">
	<div class="container mx-auto flex items-center justify-between">
		<div class="flex items-center">
			<a href="/">
				<img src={favicon} alt="Logo" class="mr-2 h-12 w-auto" />
			</a>
			<nav class="space-x-4">
				<a href="/dashboard" class="pb-1 border-b-2 {currentPath === '/dashboard' ? 'border-foreground' : 'border-transparent'}">
					Dashboard
				</a>
				<a href="/groups" class="pb-1 border-b-2 {currentPath === '/groups' ? 'border-foreground' : 'border-transparent'}">
					Groups
				</a>
				<a href="/locationSearchView" class="pb-1 border-b-2 {currentPath === '/locationSearchView' ? 'border-foreground' : 'border-transparent'}">
					Locations
				</a>
			</nav>
		</div>
		<div class="space-x-2">
			<!-- {#if isLoggedIn} -->
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button variant="ghost" size="icon">
						<User class="h-5 w-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<a href="/profile">Profile</a>
					</DropdownMenuItem>
					<DropdownMenuItem>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<!-- {:else} -->
			<Button variant="outline" href="/login">Login</Button>
			<Button href="/signup">Sign Up</Button>
			<!-- {/if} -->
		</div>
	</div>
</header>
