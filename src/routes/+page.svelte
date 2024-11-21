<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { goto } from '$app/navigation';
    import { Button } from "$lib/components/ui/button";
    import teamManagement from '$lib/images/teamManagement.jpg';
	import eventScheduling from '$lib/images/eventSchedule.jpg';
    import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { Users, Calendar, Trophy } from "lucide-svelte";

    function redirectToGroups() {
        goto('/groups');
    }
    function redirectToLocationSearchView() {
        goto('/locationSearchView');
    }
    function redirectToLocationSpecific() {
        goto('/locationSpecific');
    }
    function redirectToCreateLocation() {
        goto('/createLocation');
    }
    function goToSignUp() {
        goto('/signup');
    }

    onMount(() => {
        gsap.from(".fade-in", {
            duration: 1,
            y: -50,
            opacity: 0,
            stagger: 0.2
        });
    });
</script>

<div class="bg-background min-h-screen flex items-center justify-center">
    <main class="container mx-auto px-4">
        <section class="text-center mb-16 fade-in">
            <h1 class = "text-5xl font-bold mb-4">Athlendar</h1>
            <h1 class="text-5xl font-bold mb-4">Manage Your Sports Group with Ease</h1>
            <p class="text-xl text-muted-foreground mb-8">Streamline organization, boost engagement, and elevate team performance</p>
            <Button size="lg" on:click={goToSignUp}>Get Started</Button>
        </section>

        <section class="flex flex-col items-center gap-20">
			<!-- Team Management Section -->
			<div class="fade-in flex flex-col items-center p-6 md:flex-row md:justify-between md:items-center gap-10">
				<div class="md:w-1/2">
					<h2 class="mb-4 text-4xl font-bold text-gray-800">Team Management</h2>
					<p class="mb-6 text-xl text-gray-600">
						Easily manage rosters, roles, and communications within your sports group.
					</p>
				</div>
				<div class="md:w-1/2">
					<img
						src={teamManagement}
						alt="Team Management"
						class="rounded-lg shadow-2xl w-full h-auto max-w-md"
					/>
				</div>
			</div>

			<!-- Event Scheduling Section -->
			<div class="fade-in flex flex-col items-center p-6 md:flex-row-reverse md:justify-between md:items-center gap-10">
				<div class="md:w-1/2">
					<h2 class="mb-4 text-4xl font-bold text-gray-800">Event Scheduling</h2>
					<p class="mb-6 text-xl text-gray-600">
						Coordinate practices, games, and team events with an intuitive calendar system.
					</p>
				</div>
				<div class="md:w-1/2">
					<img
						src={eventScheduling}
						alt="Event Scheduling"
						class="rounded-lg shadow-2xl w-full h-auto max-w-md"
					/>
				</div>
			</div>
		</section>
    </main>
</div>
