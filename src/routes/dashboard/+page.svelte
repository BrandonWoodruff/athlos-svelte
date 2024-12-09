<script lang="ts">
	export let data;
	// Initialize upcomingGames first
	let upcomingGames = [];
	const { user, groups, previousGames } = data;

	// Import UI components and animations
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { goto } from '$app/navigation';
	import { Separator } from "$lib/components/ui/separator";

	function goToGame(gameId: string, groupId: string) {
		goto(`/groups/${groupId}/games/${gameId}`);
	}
	function goToFutures() {
		goto('/future-games');
	}
	// Add mock attendance data (replace with real data later)
	const userAttendance = [
		{ game_id: 1, status: 'Confirmed' },
		{ game_id: 2, status: 'Maybe' },
		{ game_id: 3, status: 'Declined' }
	];

	// Add mock Upcoming Games data (replace with real data later)
	const userGames = [
		{ id: 1, date_time: '2024-02-20T18:00:00', location: 'Main Stadium', type: 'Basketball', group: 'Basketball Enthusiasts' },
		{ id: 2, date_time: '2024-02-23T19:30:00', location: 'Sports Center', type: 'Volleyball', group: 'Basketball Enthusiasts' },
		{ id: 3, date_time: '2024-02-25T16:00:00', location: 'Community Park', type: 'Soccer', group: 'Basketball Enthusiasts' },
		{ id: 4, date_time: '2024-03-01T17:00:00', location: 'Recreation Center', type: 'Basketball', group: 'Basketball Enthusiasts' }
	];
	// load games into upcomingGames
	upcomingGames = userGames;

	onMount(() => {
		const sections = document.querySelectorAll('.section');
		gsap.fromTo(
			sections,
			{ opacity: 0, y: -20 },
			{ opacity: 1, y: 0, duration: 0.6, stagger: 0.2 }
		);
	});

	// Console log after initialization
	console.log('Upcoming games:', upcomingGames);
</script>

<div class="container mx-auto p-4">
	<!-- Welcome Card -->
	<Card class="section mx-auto mb-4 w-full max-w-3xl">
		<CardHeader>
			<CardTitle>Welcome, {user.name}!</CardTitle>
			<CardDescription>Your dashboard overview</CardDescription>
		</CardHeader>
	</Card>

	<!-- Your Groups Card -->
	<Card class="section mx-auto mb-4 w-full max-w-3xl">
		<CardHeader>
			<CardTitle>Your Groups</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="flex flex-wrap gap-2">
				{#each groups as group}
					<a href="/groups/{group.id}">
						<Badge variant="secondary" class="text-lg">{group.name}</Badge>
					</a>
				{/each}
			</div>
		</CardContent>
	</Card>

	<!-- Upcoming Games Card -->
	<Card class="section mx-auto mb-4 w-full max-w-3xl">
		<CardHeader>
			<CardTitle>Your Upcoming Games</CardTitle>
		</CardHeader>
		<CardContent>
			{#if upcomingGames && upcomingGames.length > 0}
				<div class="space-y-4">
					{#each upcomingGames as game, index}
						<div class="flex items-center justify-between">
							<button class="flex-1 text-left" 
								on:click={() => goToFutures()}>
								<h4 class="font-semibold">{game.location}</h4>
								<p class="text-sm text-muted-foreground">
									Date: {new Date(game.date_time).toLocaleString()}
								</p>
								<p class="text-xs text-muted-foreground">
									Group: Basketball Enthusiasts
								</p>
							</button>
							<Badge variant="outline">
								{userAttendance.find(a => a.game_id === game.id)?.status || 'Not responded'}
							</Badge>
						</div>
						{#if index !== upcomingGames.length - 1}
							<Separator class="my-2" />
						{/if}
					{/each}
				</div>
			{:else}
					<p class="text-muted-foreground">You have no upcoming games scheduled.</p>
			{/if}
		</CardContent>
	</Card>

	<!-- Previous Games Card -->
	<Card class="section mx-auto w-full max-w-3xl">
		<CardHeader>
			<CardTitle>Previous Games</CardTitle>
		</CardHeader>
		<CardContent>
			{#if previousGames.length > 0}
				<div class="grid gap-4 md:grid-cols-2">
					{#each previousGames as game}
						<div
							on:click={() => goToGame(String(game.id), String(game.group_id))}
							on:keydown={(e) =>
								e.key === 'Enter' && goToGame(String(game.id), String(game.group_id))}
							class="game-item cursor-pointer"
							role="button"
							tabindex="0"
						>
							<span>{new Date(game.date_time).toLocaleString()}</span>
							<span>{game.location}</span>
							<span>
								<Badge variant="outline">
									{groups.find((g) => g.id === game.group_id)?.name}
								</Badge>
							</span>
						</div>
					{/each}
				</div>
			{:else}
				<p>No previous games.</p>
			{/if}
		</CardContent>
	</Card>
</div>

<style>
	.game-item {
		border: 1px solid #e5e7eb; /* Light gray border */
		padding: 1rem; /* Padding around each game item */
		border-radius: 0.5rem; /* Rounded corners */
	}
</style>
