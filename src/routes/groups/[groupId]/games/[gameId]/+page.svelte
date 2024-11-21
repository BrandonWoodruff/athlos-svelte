<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    import { Button } from '$lib/components/ui/button';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
    import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
    import { MapPin, Calendar, Users } from 'lucide-svelte';
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import PostComments from '../../../../../lib/components/PostComments.svelte'
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { goto } from '$app/navigation';

    export let data: PageData;

    const { game, attendees }: { game: any; attendees: any[] } = data;

    // Function to check if the game is in the past
    function isPastGame(gameDate: Date): boolean {
        const now = new Date();
        return gameDate < now;
    }

    function redirectToLocationSpecific() {
        goto('/locationSpecific');
    }

    // Check if it's a past game
    $: isPast = isPastGame(new Date(game.date_time));

    // Function to check if the current date is the same as the game date
    function isGameDay(gameDate: Date): boolean {
        const today = new Date();
        return today.toDateString() === gameDate.toDateString();
    }

    // Check if it's game day
    $: isToday = isGameDay(new Date(game.date_time));

    // Assume we have the current user's ID (you'll need to implement this)
    const currentUserId = 'some-user-id';

    // Check if the current user is already checked in
    $: isCheckedIn = attendees.some(a => a.user_id === currentUserId && a.checked_in);

    function handleAttend(event: Event, gameId: string) {
        console.log(`Attempting to attend game ${gameId}`);
    }

    let checkInError = '';
    let showErrorDialog = false;

    function handleCheckInSubmit() {
        return async ({ result }: { result: { type: string; data?: { message?: string } } }) => {
            if (result.type === 'success') {
                console.log('Check-in successful');
                isCheckedIn = true;
            } else if (result.type === 'failure') {
                console.error('Check-in failed:', result.data?.message);
                checkInError = result.data?.message || 'Check-in failed';
                showErrorDialog = true;
            }
        };
    }

    onMount(() => {
        const sections = document.querySelectorAll('.section');
        gsap.fromTo(sections, 
            { opacity: 0, y: -20 }, 
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 }
        );
    });
</script>

<div class="container mx-auto px-4 py-8 max-w-3xl">
    <Card class="section">
        <CardHeader>
            <CardTitle>Game Details</CardTitle>
            <CardDescription>
                <div class="flex items-center space-x-2">
                    <MapPin class="h-4 w-4" />
                    <!-- Added 'underline' class -->
                    <button 
                        class="underline text-black"
                        on:click={redirectToLocationSpecific}
                    >
                        {game.location}
                    </button>
                </div>
                <div class="flex items-center space-x-2 mt-2">
                    <Calendar class="h-4 w-4" />
                    <span>{new Date(game.date_time).toLocaleString()}</span>
                </div>
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div class="flex items-center space-x-2 mb-4">
                <Users class="h-4 w-4" />
                <span>Attendees: {attendees.length}</span>
            </div>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {#each attendees as attendee}
                    <div class="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage alt={attendee.user?.name} />
                            <AvatarFallback>{attendee.user?.name?.charAt(0) ?? ''}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p class="text-sm font-medium">{attendee.user?.name}</p>
                            <p class="text-xs text-muted-foreground">{attendee.status}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </CardContent>
        <CardFooter class="flex justify-between">
            <form method="POST" action="?/attendGame" use:enhance>
                <input type="hidden" name="userId" value={currentUserId} />
            </form>
            <form method="POST" action="?/checkIn" use:enhance={handleCheckInSubmit}>
                <input type="hidden" name="userId" value={currentUserId} />
                <Button 
                    disabled={!isToday || isCheckedIn || isPast}
                    class={(!isToday || isCheckedIn || isPast) ? 'opacity-50 cursor-not-allowed' : ''}
                >
                    {isCheckedIn ? 'Checked In' : (isPast ? 'Game Ended' : 'Check In')}
                </Button>
            </form>
        </CardFooter>
    </Card>

    <Card class="section">
        <CardHeader class="flex flex-row items-center justify-between">
            <CardTitle>Game Memories</CardTitle>
            <Button>Add Memory</Button>
        </CardHeader>
        <CardContent class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            <CardContent class="border-8 m-w-80 border-transparent shadow-md rounded-lg">
                <div>
                    <img src="https://images.unsplash.com/photo-1525916192735-22142b82d37a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGJhc2tldGJhbGx8ZW58MHx8MHx8fDA%3D" alt="" class="rounded-lg">
                    <PostComments/>
                </div>
            </CardContent>
            <CardContent class="border-8 w-80 border-transparent shadow-md rounded-lg">
                <div>
                    <img src="https://images.unsplash.com/photo-1519684093736-61f49e250672?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGJhc2tldGJhbGx8ZW58MHx8MHx8fDA%3D" alt="" class="rounded-lg ">
                    <PostComments/>
                </div>
            </CardContent>
            <CardContent class="border-8 w-80 border-transparent shadow-md rounded-lg">
                <div>
                    <img src="https://images.unsplash.com/photo-1518407613690-d9fc990e795f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGJhc2tldGJhbGx8ZW58MHx8MHx8fDA%3D" alt="" class="rounded-lg">
                    <PostComments/>
                </div>
            </CardContent>
            
        </CardContent>
    </Card>

    <AlertDialog.Root bind:open={showErrorDialog}>
        <AlertDialog.Content>
            <AlertDialog.Header>
                <AlertDialog.Title>Check-in Error</AlertDialog.Title>
                <AlertDialog.Description>
                    {checkInError}
                </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
                <AlertDialog.Action on:click={() => showErrorDialog = false}>Close</AlertDialog.Action>
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog.Root>
</div>
