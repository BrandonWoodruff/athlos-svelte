<script>
    import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
    let messages = [
        { user: 'Alice', text: 'Hello!' },
        { user: 'Bob', text: 'Hi, how are you?' }
    ];
    let newMessage = '';
    
    function sendMessage() {
        if (newMessage.trim() !== '') {
            messages = [...messages, { user: 'You', text: newMessage }];
            newMessage = '';
        }
    }
</script>


<Card class="mb-8 section">
    <CardHeader>
        <CardTitle>Group Chat</CardTitle>
    </CardHeader>
    <CardContent>
        <p class="text-sm text-muted-foreground">
    {#each messages as { user, text }}
        <div class="message">
            <strong>{user}:</strong> {text}
        </div>
    {/each}
        </p>
        <input type="text" bind:value={newMessage} on:keydown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." class="w-full p-2 border rounded mt-2" />
    </CardContent>
</Card>

