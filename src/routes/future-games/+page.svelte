<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
    import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
    import { MapPin, Calendar, Users } from 'lucide-svelte';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { goto } from '$app/navigation';
    import { Alert, AlertDescription } from "$lib/components/ui/alert";
    import { toast, Toaster } from "svelte-sonner";

    // Mock static data
    const game = {
        id: 'future-1',
        date_time: '2024-03-15T18:00:00',
        location: 'Downtown Sports Complex',
        type: 'Basketball',
        max_players: 20,
        description: 'Upcoming championship game'
    };

    let attendees = [
        { user: { name: 'John Doe', status: 'Going' } },
        { user: { name: 'Jane Smith', status: 'Maybe' } },
        { user: { name: 'Mike Johnson', status: 'Going' } },
        { user: { name: 'Sarah Wilson', status: 'Interested' } }
    ];
    const constAttendees = attendees;

    let userStatus = null;
    let showFeedback = false;
    let feedbackMessage = '';

    function redirectToLocationSpecific() {
        goto('/locationSpecific');
    }

    function handleMaybe() {
        userStatus = 'Maybe';
        updateAttendees('Maybe');
        toast.success("You're marked as maybe!");
    }

    function handleJoin() {
        if (attendees.length >= game.max_players) {
            showFeedback = true;
            feedbackMessage = 'Sorry, this game is already full!';
            return;
        }
        
        userStatus = 'Going';
        updateAttendees('Going');
        toast.success("You've joined the game!");
    }

    function updateAttendees(status: string) {
        // Add current user to attendees
        attendees = [...constAttendees, {
            user: {
                name: 'Current User',
                status: status
            }
        }];
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
            <CardTitle>{game.type} Game</CardTitle>
            <CardDescription>
                <div class="flex items-center space-x-2">
                    <MapPin class="h-4 w-4" />
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
                <span>Interested Players: {attendees.length} / {game.max_players}</span>
            </div>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {#each attendees as attendee}
                    <div class="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage alt={attendee.user.name} />
                            <AvatarFallback>{attendee.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p class="text-sm font-medium">{attendee.user.name}</p>
                            <p class="text-xs text-muted-foreground">{attendee.user.status}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </CardContent>
        <CardFooter class="flex justify-between">
            <div>
                <Button 
                    variant="outline" 
                    on:click={handleMaybe}
                    disabled={userStatus === 'Maybe'}
                >
                    {userStatus === 'Maybe' ? 'Marked as Maybe' : 'Maybe'}
                </Button>
            </div>
            <div>
                <Button 
                    on:click={handleJoin}
                    disabled={userStatus === 'Going' || attendees.length >= game.max_players}
                    variant={userStatus === 'Going' ? "secondary" : "default"}
                >
                    {#if userStatus === 'Going'}
                        You're Going!
                    {:else if attendees.length >= game.max_players}
                        Game Full
                    {:else}
                        Join Game
                    {/if}
                </Button>
            </div>
        </CardFooter>
    </Card>

    {#if showFeedback}
        <Alert class="mt-4">
            <AlertDescription>{feedbackMessage}</AlertDescription>
        </Alert>
    {/if}

    <Card class="mt-8 section">
        <CardHeader>
            <CardTitle>Game Details</CardTitle>
            <CardDescription>{game.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div class="space-y-4">
                <div>
                    <h3 class="font-semibold">Location Information</h3>
                    <p class="text-sm text-muted-foreground">Indoor court with amenities</p>
                </div>
                <div>
                    <h3 class="font-semibold">Requirements</h3>
                    <ul class="list-disc list-inside text-sm text-muted-foreground">
                        <li>Proper sports attire</li>
                        <li>Water bottle</li>
                        <li>Indoor shoes</li>
                    </ul>
                </div>
            </div>
        </CardContent>
    </Card>
</div>

<Toaster />