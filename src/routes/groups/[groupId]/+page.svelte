<script lang="ts">
	import type { PageData } from './$types';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Users, CalendarDays, Info, MessageCircle } from 'lucide-svelte';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';

	import GroupHeader from '../../../lib/components/GroupHeader.svelte';
	import GroupInfo from '../../../lib/components/GroupInfo.svelte';
	import GroupMembers from '../../../lib/components/GroupMembers.svelte';
	import GroupGames from '../../../lib/components/GroupGames.svelte';
	import GroupChat from '../../../lib/components/GroupChat.svelte';

	export let data: PageData;

	let { group, members, allGames, joinRequests, isLeader } = data;
	group = { ...group, id: Number(group.id) };

	// Separate games into upcoming and past
	$: upcomingGames = allGames.filter((game) => !isPastGame(game.date_time));
	$: pastGames = allGames.filter((game) => isPastGame(game.date_time)).reverse();

	function isPastGame(gameDate: string): boolean {
		return new Date(gameDate) < new Date();
	}

	function animateTabContent(tabValue: string) {
		const content = document.querySelector(`.tab-content-${tabValue}`);
		if (content) {
			gsap.fromTo(content, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
		}
	}

	function getColorStyle(color: string) {
		return `background-color: ${color}25;`; // 25 is hex for 15% opacity
	}

	onMount(() => {
		const sections = document.querySelectorAll('.section');
		gsap.fromTo(sections, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 });
	});
</script>

<div class="container mx-auto max-w-3xl px-4 py-8" style={getColorStyle(group.color)}>
	<GroupHeader group={{ ...group, id: String(group.id) }} {members} {isLeader} />

	<Tabs value="info" class="section w-full">
		<TabsList class="grid w-full grid-cols-4">
			<TabsTrigger value="info" on:click={() => animateTabContent('info')}>
				<Info class="mr-2 h-4 w-4" />Info
			</TabsTrigger>
			<TabsTrigger value="members" on:click={() => animateTabContent('members')}>
				<Users class="mr-2 h-4 w-4" />Members
			</TabsTrigger>
			<TabsTrigger value="games" on:click={() => animateTabContent('games')}>
				<CalendarDays class="mr-2 h-4 w-4" />Games
			</TabsTrigger>
			<TabsTrigger value="chat" on:click={() => animateTabContent('chat')}>
				<MessageCircle class="mr-2 h-4 w-4" />Chat
			</TabsTrigger>
		</TabsList>
		<TabsContent value="info" class="tab-content-info">
			<GroupInfo {group} />
		</TabsContent>
		<TabsContent value="members" class="tab-content-members">
			<GroupMembers {members} {joinRequests} {isLeader} />
		</TabsContent>
		<TabsContent value="games" class="tab-content-games">
			<GroupGames {upcomingGames} {pastGames} groupId={String(group.id)} />
		</TabsContent>
		<TabsContent value="chat" class="tab-content-chat">
			<GroupChat />
		</TabsContent>
	</Tabs>
</div>
