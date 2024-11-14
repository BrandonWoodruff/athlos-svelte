<script>
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

<style>
    .chat-box {
        border: 1px solid #ccc;
        padding: 10px;
        width: 300px;
        height: 400px;
        display: flex;
        flex-direction: column;
    }
    .messages {
        flex: 1;
        overflow-y: auto;
        margin-bottom: 10px;
    }
    .message {
        margin: 5px 0;
    }
    .input-box {
        display: flex;
    }
    .input-box input {
        flex: 1;
        padding: 5px;
    }
    .input-box button {
        padding: 5px;
    }
</style>

<div class="chat-box">
    <div class="messages">
        {#each messages as message}
            <div class="message"><strong>{message.user}:</strong> {message.text}</div>
        {/each}
    </div>
    <div class="input-box">
        <input type="text" bind:value={newMessage} on:keydown={(e) => e.key === 'Enter' && sendMessage()} />
        <button on:click={sendMessage}>Send</button>
    </div>
</div>