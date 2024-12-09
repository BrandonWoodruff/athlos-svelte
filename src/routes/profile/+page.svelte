<script lang="ts">
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import GroupChat from '$lib/components/GroupChat.svelte';
  import { Separator } from "$lib/components/ui/separator";
  import { goto } from '$app/navigation';

  function goToFutures() {
    goto('/future-games');
  }

  export let data;

  const { user, userGroups } = data;

  // Mock game and attendance data
  const userGames = [
    { id: 1, date_time: '2024-02-20T18:00:00', location: 'Main Stadium', type: 'Basketball' },
    { id: 2, date_time: '2024-02-23T19:30:00', location: 'Sports Center', type: 'Volleyball' },
    { id: 3, date_time: '2024-02-25T16:00:00', location: 'Community Park', type: 'Soccer' },
    { id: 4, date_time: '2024-03-01T17:00:00', location: 'Recreation Center', type: 'Basketball' }
  ];

  const userAttendance = [
    { game_id: 1, status: 'Confirmed' },
    { game_id: 2, status: 'Maybe' },
    { game_id: 3, status: 'Declined' }
  ];

  let messages = [
    { user: 'Alice', text: 'Hello!' },
    { user: 'Bob', text: 'Hi, how are you?' }
  ];
  let newMessage = '';

  let selectedUser = null;
  let userMessages = {
    'Alice': {
      group: 'Basketball Enthusiasts',
      messages: [
        { user: 'Alice', text: 'Hello!' },
        { user: 'You', text: 'Hi, how are you?' }
      ]
    },
    'Bob': {
      group: 'Soccer Enthusiasts',
      messages: [
        { user: 'Bob', text: 'Hey!' },
        { user: 'You', text: 'What\'s up?' }
      ]
    }
  };

  function sendMessage() {
    if (newMessage.trim() !== '' && selectedUser) {
      userMessages[selectedUser].messages = [...userMessages[selectedUser].messages, { user: 'You', text: newMessage }];
      newMessage = '';
    }
  }

  onMount(() => {
    const sections = document.querySelectorAll('.section');
    gsap.fromTo(sections, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 }
    );
  });
</script>

<div class="container mx-auto p-4">
  <Card class="w-full max-w-3xl mx-auto section">
    <CardHeader>
      <div class="flex items-center space-x-4">
        <Avatar class="w-20 h-20">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <section>
          <h3 class="text-lg font-semibold mb-2">Groups</h3>
          <div class="flex flex-wrap gap-2">
            {#each userGroups as group}
              <Badge variant="secondary">{group.name}</Badge>
            {/each}
          </div>
        </section>
        <section>
          <h3 class="text-lg font-semibold mb-2">Upcoming Games</h3>
          <div class="space-y-4">
            {#each userGames as game, index}
              <div class="flex items-center justify-between">
                <button class="flex-1 text-left" on:click={goToFutures}>
                  <h4 class="font-semibold">{game.location}</h4>
                  <p class="text-sm text-muted-foreground">
                    Date: {new Date(game.date_time).toLocaleString()}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    Type: {game.type}
                  </p>
                </button>
                <Badge variant="outline">
                  {userAttendance.find(a => a.game_id === game.id)?.status || 'Not responded'}
                </Badge>
              </div>
              {#if index !== userGames.length - 1}
                <Separator class="my-2" />
              {/if}
            {/each}
          </div>
        </section>
        <section class="mt-8">
          <h3 class="text-lg font-semibold mb-2">Direct Messages</h3>
          <div class="flex space-x-4">
            <div class="w-1/4">
              <h4 class="text-md font-semibold mb-2">Friends</h4>
              <ul class="space-y-2">
                {#each Object.entries(userMessages) as [userName, userData]}
                  <li>
                    <Button 
                      variant="outline" 
                      on:click={() => selectedUser = userName} 
                      class="w-full text-left flex flex-col items-start"
                    >
                      <span>{userName}</span>
                      <span class="text-xs text-muted-foreground">{userData.group}</span>
                    </Button>
                  </li>
                {/each}
              </ul>
            </div>
            <div class="w-3/4">
              {#if selectedUser}
                <Card class="mb-8 section">
                  <CardHeader>
                    <CardTitle>Chat with {selectedUser}</CardTitle>
                    <CardDescription>{userMessages[selectedUser].group}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div class="space-y-2 mb-4 max-h-[300px] overflow-y-auto">
                      {#each userMessages[selectedUser].messages as { user, text }}
                        <div class="message p-2 rounded {user === 'You' ? 'bg-primary/10 ml-auto' : 'bg-muted'}">
                          <strong>{user}:</strong> {text}
                        </div>
                      {/each}
                    </div>
                    <input 
                      type="text" 
                      bind:value={newMessage} 
                      on:keydown={(e) => e.key === 'Enter' && sendMessage()} 
                      placeholder="Type a message..." 
                      class="w-full p-2 border rounded mt-2" 
                    />
                  </CardContent>
                </Card>
              {/if}
            </div>
          </div>
        </section>
      </div>
    </CardContent>
    <CardFooter class="flex justify-center">
      <Button variant="outline" href="/profile/edit">Edit Profile</Button>
    </CardFooter>
  </Card>
</div>
