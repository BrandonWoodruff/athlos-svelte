<script>
    import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
    let posts = [
        { user: 'Alice', text: 'What a great game!' },
        { user: 'Bob', text: 'We were so close to winning?' }
    ];
    let newPost = '';
    
    function sendPost() {
        if (newPost.trim() !== '') {
            posts = [...posts, { user: 'You', text: newPost }];
            newPost = '';
        }
    }
</script>


<Card class="mb-8 section">
    <CardHeader>
        <CardTitle>Comments</CardTitle>
    </CardHeader>
    <CardContent>
        <p class="text-sm text-muted-foreground">
    {#each posts as { user, text }}
        <div class="Post">
            <strong>{user}:</strong> {text}
        </div>
    {/each}
        </p>
        <input type="text" bind:value={newPost} on:keydown={(e) => e.key === 'Enter' && sendPost()} placeholder="Comment" class="w-full p-2 border rounded mt-2" />
    </CardContent>
</Card>

